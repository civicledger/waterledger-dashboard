import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Switch } from "react-router-dom";
import Sidebar from "./app/Sidebar";
import Dashboard from "./dashboard/Dashboard";
import History from "./history/History";
import Notifications from "./dashboard/Notifications";
import Audit from "./audit/Audit";
import Modals from "./app/Modals";

import Liabilities from "./liabilities/Liabilities";
import Licence from "./licence/Licence";
import Admin from "./admin/Admin";
import TopNav from "./app/TopNav";

import { ReactQueryCacheProvider, QueryCache } from "react-query";

import { fetchEthContext, loadWalletForCurrentLicence } from "../redux/actions/actions";
import { watchForMatchEvent, watchForNewOrders, watchForDeletion, watchForLicenceCompletion } from "../redux/actions/watchers";
import { loadCurrentAuth } from "../redux/actions/auth";
import { fetchLicence } from "../redux/actions/waterLicences";
import { loadAdminLicences } from "../redux/actions/auth";

import { fetchBuyOrders, fetchSellOrders, fetchTrades } from "../redux/actions/orders";

export default props => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    const getData = async () => {
      dispatch(fetchEthContext());
      dispatch(loadWalletForCurrentLicence());
      dispatch(loadCurrentAuth());
      dispatch(watchForMatchEvent());
      dispatch(watchForNewOrders());
      dispatch(fetchLicence());
      dispatch(loadAdminLicences());
      dispatch(watchForLicenceCompletion());
      dispatch(watchForDeletion());
      dispatch(fetchBuyOrders());
      dispatch(fetchSellOrders());
      dispatch(fetchTrades());
    };
    getData();
  }, [dispatch]);

  return (
    <ReactQueryCacheProvider queryCache={new QueryCache()}>
      <div className="flex min-h-screen bg-steel-900 text-steel-100">
        <Sidebar />
        <Notifications notifications={notifications} />
        <div className="flex-grow flex flex-col" id="body">
          <TopNav />
          <Switch>
            <Route path="/" exact render={() => <Dashboard />} />
            <Route path="/licence" component={Licence} />
            <Route path="/admin" component={Admin} />
            <Route path="/history" component={History} />
            <Route path="/liabilities" component={Liabilities} />
            <Route path="/audit" component={Audit} />
            <Route path="/:address" render={props => <Dashboard address={props.match.params.address} />} />
          </Switch>
        </div>
        <Modals />
      </div>
    </ReactQueryCacheProvider>
  );
};
