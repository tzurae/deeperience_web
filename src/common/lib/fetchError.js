export const fetchErrorCode = errors => {
  if (Object.prototype.toString.call(errors) !== '[object Array]') return []

  return errors.map(({ errorMessage: { code } }) => code)
}
