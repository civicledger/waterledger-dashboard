import React, { Fragment, useContext } from "react";
import { TerminologyContext } from "../contexts";

const Translate = ({ token }) => {
  const {
    terminologyStore: [state],
    terminologyJson,
  } = useContext(TerminologyContext);

  const { selectedTerm, defaultTerm } = state;

  const translatedToken = terminologyJson[selectedTerm][token] || terminologyJson[defaultTerm][token];

  return <Fragment>{translatedToken}</Fragment>;
};

export default Translate;
