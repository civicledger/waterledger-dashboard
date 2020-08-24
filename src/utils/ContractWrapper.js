import { web3 } from "./ethUtils";

import { loadAll } from "./abi";

class ContractWrapper {
  static accounts = [];

  constructor(abi, address) {
    this.web3 = web3;
    this.abiObject = loadAll(abi);
    this.web3Contract = this.loadWeb3ContractAtAddress(abi, address);
    this.proxyContract = this.createContractProxy();
    this.structs = [];
    this.events = this.web3Contract.events;
  }

  /*****
   * TODO: This should not be necessary but currently ganache and/or metamask do not handle the
   * receipt or confirmation event correctly.
   */
  getTransactionSuccess(txHash) {
    let count = 0;

    const timeout = 800000;
    const interval = 7000;

    return new Promise((resolve, reject) => {
      const txInterval = setInterval(() => {
        this.web3.eth.getTransactionReceipt(txHash, (err, result) => {
          if (err) {
            clearInterval(txInterval);
            reject(err);
          }

          if (!err && result) {
            clearInterval(txInterval);
            resolve(result);
          }
        });

        if (count >= timeout) {
          clearInterval(txInterval);
          const errMessage = `Receipt timeout waiting for tx hash: ${txHash}`;
          reject(errMessage);
        }

        count += interval;
      }, interval);
    });
  }

  async newInstance(...args) {
    if (typeof this.truffleArtefact.new === "undefined") {
      throw new Error("You cannot deploy from build files, please use truffle");
    }
    args.forEach((arg, index) => {
      args[index] = this.inputType(arg, this.abiObject.constructor.inputs[index].type);
    });
    const { address } = await this.truffleArtefact.new(...args);
    this.web3Contract = this.loadWeb3ContractAtAddress(address);
    this.proxyContract = this.createContractProxy();
  }

  contract() {
    return this.proxyContract;
  }

  loadWeb3ContractAtAddress(abi, address) {
    return new this.web3.eth.Contract(JSON.parse(abi), address);
  }

  populateStructs(structs) {
    this.structs = structs;
  }

  translateToStruct(functionCalled, outputData) {
    const struct = this.structs.find(s => {
      return typeof s.expectedFrom[functionCalled] !== "undefined";
    });

    if (struct.expectedFrom[functionCalled] === "array") {
      return this.assembleStructFromArrays(struct.attributes, outputData);
    }

    throw Error("Single entry data is not yet supported");
  }

  assembleStructFromArrays(structure, dataArrays) {
    return dataArrays[0].map((data, index) => {
      let newObject = {};
      structure.forEach((field, innerIndex) => {
        if (dataArrays[innerIndex]) {
          let fieldRowValue = dataArrays[innerIndex][index];
          newObject[field.name] = this.returnType(fieldRowValue, field.type);
        }
      });
      return newObject;
    });
  }

  inputType(value, type) {
    switch (type) {
      case "bytes32":
        return this.web3.utils.utf8ToHex(value);
      default:
        return value;
    }
  }

  returnType(value, type) {
    switch (type) {
      case "bytes32":
        return this.web3.utils.hexToUtf8(value);
      case "uint256":
        return Number(value);
      case "uint8":
        return Number(value);
      case "uint":
        return Number(value);
      default:
        return value;
    }
  }

  mapValuesReturnObject(values, parameters) {
    let object = parameters.reduce((returnObject, { name, type }, index) => {
      returnObject[name] = this.returnType(values[index], type);
      return returnObject;
    }, {});
    return object;
  }

  mapValuesReturnArray(values, parameters) {
    if (values.length === parameters.length * 2) {
      values = values.slice(0, values.length / 2);
    }

    return parameters.map(({ type }, index) => {
      return this.returnType(values[index], type);
    });
  }

  mapValuesInputArray(values, parameters) {
    if (values.length !== parameters.length) {
      throw Error("Incorrect number of values for contract input parameters.");
    }

    return parameters.map(({ type }, index) => {
      return this.outType(values[index], type);
    });
  }

  createContractProxy() {
    let handler = {
      get: (target, name) => {
        if (name === "address") {
          return target._address;
        }

        if (name === "events") {
          return this.web3Contract.events;
        }

        if (target.methods.hasOwnProperty(name) && typeof target.methods[name] === "function") {
          return async (...args) => {
            const { accounts, isLocked } = await this.resolveAccounts();

            let account = accounts[0];
            this.web3.defaultAccount = account.address;

            let parameterObject = { from: account.address };

            let result;
            if (typeof args[args.length - 1] === "object") {
              parameterObject = { ...parameterObject, ...args.pop() };
            }

            args.forEach((arg, index) => {
              let { type } = this.abiObject.interface[name].inputs[index];
              args[index] = this.inputType(arg, type);
            });

            const func = target.methods[name](...args);

            try {
              if (this.abiObject.interface[name].stateMutability === "view") {
                result = await func.call(parameterObject);
              } else {
                try {
                  if (typeof account !== "object") {
                    throw Error("Attempting to sign transaction without valid wallet account");
                  }
                  if (isLocked) {
                    throw Error("Please sign in, your account needs to be unlocked.");
                  }
                  const data = func.encodeABI();

                  const gas = 1000000;

                  const chainId = await web3.eth.net.getId();

                  const tx = {
                    from: parameterObject.from,
                    to: this.proxyContract.address,
                    gas,
                    data,
                    chainId,
                  };
                  const { rawTransaction } = await web3.eth.accounts.signTransaction(tx, account.privateKey);
                  return rawTransaction;
                } catch (error) {
                  throw Error(error);
                }
              }
            } catch (error) {
              throw error;
            }

            const structForResult = this.abiObject.structs[name];

            if (structForResult) {
              const structType = this.abiObject.interface[name].outputs[0].type;

              if (structType === "tuple[]") {
                return result.reduce((accumulator, item) => {
                  const newItem = structForResult.reduce((resultObject, f) => {
                    resultObject[f.name] = this.returnType(item[f.name], f.type);
                    return resultObject;
                  }, {});

                  accumulator.push(newItem);
                  return accumulator;
                }, []);
              }

              // single object struct
              console.log("this is a single object struct");
            }

            if (this.abiObject.interface[name].outputs.length === 0) {
              return null;
            }

            if (typeof result === "number" || typeof result === "string" || typeof result === "boolean") {
              return await this.returnType(result, this.abiObject.interface[name].outputs[0].type);
            }

            if (this.abiObject.interface[name].outputs.length === 1) {
              const outputType = this.abiObject.interface[name].outputs[0].type;
              const outputTypeShort = outputType.substring(0, outputType.length - 2);

              return result.map(r => this.returnType(r, outputTypeShort));
            }

            return this.mapValuesReturnArray(Object.values(result), this.abiObject.interface[name].outputs);
          };
        }
        throw Error(`"${name}" is not a valid method on this contract`);
      },
    };

    return new Proxy(this.web3Contract, handler);
  }

  async resolveAccounts() {
    let isLocked = false;
    if (this.web3.eth.accounts.wallet.length > 0) {
      ContractWrapper.accounts = this.web3.eth.accounts.wallet;
    } else if (!!localStorage.getItem("waterLedgerAccount")) {
      ContractWrapper.accounts = [{ address: localStorage.getItem("waterLedgerAccount") }];
      isLocked = true;
    } else if (ContractWrapper.accounts.length === 0) {
      ContractWrapper.accounts = [web3.eth.accounts.create()];
    }
    return { accounts: ContractWrapper.accounts, isLocked };
  }
}

export const wrap = (abi, address) => new ContractWrapper(abi, address);
