import Errors from '../../common/constants/Errors';
import { handleDbError } from '../decorators/handleError';
import User from '../models/User';
import filterAttribute from '../utils/filterAttribute';
import { loginUser } from '../../common/actions/userActions';
import { redirect } from '../../common/actions/routeActions';

export default {
  list(req, res) {
    User.paginate({ page: req.query.page }, handleDbError(res)((page) => {
      User
        .find({})
        .sort({ createdAt: 'desc' })
        .limit(page.limit)
        .skip(page.skip)
        .exec(handleDbError(res)((users) => {
          res.json({
            users: users,
            page: page,
          });
        }));
    }));
  },

  create(req, res) {
    User.findOne({
      'email.value': req.body.email,
    }, handleDbError(res)((user) => {
      if (user) {
        res.errors([Errors.USER_EXISTED]);
      } else {
        const user = User({
          name: req.body.name,
          email: {
            value: req.body.email,
          },
          password: req.body.password,
        });
        user.save(handleDbError(res)((user) => {
          res.json({
            user: user,
          });
        }));
      }
    }));
  },

  login(req, res) {
    User.findOne({
      'email.value': req.body.email,
    }, handleDbError(res)((user) => {
      if (!user) {
        res.json({
          isAuth: false,
        });
      } else {
        user.auth(req.body.password, handleDbError(res)((isAuth) => {
          if (isAuth) {
            const token = user.toAuthenticationToken();
            user.lastLoggedInAt = new Date();
            user.save(handleDbError(res)((user) => {
              res.json({
                isAuth: true,
                token: token,
                user: user,
              });
            }));
          } else {
            res.json({
              isAuth: false,
            });
          }
        }));
      }
    }));
  },

  socialLogin(req, res, next) {
    let { user } = req;
    if (!user) {
      return next();
    }
    let token = user.toAuthenticationToken();

    user.lastLoggedInAt = new Date();
    user.save(handleDbError(res)(() => {
      req.store
        .dispatch(loginUser({
          token: token,
          data: user,
        }))
        .then(() => {
          let { token, user } = req.store.getState().cookies;
          let state = JSON.parse(req.query.state);

          res.cookie('token', token);
          res.cookie('user', user);
          req.store.dispatch(redirect(state.next || '/'));
          return next();
        });
    }));
  },

  logout(req, res) {
    req.logout();
    res.json({});
  },

  show(req, res) {
    res.json({
      user: req.user,
    });
  },

  update(req, res) {
    let user = filterAttribute(req.body, ['name', 'avatarURL']);
    User.update({ _id: req.user._id }, user, handleDbError(res)((raw) => {
      res.json({
        originAttributes: req.body,
        updatedAttributes: user,
      });
    }));
  },

  uploadAvatar(req, res) {
    // use `req.file` to access the avatar file
    // and use `req.body` to access other fileds
    res.json({
      downloadURL: `/users/${req.user._id}/${req.file.filename}`,
    });
  },
};
