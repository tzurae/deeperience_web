// ref: <https://gist.github.com/jgatjens/a08126bbbadb2d6096cb>
export default () => {
  let oldOpen = XMLHttpRequest.prototype.open;

  function onStateChange() {
    if (this.readyState === 1) {
      NProgress.start();
    }
    if (this.readyState === 4) {
      if (this.status % 100 >= 4) {
        NProgress.fail();
      } else {
        NProgress.done();
      }
    }
  }

  XMLHttpRequest.prototype.open = function() {
    this.addEventListener('readystatechange', onStateChange);
    oldOpen.apply(this, arguments);
  };
};
