export default values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.introduce || values.introduce === '<p><br></p>') {
    errors.editor = 'Required'
  }

  return errors
}
