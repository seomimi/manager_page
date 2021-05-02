import React, { useCallback } from "react";
import "../Modal.scss";
import { faInstagram, faFontAwesomeAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { SELECT_APPLICANT_REQUEST, CANCEL_APPLICANT_REQUEST, CHANGE_TAP, RESET_CHECK_BOX } from "../reducer/project";
import { tapReset } from "../module/aboutTableList";

function ModalContainer({ setModalOpen }) {
  const { brandHistory, projectRequests, tapName } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const user = brandHistory && projectRequests.find((v) => v.id === brandHistory.userId);
  const reviewLink = useCallback((e) => {
    const getUrl = e.target.getAttribute("url");
    if (getUrl) window.open(getUrl);
  }, []);

  const modalClose = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, [setModalOpen]);

  const modalSubmit = useCallback(() => {
    if (projectRequests.filter((v) => v.isChosen === true).length >= 3) alert("이미 3명 선정하였습니다");
    else {
      tapReset("tap1", "tap2");
      dispatch({ type: SELECT_APPLICANT_REQUEST, data: user.id });
      dispatch({ type: CHANGE_TAP, data: "tap2" });
    }
    setModalOpen((prev) => !prev);
  }, [dispatch, projectRequests, user.id, setModalOpen]);

  const modalCancel = useCallback(() => {
    dispatch({ type: CANCEL_APPLICANT_REQUEST, data: user.id });
    if (tapName === "tap2") {
      dispatch({ type: RESET_CHECK_BOX });
      const checkBox = document.querySelectorAll(`.check_tap2`);

      for (let i = 0; i < checkBox.length; i++) {
        checkBox[i].classList.remove("disabled");
      }
    }
    setModalOpen((prev) => !prev);
  }, [dispatch, user.id, setModalOpen, tapName]);

  if (!user) return false;
  return (
    <div className="modalWrapper">
      <div className="popBox">
        <p className="modalTitle">
          {`${user.name}(${user.nickName})님`}
          <br />내 브랜드 참여 횟수
        </p>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "#202225" }}>{`총 ${brandHistory.list.length}회`}</p>
          <div className="brandTable">
            <ul>
              <li>프로젝트</li>
              <li>제출 리뷰</li>
            </ul>
            <>
              {brandHistory.list.map((v, i) => (
                <ul key={`brandList_${i}`}>
                  <li className="projectText">
                    <div style={{ width: "30px", height: "45px" }}>
                      <FontAwesomeIcon
                        icon={v.sns === "Instagram" ? faInstagram : faFontAwesomeAlt}
                        style={{
                          fontSize: "25px",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                    <div className={`listText ${v.title.length > 30 ? "line2" : ""}`}>{v.title}</div>
                  </li>
                  <li>
                    <div
                      className={`reviewBtn ${v.reviewUrl ? "active" : ""}`}
                      onClick={reviewLink}
                      url={v.reviewUrl}
                    >{`${v.reviewUrl ? "보기" : "미제출"}`}</div>
                  </li>
                </ul>
              ))}
            </>
          </div>

          {tapName === "tap1" ? (
            <div className="modalSubmit" onClick={modalSubmit}>
              선정하기
            </div>
          ) : (
            <div className="modalSubmit" onClick={modalCancel}>
              취소하기
            </div>
          )}
        </div>
        <div className="modalClose" onClick={modalClose}>
          X
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
