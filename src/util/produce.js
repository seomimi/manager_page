import { enableES5, produce } from "immer";
//eslint-disable-next-line
export default (...args) => {
  enableES5();
  return produce(...args);
};
