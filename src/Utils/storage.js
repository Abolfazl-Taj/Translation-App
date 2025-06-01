export const loadData = () => {
  const json = localStorage.getItem("keywords");
  return json ? JSON.parse(json) : null;
};
export const saveData = (data) => {
  localStorage.setItem("keywords", JSON.stringify(data));
};
