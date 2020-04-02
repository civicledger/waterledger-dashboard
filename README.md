# WaterLedger Trading Platform - Single Page App

## Repository Information

This repository is the WaterLedger trading platform's interface. It is a JavaScript Single Page App implemented in React. It uses a standard Create React App build process, and implements Redux and Redux Thunk for state management.

## Setup Instructions

### Basic Installation

In order to setup this application, you can simply copy, download, or clone the application to a directory. Navigate to that directory and then run the following commands.

```
npm install
npm run start
```

You will also need to create a `.env` file (which can be done by simply running `touch .env` in the root directory) and provide the Contracts API url and provider URL in the `.env` file:

```
REACT_APP_WL_CONTRACT_DEPLOYMENT_URL=http://localhost:8081/
REACT_APP_PROVIDER_URL=http://localhost:8545
```

### Contracts API and provider

While the actual process of building and viewing the app is straight-forward, there are actually a number of complex dependencies to a working application. The main one is that WaterLedger explicitly **requires** an API. The contents of the API are not publicly available, but the relevant behaviour is to serve via standard HTTP `GET` requests a JSON file with the ABI and address, which are needed to create a working Ethereum contract instance.

Additionally, you will need to have available a local development blockchain. We typically run the [Ganache GUI](https://www.trufflesuite.com/ganache). The settings required for that are as shown in the `.env` example above, so modify to suit your preference.

## Application Operation

The actual interface documentation is provided as part of [our whitepaper](https://github.com/civicledger/waterledger-whitepaper). Please refer to that document for further information.