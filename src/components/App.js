import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { userReducer, UserContext, TerminologyContext } from "./contexts";
import { Route, Switch } from "react-router-dom";
import Watchers from "./Watchers";
import Sidebar from "./app/Sidebar";
import Dashboard from "./dashboard/Dashboard";
import History from "./history/History";
import Notifications from "./dashboard/Notifications";
import Audit from "./audit/Audit";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import Logout from "./logout/Logout";
import Modals from "./app/Modals";
import UserService from "../services/UserService";
import TerminologyService from "../services/TerminologyService";

import Liabilities from "./liabilities/Liabilities";
import Licence from "./licence/Licence";
import TopNav from "./app/TopNav";

import { QueryClientProvider } from "react-query";
import { getScheme, queryClient, getTerminologies } from "./queries";
import { defaultTerminologies } from "../utils/terminologies";

export default props => {
  const [login, loginDispatch] = useReducer(userReducer, UserService.getLoggedInUser());
  const [terminologies] = useState(TerminologyService.getSavedTerminologies());

  queryClient.prefetchQuery("getScheme", getScheme);

  queryClient.setQueryData("getTerminologies", defaultTerminologies);
  queryClient.prefetchQuery("getTerminologies", getTerminologies);

  const notifications = useSelector(state => state.notifications);
  return (
    <QueryClientProvider client={queryClient}>
      <TerminologyContext.Provider value={{ terminologies }}>
        <UserContext.Provider value={{ login, loginDispatch }}>
          <Watchers />
          <div className="flex min-h-screen bg-steel-900 text-steel-100">
            <Sidebar />
            <Notifications notifications={notifications} />
            <div className="flex-1 flex flex-col">
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
      </TerminologyContext.Provider>
    </QueryClientProvider>
  );
};
