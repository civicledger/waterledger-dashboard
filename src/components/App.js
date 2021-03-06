import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import { userReducer, UserContext } from "./contexts";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./app/Sidebar";
import Dashboard from "./dashboard/Dashboard";
import History from "./history/History";
import Notifications from "./dashboard/Notifications";
import Audit from "./audit/Audit";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import Logout from "./logout/Logout";
import Modals from "./app/Modals";
import Watchers from "./Watchers";
import UserService from "../services/UserService";

import Liabilities from "./liabilities/Liabilities";
import Licence from "./licence/Licence";
import TopNav from "./app/TopNav";

import { ReactQueryCacheProvider } from "react-query";
import { queryCache } from "./queries";

export default props => {
  const [login, loginDispatch] = useReducer(userReducer, UserService.getLoggedInUser());

  const notifications = useSelector(state => state.notifications);
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <UserContext.Provider value={{ login, loginDispatch }}>
        <Watchers />
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
              <Route path="/logout" component={Logout} />
            </Switch>
          </div>
          <Modals />
        </div>
      </UserContext.Provider>
    </ReactQueryCacheProvider>
  );
};
