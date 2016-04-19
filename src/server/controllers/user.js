import User from '../models/User';

export default {
  create: (req, res) => {
    const user = User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user.save((err, user) => {
      res.json({
        user: user,
        isError: false,
      });
    });
  },
  login: (req, res) => {
    User.findOne({
      email: req.body.email,
    }, (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.',
        });
      } else {
        user.auth(req.body.password, (err, isAuth) => {
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
        });
      }
    });
  },
  logout: (req, res) => {
    req.logout();
    res.json({
      isError: false,
    });
  },
  show: (req, res) => {
    res.json(req.user);
  },
};