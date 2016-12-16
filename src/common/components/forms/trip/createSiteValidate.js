export default values => {
  const errors = {}

  if (!values.get('name')) {
    errors.name = 'Required'
  }

  if (!values.get('tags').length) {
    errors.tags = 'Required'
  }

  if (!values.get('introduction') || values.get('introduction') === '<p><br></p>') {
    errors.editor = 'Required'
  }

  return errors
}
