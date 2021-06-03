import Web3 from "web3";

const getInstanceIdentifier = () => {
  const hostName = window.location.hostname;
  if (hostName === "localhost") return "mdwss";

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

export { resolveEthProvider, web3, getCurrentNetwork, getInstanceIdentifier };
