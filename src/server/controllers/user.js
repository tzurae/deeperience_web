import { handleDbError } from '../decorators/handleError';
import User from '../models/User';
import filterAttribute from '../utils/filterAttribute';

export default {
  create(req, res) {
    User.findOne({
      'email.value': req.body.email,
    }, handleDbError(res)((user) => {
      if (user !== null) {
        res.json({
          isError: true,
          errors: [{
            name: 'Duplicate Email',
            message: 'Email is already used',
          }],
        });
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
            isError: false,
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
          isError: false,
          isAuth: false,
        });
      } else {
        user.auth(req.body.password, handleDbError(res)((isAuth) => {
          if (isAuth) {
            const token = user.toJwtToken();
            res.json({
              isError: false,
              isAuth: true,
              token: token,
              user: user,
            });
          } else {
            res.json({
              isError: false,
              isAuth: false,
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
    res.json({
      isError: false,
      user: req.user,
    });
  },

  update(req, res) {
    let user = filterAttribute(req.body, ['name', 'avatarURL']);
    User.update({ _id: req.user._id }, user, handleDbError(res)((raw) => {
      res.json({
        originAttributes: req.body,
        updatedAttributes: user,
        isError: false,
      });
    }));
  },

  uploadAvatar(req, res) {
    // use `req.file` to access the avatar file
    // and use `req.body` to access other fileds
    res.json({
      downloadURL: `/user/${req.user._id}/${req.file.filename}`,
      isError: false,
    });
  },
};
