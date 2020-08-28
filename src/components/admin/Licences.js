import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { fetchLicences } from "../../redux/actions/auth";

import LicencesList from "./LicencesList";

export default () => {
  const dispatch = useDispatch();

  const licences = dispatch(fetchLicences());
  const migratedLicences = licences.filter(l => l.migrated);
  const unmigratedLicences = licences.filter(l => !l.migrated);

  return (
    <Fragment>
      <p className="text-sm mb-5">Select a licence to act as that licence for demonstration purposes</p>

      <h3 className="mb-2 text-xl">Licences previously migrated</h3>

      <LicencesList licences={migratedLicences} />

      <h3 className="mb-2 text-xl">Licences that have not been migrated</h3>

      <LicencesList licences={unmigratedLicences} unclaimed={true} />
    </Fragment>
  );
};
