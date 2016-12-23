export default values => {
  const errors = {}

  if (!values.get('name')) {
    errors.name = 'Required'
  }

  if (!values.get('tags').length) {
    errors.tags = 'Required'
  }

  if (values.get('introduction') === '<p><br></p>') {
    errors.introduction = 'Required'
  }

  errors.mainSite = {}

  if (values.getIn(['mainSite', 'name']) === '') {
    errors.mainSite.name = 'Required'
  }

  if (values.getIn(['mainSite', 'googleInfo', 'name']) === '') {
    errors.mainSite.name = '請在地圖上選擇地點'
  }

  if (values.getIn(['mainSite', 'introduction']) === '<p><br></p>') {
    errors.mainSite.introduction = 'Required'
  }

  // what the hell, must be a plain array
  errors.subSites = values.get('subSites').map(value => ({
    introduction: value.get('introduction') === '<p><br></p>' ? 'Required' : null,
    name: !value.get('googleInfo') ? '請在地圖上選擇地點' : null,
  })).toJS()

  return errors
}
