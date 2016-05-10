// below is for preventing webpack warning message
// ref: <https://github.com/webpack/webpack/issues/1781>@yurydelendik
if (typeof module !== 'undefined' && module.require) {
  if (typeof require.ensure === "undefined") {
    // ref: <https://github.com/webpack/webpack/issues/183>@snadn
    let proto = Object.getPrototypeOf(require);
    Object.defineProperties(proto, {
      ensure: {
        value: function ensure(modules, callback) {
          callback(this);
        },
        writable: false,
      },
      include: {
        value: function include() {},
        writable: false,
      },
    });
  }
}
