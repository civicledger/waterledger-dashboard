import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./app/Sidebar";
import DashboardContainer from "./dashboard/DashboardContainer";
import HistoryRouteContainer from "./history/HistoryRouteContainer";
import Notifications from "./dashboard/Notifications";
import Modals from "./app/Modals";

import Liabilities from "./liabilities/Liabilities";
import Licence from "./licence/Licence";
import Admin from "./admin/Admin";
import TopNav from "./app/TopNav";

class App extends Component {
  async componentDidMount() {
    this.props.fetchEthContext();
    this.props.loadWalletForCurrentLicence();
    this.props.loadCurrentAuth();
    this.props.watchForMatchEvent();
    this.props.watchForNewOrders();
    this.props.fetchLastTradePrice();
    this.props.fetchSchemeName();
    this.props.fetchSchemeAddress();
    this.props.fetchLicence();
    this.props.loadAdminLicences();
    this.props.watchForLicenceCompletion();
    this.props.watchForDeletion();
  }

  render() {
    return (
      <div className="flex min-h-screen bg-steel-900 text-steel-100">
        <Sidebar />
        <Notifications notifications={this.props.notifications} />
        <div className="flex-grow flex flex-col" id="body">
          <TopNav />

          <Switch>
            <Route path="/" exact render={() => <DashboardContainer />} />
            <Route path="/licence" component={Licence} />
            <Route path="/admin" component={Admin} />
            <Route path="/history" component={HistoryRouteContainer} />
            <Route path="/liabilities" component={Liabilities} />
            <Route path="/:address" render={props => <DashboardContainer address={props.match.params.address} />} />
          </Switch>
        </div>
        <Modals />
      </div>
    );
  }
}

export default App;
