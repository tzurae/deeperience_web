export default Schema => {
  try {
    return Object
      .keys(Schema.tree)
      .filter(attr => {
        return attr !== 'id' &&
          attr !== '_id' &&
          attr !== 'updatedAt' &&
          attr !== 'createdAt'
      })
  } catch (err) {
    console.log('Extract schema error')
    return []
  }
}
