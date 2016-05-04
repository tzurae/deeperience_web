import reactController from '../controllers/react';

export default ({ app }) => {
  app.get('/*', reactController.render);
};