import path from 'path';

export default ({ app }) => {
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/template/index.html'));
  });
};