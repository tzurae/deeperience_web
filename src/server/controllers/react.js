import path from 'path';

export default {
  render(req, res) {
    res.sendFile(path.join(__dirname, '../../public/template/index.html'));
  },
};