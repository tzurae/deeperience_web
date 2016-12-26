import users from './users'
import customize from './customize'
import forms from './forms'
import locales from './locales'
import trips from './trips'
import upload from './upload'
import posts from './posts'
import zoom from './zoom'
import sites from './sites'

export default ({ app }) => {
  app.use('/api/users', users)
  app.use('/api/customize', customize)
  app.use('/api/forms', forms)
  app.use('/api/locales', locales)
  app.use('/api/trips', trips)
  app.use('/api/upload', upload)
  app.use('/api/posts', posts)
  app.use('/api/zoom', zoom)
  app.use('/api/sites', sites)
}
