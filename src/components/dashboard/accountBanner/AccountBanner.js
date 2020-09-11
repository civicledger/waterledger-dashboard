import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import Welcome from "./Welcome";
import WaterAccountSearch from "./WaterAccountSearch";
import WaterAccountsFound from "./WaterAccountsFound";
import Progress from "./Progress";
import { claimWaterAccountsForLicence } from "../../../redux/actions/waterLicences";

import { serviceLoader } from "../../../services/serviceLoader";
const licencesService = serviceLoader("Licences");

export default () => {
  const elementVisibility = useSelector(state => state.elementVisibility);
  const dispatch = useDispatch();
  const allClasses = classNames("bg-steel-700 mb-10 rounded p-5 relative overflow-hidden account-banner hidden lg:block", {
    "account-banner-visible": elementVisibility.showAccountBanner,
  });

  const [abWaterAccounts, setWaterAccounts] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [waSearched, setWaSearched] = useState(false);
  const [waClaimed, setWaClaimed] = useState(false);
  const [positions, setPosition] = useState({ welcome: 2, waSearch: 3, waFound: 4, progress: 4 });
  const [licence, setLicence] = useState(null);

  const getLicence = async id => {
    const { licence } = await licencesService.apiGetLicenceByWaterAccountId(id);

    if (!licence) {
      setSearchError("No matching water accounts found. Are you sure this is a valid Water Account ID?");
      return;
    }

    if (licence.migrated) {
      setSearchError("This water account exists, but it has already been used on a different machine. It is not yet possible to use it twice.");
      return;
    }

    setSearchError("");
    setWaSearched(true);
    setPosition({ ...positions, welcome: 1, waSearch: 2, waFound: 3 });
    setWaterAccounts(licence.waterAccounts);
    setLicence(licence);
  };

  const claimLicences = () => {
    dispatch(claimWaterAccountsForLicence(licence));
    setWaClaimed(true);
    setPosition({ ...positions, waSearch: 1, waFound: 2, progress: 3 });
  };

  return (
    <div className={allClasses}>
      <Welcome position={positions.welcome} />
      <WaterAccountSearch getLicence={getLicence} error={searchError} disableForm={waSearched} position={positions.waSearch} />
      <WaterAccountsFound waterAccounts={abWaterAccounts} disableForm={waClaimed} claimLicences={claimLicences} position={positions.waFound} />
      <Progress position={positions.progress} />
    </div>
  );
};
