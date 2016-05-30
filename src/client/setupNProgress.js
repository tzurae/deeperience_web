// refs:
// - <https://gist.github.com/jgatjens/a08126bbbadb2d6096cb>
// - <http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom>
export default () => {
  let oldOpen = XMLHttpRequest.prototype.open;

  function onStateChange() {
    if (this.readyState === 1) {
      NProgress.start();
    } else if (this.readyState === 4) {
      if (this.status % 100 >= 4) {
        NProgress.fail();
      } else {
        NProgress.done();
      }
    } else {
      NProgress.done();
    }
  }

  XMLHttpRequest.prototype.open = function() {
    this.addEventListener('readystatechange', onStateChange);
    oldOpen.apply(this, arguments);
  };

  let observeDOM = (function() {
    let MutationObserver = window.MutationObserver ||
                           window.WebKitMutationObserver;
    let eventListenerSupported = window.addEventListener;

    return function(obj, onStart, onDone) {
      let caller = function(ele) {
        if (ele.nodeName === 'SCRIPT') {
          onStart();
          ele.onload = function() {
            ele.onload = null;
            onDone();
          };
        }
      };
      if (MutationObserver) {
        let obs = new MutationObserver(function(mutations, observer) {
          let ele = mutations[0].addedNodes.length &&
                    mutations[0].addedNodes[0];
          caller(ele);
        });
        obs.observe(obj, { childList: true, subtree: true });
      } else if (eventListenerSupported) {
        obj.addEventListener('DOMNodeInserted', function(e) {
          caller(e.srcElement);
        }, false);
      }
    };
  })();

  observeDOM(document.head,
    function onStart() {
      NProgress.start();
    },
    function onDone() {
      NProgress.done();
    }
  );
};
