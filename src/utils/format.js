import { subDays, getTime, formatDistance, formatDistanceToNow } from "date-fns";

export const formatNumber = (number = 0) => number.toLocaleString("en-AU");

export const formatAmount = amountInDollars => {
  return amountInDollars.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0, minimumFractionDigits: 0 });
};

export const formatDate = utcDate => formatDistance(utcDate * 1000, new Date()) + " ago";

export const formatKilolitres = (kl, units = "ML") => {
  if (kl === undefined) return;

  return `${kl / 1000} ${units}`;
};

export const formatShortDate = utcDate => new Date(utcDate * 1000).toLocaleDateString("en-au", { day: "numeric", year: "numeric", month: "short" });

export const formatShortDateObject = dateObject => {
  return dateObject.toLocaleDateString("en-AU", { day: "numeric", year: "numeric", month: "short" });
};

export const formatShortTimeObject = dateObject => {
  return dateObject.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: true });
};

export const formatRelativeDateSeconds = utcDate => formatDistanceToNow(new Date(utcDate * 1000), { addSuffix: true });

export const formatRelativeDate = utcDate => formatDistanceToNow(new Date(utcDate), { addSuffix: true });

export const formatRemoteAddress = address => {
  if (!address) return "";
  return address.slice(0, 20).toLowerCase();
};

export const timestampDaysAgo = numberOfDays => {
  return Math.floor(getTime(subDays(new Date(), numberOfDays)) / 1000);
};

export const timestampNow = () => Math.floor(new Date() / 1000);

export const millisToSeconds = date => Math.floor(getTime(date) / 1000);

export const titleCase = string => {
  return string
    .toLowerCase()
    .split(" ")
    .map(word => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};

export const errorMessage = ({ message }) => {
  if (message.includes("insufficient funds for gas * price")) {
    return 'You do not have enough ether to pay "gas" transaction fee.';
  }

  if (message.includes("doesn't have enough funds")) {
    return 'You do not have enough ether to pay "gas" transaction fee.';
  }

  if (message.includes("Insufficient water allocation")) {
    return "You do not have enough water allocated to sell.";
  }

  if (message.includes("Insufficient AUD allocation")) {
    return "You do not have funds required to make this purchase";
  }
  console.log(message);
  return "Your transaction returned an error. Make sure you have sufficient Water balances.";
};

export const guardMilliseconds = (from, to) => {
  if (from.length > 10 || to.length > 10) {
    throw Error("Milliseconds passed instead of seconds.");
  }
};
