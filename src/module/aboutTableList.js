import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const checkActive = (tapName, limitCount, target) => {
  if (tapName === "tap1") {
    const activeBoxes = document.querySelectorAll(`.check_${tapName}.active`);
    if (activeBoxes.length === limitCount) {
      const checkBoxes = document.querySelectorAll(`.check_${tapName}`);
      const activeArr = Array.prototype.slice.call(activeBoxes);
      for (let i = 0; i < checkBoxes.length; i++) {
        if (activeArr.indexOf(checkBoxes[i]) === -1) checkBoxes[i].classList.add("disabled");
      }
    } else {
      const checkBoxes = document.querySelectorAll(`.check_${tapName}`);

      for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].classList.remove("disabled");
      }
    }
  } else {
    const checkBoxes = document.querySelectorAll(`.check_${tapName}`);
    const activeBoxes = document.querySelectorAll(`.check_${tapName}.active`);

    if (activeBoxes.length === 1) {
      for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i] !== target) checkBoxes[i].classList.add("disabled");
      }
    } else {
      const checkBoxes = document.querySelectorAll(`.check_${tapName}`);
      for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].classList.remove("disabled");
      }
    }
  }
};

//체크박스, 별표, NO(아이디), 등급, 이름(닉네임), 나이, 성별, 지역, 활동분야, 리뷰전략, 추천수, 투데이수, 취소율,SNS계정, 내브랜드참여
export const tableListTag = (checkedCnt, overtext, dropUpDown, tapName, onSnsBtn, onStar, starColor, rest) => {
  const arr = [
    <div className={`checkBox check_${tapName}`} onClick={checkedCnt} user_id={rest.no} id={`check_${rest.no}`}></div>,
    <FontAwesomeIcon icon={faStar} className={`starIcon ${starColor ? "active" : ""}`} onClick={onStar} />,
    rest.no,
    rest.grade === "a"
      ? "화이트"
      : rest.grade === "b"
      ? "실버"
      : rest.grade === "c"
      ? "골드"
      : rest.grade === "d"
      ? "다이아"
      : "블랙",
    rest.name,
    new Date().getFullYear() - rest.birth + 1,
    "여",
    rest.region,
    rest.category,
    <div className={`messageBox ${overtext ? "openText" : ""}`}>
      {rest.message &&
        (rest.message.length < 54 ? (
          <p>{rest.message}</p>
        ) : (
          <>
            <p onClick={dropUpDown} className={`overText ${overtext ? "openText" : ""}`}>
              {rest.message}
            </p>
            <span onClick={dropUpDown}>{overtext ? "▲" : "▼"}</span>
          </>
        ))}
    </div>,
    `${rest.recommend}회`,
    rest.today === 0
      ? "-"
      : rest.today.toString().length > 3
      ? rest.today.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : rest.today,
    `${rest.cancelRate}%`,
    <div className="snsBtn" onClick={onSnsBtn}>
      보기
    </div>,

    rest.brandRequestCounts === 0 ? (
      "-"
    ) : (
      <div className="myBrand" onClick={rest.openModal} user_id={rest.no}>
        {rest.brandRequestCounts}회
      </div>
    ),
  ];
  return arr;
};

export const tapReset = (tapName, name) => {
  document.getElementById(tapName).classList.remove("active");
  document.getElementById(name).classList.add("active");
};
