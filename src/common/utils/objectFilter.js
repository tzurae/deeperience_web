// condition must be a function
// for-example: x => x > 1

export default (obj, condition) => {
  Object.assign(
    {},
    ...Object.keys(obj)
      .filter(key => condition(obj[key]))
      .map(key => ({ [key]: obj[key] }))
  )
}
