import React, { useCallback, useEffect, useState } from "react";
import { CHECK_BOX_IDX } from "../reducer/project";
import { useDispatch, useSelector } from "react-redux";
import { checkActive, tableListTag } from "../module/aboutTableList";

function TableList({ cate, tapName, ...rest }) {
  const dispatch = useDispatch();
  const [overtext, setOvertext] = useState(false);
  const [starColor, setStarColor] = useState(false);
  const { projectRequests, loadProjectListDone } = useSelector((state) => state.project);

  const dropUpDown = useCallback(() => {
    setOvertext((prev) => !prev);
  }, []);
  const onSnsBtn = useCallback(() => {
    window.open(rest.snsUrl);
  }, [rest.snsUrl]);
  const checkedCnt = useCallback(
    (e) => {
      const limitCount = 3 - projectRequests.filter((v) => v.isChosen === true).length;
      dispatch({ type: CHECK_BOX_IDX, data: e.target.getAttribute("user_id") });
      if (e.target.classList.contains("active")) e.target.classList.remove("active");
      else e.target.classList.add("active");
      checkActive(tapName, limitCount, e.target);
    },
    [dispatch, projectRequests, tapName]
  );
  const onStar = useCallback((e) => {
    setStarColor((prev) => !prev);
  }, []);

  useEffect(() => {
    const checkBox = document.getElementById(`check_${rest.no}`);
    if (checkBox) checkBox.classList.remove("active");
    if (projectRequests.filter((v) => v.isChosen === true).length === 3 && tapName === "tap1") {
      checkBox.classList.add("disabled");
    }
    if (tapName === "tap2") checkBox.classList.remove("disabled");
    setStarColor(false);
    setOvertext(false);
  }, [rest.no, rest.isChosen, projectRequests, tapName]);

  const tableTitleArr = rest.tableArr;
  const tableListArr =
    cate !== "title" && tableListTag(checkedCnt, overtext, dropUpDown, tapName, onSnsBtn, onStar, starColor, rest);
  const tableArr = cate === "title" ? tableTitleArr : tableListArr;

  if (!loadProjectListDone) return false;
  return (
    <>
      <ul className={`tableCommon ${cate === "title" ? "tableTitle" : null}`}>
        {tableArr.map((v, i) => (
          <li key={`li_${cate}${i}`} className={`li_${i + 1}`}>
            {v}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TableList;
