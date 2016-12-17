import ssrFetchStateController from '../controllers/ssrFetchState'

export default ({ app }) => {
  app.use('/*', ssrFetchStateController.user, ssrFetchStateController.intl)
}
