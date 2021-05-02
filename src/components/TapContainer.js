import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_TAP } from "../reducer/project";
import { tapReset } from "../module/aboutTableList";

function TapContainer() {
  const { projectRequests, tapName } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const chosenDataList = projectRequests.filter((v) => v.isChosen === true);
  const notChosenDataList = projectRequests.filter((v) => v.isChosen !== true);
  const chosenCount = chosenDataList.length;
  const notChosenCount = notChosenDataList.length;

  const tapClick = useCallback(
    (e) => {
      const name = e.target.getAttribute("id");
      if (tapName === name) return false;
      tapReset(tapName, name);
      dispatch({ type: CHANGE_TAP, data: name });
    },
    [dispatch, tapName]
  );

  return (
    <ul className="tapWrapper">
      <li className="active" id="tap1" onClick={tapClick}>
        신청 리뷰어(
        {notChosenCount !== 0 ? notChosenCount : 0})
      </li>
      <li id="tap2" onClick={tapClick}>
        선정 리뷰어(
        {chosenCount !== 0 ? chosenCount : 0})
      </li>
    </ul>
  );
}

export default TapContainer;
