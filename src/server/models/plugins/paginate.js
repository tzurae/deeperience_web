/*
 * refs:
 *   - plugin: <http://mongoosejs.com/docs/plugins.html>
 *   - pagination: <http://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js>
 *
 * example usage:
 *   ```
 *   import paginatePlugin from './plugins/paginate';
 *   YourSchema.plugin(paginatePlugin);
 *   ```
 *
 *   ```
 *   someListController(req, res) {
 *     YourSchema.paginate({page: req.query.page}, (err, page) => {
 *       YourSchema
 *         .find({})
 *         .limit(page.limit)
 *         .skip(page.skip)
 *         .exec((err, yourEntries) => {
 *           res.json({
 *             yourEntries: yourEntries,
 *             page: page,
 *           });
 *         });
 *     });
 *   }
 *   ```
 */

export default (schema, options) => {
  schema.statics.paginate = function paginate(customOpts, cb) {
    let opts = {};
    opts.condition = customOpts.condition         || {};
    opts.perPage = Number(customOpts.perPage)     || 20;
    opts.firstPage = Number(customOpts.firstPage) || 1;
    opts.page = Number(customOpts.page)           || 1;

    this
      .count(opts.condition)
      .exec((err, count) => {
        let totalPage = Math.ceil(count / opts.perPage);
        let lastPage = opts.firstPage + totalPage - 1;

        if (opts.page < opts.firstPage) {
          opts.page = opts.firstPage;
        } else if (lastPage < opts.page) {
          opts.page = lastPage;
        }

        cb(err, {
          skip: opts.perPage * (opts.page - opts.firstPage),
          limit: opts.perPage,
          first: opts.firstPage,
          current: opts.page,
          last: lastPage,
          total: totalPage,
        });
      });
  };
};
