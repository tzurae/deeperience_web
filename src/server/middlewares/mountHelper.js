import { pushErrors } from '../../common/actions/errorActions';

export default (req, res, next) => {
  res.pushError = (error, meta) => {
    req.store.dispatch(pushErrors([{
      ...error,
      meta: {
        path: req.path,
        ...meta,
      },
    }]));
  };
  res.errors = (errors) => {
    req.store.dispatch(pushErrors(errors));
    res.json({
      errors: req.store.getState().errors.map((error) => {
        delete error.id;
        return {
          ...error,
          meta: {
            path: req.path,
            ...error.meta,
          },
        };
      }),
    });
  };

  next();
};
