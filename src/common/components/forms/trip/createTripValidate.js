export default values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.price) {
    errors.price = 'Required'
  }
  if (values.tags.length === 0) {
    errors.tags = 'Required at least one'
  }

  return errors
}
