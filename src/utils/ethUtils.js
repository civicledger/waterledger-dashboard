const getInstanceIdentifier = () => {
  const hostName = window.location.hostname;
  if (hostName === "localhost") return "coloradobasin";

  return hostName.split(".")[0].replace("test-", "");
};

const getCurrentNetwork = () => {
  const hostName = window.location.hostname;
  if (hostName === "localhost") return "localhost";
  return "goerli";
};

export { getCurrentNetwork, getInstanceIdentifier };
