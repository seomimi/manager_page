import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableList from "./TableList";
import ModalContainer from "./ModalContainer";
import { MODAL_REQUEST } from "../reducer/project";

function TableContainer() {
  const [modalOpen, setModalOpen] = useState(false);
  const { projectRequests, tapName, modalDone } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const tableTitleArr = [
    <input className="checkBox" type="checkbox" disabled />,
    "별표",
    "NO",
    "등급",
    "이름(닉네임)",
    "나이",
    "성별",
    "지역",
    "활동분야",
    "리뷰전략",
    "추천수",
    "투데이수",
    "취소율",
    "SNS계정",
    "내 브랜드 참여",
  ];

  const chosenDataList = projectRequests.filter((v) => v.isChosen === true);
  const notChosenDataList = projectRequests.filter((v) => v.isChosen !== true);
  const data = tapName === "tap1" ? notChosenDataList : chosenDataList;

  const openModal = useCallback(
    (e) => {
      dispatch({ type: MODAL_REQUEST, data: e.target.getAttribute("user_id") });
      setModalOpen((prev) => !prev);
    },
    [dispatch]
  );

  return (
    <div className="tableWrapper">
      <TableList cate="title" tableArr={tableTitleArr} />
      <div className="tableLists">
        {data.length !== 0 && (
          <>
            {data.map((v, i) => (
              <TableList
                key={`list_${i}`}
                cate={`list${i}_`}
                no={v.id}
                grade={v.grade}
                region={v.region}
                name={`${v.name}(${v.nickName})`}
                birth={v.yearOfBirth}
                category={v.category}
                message={v.message}
                recommend={v.recommend}
                today={v.today}
                cancelRate={v.cancelRate}
                brandRequestCounts={v.brandRequestCounts}
                isChosen={v.isChosen}
                snsUrl={v.snsUrl}
                tapName={tapName}
                openModal={openModal}
              />
            ))}
          </>
        )}
      </div>
      {modalOpen && modalDone ? <ModalContainer setModalOpen={setModalOpen} /> : ""}
    </div>
  );
}

export default TableContainer;
