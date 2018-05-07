(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rollADie = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var table;
var initialized = false;

var initialize = function initialize(element) {
  if (!element) {
    table = document.createElement('div');
    table.id = 'dice-table';
    document.body.appendChild(table);
  } else {
    table = element;
  }
  initialized = true;
};

var played = false;

var rollADie = function rollADie(options) {
  var faces = 6;
  var n = options.n,
      callback = options.callback,
      element = options.element;

  if (!initialized) initialize(element);
  var result = [];

  var _loop = function _loop(i) {
    sound = document.getElementById('dice-sound');

    var face = Math.floor(Math.random() * 6) + 1;
    result.push(face);

    if (!played || sound.ended) {
      played = true;
      sound.play();
    } else {
      audio = document.createElement('audio');

      audio.src = sound.src;
      audio.volume = sound.volume;
      setTimeout(function () {
        audio.play();
      }, Math.random() * 500);
    }

    angle = {
      1: [90, 0],
      2: [0, 90],
      3: [180, 0],
      4: [0, 0],
      5: [0, -90],
      6: [-90, 0]
    }[face];
    outer = document.createElement('div');

    outer.className = 'dice-outer';
    outer.id = i + '-' + face;
    table.appendChild(outer);

    dice = document.createElement('div');

    dice.className = 'dice';
    dice.style.transform = 'rotateX(' + angle[0] + 'deg) rotateZ(' + angle[1] + 'deg)';
    outer.appendChild(dice);

    getFace = function getFace(pips) {
      var XMLNS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(XMLNS, 'svg');
      svg.setAttribute('class', 'dice-face');
      svg.setAttribute('width', 32);
      svg.setAttribute('height', 32);

      pips.map(function (pip) {
        var circle = document.createElementNS(XMLNS, 'circle');
        Object.keys(pip).forEach(function (key) {
          return circle.setAttribute(key, pip[key]);
        });
        return circle;
      }).forEach(function (circle) {
        return svg.appendChild(circle);
      });

      return svg;
    };

    [[{ cx: 16, cy: 16, r: 6, fill: 'red' }], [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }], [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }], [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }], [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }], [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 16, r: 3 }, { cx: 24, cy: 16, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }]].map(getFace).forEach(function (face) {
      return dice.appendChild(face);
    });
    setTimeout(function () {
      // outer.style.opacity = 0;;
      var removeElement = document.getElementById(i + '-' + face);
      removeElement.remove();
    }, 3 * 1000);
  };

  for (var i = 0; i < n; i++) {
    var sound;
    var audio;
    var angle;
    var outer;
    var dice;
    var getFace;

    _loop(i);
  }
  if (callback) {
    callback(result);
  }
};

module.exports = rollADie;

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9yb2xsLWEtZGllLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxLQUFKO0FBQ0EsSUFBSSxjQUFjLEtBQWxCOztBQUVBLElBQUksYUFBYSxTQUFiLFVBQWEsQ0FBVSxPQUFWLEVBQW1CO0FBQ2xDLE1BQUksQ0FBQyxPQUFMLEVBQWM7QUFDWixZQUFRLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFSO0FBQ0EsVUFBTSxFQUFOLEdBQVcsWUFBWDtBQUNBLGFBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBMUI7QUFDRCxHQUpELE1BSU87QUFDTCxZQUFRLE9BQVI7QUFDRDtBQUNELGdCQUFjLElBQWQ7QUFDRCxDQVREOztBQVdBLElBQUksU0FBUyxLQUFiOztBQUVBLElBQUksV0FBVyxTQUFYLFFBQVcsQ0FBVSxPQUFWLEVBQW1CO0FBQ2hDLE1BQU0sUUFBUSxDQUFkO0FBRGdDLE1BRXhCLENBRndCLEdBRUMsT0FGRCxDQUV4QixDQUZ3QjtBQUFBLE1BRXJCLFFBRnFCLEdBRUMsT0FGRCxDQUVyQixRQUZxQjtBQUFBLE1BRVgsT0FGVyxHQUVDLE9BRkQsQ0FFWCxPQUZXOztBQUdoQyxNQUFJLENBQUMsV0FBTCxFQUFrQixXQUFXLE9BQVg7QUFDbEIsTUFBTSxTQUFTLEVBQWY7O0FBSmdDLDZCQUt2QixDQUx1QjtBQU0xQixZQUFRLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQU5rQjs7QUFPOUIsUUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixDQUEzQixJQUFnQyxDQUE3QztBQUNBLFdBQU8sSUFBUCxDQUFZLElBQVo7O0FBRUEsUUFBSSxDQUFDLE1BQUQsSUFBVyxNQUFNLEtBQXJCLEVBQTRCO0FBQzFCLGVBQVMsSUFBVDtBQUNBLFlBQU0sSUFBTjtBQUNELEtBSEQsTUFHTztBQUNELGNBQVEsU0FBUyxhQUFULENB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U0FBZ0MsSUFBaEMsQ0FBdEI7QUFDQSxvQkFBYyxNQUFkO0FBQ0QsS0FKRCxFQUlHLElBQUksSUFKUDtBQWhFOEI7O0FBS2hDLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUFBLFFBQ3RCLEtBRHNCO0FBQUEsUUFTcEIsS0FUb0I7QUFBQSxRQWlCdEIsS0FqQnNCO0FBQUEsUUF5QnRCLEtBekJzQjtBQUFBLFFBOEJ0QixJQTlCc0I7QUFBQSxRQW1DdEIsT0FuQ3NCOztBQUFBLFVBQW5CLENBQW1CO0FBZ0UzQjtBQUNELE1BQUksUUFBSixFQUFjO0FBQ1osYUFBUyxNQUFUO0FBQ0Q7QUFDRixDQXpFRDs7QUEyRUEsT0FBTyxPQUFQLEdBQWlCLFFBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGFibGU7XG52YXIgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxudmFyIGluaXRpYWxpemUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhYmxlLmlkID0gJ2RpY2UtdGFibGUnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFibGUpO1xuICB9IGVsc2Uge1xuICAgIHRhYmxlID0gZWxlbWVudDtcbiAgfVxuICBpbml0aWFsaXplZCA9IHRydWU7XG59O1xuXG52YXIgcGxheWVkID0gZmFsc2U7XG5cbnZhciByb2xsQURpZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGNvbnN0IGZhY2VzID0gNjtcbiAgY29uc3QgeyBuLCBjYWxsYmFjaywgZWxlbWVudCB9ID0gb3B0aW9ucztcbiAgaWYgKCFpbml0aWFsaXplZCkgaW5pdGlhbGl6ZShlbGVtZW50KTtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgdmFyIHNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpY2Utc291bmQnKTtcbiAgICBjb25zdCBmYWNlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xuICAgIHJlc3VsdC5wdXNoKGZhY2UpO1xuXG4gICAgaWYgKCFwbGF5ZWQgfHwgc291bmQuZW5kZWQpIHtcbiAgICAgIHBsYXllZCA9IHRydWU7XG4gICAgICBzb3VuZC5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhdWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG4gICAgICBhdWRpby5zcmMgPSBzb3VuZC5zcmM7XG4gICAgICBhdWRpby52b2x1bWUgPSBzb3VuZC52b2x1bWU7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgfSwgTWF0aC5yYW5kb20oKSAqIDUwMCk7XG4gICAgfVxuXG4gICAgdmFyIGFuZ2xlID0ge1xuICAgICAgMTogWzkwLCAwXSxcbiAgICAgIDI6IFswLCA5MF0sXG4gICAgICAzOiBbMTgwLCAwXSxcbiAgICAgIDQ6IFswLCAwXSxcbiAgICAgIDU6IFswLCAtOTBdLFxuICAgICAgNjogWy05MCwgMF0sXG4gICAgfVtmYWNlXTtcbiAgICB2YXIgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBvdXRlci5jbGFzc05hbWUgPSAnZGljZS1vdXRlcic7XG4gICAgb3V0ZXIuaWQgPSBgJHtpfS0ke2ZhY2V9YDtcbiAgICB0YWJsZS5hcHBlbmRDaGlsZChvdXRlcik7XG5cbiAgICB2YXIgZGljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpY2UuY2xhc3NOYW1lID0gJ2RpY2UnO1xuICAgIGRpY2Uuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVgoJHthbmdsZVswXX1kZWcpIHJvdGF0ZVooJHthbmdsZVsxXX1kZWcpYDtcbiAgICBvdXRlci5hcHBlbmRDaGlsZChkaWNlKTtcblxuICAgIHZhciBnZXRGYWNlID0gZnVuY3Rpb24gKHBpcHMpIHtcbiAgICAgIGNvbnN0IFhNTE5TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgICAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhYTUxOUywgJ3N2ZycpO1xuICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGljZS1mYWNlJyk7XG4gICAgICBzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDMyKTtcbiAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMyKTtcblxuICAgICAgcGlwcy5tYXAoZnVuY3Rpb24gKHBpcCkge1xuICAgICAgICB2YXIgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFhNTE5TLCAnY2lyY2xlJyk7XG4gICAgICAgIE9iamVjdC5rZXlzKHBpcCkuZm9yRWFjaChrZXkgPT4gY2lyY2xlLnNldEF0dHJpYnV0ZShrZXksIHBpcFtrZXldKSk7XG4gICAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgICB9KS5mb3JFYWNoKGNpcmNsZSA9PiBzdmcuYXBwZW5kQ2hpbGQoY2lyY2xlKSk7XG5cbiAgICAgIHJldHVybiBzdmc7XG4gICAgfTtcblxuICAgIFtcbiAgICAgIFt7IGN4OiAxNiwgY3k6IDE2LCByOiA2LCBmaWxsOiAncmVkJyB9XSxcbiAgICAgIFt7IGN4OiA4LCBjeTogOCwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDI0LCByOiAzIH1dLFxuICAgICAgW3sgY3g6IDgsIGN5OiA4LCByOiAzIH0sIHsgY3g6IDE2LCBjeTogMTYsIHI6IDMgfSwgeyBjeDogMjQsIGN5OiAyNCwgcjogMyB9XSxcbiAgICAgIFt7IGN4OiA4LCBjeTogOCwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDI0LCByOiAzIH0sIHsgY3g6IDgsIGN5OiAyNCwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDgsIHI6IDMgfV0sXG4gICAgICBbeyBjeDogOCwgY3k6IDgsIHI6IDMgfSwgeyBjeDogMTYsIGN5OiAxNiwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDI0LCByOiAzIH0sIHsgY3g6IDgsIGN5OiAyNCwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDgsIHI6IDMgfV0sXG4gICAgICBbeyBjeDogOCwgY3k6IDgsIHI6IDMgfSwgeyBjeDogMjQsIGN5OiAyNCwgcjogMyB9LCB7IGN4OiA4LCBjeTogMTYsIHI6IDMgfSwgeyBjeDogMjQsIGN5OiAxNiwgcjogMyB9LCB7IGN4OiA4LCBjeTogMjQsIHI6IDMgfSwgeyBjeDogMjQsIGN5OiA4LCByOiAzIH1dLFxuICAgIF0ubWFwKGdldEZhY2UpLmZvckVhY2goZmFjZSA9PiBkaWNlLmFwcGVuZENoaWxkKGZhY2UpKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIG91dGVyLnN0eWxlLm9wYWNpdHkgPSAwOztcbiAgICAgIGNvbnN0IHJlbW92ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpfS0ke2ZhY2V9YCk7XG4gICAgICByZW1vdmVFbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sIDMgKiAxMDAwKTtcbiAgfVxuICBpZiAoY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvbGxBRGllO1xuIl19
