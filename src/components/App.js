import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Sidebar, DashboardContainer, HistoryRouteContainer, Notifications, Modals } from './components';
import Licence from './licence/Licence';
import Admin from './admin/Admin';
import TopNav from './app/TopNav';

class App extends Component {

  async componentDidMount() {
    this.props.fetchEthContext();
    this.props.loadWalletForCurrentLicence();
    this.props.loadCurrentAuth();
    this.props.watchForMatchEvent();
    this.props.watchForNewOrders();
    this.props.fetchStatsLastTradePrice();
    this.props.fetchLicence();
    this.props.loadAdminLicences();
    this.props.watchForLicenceCompletion();
    this.props.watchForDeletion();
  }

  render() {
    return <div className="flex min-h-screen">
      <Sidebar />
      <Notifications notifications={this.props.notifications} />
      <div className="flex-grow flex flex-col" id="body">

        <TopNav />

        <Switch>
          <Route path="/" exact render={() => <DashboardContainer />}/>
          <Route path="/licence" component={Licence} />
          <Route path="/admin" component={Admin} />
          <Route path="/history" component={HistoryRouteContainer} />
          <Route path="/:address" render={ props => <DashboardContainer address={props.match.params.address}/>}/>
        </Switch>
      </div>
      <Modals />
    </div>
  }
}

export default App;