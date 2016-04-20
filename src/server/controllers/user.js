import { handleDbError } from '../decorators/handleError';
import User from '../models/User';

export default {
  create(req, res) {
    const user = User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user.save(handleDbError(res)((user) => {
      res.json({
        user: user,
        isError: false,
      });
    }));
  },

  login(req, res) {
    User.findOne({
      email: req.body.email,
    }, handleDbError(res)((user) => {
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.',
        });
      } else {
        user.auth(req.body.password, handleDbError(res)((isAuth) => {
          if (isAuth) {
            const token = user.toJwtToken();
            res.json({
              success: true,
              token: 'JWT ' + token,
            });
          } else {
            res.json({
              success: false,
              message: 'Authentication failed. Passwords did not match.',
            });
          }
        }));
      }
    }));
  },

  logout(req, res) {
    req.logout();
    res.json({
      isError: false,
    });
  },

  show(req, res) {
    res.json(req.user);
  },
};