import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchLicences } from '../../redux/actions/auth';

import LicencesList from './LicencesList';

class Licences extends Component {

  async componentDidMount() {
    this.props.fetchLicences();
  }

  render() {
    const { licences } = this.props;

    return <Fragment>

      <p className="text-sm mb-5">Select a licence to act as that licence for demonstration purposes</p>

      <h3 className="mb-2 text-xl">Licences previously migrated</h3>

      <LicencesList licences={licences.filter(l => l.migrated)} />

      <h3 className="mb-2 text-xl">Licences that have not been migrated</h3>

      <LicencesList licences={licences.filter(l => !l.migrated)} unclaimed={true} />

    </Fragment>
  }
}

const mapStateToProps = ({ licences, auth }) => ({ licences, auth });

export default connect(mapStateToProps, { fetchLicences })(Licences);