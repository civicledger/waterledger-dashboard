import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { claimWaterAccountsForLicence, setCurrentWaterAccount } from '../../redux/actions/waterLicences';

import {serviceLoader} from '../../services/serviceLoader';

import WaterAccountsList from './WaterAccountsList';
import WaterAccountsSelect from './WaterAccountsSelect';
import Summary from './Summary';

class AccountBanner extends Component {

  state = {waterAccountId: '', waterAccounts: [], submitted: false, licence: null};
  licencesService = serviceLoader('Licences');

  handleSubmitLicence = async e => {
    e.preventDefault();
    const {licence} = await this.licencesService.apiGetLicenceByWaterAccountId(this.state.waterAccountId);
    this.setState({submitted: true, waterAccounts: licence.waterAccounts, licence, waterAccountId: ''});
  }

  handleClaimLicences = async e => {
    e.preventDefault();
    this.props.claimWaterAccountsForLicence(this.state.licence);
  }

  hasAccounts = () => <Fragment>
    <div className="hidden md:block">
      <div className="border bg-gray-500 p-2">Current Licences</div>
      <WaterAccountsList waterAccounts={this.props.waterAccounts}  />
    </div>
    <div className="md:hidden">
      <WaterAccountsSelect waterAccounts={this.props.waterAccounts}  />
    </div>
  </Fragment>

  noAccounts = () => {
    return <Fragment>
      { this.state.waterAccounts.length === 0 && <div>
          <h3 className="mb-3">No Accounts Found</h3>

          <p className="text-sm">Search for any of your water accounts to set up with WaterLedger</p>

          <form className="text-center">
            <input className="border rounded-sm mt-5 p-2" value={this.state.waterAccountId} onChange={e => this.setState({waterAccountId: e.target.value})} />
            <button className="bg-green-500 text-white p-2" onClick={this.handleSubmitLicence}>
              <i className="fal fa-search mr-2"></i>
              Find Water Accounts
            </button>
          </form>
          </div>
      }
      { this.state.waterAccounts.length > 0 && <div>

        <h3 className="mb-3">Licence Details Found</h3>

        <p className="text-sm mb-3">We have found the following water accounts. Claim these water accounts on your current computer.</p>

        { this.state.licence && <div className="border bg-gray-500 p-2">
          Your Water Accounts
        </div> }

        <WaterAccountsList waterAccounts={this.state.waterAccounts} />

        { this.state.waterAccounts.length > 0 && <div className="text-right">
          <button className="bg-green-500 text-green-100 p-3 mt-3" onClick={this.handleClaimLicences}>
            <i className="fal fa-check-circle mr-2"></i> Claim Water Accounts
          </button>
        </div> }

      </div>

      }

    </Fragment>
  }

  render() {
    const {ethContext, waterAccounts} = this.props;

    const panelContent = waterAccounts.length ? this.hasAccounts() : this.noAccounts();

    if (!ethContext.statusLoaded) {
      return '';
    }
    return <div className="flex flex-col">
      <div className="flex-1 mb-5 pb-5">
        {panelContent}
      </div>
      <div className="flex-1 md:ml-5">
        <Summary stats={this.props.stats}  />
      </div>
    </div>;
  }
}

const mapStateToProps = ({ ethContext, stats, licence, waterAccounts, activeWaterAccount }) => ({ ethContext, stats, licence, waterAccounts, activeWaterAccount });

export default connect(mapStateToProps, {claimWaterAccountsForLicence, setCurrentWaterAccount})(AccountBanner);