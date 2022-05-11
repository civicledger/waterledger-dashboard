import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import { userReducer, UserContext } from "./contexts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

import Liabilities from "./liabilities/Liabilities";
import Licence from "./licence/Licence";
import TopNav from "./app/TopNav";

import { QueryClientProvider } from "react-query";
import { getScheme, queryClient, getTerminologies } from "./queries";
import { defaultTerminologies } from "../utils/terminologies";

export default props => {
  const [login, loginDispatch] = useReducer(userReducer, UserService.getLoggedInUser());

  queryClient.prefetchQuery("getScheme", getScheme);
  queryClient.setQueryData("getTerminologies", defaultTerminologies);
  queryClient.prefetchQuery("getTerminologies", getTerminologies);

  const notifications = useSelector(state => state.notifications);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ login, loginDispatch }}>
        <Watchers />
        <div className="flex min-h-screen bg-steel-900 text-steel-100">
          <Sidebar />
          <Notifications notifications={notifications} />
          <div className="flex-1 flex flex-col">
            <TopNav />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/licence" element={<Licence />} />
              <Route path="/history" element={<History />} />
              <Route path="/liabilities" element={<Liabilities />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
          <Modals />
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
