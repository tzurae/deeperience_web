export default (req, res, next) => {
  res.SSRState = {};
  res.setSSRState = (newState) => {
    Object.assign(res.SSRState, newState);
  };
  next();
};