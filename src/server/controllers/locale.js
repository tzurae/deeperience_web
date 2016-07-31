export default {
  show(req, res) {
    try {
      // escape file path for security
      const locale = req.params.locale
        .replace(/\./g, '')
        .replace(/\//g, '')
        .toLowerCase();
      const messages = require(`../../common/i18n/${locale}`).default;

      res.json({
        locale,
        messages,
        isError: false,
      });
    } catch (e) {
      res.json({
        errors: [{
          name: 'Locale is not supported',
          message: 'Locale is not supported',
        }],
        status: 400,
        isError: true,
      });
    }
  },
};
