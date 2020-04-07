import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Sidebar, DashboardContainer, HistoryRouteContainer, Notifications, Modals } from './components';
import Licence from './licence/Licence';

class App extends Component {

  async componentDidMount() {
    this.props.fetchEthContext();
    this.props.loadWalletForCurrentLicence();
    this.props.watchForMatchEvent();
    this.props.watchForNewOrders();
    this.props.fetchStatsLastTradePrice();
    this.props.fetchLicence();
  }

  render() {
    return <div className="flex min-h-screen">
      <Sidebar />
      <Notifications notifications={this.props.notifications} />
      <div className="flex-grow flex flex-col" id="body">
        <Switch>
          <Route path="/" exact render={() => <DashboardContainer />}/>
          <Route path="/licence" component={Licence} />
          <Route path="/history" component={HistoryRouteContainer} />
          <Route path="/:address" render={ props => <DashboardContainer address={props.match.params.address}/>}/>
        </Switch>
      </div>
      <Modals />
    </div>
  }
}

export default App;