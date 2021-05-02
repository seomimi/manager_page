import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_TAP, RESET_CHECK_BOX } from "../reducer/project";
import { tapReset } from "../module/aboutTableList";

function PopupContainer({ setPopopen, tapName }) {
  const dispatch = useDispatch();
  const { checkedBoxIdx } = useSelector((state) => state.project);
  const changeTap = useCallback(() => {
    setPopopen((prev) => !prev);
    tapReset("tap1", "tap2");
    dispatch({ type: CHANGE_TAP, data: "tap2" });
  }, [setPopopen, dispatch]);

  const cancelOK = useCallback(() => {
    setPopopen((prev) => !prev);
    dispatch({ type: RESET_CHECK_BOX });
  }, [setPopopen, dispatch]);
  return (
    <div className="popWrapper">
      {tapName === "tap1" ? (
        <div className="popBox">
          <p>
            {checkedBoxIdx.length}명을 선정하셨습니다.
            <br /> 선정 목록은 <span style={{ color: "#0067ff" }}>선정 리뷰어 탭</span>
            에서 확인하실 수 있습니다.
          </p>
          <div className="popUpClose" onClick={changeTap}>
            확인
          </div>
        </div>
      ) : (
        <div className="popBox">
          <p>
            1명을 취소하셨습니다.
            <br /> 취소 목록은 <span style={{ color: "#0067ff" }}>선정 리뷰어 탭</span>
            에서 확인하실 수 있습니다.
          </p>
          <div className="popUpClose" onClick={cancelOK}>
            확인
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupContainer;
