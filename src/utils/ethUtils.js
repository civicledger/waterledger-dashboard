import Web3 from "web3";

const networkToId = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  kovan: 42,
  sokol: 77,
  localhost: 5777,
  dev: 5777,
  private: 8995,
};

const getNetworkNameForId = id => {
  return Object.entries(networkToId).find(([name, entryId]) => +id === +entryId)[0];
};

const getInstanceIdentifier = () => {
  const hostName = window.location.hostname;
  if (hostName === "localhost") return "demo";

  return hostName.split(".")[0];
};

const getCurrentNetwork = () => {
  const hostName = window.location.hostname;
  if (hostName === "localhost") return "localhost";
  return "goerli";
};

const resolveEthProvider = () => {
  return new Web3.providers.WebsocketProvider(process.env.REACT_APP_PROVIDER_URL);
};

const web3 = new Web3(resolveEthProvider());

const getCurrentNetworkId = () => networkToId[getCurrentNetwork()];

const cleanIntegers = obj => {
  return Object.entries(obj).reduce((newObj, [key, value]) => {
    if (isNaN(key)) {
      newObj[key] = Number(value);
    }
    return newObj;
  }, {});
};

const defaultEthProviderStatus = {
  address: null,
  walletAccountsAvailable: false,
  networkId: 0,
  isReadOnly: true,
  isSignedIn: false,
  canSignIn: false,
  ethBalance: 0,
  startBlock: 0,
  hasLocalStorageWallet: false,
  statusLoaded: false,
};

const ethProviderStatus = async () => {
  let status = defaultEthProviderStatus;
  status.startBlock = await web3.eth.getBlockNumber();
  status.networkId = await web3.eth.net.getId();

  const licenceId = localStorage.getItem("wl-licence");

  if (licenceId) {
    const walletPassword = localStorage.getItem("wl-walletPassword");
    const wallet = web3.eth.accounts.wallet.load(walletPassword, "wl-wallet");
    status.address = wallet[0].address;
    status.ethBalance = Number(await web3.eth.getBalance(status.address));
    status.walletAccountsAvailable = wallet.length > 0;
    status.isReadOnly = false;
    status.hasLocalStorageWallet = true;
    status.isSignedIn = true;
    status.canSignIn = true;
    web3.eth.defaultAccount = wallet[0].address;
  }
  status.statusLoaded = true;
  return status;
};

export {
  networkToId,
  getNetworkNameForId,
  getCurrentNetworkId,
  getCurrentNetwork,
  cleanIntegers,
  resolveEthProvider,
  web3,
  ethProviderStatus,
  defaultEthProviderStatus,
  getInstanceIdentifier,
};
