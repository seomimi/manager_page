import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_PROJECT_REQUEST, LOAD_PROJECTLIST_REQUEST } from "../reducer/project";
import ContentsContainer from "../components/ContentsContainer";

function Project() {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch({ type: LOAD_PROJECT_REQUEST });
    dispatch({ type: LOAD_PROJECTLIST_REQUEST });
  }, [dispatch]);

  return (
    <div className="container">
      {project && (
        <header>
          <img src="./img/logo.png" alt="logo" id="logo" />
          <span className="title">모집 현황 보고서</span>
          <span className="projectNum">|&emsp;프로젝트 번호_{project.id}</span>
        </header>
      )}
      <section>
        <ContentsContainer />
      </section>
    </div>
  );
}

export default Project;
