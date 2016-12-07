import Errors from '../../common/constants/Errors'
import { Map } from 'immutable'

export default {
  show(req, res) {
    try {
      // escape file path for security
      const locale = req.params.locale
        .replace(/\./g, '')
        .replace(/\//g, '')
        .toLowerCase()
      const messages = require(`../../common/i18n/${locale}`).default

      res.json({
        locale,
        messages,
      })
    } catch (e) {
      res.errors([Errors.LOCALE_NOT_SUPPORTED])
    }
  },
}
