(function(window) {
  var svgSprite =
    '<svg><symbol id="icon-left" viewBox="0 0 1024 1024"><path d="M276.031 532.352l351.488-352.448h113.536l-354.816 352.448 360.768 352.512h-119.488z"  ></path></symbol><symbol id="icon-last" viewBox="0 0 1024 1024"><path d="M536.4 482.3L202.1 148l-47.4 47.4L470.3 511 152.6 828.6 200 876l336.3-336.3c16-15.9 16-41.6 0.1-57.4z"  ></path><path d="M859.5 482.3L525.2 148l-47.4 47.4L793.3 511 475.7 828.6l47.4 47.4 336.3-336.3c15.9-15.9 15.9-41.6 0.1-57.4z"  ></path></symbol><symbol id="icon-first" viewBox="0 0 1024 1024"><path d="M487.6 541.6999999999999L821.9000000000001 876l47.399999999999984-47.400000000000006L553.6999999999999 513 871.3999999999999 195.39999999999986 823.9999999999998 147.9999999999999l-336.3 336.3c-15.999999999999995 15.900000000000007-15.999999999999991 41.60000000000001-0.09999999999998366 57.4z"  ></path><path d="M164.5000000000001 541.7L498.8000000000001 876l47.399999999999984-47.400000000000006L230.70000000000005 513 548.2999999999998 195.39999999999998l-47.400000000000006-47.399999999999984-336.3 336.3c-15.899999999999991 15.900000000000006-15.899999999999991 41.60000000000001-0.09999999999998366 57.4z"  ></path></symbol><symbol id="icon-right" viewBox="0 0 1024 1024"><path d="M728.61198448 511.86640873l-37.66793772-37.69165197-0.1612575 0.15967702L333.05595324 116.57834949l-37.66793772 37.66793773 357.73078877 357.75371278L295.38801552 869.75687453l37.66793772 37.66398496 357.72683602-357.75292176 0.1612575 0.15967701 37.66793771-37.69560474-0.13359124-0.13280025L728.61198448 511.86640873zM728.61198448 511.86640873" fill="#333333" ></path></symbol><symbol id="icon-clock" viewBox="0 0 1024 1024"><path d="M512 62.5C263.7 62.5 62.5 263.7 62.5 512S263.7 961.5 512 961.5 961.5 760.3 961.5 512 760.3 62.5 512 62.5z m261.3 710.8c-34 34-73.5 60.6-117.5 79.2-45.5 19.2-93.9 29-143.8 29s-98.3-9.8-143.8-29c-44-18.6-83.5-45.3-117.5-79.2-34-34-60.6-73.5-79.2-117.5-19.2-45.5-29-93.9-29-143.8s9.8-98.3 29-143.8c18.6-44 45.3-83.5 79.2-117.5 34-34 73.5-60.6 117.5-79.2 45.5-19.2 93.9-29 143.8-29s98.3 9.8 143.8 29c44 18.6 83.5 45.3 117.5 79.2 34 34 60.6 73.5 79.2 117.5 19.2 45.5 29 93.9 29 143.8s-9.8 98.3-29 143.8c-18.6 44-45.3 83.5-79.2 117.5z"  ></path><path d="M728.4 629.4L546 497.1V288.7c0-20.7-16.8-37.5-37.5-37.5S471 268 471 288.7v246.6L684.4 690c6.7 4.8 14.4 7.1 22 7.1 11.6 0 23.1-5.4 30.4-15.5 12.1-16.6 8.4-40.1-8.4-52.2z"  ></path></symbol></svg>';
  var script = (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  var shouldInjectCss = script.getAttribute('data-injectcss');
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
        setTimeout(fn, 0);
      } else {
        var loadFn = function() {
          document.removeEventListener('DOMContentLoaded', loadFn, false);
          fn();
        };
        document.addEventListener('DOMContentLoaded', loadFn, false);
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn);
    }
    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        init = function() {
          if (!done) {
            done = true;
            fn();
          }
        };
      var polling = function() {
        try {
          d.documentElement.doScroll('left');
        } catch (e) {
          setTimeout(polling, 50);
          return;
        }
        init();
      };
      polling();
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null;
          init();
        }
      };
    }
  };
  var before = function(el, target) {
    target.parentNode.insertBefore(el, target);
  };
  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  };
  function appendSvg() {
    var div, svg;
    div = document.createElement('div');
    div.innerHTML = svgSprite;
    svgSprite = null;
    svg = div.getElementsByTagName('svg')[0];
    if (svg) {
      svg.setAttribute('aria-hidden', 'true');
      svg.style.position = 'absolute';
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = 'hidden';
      prepend(svg, document.body);
    }
  }
  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  ready(appendSvg);
})(window);
