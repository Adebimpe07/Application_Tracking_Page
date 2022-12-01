import createStore from "teaful";
export const { useStore, getStore, withStore } = createStore({
  applicant: null,
  course: "",
});
