export default values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.price) {
    errors.price = 'Required'
  }

  return errors
}
