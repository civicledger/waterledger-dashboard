import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Switch } from "react-router-dom";
import Sidebar from "./app/Sidebar";
import Dashboard from "./dashboard/Dashboard";
import History from "./history/History";
import Notifications from "./dashboard/Notifications";
import Audit from "./audit/Audit";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import Modals from "./app/Modals";

import Liabilities from "./liabilities/Liabilities";
import Licence from "./licence/Licence";
import TopNav from "./app/TopNav";

import { ReactQueryCacheProvider } from "react-query";
import { queryCache } from "./queries";

import { fetchEthContext, loadWalletForCurrentLicence } from "../redux/actions/actions";
import { watchForLicenceCompletion } from "../redux/actions/watchers";

export default props => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    const getData = async () => {
      dispatch(fetchEthContext());
      dispatch(loadWalletForCurrentLicence());
      dispatch(watchForLicenceCompletion());
    };
    getData();
  }, [dispatch]);

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <div className="flex min-h-screen bg-steel-900 text-steel-100">
        <Sidebar />
        <Notifications notifications={notifications} />
        <div className="flex-grow flex flex-col" id="body">
          <TopNav />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/licence" component={Licence} />
            <Route path="/history" component={History} />
            <Route path="/liabilities" component={Liabilities} />
            <Route path="/audit" component={Audit} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
        <Modals />
      </div>
    </ReactQueryCacheProvider>
  );
};
