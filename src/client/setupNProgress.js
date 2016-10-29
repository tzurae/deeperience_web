// refs:
// - <https://gist.github.com/jgatjens/a08126bbbadb2d6096cb>
// - <http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom>
export default () => {
  class ProgressBar {
    constructor() {
      this.ajaxRequestCount = 0
    }
    start() {
      this.ajaxRequestCount++
      if (this.ajaxRequestCount === 1) {
        NProgress.start()
      }
    }
    done() {
      this.ajaxRequestCount--
      if (this.ajaxRequestCount < 0) {
        this.ajaxRequestCount = 0
      }
      if (this.ajaxRequestCount === 0) {
        NProgress.done()
      }
    }
  }
  const progressBar = new ProgressBar()
  const oldOpen = XMLHttpRequest.prototype.open

  function onStateChange() {
    if (this.readyState === 1) {
      progressBar.start()
    } else if (this.readyState === 4) {
      progressBar.done()
    } else {
      // console.log('[xhr waiting]');
    }
  }

  XMLHttpRequest.prototype.open = function(...args) {
    this.addEventListener('readystatechange', onStateChange)
    oldOpen.apply(this, args)
  }

  const observeDOM = (function() {
    const MutationObserver = window.MutationObserver ||
                           window.WebKitMutationObserver
    const eventListenerSupported = window.addEventListener

    return function(obj, onStart, onDone) {
      const caller = function(ele) {
        if (ele.nodeName === 'SCRIPT') {
          onStart()
          ele.onload = function() {
            ele.onload = null
            onDone()
          }
        }
      }
      if (MutationObserver) {
        const obs = new MutationObserver((mutations, observer) => {
          const ele = mutations[0].addedNodes.length &&
                    mutations[0].addedNodes[0]
          caller(ele)
        })
        obs.observe(obj, { childList: true, subtree: true })
      } else if (eventListenerSupported) {
        obj.addEventListener('DOMNodeInserted', e => {
          caller(e.srcElement)
        }, false)
      }
    }
  }())

  observeDOM(document.head,
    () => {
      progressBar.start()
    },
    () => {
      progressBar.done()
    }
  )
}
