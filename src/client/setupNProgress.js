export default () => {
  xhook.before(function(request) {
    NProgress.start();
  });
  xhook.after(function(request, response) {
    NProgress.done();
  });
};
