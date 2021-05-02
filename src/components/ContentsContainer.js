import React from "react";
import "../loading.scss";
import "../Table.scss";
import { useSelector } from "react-redux";
import BtnContainer from "./BtnContainer";
import TapContainer from "./TapContainer";
import TableContainer from "./TableContainer";

function ContentsContainer() {
  const { loadProjectListLoading } = useSelector((state) => state.project);

  if (loadProjectListLoading)
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-text">loading</div>
      </div>
    );
  return (
    <div className="contents">
      <TapContainer />
      <TableContainer />
      <BtnContainer />
    </div>
  );
}

export default ContentsContainer;
