// error types
const ErrorTypes = {
  DB: 'Db',
};

const handleError = (res, errorType) => (fn) => (err, ...result) => {
  if (err) {
    let errorResponse = {
      isError: true,
      status: 400,
      errors: [],
    };
    if (errorType === ErrorTypes.DB) {
      if (err.errors !== undefined) {
        errorResponse.errors.push({
          name: err.name,
          message: err.message,
          errors: err.errors,
        });
      } else {
        errorResponse.errors.push(err);
      }
    } else {
      errorResponse.errors.push({
        name: 'Unknown',
        message: 'unknown exception',
      });
    }
    return res.json(errorResponse);
  }
  fn(...result);
};

const handleDbError = (res) => handleError(res, ErrorTypes.DB);

export default handleDbError;
export { ErrorTypes, handleDbError };
