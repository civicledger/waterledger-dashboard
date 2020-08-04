import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { accountProgressAdditionCompleted } from "../../../redux/actions/actions";

export default ({ position }) => {
  const progress = useSelector(state => state.accountProgress);

  const dispatch = useDispatch();

  const positionClass = classNames("w-1/2 p-5 absolute ab-box", {
    "position-1": position === 1,
    "position-2": position === 2,
    "position-3": position === 3,
    "position-4": position === 4,
  });

  const firstIncomplete = progress.find(p => !p.complete && !p.inFlight);

  if (firstIncomplete) {
    new Promise(r => setTimeout(r, 5000)).then(() => {
      dispatch(accountProgressAdditionCompleted(firstIncomplete.id));
    });
  }

  return (
    <div className={positionClass}>
      <h3 className="pb-3 text-2xl text-sorange font-semibold">Your Account is now being set up</h3>
      <div className="block">
        <ul className="">
          {progress.map((p, index) => {
            const iconClass = classNames(" mr-2 fal fa-fw text-sorange", {
              "fa-circle-notch": !p.complete,
              "fa-spin": !p.complete,
              "fa-check-circle": p.complete,
            });

            return (
              <li key={index}>
                <i className={iconClass}></i>
                {p.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
