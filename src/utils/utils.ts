type Flag = "enableSuperUser";

export const getFeatureFlag = (flag: Flag) => {
  return window.location.search.includes(flag);
};
