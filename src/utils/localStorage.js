export const addUserInfo = (data) => {
  const saveUser = localStorage.setItem("user", JSON.stringify(data));
  console.log(saveUser);
  return saveUser;
};
export const getUserInfo = () => {
  const tmp = localStorage.getItem("user");
  const user = tmp ? JSON.parse(tmp) : null;
  return user;
};

export const removeUserInfo = () => {
  localStorage.removeItem("user");
};
