import Web3 from 'web3';

const networkToId = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  kovan: 42,
  sokol: 77,
  localhost: 5777,
  dev: 5777,
  private: 8995
}

const getNetworkNameForId = id => {
  return Object.entries(networkToId).find(([name, entryId]) => +id === +entryId)[0];
}

const getInstanceIdentifier = () => {
  const hostName = window.location.hostname;
  if(hostName === 'localhost') return 'mdwss';

  return hostName.split('.')[0]
}

const getCurrentNetwork = () => {
  const hostName = window.location.hostname;
  if(hostName === 'localhost') return 'localhost';
  return 'rinkeby';
}

const resolveEthProvider = () => {
  return new Web3.providers.WebsocketProvider(process.env.REACT_APP_PROVIDER_URL);
}


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
  statusLoaded: false
};

const ethProviderStatus = async () => {
  let status = defaultEthProviderStatus;
  status.startBlock = await web3.eth.getBlockNumber();
  status.networkId = await web3.eth.net.getId();

  const licenceId = localStorage.getItem('wlCurrentLicence');

  if(licenceId) {
    const wallet = web3.eth.accounts.wallet.load(licenceId, `${licenceId}_wl-wallet`);
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


  // status.ethBalance = !!accountAddress ? Number(await web3.eth.getBalance(accountAddress)) : 0;

  // if (!web3.eth.defaultAccount) {
  //   web3.eth.defaultAccount = accountAddress;
  // }

  // status.hasLocalStorageWallet = Boolean(localStorage.getItem("waterLedgerWallet"));
  // status.isSignedIn = status.hasLocalStorageWallet && status.walletAccountsAvailable;
  // status.canSignIn = status.hasLocalStorageWallet && !status.walletAccountsAvailable;
  // status.isReadOnly = status.canSignIn || !status.hasLocalStorageWallet;
  // status.statusLoaded = true;
  // return status;
}

export { networkToId, getNetworkNameForId, getCurrentNetworkId, getCurrentNetwork, cleanIntegers, resolveEthProvider, web3, ethProviderStatus, defaultEthProviderStatus, getInstanceIdentifier };