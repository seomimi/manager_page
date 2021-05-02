import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SELECT_APPLICANT_REQUEST, CANCEL_APPLICANT_REQUEST } from "../reducer/project";
import PopupContainer from "./PopupContainer";

function BtnContainer() {
  const [popopen, setPopopen] = useState(false);
  const dispatch = useDispatch();
  const { tapName } = useSelector((state) => state.project);
  const { projectRequests, checkedBoxIdx } = useSelector((state) => state.project);

  const onSubmit = useCallback(() => {
    if (checkedBoxIdx.length === 0) return alert("리뷰어를 선택해주세요.");
    setPopopen((prev) => !prev);

    for (let i = 0; i < checkedBoxIdx.length; i++) {
      const x = checkedBoxIdx[i];
      const userId = projectRequests[x - 1].id;
      dispatch({ type: SELECT_APPLICANT_REQUEST, data: userId });
    }
  }, [dispatch, checkedBoxIdx, projectRequests]);

  const onCancel = useCallback(() => {
    if (checkedBoxIdx.length === 0) return alert("취소 할 리뷰어를 선택해주세요.");
    const userId = checkedBoxIdx[0];
    setPopopen((prev) => !prev);
    dispatch({ type: CANCEL_APPLICANT_REQUEST, data: userId });
  }, [checkedBoxIdx, dispatch]);

  return (
    <>
      {tapName === "tap1" ? (
        <>
          {projectRequests.filter((v) => v.isChosen === true).length >= 3 ? (
            <div className="checkSelector">선정완료</div>
          ) : (
            <div className={`checkSelector ${checkedBoxIdx.length !== 0 ? "active" : ""}`} onClick={onSubmit}>
              {checkedBoxIdx.length !== 0 ? `${checkedBoxIdx.length}명` : " "} 선정하기
            </div>
          )}
        </>
      ) : (
        <div className={`checkSelector ${checkedBoxIdx.length !== 0 ? "active" : ""}`} onClick={onCancel}>
          선정취소
        </div>
      )}

      {popopen && <PopupContainer setPopopen={setPopopen} tapName={tapName} />}
    </>
  );
}

export default BtnContainer;
