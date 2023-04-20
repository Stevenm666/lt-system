import React from "react";

import { useParams } from "react-router-dom";

import RemissionByIdComponent from "../common/ModuleRemission/RemissionById";

const RemissionById = () => {
  const { id } = useParams();
  return <RemissionByIdComponent id={id} />;
};

export default RemissionById;
