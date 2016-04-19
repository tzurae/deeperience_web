import path from 'path';
import userRoutes from './user';

export default ({ app }) => {
  userRoutes({ app });
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/template/index.html'));
  });
};