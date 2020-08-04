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
  const allClasses = classNames("bg-steel-700 mb-10 rounded p-5 relative overflow-hidden account-banner", {
    "account-banner-visible": elementVisibility.showAccountBanner,
  });
  // useSelector();

  const [abWaterAccounts, setWaterAccounts] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [waSearched, setWaSearched] = useState(false);
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
    setPosition({ ...positions, waSearch: 1, waFound: 2, progress: 3 });
  };

  return (
    <div className={allClasses}>
      <Welcome position={positions.welcome} />
      <WaterAccountSearch getLicence={getLicence} error={searchError} disableForm={waSearched} position={positions.waSearch} />
      <WaterAccountsFound waterAccounts={abWaterAccounts} claimLicences={claimLicences} position={positions.waFound} />
      <Progress position={positions.progress} />
    </div>
  );
};

// class AccountBanner extends Component {
//   state = { waterAccountId: "", waterAccounts: [], submitted: false, licence: null };
//

//   handleSubmitLicence = async e => {
//     e.preventDefault();
//     const { licence } = await this.licencesService.apiGetLicenceByWaterAccountId(this.state.waterAccountId);
//     this.setState({ submitted: true, waterAccounts: licence.waterAccounts, licence, waterAccountId: "" });
//   };

//   handleClaimLicences = async e => {
//     e.preventDefault();
//     this.props.claimWaterAccountsForLicence(this.state.licence);
//   };

//   hasAccounts = () => (
//     <Fragment>
//       <div className="hidden md:block">
//         <div className="border bg-gray-500 p-2">Your Water Accounts</div>
//         <WaterAccountsList waterAccounts={this.props.waterAccounts} />
//       </div>
//       <div className="md:hidden">
//         <WaterAccountsSelect waterAccounts={this.props.waterAccounts} />
//       </div>
//     </Fragment>
//   );

//   noAccounts = () => {
//     return (
//       <Fragment>
//         {this.state.waterAccounts.length === 0 && (
//           <div>
//             <h3 className="mb-3">No Accounts Found</h3>

//             <p className="text-sm">Search for any of your water accounts to set up with Water Ledger</p>

//             <form className="text-center">
//               <input
//                 className="w-64 text-steel-900 mt-5 p-2 mr-5 rounded-sm"
//                 placeholder="Enter a Water Account Id"
//                 value={this.state.waterAccountId}
//                 onChange={e => this.setState({ waterAccountId: e.target.value })}
//               />
//               <button className="bg-sorange text-steel-100 p-2 px-3 rounded-sm" onClick={this.handleSubmitLicence}>
//                 <i className="fal fa-search mr-2"></i>
//                 Find Water Accounts
//               </button>
//             </form>
//           </div>
//         )}
//         {this.state.waterAccounts.length > 0 && (
//           <div>
//             <h3 className="mb-3">Licence Details Found</h3>

//             <p className="text-sm mb-3">We have found the following water accounts. Claim these water accounts on your current computer.</p>

//             <WaterAccountsList waterAccounts={this.state.waterAccounts} />

//             {this.state.waterAccounts.length > 0 && !this.props.accountProgress.claimSent && (
//               <div className="text-center">
//                 <input className="w-64 text-steel-900 mt-5 p-2 mr-5 rounded" placeholder="Enter provided security code" />
//                 <button className="bg-sorange text-steel-100 p-2 mt-3 rounded" onClick={this.handleClaimLicences}>
//                   <i className="fal fa-check-circle mr-2"></i> Claim Water Accounts
//                 </button>
//               </div>
//             )}

//             <AccountProgress waterAccounts={this.state.waterAccounts} />
//           </div>
//         )}
//       </Fragment>
//     );
//   };

//   render() {
//     const { waterAccounts, elementVisibility } = this.props;

//     const allClasses = classNames("flex flex-col md:flex-row bg-steel-700 mb-10 rounded p-10 account-banner", {
//       "account-banner-visible": elementVisibility.showAccountBanner,
//     });

//     const panelContent = waterAccounts.length ? this.hasAccounts() : this.noAccounts();

//     if (!elementVisibility.showAccountBanner) {
//       return "";
//     }

//     return (
//       <div className={allClasses}>
//         <div className="flex-auto w-1/6 text-center">
//           <i className="fal fa-exclamation-triangle text-sorange fa-3x mt-2"></i>
//         </div>
//         <div className="flex-auto w-2/6">
//           <p>
//             Hello! We are keen to get your water account set up in one easy step. Below you can search for your water account. Once entered, Water
//             Ledger will automatically confirm your details and give you access to your dashboard.
//           </p>
//         </div>
//         <div className="flex-auto w-1/2 ml-10">{panelContent}</div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ waterAccounts, activeWaterAccount, elementVisibility, accountProgress }) => ({
//   waterAccounts,
//   activeWaterAccount,
//   elementVisibility,
//   accountProgress,
// });

// export default connect(mapStateToProps, { claimWaterAccountsForLicence, setCurrentWaterAccount, receiveWaterAccounts })(AccountBanner);
