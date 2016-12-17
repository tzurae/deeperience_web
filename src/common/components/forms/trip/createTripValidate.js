export default values => {
  const errors = {}

  if (!values.get('name')) {
    errors.name = 'Required'
  }
  if (!values.get('price')) {
    errors.price = 'Required'
  }
  if (values.getIn(['tags', 'length']) === 0) {
    errors.tags = 'Required at least one'
  }

  return errors
}
