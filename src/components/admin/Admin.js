import React from "react";

import PageHeader from "../app/PageHeader";
import Licences from "./Licences";

export default () => (
  <div className="p-5 lg:p-10 flex-grow pb-5">
    <PageHeader header="Admin Users" />
    <Licences />
  </div>
);
