/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.2.4
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var warn = noop;
var tip = noop;
var formatComponentName;

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'function' && vm.options
      ? vm.options.name
      : vm._isVue
        ? vm.$options.name || vm.$options._componentTag
        : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === "<Anonymous>") {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = target.__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return
  }
  var ob = target.__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    {
      warn(("Error in " + info + ":"), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // call updated hooks
  index = queue.length;
  while (index--) {
    watcher = queue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "development" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    if (!vnode.componentInstance._isMounted) {
      vnode.componentInstance._isMounted = true;
      callHook(vnode.componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      activateChildComponent(vnode.componentInstance, true /* direct */);
    }
  },

  destroy: function destroy (vnode) {
    if (!vnode.componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        vnode.componentInstance.$destroy();
      } else {
        deactivateChildComponent(vnode.componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && attrs.hasOwnProperty(keyInLowerCase)
        ) {
          warn(
            "Prop \"" + keyInLowerCase + "\" is not declared in component " +
            (formatComponentName(Ctor)) + ". Note that HTML attributes are " +
            "case-insensitive and camelCased props need to use their kebab-case " +
            "equivalents when using in-DOM templates. You should probably use " +
            "\"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var inject = vm.$options.inject;
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          vm[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      mark('vue-perf-init');
    }

    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark('vue-perf-init-end');
      measure(((vm._name) + " init"), 'vue-perf-init', 'vue-perf-init-end');
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    for (var i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (pattern instanceof RegExp) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.2.4';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks[i]] !== undefined) { cbs[hooks[i]].push(modules[j][hooks[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important
) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + value + "=$$c}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (!fn) { return false }
  var invokerFns = fn.fns;
  if (invokerFns) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
      config.productionTip !== false &&
      inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
            (i > pos || !tagName) &&
            options.warn) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    "development" !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}]"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var keywordMatch = exp.replace(stripStringRE, '').match(unaryOperatorsRE);
  if (keywordMatch) {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20).Buffer))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(0)):"function"==typeof define&&define.amd?define(["vue"],t):"object"==typeof exports?exports.MuseUI=t(require("vue")):e.MuseUI=t(e.Vue)}(this,function(e){return function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return e[i].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}var o=n(64),r=a(o),s=n(36),l=a(s);n(270);var u=n(53),c=a(u),d=n(1),f=n(2),h=a(f),p=n(89),m=a(p),v=n(85),y=a(v),b=n(23),g=a(b),_=n(22),x=a(_),C=n(111),w=a(C),S=n(100),k=a(S),O=n(95),M=a(O),$=n(106),F=i($),j=n(116),P=a(j),T=n(97),R=a(T),D=n(112),E=a(D),A=n(104),B=a(A),I=n(88),L=a(I),z=n(119),N=i(z),H=n(60),W=a(H),V=n(90),Y=i(V),K=n(92),G=i(K),Z=n(93),X=a(Z),U=n(76),q=a(U),J=n(32),Q=a(J),ee=n(121),te=a(ee),ne=n(114),ie=a(ne),ae=n(109),oe=a(ae),re=n(26),se=i(re),le=n(91),ue=a(le),ce=n(7),de=a(ce),fe=n(103),he=a(fe),pe=n(56),me=a(pe),ve=n(98),ye=a(ve),be=n(108),ge=a(be),_e=n(34),xe=a(_e),Ce=n(13),we=a(Ce),Se=n(61),ke=a(Se),Oe=n(54),Me=a(Oe),$e=n(110),Fe=a($e),je=n(117),Pe=a(je),Te=n(113),Re=a(Te),De=n(105),Ee=a(De),Ae=n(94),Be=a(Ae),Ie=n(102),Le=i(Ie),ze=n(118),Ne=i(ze),He=n(96),We=a(He),Ve=n(120),Ye=a(Ve),Ke=n(115),Ge=i(Ke),Ze=n(87),Xe=a(Ze),Ue=n(107),qe=a(Ue),Je=n(101),Qe=i(Je),et=n(99),tt=i(et),nt=n(55),it=a(nt),at=(0,l["default"])({icon:h["default"],badge:m["default"],appBar:y["default"],iconButton:g["default"],flatButton:x["default"],raisedButton:w["default"],floatButton:k["default"],contentBlock:M["default"]},F,{subHeader:P["default"],divider:R["default"],refreshControl:E["default"],infiniteScroll:B["default"],avatar:L["default"]},N,{paper:W["default"]},Y,G,{chip:X["default"],overlay:q["default"],dialog:Q["default"],toast:te["default"],snackbar:ie["default"],popup:oe["default"]},se,{bottomSheet:ue["default"],popover:de["default"],iconMenu:he["default"],dropDownMenu:me["default"],drawer:ye["default"],picker:ge["default"],tooltip:xe["default"],textField:we["default"],selectField:ke["default"],checkbox:Me["default"],radio:Fe["default"],_switch:Pe["default"],slider:Re["default"],linearProgress:Ee["default"],circularProgress:Be["default"]},Le,Ne,{datePicker:We["default"],timePicker:Ye["default"]},Ge,{autoComplete:Xe["default"]},Qe,tt,{pagination:qe["default"]}),ot=function(){(0,r["default"])(at).forEach(function(e){c["default"].component(at[e].name,at[e])}),(0,d.retina)()};"undefined"!=typeof window&&window.Vue&&ot(window.Vue),e.exports=(0,l["default"])({},at,{config:it["default"],install:ot})},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}function o(e){return void 0!==e&&null!==e}function r(e){return void 0===e||null===e}function s(e){for(var t=1,n=arguments.length;t<n;t++){var i=arguments[t];for(var a in i)if(i.hasOwnProperty(a)){var o=i[a];void 0!==o&&(e[a]=o)}}return e}function l(e){var t=String(e);return t&&t.indexOf("%")===-1&&t.indexOf("px")===-1&&(t+="px"),t}function u(){for(var e=navigator.userAgent,t=["Android","iPhone","Windows Phone","iPad","iPod"],n=!0,i=0;i<t.length;i++)if(e.indexOf(t[i])>0){n=!1;break}return n}function c(){if(!u()){var e=[],t=window.devicePixelRatio||1;e.push("pixel-ratio-"+Math.floor(t)),t>=2&&e.push("retina");var n=document.getElementsByTagName("html")[0];e.forEach(function(e){return n.classList.add(e)})}}function d(e){var t=[];if(!e)return t;if(e instanceof Array)t=t.concat(e);else if(e instanceof Object)for(var n in e)e[n]&&t.push(n);else t=t.concat(e.split(" "));return t}Object.defineProperty(t,"__esModule",{value:!0}),t.getColor=void 0;var f=n(64),h=a(f);t.isNotNull=o,t.isNull=r,t.merge=s,t.getWidth=l,t.isPc=u,t.retina=c,t.convertClass=d;var p=n(122),m=i(p),v=(0,h["default"])(m);t.getColor=function(e){return e?v.indexOf(e)!==-1?m[e]:e:""}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(402);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(){m||(window.addEventListener("keydown",function(e){p="tab"===(0,c["default"])(e)}),m=!0)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(31),r=i(o),s=n(75),l=i(s),u=n(12),c=i(u),d=n(1),f=n(55),h=i(f),p=!1,m=!1;t["default"]={props:{href:{type:String,"default":""},disabled:{type:Boolean,"default":!1},disableFocusRipple:{type:Boolean,"default":!1},disableKeyboardFocus:{type:Boolean,"default":!1},disableTouchRipple:{type:Boolean,"default":!1},rippleColor:{type:String,"default":""},rippleOpacity:{type:Number},centerRipple:{type:Boolean,"default":!0},wrapperClass:{type:String,"default":""},wrapperStyle:{type:[String,Object]},containerElement:{type:String},tabIndex:{type:Number,"default":0},type:{type:String,"default":"button"},keyboardFocused:{type:Boolean,"default":!1}},data:function(){return{hover:!1,isKeyboardFocused:!1}},computed:{buttonClass:function(){var e=[];return this.disabled&&e.push("disabled"),this.disabled||!this.hover&&!this.isKeyboardFocused||e.push("hover"),e.join(" ")}},beforeMount:function(){var e=this.disabled,t=this.disableKeyboardFocus,n=this.keyboardFocused;e||!n||t||(this.isKeyboardFocused=!0)},mounted:function(){a(),this.isKeyboardFocused&&(this.$el.focus(),this.$emit("keyboardFocus",!0))},beforeUpdate:function(){(this.disabled||this.disableKeyboardFocus)&&this.isKeyboardFocused&&(this.isKeyboardFocused=!1,this.$emit("keyboardFocus",!1))},beforeDestory:function(){this.cancelFocusTimeout()},methods:{handleHover:function(e){!this.disabled&&(0,d.isPc)()&&(this.hover=!0,this.$emit("hover",e))},handleOut:function(e){!this.disabled&&(0,d.isPc)()&&(this.hover=!1,this.$emit("hoverExit",e))},removeKeyboardFocus:function(e){this.isKeyboardFocused&&(this.isKeyboardFocused=!1,this.$emit("KeyboardFocus",!1))},setKeyboardFocus:function(e){this.isKeyboardFocused||(this.isKeyboardFocused=!0,this.$emit("KeyboardFocus",!0))},cancelFocusTimeout:function(){this.focusTimeout&&(clearTimeout(this.focusTimeout),this.focusTimeout=null)},handleKeydown:function(e){this.disabled||this.disableKeyboardFocus||("enter"===(0,c["default"])(e)&&this.isKeyboardFocused&&this.$el.click(),"esc"===(0,c["default"])(e)&&this.isKeyboardFocused&&this.removeKeyboardFocus(e))},handleKeyup:function(e){this.disabled||this.disableKeyboardFocus||"space"===(0,c["default"])(e)&&this.isKeyboardFocused},handleFocus:function(e){var t=this;this.disabled||this.disableKeyboardFocus||(this.focusTimeout=setTimeout(function(){p&&(t.setKeyboardFocus(e),p=!1)},150))},handleBlur:function(e){this.cancelFocusTimeout(),this.removeKeyboardFocus(e)},handleClick:function(e){this.disabled||(p=!1,this.removeKeyboardFocus(e),this.$emit("click",e))},createButtonChildren:function(e){var t=this.isKeyboardFocused,n=this.disabled,i=this.disableFocusRipple,a=this.disableKeyboardFocus,o=this.rippleColor,s=this.rippleOpacity,u=this.disableTouchRipple,c=[];c=c.concat(this.$slots["default"]);var d=!t||h["default"].disableFocusRipple||n||i||a?void 0:e(l["default"],{color:o,opacity:s});return c=n||u||h["default"].disableTouchRipple?[e("div",{"class":this.wrapperClass,style:this.wrapperStyle},this.$slots["default"])]:[e(r["default"],{"class":this.wrapperClass,style:this.wrapperStyle,props:{color:this.rippleColor,centerRipple:this.centerRipple,opacity:this.rippleOpacity}},this.$slots["default"])],c.unshift(d),c}},watch:{disabled:function(e){e||(this.hover=!1)}},render:function(e){var t={disabled:this.disabled,href:this.disabled?"javascript:;":this.href,type:this.type};this.disabled||(t.tabIndex=this.tabIndex);var n=navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,i=n?"span":"button";return e(this.href?"a":this.containerElement?this.containerElement:i,{"class":this.buttonClass,domProps:t,style:{"user-select":this.disabled?"":"none","-webkit-user-select":this.disabled?"":"none",outline:"none",cursor:this.disabled?"":"pointer",appearance:"none"},on:{mouseenter:this.handleHover,mouseleave:this.handleOut,touchend:this.handleOut,touchcancel:this.handleOut,click:this.handleClick,focus:this.handleFocus,blur:this.handleBlur,keydown:this.handleKeydown,keyup:this.handleKeyup}},this.createButtonChildren(e))}}},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){var i=n(44)("wks"),a=n(30),o=n(6).Symbol,r="function"==typeof o,s=e.exports=function(e){return i[e]||(i[e]=r&&o[e]||(r?o:a)("Symbol."+e))};s.store=i},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(414);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){e.exports=!n(14)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var i=n(18),a=n(67),o=n(47),r=Object.defineProperty;t.f=n(8)?Object.defineProperty:function(e,t,n){if(i(e),t=o(t,!0),i(n),a)try{return r(e,t,n)}catch(s){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var i=n(68),a=n(38);e.exports=function(e){return i(a(e))}},function(e,t){t=e.exports=function(e){if(e&&"object"==typeof e){var t=e.which||e.keyCode||e.charCode;t&&(e=t)}if("number"==typeof e)return o[e];var a=String(e),r=n[a.toLowerCase()];if(r)return r;var r=i[a.toLowerCase()];return r?r:1===a.length?a.charCodeAt(0):void 0};var n=t.code=t.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,"delete":46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},i=t.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,"break":19,caps:20,"return":13,escape:27,spc:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};/*!
	 * Programatically add the following
	 */
for(a=97;a<123;a++)n[String.fromCharCode(a)]=a-32;for(var a=48;a<58;a++)n[a-48]=a;for(a=1;a<13;a++)n["f"+a]=a+111;for(a=0;a<10;a++)n["numpad "+a]=a+96;var o=t.names=t.title={};for(a in n)o[n[a]]=a;for(var r in i)n[r]=i[r]},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(437);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t,n){var i=n(10),a=n(29);e.exports=n(8)?function(e,t,n){return i.f(e,t,a(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var i=n(72),a=n(39);e.exports=Object.keys||function(e){return i(e,a)}},function(e,t){"use strict";function n(e,t){var n=o(e);return n.setHours(e.getHours()+t),n}function i(e,t){var n=o(e);return n.setMinutes(e.getMinutes()+t),n}function a(e,t){var n=o(e);return n.setSeconds(e.getMinutes()+t),n}function o(e){return new Date(e.getTime())}function r(e){var t=arguments.length<=1||void 0===arguments[1]?"ampm":arguments[1],n=!(arguments.length<=2||void 0===arguments[2])&&arguments[2];if(!e)return"";var i=e.getHours(),a=e.getMinutes().toString();if("ampm"===t){var o=i<12;i%=12;var r=o?" am":" pm";return i=(i||12).toString(),a.length<2&&(a="0"+a),n&&"12"===i&&"00"===a?" pm"===r?"12 noon":"12 midnight":i+("00"===a?"":":"+a)+r}return i=i.toString(),i.length<2&&(i="0"+i),a.length<2&&(a="0"+a),i+":"+a}function s(e){var t=arguments.length<=1||void 0===arguments[1]?"ampm":arguments[1],n=(!(arguments.length<=2||void 0===arguments[2])&&arguments[2],new Date);if(!e)return n;var i="",a=-1;"ampm"===t&&(a=e.indexOf("am"),a===-1&&(a=e.indexOf("midnight")),a!==-1?i="am":(i="pm",a=e.indexOf("pm"),a===-1&&(a=e.indexOf("noon")))),a!==-1&&(e=e.substring(0,a).trim());var o=e.split(":"),r=Number(o[0].trim());"pm"===i&&(r+=12),r>=24&&(r=0);var s=o.length>1?Number(o[1]):0;return n.setMinutes(s),n.setHours(r),n}function l(e){return 57.29577951308232*e}function u(e){var t=e.target,n=t.getBoundingClientRect();return{offsetX:e.clientX-n.left,offsetY:e.clientY-n.top}}function c(e){return"hour"===e.type&&(e.value<1||e.value>12)}Object.defineProperty(t,"__esModule",{value:!0}),t.addHours=n,t.addMinutes=i,t.addSeconds=a,t.formatTime=r,t.strToTime=s,t.rad2deg=l,t.getTouchEventOffsetValues=u,t.isInner=c},function(e,t,n){var i=n(27);e.exports=function(e){if(!i(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){var i=n(6),a=n(4),o=n(241),r=n(15),s="prototype",l=function(e,t,n){var u,c,d,f=e&l.F,h=e&l.G,p=e&l.S,m=e&l.P,v=e&l.B,y=e&l.W,b=h?a:a[t]||(a[t]={}),g=b[s],_=h?i:p?i[t]:(i[t]||{})[s];h&&(n=t);for(u in n)c=!f&&_&&void 0!==_[u],c&&u in b||(d=c?_[u]:n[u],b[u]=h&&"function"!=typeof _[u]?n[u]:v&&c?o(d,i):y&&_[u]==d?function(e){var t=function(t,n,i){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,i)}return e.apply(this,arguments)};return t[s]=e[s],t}(d):m&&"function"==typeof d?o(Function.call,d):d,m&&((b.virtual||(b.virtual={}))[u]=d,e&l.R&&g&&!g[u]&&r(g,u,d)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,e.exports=l},function(e,t){e.exports={}},function(e,t){"use strict";function n(e){var t=i(e);return t.setMonth(t.getMonth()+1),t.setDate(t.getDate()-1),t.getDate()}function i(e){return new Date(e.getFullYear(),e.getMonth(),1)}function a(e,t){for(var i=[],a=n(e),o=[],r=[],s=1;s<=a;s++)i.push(new Date(e.getFullYear(),e.getMonth(),s));var l=function(e){for(var t=7-e.length,n=0;n<t;++n)e[o.length?"push":"unshift"](null);o.push(e)};return i.forEach(function(e){r.length>0&&e.getDay()===t&&(l(r),r=[]),r.push(e),i.indexOf(e)===i.length-1&&l(r)}),o}function o(e,t){var n=l(e);return n.setDate(e.getDate()+t),n}function r(e,t){var n=l(e);return n.setMonth(e.getMonth()+t),n}function s(e,t){var n=l(e);return n.setFullYear(e.getFullYear()+t),n}function l(e){return new Date(e.getTime())}function u(e){var t=l(e);return t.setHours(0,0,0,0),t}function c(e,t){var n=u(e),i=u(t);return n.getTime()<i.getTime()}function d(e,t){var n=u(e),i=u(t);return n.getTime()>i.getTime()}function f(e,t,n){return!c(e,t)&&!d(e,n)}function h(e,t){return e&&t&&e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function p(e,t){var n=void 0;return n=12*(e.getFullYear()-t.getFullYear()),n+=e.getMonth(),n-=t.getMonth()}function m(e,t){return~~(p(e,t)/12)}function v(e,t){t=t||"yyyy-MM-dd",e=e||new Date;var n=t;return n=n.replace(/yyyy|YYYY/,e.getFullYear()),n=n.replace(/yy|YY/,e.getYear()%100>9?(e.getYear()%100).toString():"0"+e.getYear()%100),n=n.replace(/MM/,_(e.getMonth()+1)),n=n.replace(/M/g,e.getMonth()+1),n=n.replace(/w|W/g,x.dayAbbreviation[e.getDay()]),n=n.replace(/dd|DD/,_(e.getDate())),n=n.replace(/d|D/g,e.getDate()),n=n.replace(/hh|HH/,_(e.getHours())),n=n.replace(/h|H/g,e.getHours()),n=n.replace(/mm/,_(e.getMinutes())),n=n.replace(/m/g,e.getMinutes()),n=n.replace(/ss|SS/,_(e.getSeconds())),n=n.replace(/s|S/g,e.getSeconds())}function y(e,t){for(var n,i,a=0,o=0,r="",s="",l=new Date,u=l.getFullYear(),c=l.getMonth()+1,d=1,f=l.getHours(),h=l.getMinutes(),p=l.getSeconds(),m="";o<t.length;){for(r=t.charAt(o),s="";t.charAt(o)===r&&o<t.length;)s+=t.charAt(o++);if("yyyy"===s||"YYYY"===s||"yy"===s||"YY"===s||"y"===s||"Y"===s){if("yyyy"!==s&&"YYYY"!==s||(n=4,i=4),"yy"!==s&&"YY"!==s||(n=2,i=2),"y"!==s&&"Y"!==s||(n=2,i=4),u=b(e,a,n,i),null==u)return 0;a+=u.length,2===u.length&&(u=u>70?1900+(u-0):2e3+(u-0))}else if("MMM"===s||"NNN"===s){c=0;for(var v=0;v<C.length;v++){var y=C[v];if(e.substring(a,a+y.length).toLowerCase()===y.toLowerCase()&&("MMM"===s||"NNN"===s&&v>11)){c=v+1,c>12&&(c-=12),a+=y.length;break}}if(c<1||c>12)return 0}else if("EE"===s||"E"===s)for(var g=0;g<w.length;g++){var _=w[g];if(e.substring(a,a+_.length).toLowerCase()===_.toLowerCase()){a+=_.length;break}}else if("MM"===s||"M"===s){if(c=b(e,a,s.length,2),null==c||c<1||c>12)return 0;a+=c.length}else if("dd"===s||"d"===s||"DD"===s||"D"===s){if(d=b(e,a,s.length,2),null===d||d<1||d>31)return 0;a+=d.length}else if("hh"===s||"h"===s){if(f=b(e,a,s.length,2),null==f||f<1||f>12)return 0;a+=f.length}else if("HH"===s||"H"===s){if(f=b(e,a,s.length,2),null==f||f<0||f>23)return 0;a+=f.length}else if("KK"===s||"K"===s){if(f=b(e,a,s.length,2),null==f||f<0||f>11)return 0;a+=f.length}else if("kk"===s||"k"===s){if(f=b(e,a,s.length,2),null==f||f<1||f>24)return 0;a+=f.length,f--}else if("mm"===s||"m"===s){if(h=b(e,a,s.length,2),null==h||h<0||h>59)return 0;a+=h.length}else if("ss"===s||"s"===s||"SS"===s||"s"===s){if(p=b(e,a,s.length,2),null==p||p<0||p>59)return 0;a+=p.length}else if("u"===s){var x=b(e,a,s.length,3);if(null==x||x<0||x>999)return 0;a+=x.length}else if("a"===s){if("am"===e.substring(a,a+2).toLowerCase())m="AM";else{if("pm"!==e.substring(a,a+2).toLowerCase())return 0;m="PM"}a+=2}else{if(e.substring(a,a+s.length)!==s)return 0;a+=s.length}}if(2===c)if(u%4===0&&u%100!==0||u%400===0){if(d>29)return 0}else if(d>28)return 0;return(4===c||6===c||9===c||11===c)&&d>30?0:(f<12&&"PM"===m?f=f-0+12:f>11&&"AM"===m&&(f-=12),new Date(u,c-1,d,f,h,p))}function b(e,t,n,i){for(var a=i;a>=n;a--){var o=e.substring(t,t+a);if(o.length<n)return null;if(g(o))return o}return null}function g(e){return new RegExp(/^\d+$/).test(e)}function _(e){return e>9?e:"0"+e}Object.defineProperty(t,"__esModule",{value:!0}),t.getDaysInMonth=n,t.getFirstDayOfMonth=i,t.getWeekArray=a,t.addDays=o,t.addMonths=r,t.addYears=s,t.cloneDate=l,t.cloneAsDate=u,t.isBeforeDate=c,t.isAfterDate=d,t.isBetweenDates=f,t.isEqualDate=h,t.monthDiff=p,t.yearDiff=m,t.dateToStr=v,t.strFormatToDate=y;var x={dayAbbreviation:["日","一","二","三","四","五","六"],dayList:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],monthList:["01","02","03","04","05","06","07","08","09","10","11","12"],monthLongList:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},C=(t.dateTimeFormat={formatDisplay:function(e){var t=e.getDate();return x.monthList[e.getMonth()]+"-"+(t>9?t:"0"+t)+" "+x.dayList[e.getDay()]},formatMonth:function(e){return e.getFullYear()+" "+x.monthLongList[e.getMonth()]},getWeekDayArray:function(e){for(var t=[],n=[],i=x.dayAbbreviation,a=0;a<i.length;a++)a<e?n.push(i[a]):t.push(i[a]);return t.concat(n)}},["January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),w=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(394);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(403);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(57),o=i(a),r=n(25),s=n(12),l=i(s);t["default"]={props:{open:{type:Boolean,"default":!1},overlay:{type:Boolean,"default":!0},overlayOpacity:{type:Number,"default":.4},overlayColor:{type:String,"default":"#000"}},data:function(){return{overlayZIndex:(0,r.getZIndex)(),zIndex:(0,r.getZIndex)()}},methods:{overlayClick:function(e){this.$emit("overlayClick",e)},escPress:function(e){this.$emit("escPress",e)},clickOutSide:function(e){this.$emit("clickOutSide",e)},setZIndex:function(){var e=this.$el;this.zIndex||(this.zIndex=(0,r.getZIndex)()),e&&(e.style.zIndex=this.zIndex)},bindClickOutSide:function(){var e=this;this._handleClickOutSide||(this._handleClickOutSide=function(t){e.$refs.popup.contains(t.target)||e.clickOutSide(t)}),setTimeout(function(){document.addEventListener("click",e._handleClickOutSide)},0)},unBindClickOutSide:function(){document.removeEventListener("click",this._handleClickOutSide)},bindEscPress:function(){var e=this;this._handleEscPress||(this._handleEscPress=function(t){"esc"===(0,l["default"])(t)&&e.escPress(t)},window.addEventListener("keydown",this._handleEscPress))},unBindEscPress:function(){window.removeEventListener("keydown",this._handleEscPress)},resetZIndex:function(){this.overlayZIndex=(0,r.getZIndex)(),this.zIndex=(0,r.getZIndex)()}},mounted:function(){return this.bindEscPress(),this.overlay&&this.open&&o["default"].open(this),this.open&&this.bindClickOutSide(),this.$refs.popup?void document.body.appendChild(this.$refs.popup):void console.warn("必须有一个 ref=‘popup’ 的元素")},updated:function(){this.overlay||this.setZIndex()},beforeDestroy:function(){o["default"].close(this),this.unBindEscPress(),this.unBindClickOutSide(),document.body.removeChild(this.$refs.popup)},watch:{open:function(e,t){e!==t&&(e?(this.bindClickOutSide(),this.resetZIndex(),this.overlay&&o["default"].open(this)):(this.unBindClickOutSide(),o["default"].close(this)))}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=20141223;t.getZIndex=function(){return n++},t.getDOM=function i(e){return 3===e.nodeType&&(e=e.nextElementSibling||e.nextSibling,i(e)),e}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(78);Object.defineProperty(t,"menu",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(79);Object.defineProperty(t,"menuItem",{enumerable:!0,get:function(){return i(o)["default"]}})},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){var n=0,i=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+i).toString(36))}},function(e,t,n){var i,a;n(331),i=n(171);var o=n(510);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(390);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="@@clickoutsideContext";t["default"]={bind:function(e,t,i){var a=function(a){i.context&&!e.contains(a.target)&&(t.expression?i.context[e[n].methodName](a):e[n].bindingFn(a))};e[n]={documentHandler:a,methodName:t.expression,bindingFn:t.value},setTimeout(function(){document.addEventListener("click",a)},0)},update:function(e,t){e[n].methodName=t.expression,e[n].bindingFn=t.value},unbind:function(e){document.removeEventListener("click",e[n].documentHandler)}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(448);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getOffset=function(e){var t=e.getBoundingClientRect(),n=document.body,i=e.clientTop||n.clientTop||0,a=e.clientLeft||n.clientLeft||0,o=window.pageYOffset||e.scrollTop,r=window.pageXOffset||e.scrollLeft;return{top:t.top+o-i,left:t.left+r-a}},t.transitionEnd=function(e,t){var n=["msTransitionEnd","mozTransitionEnd","oTransitionEnd","webkitTransitionEnd","transitionend"],i={handleEvent:function(a){n.forEach(function(t){e.removeEventListener(t,i,!1)}),t.apply(e,arguments)}};n.forEach(function(t){e.addEventListener(t,i,!1)})}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var a=n(63),o=i(a);t["default"]=o["default"]||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t){e.exports=!0},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var i=n(10).f,a=n(9),o=n(5)("toStringTag");e.exports=function(e,t,n){e&&!a(e=n?e:e.prototype,o)&&i(e,o,{configurable:!0,value:t})}},function(e,t,n){var i=n(44)("keys"),a=n(30);e.exports=function(e){return i[e]||(i[e]=a(e))}},function(e,t,n){var i=n(6),a="__core-js_shared__",o=i[a]||(i[a]={});e.exports=function(e){return o[e]||(o[e]={})}},function(e,t){var n=Math.ceil,i=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?i:n)(e)}},function(e,t,n){var i=n(38);e.exports=function(e){return Object(i(e))}},function(e,t,n){var i=n(27);e.exports=function(e,t){if(!i(e))return e;var n,a;if(t&&"function"==typeof(n=e.toString)&&!i(a=n.call(e)))return a;if("function"==typeof(n=e.valueOf)&&!i(a=n.call(e)))return a;if(!t&&"function"==typeof(n=e.toString)&&!i(a=n.call(e)))return a;throw TypeError("Can't convert object to primitive value")}},function(e,t,n){var i=n(6),a=n(4),o=n(40),r=n(49),s=n(10).f;e.exports=function(e){var t=a.Symbol||(a.Symbol=o?{}:i.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:r.f(e)})}},function(e,t,n){t.f=n(5)},function(e,t,n){"use strict";var i=n(255)(!0);n(69)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=i(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t,n){n(261);for(var i=n(6),a=n(15),o=n(20),r=n(5)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],l=0;l<5;l++){var u=s[l],c=i[u],d=c&&c.prototype;d&&!d[r]&&a(d,r,u),o[u]=o.Array}},function(e,t,n){var i,a;n(272),i=n(167);var o=n(450);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(t,n){t.exports=e},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(377);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){e&&(0,a.merge)(i,e)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1);(0,a.merge)(i,{disableTouchRipple:!1,disableFocusRipple:!1}),t["default"]=i},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(393);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(53),o=i(a),r=n(76),s=i(r),l=o["default"].extend(s["default"]),u={instances:[],overlay:!1,open:function(e){e&&this.instances.indexOf(e)===-1&&(0===this.instances.length&&this.showOverlay(e),this.instances.push(e),this.changeOverlayStyle())},close:function(e){var t=this,n=this.instances.indexOf(e);n!==-1&&o["default"].nextTick(function(){t.instances.splice(n,1),0===t.instances.length&&t.closeOverlay(),t.changeOverlayStyle()})},showOverlay:function(e){var t=this.overlay=new l({el:document.createElement("div")});t.fixed=!0,t.color=e.overlayColor,t.opacity=e.overlayOpacity,t.zIndex=e.overlayZIndex,t.onClick=this.handleOverlayClick.bind(this),document.body.appendChild(t.$el),this.preventScrolling(),o["default"].nextTick(function(){t.show=!0})},preventScrolling:function(){if(!this.locked){var e=document.getElementsByTagName("body")[0],t=document.getElementsByTagName("html")[0];this.bodyOverflow=e.style.overflow,this.htmlOverflow=t.style.overflow,e.style.overflow="hidden",t.style.overflow="hidden",this.locked=!0}},allowScrolling:function(){var e=document.getElementsByTagName("body")[0],t=document.getElementsByTagName("html")[0];e.style.overflow=this.bodyOverflow||"",t.style.overflow=this.htmlOverflow||"",this.bodyOverflow=null,this.htmlOverflow=null,this.locked=!1},closeOverlay:function(){if(this.overlay){this.allowScrolling();var e=this.overlay;e.show=!1,this.overlay=null,setTimeout(function(){e.$el.remove(),e.$destroy()},450)}},changeOverlayStyle:function(){if(this.overlay&&0!==this.instances.length){var e=this.instances[this.instances.length-1];this.overlay.color=e.overlayColor,this.overlay.opacity=e.overlayOpacity,this.overlay.zIndex=e.overlayZIndex}},handleOverlayClick:function(){if(0!==this.instances.length){var e=this.instances[this.instances.length-1];e.overlayClick&&e.overlayClick()}}};t["default"]=u},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={mounted:function(){this.$bindResize()},methods:{$bindResize:function(){var e=this;this._handleResize=function(t){e.onResize&&e.onResize()},window.addEventListener("resize",this._handleResize)},$unBindResize:function(){this._handleResize&&window.removeEventListener("resize",this._handleResize)}},beforeDestroy:function(){this.$unBindResize()}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{scroller:{type:[HTMLDocument,Element,Window],"default":function(){return window}}},mounted:function(){this.$bindScroll()},methods:{$bindScroll:function(){var e=this;this.scroller&&(this._handleScroll=function(t){e.onScroll&&e.onScroll()},this.scroller.addEventListener("scroll",this._handleScroll))},$unbindScroll:function(e){e=e||this.scroller,this._handleScroll&&e.removeEventListener("scroll",this._handleScroll)}},beforeDestroy:function(){this.$unbindScroll()},watch:{scroller:function(e,t){e!==t&&(this.$unbindScroll(t),this.$bindScroll(e))}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(411);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(419);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(227),o=i(a),r=n(228),s=i(r),l=void 0!==window&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),u=function(){function e(t){(0,o["default"])(this,e),this.el=t,this.startPos={},this.endPos={},this.starts=[],this.drags=[],this.ends=[],l?this.el.addEventListener("touchstart",this,!1):this.el.addEventListener("mousedown",this,!1)}return(0,s["default"])(e,[{key:"handleEvent",value:function(e){switch(e.type){case"touchstart":this.touchStart(e);break;case"touchmove":this.touchMove(e);break;case"touchcancel":case"touchend":this.touchEnd(e);break;case"mousedown":this.mouseStart(e);break;case"mousemove":this.mouseMove(e);break;case"mouseleave":case"mouseup":this.mouseEnd(e)}}},{key:"touchStart",value:function(e){var t=this,n=e.touches[0];this.startPos={x:n.pageX,y:n.pageY,time:(new Date).getTime()},this.endPos={},this.el.addEventListener("touchmove",this,!1),this.el.addEventListener("touchend",this,!1),this.starts.map(function(n){n.call(t,t.startPos,e)})}},{key:"touchMove",value:function(e){var t=this;if(!(e.touches.length>1||e.scale&&1!==e.scale)){var n=e.touches[0];this.endPos={x:n.pageX-this.startPos.x,y:n.pageY-this.startPos.y,time:(new Date).getTime()-this.startPos.time},this.drags.map(function(n){n.call(t,t.endPos,e)})}}},{key:"touchEnd",value:function(e){var t=this;this.endPos.time=(new Date).getTime()-this.startPos.time,this.el.removeEventListener("touchmove",this,!1),this.el.removeEventListener("touchend",this,!1),this.ends.map(function(n){n.call(t,t.endPos,e)})}},{key:"mouseStart",value:function(e){var t=this;this.startPos={x:e.clientX,y:e.clientY,time:(new Date).getTime()},this.endPos={},this.el.addEventListener("mousemove",this,!1),this.el.addEventListener("mouseup",this,!1),this.starts.map(function(n){n.call(t,t.startPos,e)})}},{key:"mouseMove",value:function(e){var t=this;this.endPos={x:e.clientX-this.startPos.x,y:e.clientY-this.startPos.y},this.drags.map(function(n){n.call(t,t.endPos,e)})}},{key:"mouseEnd",value:function(e){var t=this;this.el.removeEventListener("mousemove",this,!1),this.el.removeEventListener("mouseup",this,!1),this.endPos.time=(new Date).getTime()-this.startPos.time,this.ends.map(function(n){n.call(t,t.endPos,e)})}},{key:"start",value:function(e){return this.starts.push(e),this}},{key:"end",value:function(e){return this.ends.push(e),this}},{key:"drag",value:function(e){return this.drags.push(e),this}},{key:"reset",value:function(e){var t=e.touches?e.touches[0]:{};this.startPos={x:t.pageX||e.clientX,y:t.pageY||e.clientY,time:(new Date).getTime()},this.endPos={x:0,y:0}}},{key:"destory",value:function(){l?this.el.removeEventListener("touchstart",this,!1):this.el.removeEventListener("mousedown",this,!1)}}]),e}();t["default"]=u},function(e,t,n){e.exports={"default":n(233),__esModule:!0}},function(e,t,n){e.exports={"default":n(235),__esModule:!0}},function(e,t,n){var i=n(37),a=n(5)("toStringTag"),o="Arguments"==i(function(){return arguments}()),r=function(e,t){try{return e[t]}catch(n){}};e.exports=function(e){var t,n,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=r(t=Object(e),a))?n:o?i(t):"Object"==(s=i(t))&&"function"==typeof t.callee?"Arguments":s}},function(e,t,n){var i=n(27),a=n(6).document,o=i(a)&&i(a.createElement);e.exports=function(e){return o?a.createElement(e):{}}},function(e,t,n){e.exports=!n(8)&&!n(14)(function(){return 7!=Object.defineProperty(n(66)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var i=n(37);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==i(e)?e.split(""):Object(e)}},function(e,t,n){"use strict";var i=n(40),a=n(19),o=n(73),r=n(15),s=n(9),l=n(20),u=n(245),c=n(42),d=n(253),f=n(5)("iterator"),h=!([].keys&&"next"in[].keys()),p="@@iterator",m="keys",v="values",y=function(){return this};e.exports=function(e,t,n,b,g,_,x){u(n,t,b);var C,w,S,k=function(e){if(!h&&e in F)return F[e];switch(e){case m:return function(){return new n(this,e)};case v:return function(){return new n(this,e)}}return function(){return new n(this,e)}},O=t+" Iterator",M=g==v,$=!1,F=e.prototype,j=F[f]||F[p]||g&&F[g],P=j||k(g),T=g?M?k("entries"):P:void 0,R="Array"==t?F.entries||j:j;if(R&&(S=d(R.call(new e)),S!==Object.prototype&&(c(S,O,!0),i||s(S,f)||r(S,f,y))),M&&j&&j.name!==v&&($=!0,P=function(){return j.call(this)}),i&&!x||!h&&!$&&F[f]||r(F,f,P),l[t]=P,l[O]=y,g)if(C={values:M?P:k(v),keys:_?P:k(m),entries:T},x)for(w in C)w in F||o(F,w,C[w]);else a(a.P+a.F*(h||$),t,C);return C}},function(e,t,n){var i=n(18),a=n(250),o=n(39),r=n(43)("IE_PROTO"),s=function(){},l="prototype",u=function(){var e,t=n(66)("iframe"),i=o.length,a="<",r=">";for(t.style.display="none",n(243).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(a+"script"+r+"document.F=Object"+a+"/script"+r),e.close(),u=e.F;i--;)delete u[l][o[i]];return u()};e.exports=Object.create||function(e,t){var n;return null!==e?(s[l]=i(e),n=new s,s[l]=null,n[r]=e):n=u(),void 0===t?n:a(n,t)}},function(e,t,n){var i=n(72),a=n(39).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return i(e,a)}},function(e,t,n){var i=n(9),a=n(11),o=n(240)(!1),r=n(43)("IE_PROTO");e.exports=function(e,t){var n,s=a(e),l=0,u=[];for(n in s)n!=r&&i(s,n)&&u.push(n);for(;t.length>l;)i(s,n=t[l++])&&(~o(u,n)||u.push(n));return u}},function(e,t,n){e.exports=n(15)},function(e,t,n){var i,a;n(354),i=n(168);var o=n(530);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(353),i=n(169);var o=n(529);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(294),i=n(170);var o=n(471);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(306),i=n(173);var o=n(484);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(356),i=n(175);var o=n(532);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(293),i=n(176);var o=n(470);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(277),i=n(194);var o=n(455);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(317),i=n(200);var o=n(495);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(314),i=n(202);var o=n(492);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(285),i=n(215);var o=n(462);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(357),i=n(216),a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),e.exports=i},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(364);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.levenshteinDistance=function(e,t){for(var n=[],i=void 0,a=void 0,o=0;o<=t.length;o++)for(var r=0;r<=e.length;r++)a=o&&r?e.charAt(r-1)===t.charAt(o-1)?i:Math.min(n[r],n[r-1],i)+1:o+r,i=n[r],n[r]=a;return n.pop()};t.noFilter=function(){return!0},t.caseSensitiveFilter=function(e,t){return""!==e&&t.indexOf(e)!==-1},t.caseInsensitiveFilter=function(e,t){return t.toLowerCase().indexOf(e.toLowerCase())!==-1},t.levenshteinDistanceFilter=function(e){if(void 0===e)return n;if("number"!=typeof e)throw"Error: levenshteinDistanceFilter is a filter generator, not a filter!";return function(t,i){return n(t,i)<e}},t.fuzzyFilter=function(e,t){var n=t.toLowerCase();e=e.toLowerCase();for(var i=0,a=0;a<t.length;a++)n[a]===e[i]&&(i+=1);return i===e.length}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(365);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(366);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(367);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(368);Object.defineProperty(t,"bottomNav",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(369);Object.defineProperty(t,"bottomNavItem",{enumerable:!0,get:function(){return i(o)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(370);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(371);Object.defineProperty(t,"card",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(373);Object.defineProperty(t,"cardHeader",{enumerable:!0,get:function(){return i(o)["default"]}});var r=n(374);Object.defineProperty(t,"cardMedia",{enumerable:!0,get:function(){return i(r)["default"]}});var s=n(376);Object.defineProperty(t,"cardTitle",{enumerable:!0,get:function(){return i(s)["default"]}});var l=n(375);Object.defineProperty(t,"cardText",{enumerable:!0,get:function(){return i(l)["default"]}});var u=n(372);Object.defineProperty(t,"cardActions",{enumerable:!0,get:function(){return i(u)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(378);Object.defineProperty(t,"default",{enumerable:!0,
get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(379);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(380);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(386);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(391);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(392);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(395);Object.defineProperty(t,"flexbox",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(396);Object.defineProperty(t,"flexboxItem",{enumerable:!0,get:function(){return i(o)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(397);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.col=t.row=void 0;var a=n(399);Object.defineProperty(t,"row",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(398);Object.defineProperty(t,"col",{enumerable:!0,get:function(){return i(o)["default"]}}),n(269)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(400);Object.defineProperty(t,"gridList",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(401);Object.defineProperty(t,"gridTile",{enumerable:!0,get:function(){return i(o)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(404);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(405);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(407);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(77);Object.defineProperty(t,"list",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(408);Object.defineProperty(t,"listItem",{enumerable:!0,get:function(){return i(o)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(410);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(413);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(415);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(416);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(417);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(418);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(420);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(421);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(422);Object.defineProperty(t,"step",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(423);Object.defineProperty(t,"stepButton",{enumerable:!0,get:function(){return i(o)["default"]}});var r=n(425);Object.defineProperty(t,"stepContent",{enumerable:!0,get:function(){return i(r)["default"]}});var s=n(80);Object.defineProperty(t,"stepLabel",{enumerable:!0,get:function(){return i(s)["default"]}});var l=n(426);Object.defineProperty(t,"stepper",{enumerable:!0,get:function(){return i(l)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(427);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(428);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(429);Object.defineProperty(t,"table",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(432);Object.defineProperty(t,"thead",{enumerable:!0,get:function(){return i(o)["default"]}});var r=n(430);Object.defineProperty(t,"tbody",{enumerable:!0,get:function(){return i(r)["default"]}});var s=n(431);Object.defineProperty(t,"tfoot",{enumerable:!0,get:function(){return i(s)["default"]}});var l=n(433);Object.defineProperty(t,"tr",{enumerable:!0,get:function(){return i(l)["default"]}});var u=n(82);Object.defineProperty(t,"th",{enumerable:!0,get:function(){return i(u)["default"]}});var c=n(81);Object.defineProperty(t,"td",{enumerable:!0,get:function(){return i(c)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(435);Object.defineProperty(t,"tabs",{enumerable:!0,get:function(){return i(a)["default"]}});var o=n(434);Object.defineProperty(t,"tab",{enumerable:!0,get:function(){return i(o)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(445);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(447);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i(a)["default"]}})},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=(t.red50="#ffebee",t.red100="#ffcdd2",t.red200="#ef9a9a",t.red300="#e57373",t.red400="#ef5350",t.red500="#f44336"),i=(t.red600="#e53935",t.red700="#d32f2f",t.red800="#c62828",t.red900="#b71c1c",t.redA100="#ff8a80",t.redA200="#ff5252",t.redA400="#ff1744",t.redA700="#d50000",t.red=n,t.pink50="#fce4ec",t.pink100="#f8bbd0",t.pink200="#f48fb1",t.pink300="#f06292",t.pink400="#ec407a",t.pink500="#e91e63"),a=(t.pink600="#d81b60",t.pink700="#c2185b",t.pink800="#ad1457",t.pink900="#880e4f",t.pinkA100="#ff80ab",t.pinkA200="#ff4081",t.pinkA400="#f50057",t.pinkA700="#c51162",t.pink=i,t.purple50="#f3e5f5",t.purple100="#e1bee7",t.purple200="#ce93d8",t.purple300="#ba68c8",t.purple400="#ab47bc",t.purple500="#9c27b0"),o=(t.purple600="#8e24aa",t.purple700="#7b1fa2",t.purple800="#6a1b9a",t.purple900="#4a148c",t.purpleA100="#ea80fc",t.purpleA200="#e040fb",t.purpleA400="#d500f9",t.purpleA700="#aa00ff",t.purple=a,t.deepPurple50="#ede7f6",t.deepPurple100="#d1c4e9",t.deepPurple200="#b39ddb",t.deepPurple300="#9575cd",t.deepPurple400="#7e57c2",t.deepPurple500="#673ab7"),r=(t.deepPurple600="#5e35b1",t.deepPurple700="#512da8",t.deepPurple800="#4527a0",t.deepPurple900="#311b92",t.deepPurpleA100="#b388ff",t.deepPurpleA200="#7c4dff",t.deepPurpleA400="#651fff",t.deepPurpleA700="#6200ea",t.deepPurple=o,t.indigo50="#e8eaf6",t.indigo100="#c5cae9",t.indigo200="#9fa8da",t.indigo300="#7986cb",t.indigo400="#5c6bc0",t.indigo500="#3f51b5"),s=(t.indigo600="#3949ab",t.indigo700="#303f9f",t.indigo800="#283593",t.indigo900="#1a237e",t.indigoA100="#8c9eff",t.indigoA200="#536dfe",t.indigoA400="#3d5afe",t.indigoA700="#304ffe",t.indigo=r,t.blue50="#e3f2fd",t.blue100="#bbdefb",t.blue200="#90caf9",t.blue300="#64b5f6",t.blue400="#42a5f5",t.blue500="#2196f3"),l=(t.blue600="#1e88e5",t.blue700="#1976d2",t.blue800="#1565c0",t.blue900="#0d47a1",t.blueA100="#82b1ff",t.blueA200="#448aff",t.blueA400="#2979ff",t.blueA700="#2962ff",t.blue=s,t.lightBlue50="#e1f5fe",t.lightBlue100="#b3e5fc",t.lightBlue200="#81d4fa",t.lightBlue300="#4fc3f7",t.lightBlue400="#29b6f6",t.lightBlue500="#03a9f4"),u=(t.lightBlue600="#039be5",t.lightBlue700="#0288d1",t.lightBlue800="#0277bd",t.lightBlue900="#01579b",t.lightBlueA100="#80d8ff",t.lightBlueA200="#40c4ff",t.lightBlueA400="#00b0ff",t.lightBlueA700="#0091ea",t.lightBlue=l,t.cyan50="#e0f7fa",t.cyan100="#b2ebf2",t.cyan200="#80deea",t.cyan300="#4dd0e1",t.cyan400="#26c6da",t.cyan500="#00bcd4"),c=(t.cyan600="#00acc1",t.cyan700="#0097a7",t.cyan800="#00838f",t.cyan900="#006064",t.cyanA100="#84ffff",t.cyanA200="#18ffff",t.cyanA400="#00e5ff",t.cyanA700="#00b8d4",t.cyan=u,t.teal50="#e0f2f1",t.teal100="#b2dfdb",t.teal200="#80cbc4",t.teal300="#4db6ac",t.teal400="#26a69a",t.teal500="#009688"),d=(t.teal600="#00897b",t.teal700="#00796b",t.teal800="#00695c",t.teal900="#004d40",t.tealA100="#a7ffeb",t.tealA200="#64ffda",t.tealA400="#1de9b6",t.tealA700="#00bfa5",t.teal=c,t.green50="#e8f5e9",t.green100="#c8e6c9",t.green200="#a5d6a7",t.green300="#81c784",t.green400="#66bb6a",t.green500="#4caf50"),f=(t.green600="#43a047",t.green700="#388e3c",t.green800="#2e7d32",t.green900="#1b5e20",t.greenA100="#b9f6ca",t.greenA200="#69f0ae",t.greenA400="#00e676",t.greenA700="#00c853",t.green=d,t.lightGreen50="#f1f8e9",t.lightGreen100="#dcedc8",t.lightGreen200="#c5e1a5",t.lightGreen300="#aed581",t.lightGreen400="#9ccc65",t.lightGreen500="#8bc34a"),h=(t.lightGreen600="#7cb342",t.lightGreen700="#689f38",t.lightGreen800="#558b2f",t.lightGreen900="#33691e",t.lightGreenA100="#ccff90",t.lightGreenA200="#b2ff59",t.lightGreenA400="#76ff03",t.lightGreenA700="#64dd17",t.lightGreen=f,t.lime50="#f9fbe7",t.lime100="#f0f4c3",t.lime200="#e6ee9c",t.lime300="#dce775",t.lime400="#d4e157",t.lime500="#cddc39"),p=(t.lime600="#c0ca33",t.lime700="#afb42b",t.lime800="#9e9d24",t.lime900="#827717",t.limeA100="#f4ff81",t.limeA200="#eeff41",t.limeA400="#c6ff00",t.limeA700="#aeea00",t.lime=h,t.yellow50="#fffde7",t.yellow100="#fff9c4",t.yellow200="#fff59d",t.yellow300="#fff176",t.yellow400="#ffee58",t.yellow500="#ffeb3b"),m=(t.yellow600="#fdd835",t.yellow700="#fbc02d",t.yellow800="#f9a825",t.yellow900="#f57f17",t.yellowA100="#ffff8d",t.yellowA200="#ffff00",t.yellowA400="#ffea00",t.yellowA700="#ffd600",t.yellow=p,t.amber50="#fff8e1",t.amber100="#ffecb3",t.amber200="#ffe082",t.amber300="#ffd54f",t.amber400="#ffca28",t.amber500="#ffc107"),v=(t.amber600="#ffb300",t.amber700="#ffa000",t.amber800="#ff8f00",t.amber900="#ff6f00",t.amberA100="#ffe57f",t.amberA200="#ffd740",t.amberA400="#ffc400",t.amberA700="#ffab00",t.amber=m,t.orange50="#fff3e0",t.orange100="#ffe0b2",t.orange200="#ffcc80",t.orange300="#ffb74d",t.orange400="#ffa726",t.orange500="#ff9800"),y=(t.orange600="#fb8c00",t.orange700="#f57c00",t.orange800="#ef6c00",t.orange900="#e65100",t.orangeA100="#ffd180",t.orangeA200="#ffab40",t.orangeA400="#ff9100",t.orangeA700="#ff6d00",t.orange=v,t.deepOrange50="#fbe9e7",t.deepOrange100="#ffccbc",t.deepOrange200="#ffab91",t.deepOrange300="#ff8a65",t.deepOrange400="#ff7043",t.deepOrange500="#ff5722"),b=(t.deepOrange600="#f4511e",t.deepOrange700="#e64a19",t.deepOrange800="#d84315",t.deepOrange900="#bf360c",t.deepOrangeA100="#ff9e80",t.deepOrangeA200="#ff6e40",t.deepOrangeA400="#ff3d00",t.deepOrangeA700="#dd2c00",t.deepOrange=y,t.brown50="#efebe9",t.brown100="#d7ccc8",t.brown200="#bcaaa4",t.brown300="#a1887f",t.brown400="#8d6e63",t.brown500="#795548"),g=(t.brown600="#6d4c41",t.brown700="#5d4037",t.brown800="#4e342e",t.brown900="#3e2723",t.brown=b,t.blueGrey50="#eceff1",t.blueGrey100="#cfd8dc",t.blueGrey200="#b0bec5",t.blueGrey300="#90a4ae",t.blueGrey400="#78909c",t.blueGrey500="#607d8b"),_=(t.blueGrey600="#546e7a",t.blueGrey700="#455a64",t.blueGrey800="#37474f",t.blueGrey900="#263238",t.blueGrey=g,t.grey50="#fafafa",t.grey100="#f5f5f5",t.grey200="#eeeeee",t.grey300="#e0e0e0",t.grey400="#bdbdbd",t.grey500="#9e9e9e");t.grey600="#757575",t.grey700="#616161",t.grey800="#424242",t.grey900="#212121",t.grey=_,t.black="#000000",t.white="#ffffff",t.transparent="rgba(0, 0, 0, 0)",t.fullBlack="rgba(0, 0, 0, 1)",t.darkBlack="rgba(0, 0, 0, 0.87)",t.lightBlack="rgba(0, 0, 0, 0.54)",t.minBlack="rgba(0, 0, 0, 0.26)",t.faintBlack="rgba(0, 0, 0, 0.12)",t.fullWhite="rgba(255, 255, 255, 1)",t.darkWhite="rgba(255, 255, 255, 0.87)",t.lightWhite="rgba(255, 255, 255, 0.54)"},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,i=document&&document.documentElement.style,a=!1;void 0!==window&&window.opera&&"[object Opera]"===Object.prototype.toString.call(window.opera)?n="presto":"MozAppearance"in i?n="gecko":"WebkitAppearance"in i?n="webkit":"string"==typeof navigator.cpuClass&&(n="trident");var o={trident:"-ms-",gecko:"-moz-",webkit:"-webkit-",presto:"-o-"}[n],r={trident:"ms",gecko:"Moz",webkit:"Webkit",presto:"O"}[n],s=document.createElement("div"),l=r+"Perspective",u=r+"Transform",c=o+"transform",d=r+"Transition",f=o+"transition",h=r.toLowerCase()+"TransitionEnd";void 0!==s.style[l]&&(a=!0);var p=function(e){var t={left:0,top:0};if(null===e||null===e.style)return t;var n=e.style[u],i=/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g.exec(n);return i&&(t.left=+i[1],t.top=+i[3]),t},m=function(e,t,n){if((null!==t||null!==n)&&null!==e&&null!==e.style&&(e.style[u]||0!==t||0!==n)){if(null===t||null===n){var i=p(e);null===t&&(t=i.left),null===n&&(n=i.top)}v(e),a?e.style[u]+=" translate("+(t?t+"px":"0px")+","+(n?n+"px":"0px")+") translateZ(0px)":e.style[u]+=" translate("+(t?t+"px":"0px")+","+(n?n+"px":"0px")+")"}},v=function(e){if(null!==e&&null!==e.style){var t=e.style[u];t&&(t=t.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g,""),e.style[u]=t)}};t["default"]={transformProperty:u,transformStyleName:c,transitionProperty:d,transitionStyleName:f,transitionEndProperty:h,getElementTranslate:p,translateElement:m,cancelTranslateElement:v}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-appbar",props:{title:{type:String,"default":""},titleClass:{type:[String,Array,Object]},zDepth:{type:Number,"default":1}}}},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(36),r=a(o),s=n(230),l=a(s),u=n(7),c=a(u),d=n(13),f=a(d),h=n(26),p=n(86),m=i(p),v=n(12),y=a(v);t["default"]={name:"mu-auto-complete",props:{anchorOrigin:{type:Object,"default":function(){return{vertical:"bottom",horizontal:"left"}}},targetOrigin:{type:Object,"default":function(){return{vertical:"top",horizontal:"left"}}},scroller:{type:[HTMLDocument,Element,Window]},dataSource:{type:Array,required:!0,"default":function(){return[]}},dataSourceConfig:{type:Object,"default":function(){return{text:"text",value:"value"}}},disableFocusRipple:{type:Boolean,"default":!0},filter:{type:[String,Function],"default":"caseSensitiveFilter"},maxSearchResults:{type:Number},openOnFocus:{type:Boolean,"default":!1},menuCloseDelay:{type:Number,"default":300},label:{type:String},labelFloat:{type:Boolean,"default":!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,"default":!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,"default":!1},menuWidth:{type:Number},maxHeight:{type:Number},underlineShow:{type:Boolean,"default":!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},value:{type:String}},data:function(){return{anchorEl:null,focusTextField:!0,open:!1,searchText:this.value,inputWidth:null}},computed:{list:function b(){var e="string"==typeof this.filter?m[this.filter]:this.filter,t=this.dataSourceConfig,n=this.maxSearchResults,i=this.searchText;if(!e)return void console.warn("not found filter:"+this.filter);var b=[];return this.dataSource.every(function(a,o){switch("undefined"==typeof a?"undefined":(0,l["default"])(a)){case"string":e(i||"",a,a)&&b.push({text:a,value:a,index:o});break;case"object":if(a&&"string"==typeof a[t.text]){var s=a[t.text];if(!e(i||"",s,a))break;var u=a[t.value];b.push((0,r["default"])({},a,{text:s,value:u,index:o}))}}return!(n&&n>0&&b.length===n)}),b}},methods:{handleFocus:function(e){!this.open&&this.openOnFocus&&(this.open=!0),this.focusTextField=!0,this.$emit("focus",e)},handleBlur:function(e){this.focusTextField&&!this.timerTouchTapCloseId&&this.close(),this.$emit("blur",e)},handleClose:function(e){this.focusTextField&&"overflow"!==e||this.close()},handleMouseDown:function(e){e.preventDefault()},handleItemClick:function(e){var t=this,n=this.list,i=this.dataSource,a=this.setSearchText,o=this.close,r=this.$refs.menu.$children.indexOf(e),s=n[r].index,l=i[s],u=this.chosenRequestText(l);this.timerTouchTapCloseId=setTimeout(function(){t.timerTouchTapCloseId=null,a(u),o(),t.$emit("select",l,s),t.$emit("change",u)},this.menuCloseDelay)},chosenRequestText:function(e){return"string"==typeof e?e:e[this.dataSourceConfig.text]},handleInput:function(){this.notInput?this.notInput=!1:this.open=!0},blur:function(){this.$refs.textField.$el.blur()},focus:function(){this.$refs.textField.$el.focus()},close:function(){this.open=!1},handleKeyDown:function(e){switch(this.$emit("keydown",e),(0,y["default"])(e)){case"enter":this.close();var t=this.searchText;""!==t&&this.$emit("select",t,-1);break;case"esc":this.close();break;case"down":e.preventDefault(),this.open=!0,this.focusTextField=!1}},setSearchText:function(e){this.notInput=!0,this.searchText=e},setInputWidth:function(){this.$el&&(this.inputWidth=this.$el.offsetWidth)}},mounted:function(){this.anchorEl=this.$refs.textField.$el,this.setInputWidth()},updated:function(){this.setInputWidth()},watch:{value:function(e){e!==this.searchText&&this.setSearchText(e)},searchText:function(e){this.$emit("input",e)}},components:{popover:c["default"],"text-field":f["default"],"mu-menu":h.menu,"menu-item":h.menuItem}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),o=i(a),r=n(1);t["default"]={name:"mu-avatar",props:{backgroundColor:{type:String,"default":""},color:{type:String,"default":""},icon:{type:String,"default":""},iconClass:{type:[String,Object,Array]},src:{type:String,"default":""},imgClass:{type:[String,Object,Array]},size:{type:Number},iconSize:{type:Number}},computed:{avatarStyle:function(){return{width:this.size?this.size+"px":"",height:this.size?this.size+"px":"",color:(0,r.getColor)(this.color),"background-color":(0,r.getColor)(this.backgroundColor)}}},methods:{handleClick:function(){this.$emit("click")}},created:function(){this._isAvatar=!0},components:{icon:o["default"]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={name:"mu-badge",props:{content:{type:String,"default":""},color:{type:String,"default":""},primary:{type:Boolean,"default":!1},secondary:{type:Boolean,"default":!1},circle:{type:Boolean,"default":!1},badgeClass:{type:[String,Object,Array]}},computed:{badgeStyle:function(){return{"background-color":(0,i.getColor)(this.color)}},badgeInternalClass:function(){var e=this.circle,t=this.primary,n=this.secondary,a=this.badgeClass,o=this.$slots&&this.$slots["default"]&&this.$slots["default"].length>0,r=[];return e&&r.push("mu-badge-circle"),t&&r.push("mu-badge-primary"),n&&r.push("mu-badge-secondary"),o&&r.push("mu-badge-float"),r.concat((0,i.convertClass)(a))}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a);t["default"]={name:"mu-bottom-nav",props:{shift:{type:Boolean,"default":!1},value:{}},methods:{handleItemClick:function(e,t){e!==this.value&&this.$emit("change",e),this.$emit("itemClick",t),this.$emit("item-click",t)},setChildrenInstance:function(){var e=this,t=this.$slots["default"];t.forEach(function(t){t&&t.child&&t.child.isBottomNavItem&&(t.child.bottomNav=e)})}},mounted:function(){this.setChildrenInstance()},updated:function(){var e=this,t=this.$slots["default"];t.forEach(function(t){t&&t.child&&t.child.isBottomNavItem&&(t.child.bottomNav=e)})},render:function(e){return e(o["default"],{"class":["mu-bottom-nav",this.shift?"mu-bottom-nav-shift":void 0],props:{disableTouchRipple:!this.shift,centerRipple:!1,wrapperClass:"mu-bottom-nav-shift-wrapper",containerElement:"div",rippleOpacity:.3}},this.$slots["default"])}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(2),s=i(r),l=n(1);t["default"]={name:"mu-bottom-nav-item",props:{icon:{type:String,"default":""},iconClass:{type:[String,Object,Array]},title:{type:String,"default":""},titleClass:{type:[String,Object,Array]},href:{type:String},value:{}},data:function(){return{bottomNav:null}},created:function(){this.isBottomNavItem=!0},computed:{active:function(){return this.bottomNav&&(0,l.isNotNull)(this.value)&&this.bottomNav.value===this.value},shift:function(){return this.bottomNav&&this.bottomNav.shift}},methods:{handleClick:function(){this.bottomNav&&this.bottomNav.handleItemClick&&this.bottomNav.handleItemClick(this.value)}},mounted:function(){for(var e=this.$parent.$children,t=0;t<e.length;t++)if(e[t].$el===this.$el){this.index=t;break}},components:{"abstract-button":o["default"],icon:s["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(24),o=i(a);t["default"]={name:"mu-bottom-sheet",mixins:[o["default"]],props:{sheetClass:{type:[String,Object,Array]}},methods:{overlayClick:function(){this.$emit("close","overlay")},escPress:function(){this.$emit("close","esc")},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-card"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-card-actions"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-card-header",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-card-media",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-card-text"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-card-title",props:{title:{type:String},titleClass:{type:[String,Array,Object]},subTitle:{type:String},subTitleClass:{type:[String,Array,Object]}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),o=i(a),r=n(31),s=i(r);t["default"]={name:"mu-checkbox",props:{name:{type:String},value:{},nativeValue:{type:String},label:{type:String,"default":""},labelLeft:{type:Boolean,"default":!1},labelClass:{type:[String,Object,Array]},disabled:{type:Boolean,"default":!1},uncheckIcon:{type:String,"default":""},checkedIcon:{type:String,"default":""},iconClass:{type:[String,Object,Array]}},data:function(){return{inputValue:this.value}},watch:{value:function(e){this.inputValue=e},inputValue:function(e){this.$emit("input",e)}},methods:{handleClick:function(){},handleMouseDown:function(e){this.disabled||0===e.button&&this.$children[0].start(e)},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(e){this.disabled||this.$children[0].start(e)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{icon:o["default"],"touch-ripple":s["default"]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={name:"mu-chip",props:{showDelete:{type:Boolean,"default":!1},disabled:{type:Boolean,"default":!1},deleteIconClass:{type:[Array,String,Object]},backgroundColor:{type:String},color:{type:String}},data:function(){return{focus:!1,hover:!1}},computed:{classNames:function(){return this.disabled?null:this.focus?["hover","active"]:this.hover?["hover"]:null},style:function(){return{"background-color":(0,i.getColor)(this.backgroundColor),color:(0,i.getColor)(this.color)}}},methods:{onMouseenter:function(){(0,i.isPc)()&&(this.hover=!0)},onMouseleave:function(){(0,i.isPc)()&&(this.hover=!1)},onMousedown:function(){this.focus=!0},onMouseup:function(){this.focus=!1},onTouchstart:function(){this.focus=!0},onTouchend:function(){this.focus=!1},handleDelete:function(){this.$emit("delete")},handleClick:function(){this.disabled||this.$emit("click")}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(52),o=i(a),r=n(1);t["default"]={name:"mu-circular-progress",props:{max:{type:Number,"default":100},min:{type:Number,"default":0},mode:{type:String,"default":"indeterminate",validator:function(e){return["indeterminate","determinate"].indexOf(e)!==-1}},value:{type:Number,"default":0},color:{type:String},size:{type:Number,"default":24},strokeWidth:{type:Number,"default":3}},computed:{radius:function(){return(this.size-this.strokeWidth)/2},circularSvgStyle:function(){return{width:this.size,height:this.size}},circularPathStyle:function(){var e=this.getRelativeValue();return{stroke:(0,r.getColor)(this.color),"stroke-dasharray":this.getArcLength(e)+", "+this.getArcLength(1)}}},methods:{getArcLength:function(e){return e*Math.PI*(this.size-this.strokeWidth)},getRelativeValue:function(){var e=this.value,t=this.min,n=this.max,i=Math.min(Math.max(t,e),n);return i/(n-t)}},components:{circular:o["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-content-block"}},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(385),r=a(o),s=n(383),l=a(s),u=n(22),c=a(u),d=n(382),f=a(d),h=n(21),p=i(h),m=n(384),v=a(m),y=n(12),b=a(y);t["default"]={props:{dateTimeFormat:{type:Object,"default":function(){return p.dateTimeFormat}},autoOk:{type:Boolean,"default":!1},okLabel:{type:String,"default":"确定"},cancelLabel:{type:String,"default":"取消"},disableYearSelection:{type:Boolean,"default":!1},firstDayOfWeek:{type:Number,"default":1},initialDate:{type:Date,"default":function(){return new Date}},maxDate:{type:Date,"default":function(){return p.addYears(new Date,100)}},minDate:{type:Date,"default":function(){return p.addYears(new Date,-100)}},mode:{type:String,"default":"portrait",validator:function(e){return e&&["portrait","landscape"].indexOf(e)!==-1}},shouldDisableDate:{type:Function}},data:function(){return{weekTexts:this.dateTimeFormat.getWeekDayArray(this.firstDayOfWeek),displayDates:[this.initialDate],selectedDate:this.initialDate,slideType:"next",displayMonthDay:!0}},computed:{prevMonth:function(){return this.displayDates&&p.monthDiff(this.displayDates[0],this.minDate)>0},nextMonth:function(){return this.displayDates&&p.monthDiff(this.displayDates[0],this.maxDate)<0}},methods:{handleMonthChange:function(e){var t=p.addMonths(this.displayDates[0],e);this.changeDislayDate(t)},handleYearChange:function(e){if(this.selectedDate.getFullYear()!==e){var t=p.cloneAsDate(this.selectedDate);t.setFullYear(e),this.setSelected(t)}},handleSelected:function(e){this.setSelected(e),this.autoOk&&this.handleOk()},handleCancel:function(){this.$emit("dismiss")},handleOk:function(){var e=this.selectedDate,t=this.maxDate,n=this.minDate;e.getTime()>t.getTime()&&(this.selectedDate=new Date(t.getTime())),e.getTime()<n.getTime()&&(this.selectedDate=new Date(n.getTime())),this.$emit("accept",this.selectedDate)},setSelected:function(e){this.selectedDate=e,this.changeDislayDate(e)},changeDislayDate:function(e){var t=this.displayDates[0];e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()||(this.slideType=e.getTime()>t.getTime()?"next":"prev",this.displayDates.push(e),this.displayDates.splice(0,1))},selectYear:function(){this.displayMonthDay=!1},selectMonth:function(){this.displayMonthDay=!0},addSelectedDays:function(e){this.setSelected(p.addDays(this.selectedDate,e))},addSelectedMonths:function(e){this.setSelected(p.addMonths(this.selectedDate,e))},addSelectedYears:function(e){this.setSelected(p.addYears(this.selectedDate,e))},handleKeyDown:function(e){switch((0,b["default"])(e)){case"up":e.altKey&&e.shiftKey?this.addSelectedYears(-1):e.shiftKey?this.addSelectedMonths(-1):this.addSelectedDays(-7);break;case"down":e.altKey&&e.shiftKey?this.addSelectedYears(1):e.shiftKey?this.addSelectedMonths(1):this.addSelectedDays(7);break;case"right":e.altKey&&e.shiftKey?this.addSelectedYears(1):e.shiftKey?this.addSelectedMonths(1):this.addSelectedDays(1);break;case"left":e.altKey&&e.shiftKey?this.addSelectedYears(-1):e.shiftKey?this.addSelectedMonths(-1):this.addSelectedDays(-1);
}}},mounted:function(){var e=this;this.handleWindowKeyDown=function(t){e.handleKeyDown(t)},window.addEventListener("keydown",this.handleWindowKeyDown)},beforeDestory:function(){window.removeEventListener("keydown",this.handleWindowKeyDown)},watch:{initialDate:function(e){this.selectedDate=e}},components:{"date-display":r["default"],"calendar-toolbar":l["default"],"flat-button":c["default"],"calendar-month":f["default"],"calendar-year":v["default"]}}},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(388),r=a(o),s=n(21),l=i(s);t["default"]={props:{displayDate:{type:Date},firstDayOfWeek:{type:Number,"default":1},maxDate:{type:Date},minDate:{type:Date},selectedDate:{type:Date},shouldDisableDate:{type:Function}},data:function(){return{weeksArray:l.getWeekArray(this.displayDate||new Date,this.firstDayOfWeek)}},methods:{equalsDate:function(e){return l.isEqualDate(e,this.selectedDate)},isDisableDate:function(e){if(null===e)return!1;var t=!1;return this.maxDate&&this.minDate&&(t=!l.isBetweenDates(e,this.minDate,this.maxDate)),!t&&this.shouldDisableDate&&(t=this.shouldDisableDate(e)),t},handleClick:function(e){e&&this.$emit("selected",e)}},watch:{displayDate:function(e){return l.getWeekArray(e||new Date,this.firstDayOfWeek)}},components:{"day-button":r["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(23),o=i(a);t["default"]={props:{dateTimeFormat:{type:Object},displayDates:{type:Array},nextMonth:{type:Boolean,"default":!0},prevMonth:{type:Boolean,"default":!0},slideType:{type:String}},methods:{prev:function(){this.$emit("monthChange",-1)},next:function(){this.$emit("monthChange",1)}},components:{"icon-button":o["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(389),o=i(a);t["default"]={props:{maxDate:{type:Date},minDate:{type:Date},selectedDate:{type:Date}},computed:{years:function r(){for(var e=this.minDate.getFullYear(),t=this.maxDate.getFullYear(),r=[],n=e;n<=t;n++)r.push(n);return r}},methods:{handleClick:function(e){this.$emit("change",e)},scrollToSelectedYear:function(e){var t=this.$refs.container,n=t.clientHeight,i=e.clientHeight||32,a=e.offsetTop+i/2-n/2;t.scrollTop=a}},components:{"year-button":o["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{dateTimeFormat:{type:Object},disableYearSelection:{type:Boolean,"default":!1},monthDaySelected:{type:Boolean,"default":!0},selectedDate:{type:Date}},data:function(){return{displayDates:[this.selectedDate],slideType:"next"}},computed:{selectedYear:function(){return!this.monthDaySelected},displayClass:function(){return{"selected-year":this.selectedYear}}},methods:{replaceSelected:function(e){var t=this.displayDates[0];this.slideType=e.getTime()>t.getTime()?"next":"prev",this.displayDates.push(e),this.displayDates.splice(0,1)},handleSelectYear:function(){this.disableYearSelection||this.$emit("selectYear")},handleSelectMonth:function(){this.$emit("selectMonth")}},watch:{selectedDate:function(e){this.replaceSelected(e)}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}Object.defineProperty(t,"__esModule",{value:!0});var o=n(21),r=a(o),s=n(13),l=i(s),u=n(387),c=i(u);t["default"]={name:"mu-date-picker",props:{dateTimeFormat:{type:Object,"default":function(){return r.dateTimeFormat}},autoOk:{type:Boolean,"default":!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,"default":"dialog",validator:function(e){return e&&["dialog","inline"].indexOf(e)!==-1}},disableYearSelection:{type:Boolean},firstDayOfWeek:{type:Number},mode:{type:String,"default":"portrait",validator:function(e){return e&&["portrait","landscape"].indexOf(e)!==-1}},shouldDisableDate:{type:Function},format:{type:String,"default":"YYYY-MM-DD"},maxDate:{type:String},minDate:{type:String},label:{type:String},labelFloat:{type:Boolean,"default":!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,"default":!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,"default":!1},underlineShow:{type:Boolean,"default":!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},value:{type:String}},computed:{maxLimitDate:function(){return this.maxDate?r.strFormatToDate(this.maxDate,this.format):void 0},minLimitDate:function(){return this.minDate?r.strFormatToDate(this.minDate,this.format):void 0}},data:function(){return{inputValue:this.value,dialogDate:null}},methods:{handleClick:function(){var e=this;this.disabled||setTimeout(function(){e.openDialog()},0)},handleFocus:function(e){e.target.blur(),this.$emit("focus",e)},openDialog:function(){this.disabled||(this.dialogDate=this.inputValue?r.strFormatToDate(this.inputValue,this.format):new Date,this.$refs.dialog.open=!0)},handleAccept:function(e){var t=r.dateToStr(e,this.format);this.inputValue!==t&&(this.inputValue=t,this.$emit("change",t))}},watch:{value:function(e){this.inputValue=e},inputValue:function(e){this.$emit("input",e)}},components:{"text-field":l["default"],"date-picker-dialog":c["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(21),o=n(7),r=i(o),s=n(32),l=i(s),u=n(381),c=i(u);t["default"]={props:{dateTimeFormat:{type:Object,"default":a.dateTimeFormat},autoOk:{type:Boolean},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,"default":"dialog",validator:function(e){return e&&["dialog","inline"].indexOf(e)!==-1}},disableYearSelection:{type:Boolean},firstDayOfWeek:{type:Number},initialDate:{type:Date,"default":function(){return new Date}},maxDate:{type:Date},minDate:{type:Date},mode:{type:String,"default":"portrait",validator:function(e){return e&&["portrait","landscape"].indexOf(e)!==-1}},shouldDisableDate:{type:Function}},data:function(){return{open:!1,showCalendar:!1,trigger:null}},mounted:function(){this.trigger=this.$el},methods:{handleAccept:function(e){this.$emit("accept",e),this.open=!1},handleDismiss:function(){this.dismiss()},handleClose:function(e){this.dismiss()},dismiss:function(){this.open=!1,this.$emit("dismiss")},hideCanlendar:function(){this.showCalendar=!1}},watch:{open:function(e){e&&(this.showCalendar=!0)}},render:function(e){var t=this.showCalendar?e(c["default"],{props:{autoOk:this.autoOk,dateTimeFormat:this.dateTimeFormat,okLabel:this.okLabel,cancelLabel:this.cancelLabel,disableYearSelection:this.disableYearSelection,shouldDisableDate:this.shouldDisableDate,firstDayOfWeek:this.firstDayOfWeek,initialDate:this.initialDate,maxDate:this.maxDate,minDate:this.minDate,mode:this.mode},on:{accept:this.handleAccept,dismiss:this.handleDismiss}}):"";return e("div",{style:{}},["dialog"===this.container?e(l["default"],{props:{open:this.open,dialogClass:["mu-date-picker-dialog",this.mode]},on:{close:this.handleClose,hide:this.hideCanlendar}},[t]):e(r["default"],{props:{trigger:this.trigger,overlay:!1,open:this.open},on:{close:this.handleClose,hide:this.hideCanlendar}},[t])])}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={props:{selected:{type:Boolean,"default":!1},date:{type:Date},disabled:{type:Boolean,"default":!1}},data:function(){return{hover:!1}},computed:{isNow:function(){var e=new Date;return this.date&&this.date.getYear()===e.getYear()&&this.date.getMonth()===e.getMonth()&&this.date.getDate()===e.getDate()},dayButtonClass:function(){return{selected:this.selected,hover:this.hover,"mu-day-button":!0,disabled:this.disabled,now:this.isNow}}},methods:{handleHover:function(){(0,i.isPc)()&&!this.disabled&&(this.hover=!0)},handleHoverExit:function(){this.hover=!1},handleClick:function(e){this.$emit("click",e)}},render:function(e){return this.date?e("button",{"class":this.dayButtonClass,on:{mouseenter:this.handleHover,mouseleave:this.handleHoverExit,click:this.handleClick},domProps:{disabled:this.disabled}},[e("div",{"class":"mu-day-button-bg"}),e("span",{"class":"mu-day-button-text",domProps:{innerHTML:this.date.getDate()}})]):e("span",{"class":"mu-day-empty"})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={props:{year:{type:[String,Number]},selected:{type:Boolean,"default":!1}},data:function(){return{hover:!1}},mounted:function(){this.selected&&this.$parent.scrollToSelectedYear(this.$el)},methods:{handleHover:function(){(0,i.isPc)()&&(this.hover=!0)},handleHoverExit:function(){this.hover=!1},handleClick:function(e){this.$emit("click",e)}},watch:{selected:function(e){e&&this.$parent.scrollToSelectedYear(this.$el)}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(24),o=i(a),r=n(1);t["default"]={mixins:[o["default"]],name:"mu-dialog",props:{dialogClass:{type:[String,Array,Object]},title:{type:String},titleClass:{type:[String,Array,Object]},bodyClass:{type:[String,Array,Object]},actionsContainerClass:{type:[String,Array,Object]},scrollable:{type:Boolean,"default":!1}},computed:{bodyStyle:function(){return{"overflow-x":"hidden","overflow-y":this.scrollable?"auto":"hidden","-webkit-overflow-scrolling":"touch","max-height":this.scrollable?this.maxDialogContentHeight+"px":"none"}},showTitle:function(){return this.title||this.$slots&&this.$slots.title&&this.$slots.title.length>0},showFooter:function(){return this.$slots&&this.$slots.actions&&this.$slots.actions.length>0},headerClass:function(){var e=this.scrollable,t=[];return e&&t.push("scrollable"),t.concat((0,r.convertClass)(this.titleClass))},footerClass:function(){var e=this.scrollable,t=[];return e&&t.push("scrollable"),t.concat((0,r.convertClass)(this.actionsContainerClass))}},data:function(){return{maxDialogContentHeight:null}},mounted:function(){this.setMaxDialogContentHeight()},updated:function(){var e=this;setTimeout(function(){e.setMaxDialogContentHeight()},0)},methods:{setMaxDialogContentHeight:function(){var e=window.innerHeight-128;this.$refs.footer&&(e-=this.$refs.footer.offsetHeight),this.title&&(e-=this.$refs.title.offsetHeight),this.maxDialogContentHeight=e},overlayClick:function(){this.$emit("close","overlay")},escPress:function(){this.$emit("close","esc")},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-divider",props:{inset:{type:Boolean,"default":!1},shallowInset:{type:Boolean,"default":!1}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(12),o=i(a),r=n(60),s=i(r),l=n(57),u=i(l),c=n(25),d=n(1),f=["msTransitionEnd","mozTransitionEnd","oTransitionEnd","webkitTransitionEnd","transitionend"];t["default"]={name:"mu-drawer",props:{right:{type:Boolean,"default":!1},open:{type:Boolean,"default":!1},docked:{type:Boolean,"default":!0},width:{type:[Number,String]},zDepth:{type:Number,"default":2}},data:function(){return{overlayZIndex:(0,c.getZIndex)(),zIndex:(0,c.getZIndex)()}},computed:{drawerStyle:function(){return{width:(0,d.getWidth)(this.width),"z-index":this.docked?"":this.zIndex}}},methods:{overlayClick:function(){this.$emit("close","overlay")},escPress:function(){this.$emit("close","keyboard")},bindTransition:function(){var e=this;this.handleTransition=function(t){"transform"===t.propertyName&&(e.docked||e.$emit(e.open?"show":"hide"))},f.forEach(function(t){e.$el.addEventListener(t,e.handleTransition)})},unBindTransition:function(){var e=this;this.handleTransition&&f.forEach(function(t){e.$el.removeEventListener(t,e.handleTransition)})},resetZIndex:function(){this.overlayZIndex=(0,c.getZIndex)(),this.zIndex=(0,c.getZIndex)()}},watch:{open:function(e){e&&!this.docked?u["default"].open(this):u["default"].close(this)},docked:function(e,t){e&&!t&&u["default"].close(this)}},mounted:function(){var e=this;this.open&&!this.docked&&u["default"].open(this),window.addEventListener("keydown",function(t){"esc"!==(0,o["default"])(t)||e.docked||e.escPress()}),this.bindTransition()},beforeDestroy:function(){u["default"].close(this),this.unBindTransition()},components:{paper:s["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(7),o=i(a),r=n(26),s=n(1),l=n(58),u=i(l);t["default"]={name:"mu-dropDown-menu",mixins:[u["default"]],props:{value:{},maxHeight:{type:Number},autoWidth:{type:Boolean,"default":!1},multiple:{type:Boolean,"default":!1},disabled:{type:Boolean,"default":!1},labelClass:{type:[String,Array,Object]},menuClass:{type:[String,Array,Object]},menuListClass:{type:[String,Array,Object]},underlineClass:{type:[String,Array,Object]},iconClass:{type:[String,Array,Object]},openImmediately:{type:Boolean,"default":!1},anchorOrigin:{type:Object,"default":function(){return{vertical:"top",horizontal:"left"}}},anchorEl:{type:Element},scroller:{type:[HTMLDocument,Element,Window]}},data:function(){return{openMenu:!1,trigger:null,menuWidth:null,label:""}},mounted:function(){this.trigger=this.anchorEl||this.$el,this.openMenu=this.openImmediately,this.label=this.getText(),this.setMenuWidth()},methods:{handleClose:function(){this.$emit("close"),this.openMenu=!1},handleOpen:function(){this.$emit("open"),this.openMenu=!0},itemClick:function(){this.multiple||this.handleClose()},change:function(e){this.$emit("change",e)},setMenuWidth:function(){this.$el&&(this.menuWidth=this.$el.offsetWidth)},onResize:function(){this.setMenuWidth()},getText:function(){var e=this;if(!this.$slots||!this.$slots["default"]||0===this.$slots.length||(0,s.isNull)(this.value))return"";var t=[];return this.$slots["default"].forEach(function(n){if(n.componentOptions&&n.componentOptions.propsData&&!(0,s.isNull)(n.componentOptions.propsData.value)){var i=n.componentOptions.propsData,a=i.value,o=i.title;return a===e.value||e.multiple&&e.value.length&&e.value.indexOf(a)!==-1?(t.push(o),!1):void 0}}),t.join(",")}},updated:function(){this.setMenuWidth()},watch:{anchorEl:function(e){e&&(this.trigger=e)},value:function(){this.label=this.getText()}},components:{popover:o["default"],"mu-menu":r.menu}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(2),s=i(r),l=n(1);t["default"]={name:"mu-flat-button",props:{icon:{type:String},iconClass:{type:[String,Array,Object]},type:{type:String},label:{type:String},labelPosition:{type:String,"default":"after"},labelClass:{type:[String,Array,Object],"default":""},primary:{type:Boolean,"default":!1},secondary:{type:Boolean,"default":!1},disabled:{type:Boolean,"default":!1},keyboardFocused:{type:Boolean,"default":!1},href:{type:String,"default":""},target:{type:String},backgroundColor:{type:String,"default":""},color:{type:String,"default":""},hoverColor:{type:String,"default":""},rippleColor:{type:String},rippleOpacity:{type:Number}},methods:{handleClick:function(e){this.$emit("click",e)},handleKeyboardFocus:function(e){this.$emit("keyboardFocus",e),this.$emit("keyboard-focus",e)},handleHover:function(e){this.$emit("hover",e)},handleHoverExit:function(e){this.$emit("hoverExit",e),this.$emit("hover-exit",e)}},computed:{buttonStyle:function(){return{"background-color":this.hover?(0,l.getColor)(this.hoverColor):(0,l.getColor)(this.backgroundColor),color:(0,l.getColor)(this.color)}},buttonClass:function(){return{"mu-flat-button-primary":this.primary,"mu-flat-button-secondary":this.secondary,"label-before":"before"===this.labelPosition,"no-label":!this.label}}},components:{"abstract-button":o["default"],icon:s["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-flexbox",props:{gutter:{type:Number,"default":8},orient:{type:String,"default":"horizontal"},justify:String,align:String,wrap:String},computed:{styles:function(){return{"justify-content":this.justify,"align-items":this.align,"flex-wrap":this.wrap}}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-flexbox-item",props:{order:{type:[Number,String],"default":0},grow:{type:[Number,String],"default":1},shrink:{type:[Number,String],"default":1},basis:{type:[Number,String],"default":"auto"}},computed:{itemStyle:function(){var e={},t="horizontal"===this.$parent.orient?"marginLeft":"marginTop";return e[t]=this.$parent.gutter+"px",e.flex=this.grow+" "+this.shrink+" "+this.basis,e.order=this.order,e}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(2),s=i(r),l=n(1);t["default"]={name:"mu-float-button",props:{icon:{type:String},iconClass:{type:[String,Array,Object],"default":""},type:{type:String},href:{type:String,"default":""},target:{type:String},disabled:{type:Boolean,"default":!1},secondary:{type:Boolean,"default":!1},mini:{type:Boolean,"default":!1},backgroundColor:{type:String,"default":""}},computed:{buttonClass:function(){var e=[];return this.secondary&&e.push("mu-float-button-secondary"),this.mini&&e.push("mu-float-button-mini"),e.join(" ")},buttonStyle:function(){return{"background-color":(0,l.getColor)(this.backgroundColor)}}},methods:{handleClick:function(e){this.$emit("click",e)},handleKeyboardFocus:function(e){this.$emit("keyboardFocus",e),this.$emit("keyboard-focus",e)},handleHover:function(e){this.$emit("hover",e)},handleHoverExit:function(e){this.$emit("hoverExit",e),this.$emit("hover-exit",e)}},components:{"abstract-button":o["default"],icon:s["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-col",props:{width:{type:String,"default":"100"},tablet:{type:String,"default":""},desktop:{type:String,"default":""}},computed:{classObj:function n(){var e="col-"+this.width,n={};if(n[e]=!0,this.tablet){var t="tablet-"+this.tablet;n[t]=!0}if(this.desktop){var i="desktop-"+this.desktop;n[i]=!0}return n}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-row",props:{gutter:{type:Boolean,"default":!1}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-grid-list",props:{cellHeight:{type:Number,"default":180},cols:{type:Number,"default":2},padding:{type:Number,"default":4}},computed:{gridListStyle:function(){return{margin:-this.padding/this.cols+"px"}}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-grid-tile",props:{actionPosition:{type:String,"default":"right",validator:function(e){return["left","right"].indexOf(e)!==-1}},cols:{type:Number,"default":1},rows:{type:Number,"default":1},title:{type:String},subTitle:{type:String},titlePosition:{type:String,"default":"bottom",validator:function(e){return["top","bottom"].indexOf(e)!==-1}},titleBarClass:{type:[String,Array,Object]}},computed:{tileClass:function(){var e=[];return"top"===this.titlePosition&&e.push("top"),"left"===this.actionPosition&&e.push("action-left"),this.$slots&&this.$slots.title&&this.$slots.subTitle&&this.$slots.title.length>0&&this.$slots.subTitle.length>0&&e.push("multiline"),e},style:function(){return{width:this.cols/this.$parent.cols*100+"%",padding:this.$parent.padding/2+"px",height:this.$parent.cellHeight*this.rows+"px"}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={name:"mu-icon",props:{value:{type:String},size:{type:Number},color:{type:String,"default":""}},computed:{iconStyle:function(){return{"font-size":this.size+"px",width:this.size+"px",height:this.size+"px",color:(0,i.getColor)(this.color)}}},methods:{handleClick:function(e){this.$emit("click",e)}},render:function(e){var t=this.value,n=this.iconStyle,i=this.handleClick;if(!t)return null;var a=0!==t.indexOf(":"),o=a?t:"";return e("i",{"class":["mu-icon",a?"material-icons":t.substring(1)],style:n,on:{click:i}},o)}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(2),s=i(r),l=n(34),u=i(l);t["default"]={name:"mu-icon-button",props:{icon:{type:String},iconClass:{type:[String,Array,Object],"default":""},type:{type:String},href:{type:String,"default":""},target:{type:String},disabled:{type:Boolean,"default":!1},keyboardFocused:{type:Boolean,"default":!1},tooltip:{type:String},tooltipPosition:{type:String,"default":"bottom-center"},touch:{type:Boolean,"default":!1}},computed:{verticalPosition:function(){var e=this.tooltipPosition.split("-");return e[0]},horizontalPosition:function(){var e=this.tooltipPosition.split("-");return e[1]}},data:function(){return{tooltipShown:!1,tooltipTrigger:null}},methods:{handleClick:function(e){this.$emit("click",e)},handleHover:function(e){this.tooltipShown=!0,this.$emit("hover",e)},handleHoverExit:function(e){this.tooltipShown=!1,this.$emit("hoverExit",e),this.$emit("hover-exit",e)},handleKeyboardFocus:function(e){this.$emit("keyboardFocus",e),this.$emit("keyboard-focus",e)},handleStop:function(e){e.stopPropagation()}},mounted:function(){this.tooltipTrigger=this.$el},components:{"abstract-button":o["default"],icon:s["default"],tooltip:u["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(23),o=i(a),r=n(7),s=i(r),l=n(26);t["default"]={name:"mu-icon-menu",props:{icon:{type:String,required:!0},iconClass:{type:[String,Array,Object]},menuClass:{type:[String,Array,Object]},menuListClass:{type:[String,Array,Object]},value:{},multiple:{type:Boolean,"default":!1},desktop:{type:Boolean,"default":!1},open:{type:Boolean,"default":!1},maxHeight:{type:Number},anchorOrigin:{type:Object,"default":function(){return{vertical:"top",horizontal:"left"}}},targetOrigin:{type:Object,"default":function(){return{vertical:"top",horizontal:"left"}}},scroller:{type:[HTMLDocument,Element,Window]},itemClickClose:{type:Boolean,"default":!0},tooltip:{type:String},tooltipPosition:{type:String,"default":"bottom-center"}},data:function(){return{openMenu:this.open,trigger:null}},methods:{handleOpen:function(){this.openMenu=!0,this.$emit("open")},handleClose:function(){this.openMenu=!1,this.$emit("close")},change:function(e){this.$emit("change",e)},itemClick:function(e){this.itemClickClose&&this.handleClose(),this.$emit("itemClick",e),this.$emit("item-click",e)}},mounted:function(){this.trigger=this.$el},watch:{open:function(e,t){e!==t&&(this.openMenu=e)}},components:{"icon-button":o["default"],popover:s["default"],"mu-menu":l.menu}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(52),o=i(a),r=n(59),s=i(r);t["default"]={name:"mu-infinite-scroll",mixins:[s["default"]],props:{loading:{type:Boolean,"default":!1},loadingText:{type:String,"default":"正在加载。。。"}},methods:{onScroll:function(){if(!this.loading){var e=this.scroller,t=e===window,n=t?e.scrollY:e.scrollTop,i=t?document.documentElement.scrollHeight||document.body.scrollHeight:e.scrollHeight,a=i-n-5,o=t?window.innerHeight:e.offsetHeight;a<=o&&this.$emit("load")}}},components:{circular:o["default"]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={props:{mergeStyle:{type:Object,"default":function(){return{}}},color:{type:String,"default":""},opacity:{type:Number}},computed:{styles:function(){return(0,i.merge)({},{color:this.color,opacity:this.opacity},this.mergeStyle)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={name:"circle",props:{size:{type:Number,"default":24},color:{type:String,"default":""},borderWidth:{type:Number,"default":3},secondary:{type:Boolean,"default":!1}},computed:{spinnerStyle:function(){return{"border-color":(0,i.getColor)(this.color)}}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={methods:{beforeEnter:function(e){e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.style.height="0",e.style.paddingTop=0,e.style.paddingBottom=0},enter:function(e){e.dataset.oldOverflow=e.style.overflow,e.style.display="block",0!==e.scrollHeight?e.style.height=e.scrollHeight+"px":(e.style.height="",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom),e.style.overflow="hidden"},afterEnter:function(e){e.style.display="",e.style.overflow=e.dataset.oldOverflow},beforeLeave:function(e){e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.dataset.oldOverflow=e.style.overflow,e.style.display="block",0!==e.scrollHeight&&(e.style.height=e.scrollHeight+"px"),e.style.overflow="hidden"},leave:function(e){0!==e.scrollHeight&&setTimeout(function(){e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0})},afterLeave:function(e){e.style.display="none",e.style.height="",e.style.overflow=e.dataset.oldOverflow,e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{color:{type:String,"default":""},opacity:{type:Number}},computed:{style:function(){return{color:this.color,opacity:this.opacity}}},methods:{setRippleSize:function(){var e=this.$refs.innerCircle,t=e.offsetHeight,n=e.offsetWidth,i=Math.max(t,n),a=0;e.style.top.indexOf("px",e.style.top.length-2)!==-1&&(a=parseInt(e.style.top)),e.style.height=i+"px",e.style.top=t/2-i/2+a+"px"}},mounted:function(){this.setRippleSize()},updated:function(){this.setRippleSize()}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-overlay",props:{show:{type:Boolean,"default":!1},fixed:{type:Boolean,"default":!1},onClick:{type:Function},opacity:{type:Number,"default":.4},color:{type:String,"default":"#000"},zIndex:{type:Number}},computed:{overlayStyle:function(){return{opacity:this.opacity,"background-color":this.color,position:this.fixed?"fixed":"","z-index":this.zIndex}}},methods:{prevent:function(e){e.preventDefault(),e.stopPropagation()},handleClick:function(){this.onClick&&this.onClick()}}}},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(406),r=a(o),s=n(35),l=i(s);t["default"]={props:{centerRipple:{type:Boolean,"default":!0},rippleWrapperClass:{},color:{type:String,"default":""},opacity:{type:Number}},data:function(){return{nextKey:0,ripples:[]}},mounted:function(){this.ignoreNextMouseDown=!1},methods:{start:function(e,t){return this.ignoreNextMouseDown&&!t?void(this.ignoreNextMouseDown=!1):(this.ripples.push({key:this.nextKey++,color:this.color,opacity:this.opacity,style:this.centerRipple?{}:this.getRippleStyle(e)}),void(this.ignoreNextMouseDown=t))},end:function(){0!==this.ripples.length&&(this.ripples.splice(0,1),this.stopListeningForScrollAbort())},stopListeningForScrollAbort:function(){this.handleMove||(this.handleMove=this.handleTouchMove.bind(this)),document.body.removeEventListener("touchmove",this.handleMove,!1)},startListeningForScrollAbort:function(e){this.firstTouchY=e.touches[0].clientY,this.firstTouchX=e.touches[0].clientX,document.body.addEventListener("touchmove",this.handleMove,!1)},handleMouseDown:function(e){0===e.button&&this.start(e,!1)},handleTouchStart:function(e){e.touches&&(this.startListeningForScrollAbort(e),this.startTime=Date.now()),this.start(e.touches[0],!0)},handleTouchMove:function(e){var t=Math.abs(e.touches[0].clientY-this.firstTouchY),n=Math.abs(e.touches[0].clientX-this.firstTouchX);(t>6||n>6)&&this.end()},getRippleStyle:function(e){var t=this.$refs.holder,n=t.offsetHeight,i=t.offsetWidth,a=l.getOffset(t),o=e.touches&&e.touches.length,r=o?e.touches[0].pageX:e.pageX,s=o?e.touches[0].pageY:e.pageY,u=r-a.left,c=s-a.top,d=this.calcDiag(u,c),f=this.calcDiag(i-u,c),h=this.calcDiag(i-u,n-c),p=this.calcDiag(u,n-c),m=Math.max(d,f,h,p),v=2*m,y=u-m,b=c-m;return{directionInvariant:!0,height:v+"px",width:v+"px",top:b+"px",left:y+"px"}},calcDiag:function(e,t){return Math.sqrt(e*e+t*t)}},components:{"circle-ripple":r["default"]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={name:"mu-linear-progress",props:{max:{type:Number,"default":100},min:{type:Number,"default":0},mode:{type:String,"default":"indeterminate",validator:function(e){return["indeterminate","determinate"].indexOf(e)!==-1}},value:{type:Number,"default":0},color:{type:String},size:{type:Number}},computed:{percent:function(){return(this.value-this.min)/(this.max-this.min)*100},linearStyle:function(){var e=this.size,t=this.color,n=this.mode,a=this.percent;return{height:e+"px","background-color":(0,i.getColor)(t),"border-radius":(e?e/2:"")+"px",width:"determinate"===n?a+"%":""}},linearClass:function(){return"mu-linear-progress-"+this.mode}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-list",props:{nestedLevel:{type:Number,"default":0},value:{}},methods:{handleChange:function(e){this.$emit("change",e)},handleItemClick:function(e){this.$emit("itemClick",e),this.$emit("item-click",e)}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(23),s=i(r),l=n(77),u=i(l),c=n(74),d=i(c),f=n(1);t["default"]={name:"mu-list-item",props:{href:{type:String},target:{type:String},title:{type:String,"default":""},titleClass:{type:[String,Object,Array]},afterText:{type:String,"default":""},afterTextClass:{type:[String,Object,Array]},describeText:{type:String,"default":""},describeTextClass:{type:[String,Object,Array]},describeLine:{type:Number,"default":2},inset:{type:Boolean,"default":!1},nestedListClass:{type:[String,Object,Array]},open:{type:Boolean,"default":!0},toggleNested:{type:Boolean,"default":!1},toggleIconClass:{type:[String,Object,Array]},disabled:{type:Boolean,"default":!1},disableRipple:{type:Boolean,"default":!1},value:{}},data:function(){return{nestedOpen:this.open}},computed:{hasAvatar:function(){return this.$slots&&(this.$slots.leftAvatar&&this.$slots.leftAvatar.length>0||this.$slots.rightAvatar&&this.$slots.rightAvatar.length>0)},nestedLevel:function(){return this.$parent.nestedLevel+1},showLeft:function(){return this.$slots&&(this.$slots.left&&this.$slots.left.length>0||this.$slots.leftAvatar&&this.$slots.leftAvatar.length>0)},showRight:function(){return this.toggleNested||this.$slots&&(this.$slots.right&&this.$slots.right.length>0||this.$slots.rightAvatar&&this.$slots.rightAvatar.length>0)},showTitleRow:function(){return this.title||this.$slots&&this.$slots.title&&this.$slots.title.length>0||this.afterText||this.$slots&&this.$slots.after&&this.$slots.after.length>0},showDescribe:function(){
return this.describeText||this.$slots&&this.$slots.describe&&this.$slots.describe.length>0},itemClass:function(){var e=["mu-item"];return(this.showLeft||this.inset)&&e.push("show-left"),this.showRight&&e.push("show-right"),this.hasAvatar&&e.push("has-avatar"),this.selected&&e.push("selected"),e.join(" ")},itemStyle:function(){return{"margin-left":18*(this.nestedLevel-1)+"px"}},textStyle:function(){return{"max-height":18*this.describeLine+"px","-webkit-line-clamp":this.describeLine}},showNested:function(){return this.nestedOpen&&this.$slots&&this.$slots.nested&&this.$slots.nested.length>0},selected:function(){return(0,f.isNotNull)(this.$parent.value)&&(0,f.isNotNull)(this.value)&&this.$parent.value===this.value},nestedSelectValue:function(){return this.$parent.value}},methods:{handleToggleNested:function(){this.nestedOpen=!this.nestedOpen,this.$emit("toggleNested",this.nestedOpen),this.$emit("toggle-nested",this.nestedOpen)},handleClick:function(e){this.$emit("click",e),this.$parent.handleItemClick&&this.$parent.handleItemClick(this),(0,f.isNotNull)(this.value)&&this.$parent.handleChange(this.value),this.toggleNested&&this.handleToggleNested()},handleKeyboardFocus:function(e){this.$emit("keyboardFocus",e),this.$emit("keyboard-focus",e)},handleHover:function(e){this.$emit("hover",e)},handleHoverExit:function(e){this.$emit("hoverExit",e),this.$emit("hover-exit",e)},handleNestedChange:function(e){this.$parent.handleChange(e)}},watch:{open:function(e,t){e!==t&&(this.nestedOpen=e)}},components:{"abstract-button":o["default"],"mu-list":u["default"],"icon-button":s["default"],"expand-transition":d["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),o=n(12),r=i(o),s=n(33),l=i(s);t["default"]={name:"mu-menu",props:{desktop:{type:Boolean,"default":!1},multiple:{type:Boolean,"default":!1},autoWidth:{type:Boolean,"default":!0},width:{type:[String,Number]},maxHeight:{type:Number},disableAutoFocus:{type:Boolean,"default":!1},initiallyKeyboardFocused:{type:Boolean,"default":!1},listClass:{type:[String,Object,Array]},popover:{type:Boolean,"default":!1},value:{}},data:function(){return{focusIndex:-1,isKeyboardFocused:!1}},computed:{keyWidth:function(){return this.desktop?64:56},contentWidth:function(){return this.autoWidth?"":(0,a.getWidth)(this.width)},menuListClass:function(){var e=this.desktop,t=this.listClass,n=[];return e&&n.push("mu-menu-destop"),n.concat((0,a.convertClass)(t))}},mounted:function(){this.setWidth();var e=this.getSelectedIndex();this.setScollPosition(),this.focusIndex=this.disableAutoFocus?-1:e>=0?e:this.initiallyKeyboardFocused?0:-1,this.isKeyboardFocused=this.initiallyKeyboardFocused,this.popover&&this.$el.focus()},beforeUpdate:function(){var e=this.getSelectedIndex();this.focusIndex=this.disableAutoFocus?-1:e>=0?e:0},updated:function(){this.setWidth()},methods:{clickoutside:function(){this.setFocusIndex(-1,!1)},setWidth:function(){if(this.autoWidth){var e=this.$el,t=this.$refs.list,n=e.offsetWidth;if(0!==n){var i=this.keyWidth,a=1.5*i,o=n/i,r=void 0;o=o<=1.5?1.5:Math.ceil(o),r=o*i,r<a&&(r=a),e.style.width=r+"px",t.style.width=r+"px"}}},handleChange:function(e){this.$emit("change",e)},handleClick:function(e){this.$emit("itemClick",e),this.$emit("item-click",e)},handleKeydown:function(e){var t=(0,r["default"])(e);switch(t){case"down":e.stopPropagation(),e.preventDefault(),this.incrementKeyboardFocusIndex();break;case"tab":e.stopPropagation(),e.preventDefault(),e.shiftKey?this.decrementKeyboardFocusIndex():this.incrementKeyboardFocusIndex();break;case"up":e.stopPropagation(),e.preventDefault(),this.decrementKeyboardFocusIndex()}},decrementKeyboardFocusIndex:function(){var e=this.focusIndex,t=this.getMenuItemCount()-1;e--,e<0&&(e=t),this.setFocusIndex(e,!0)},incrementKeyboardFocusIndex:function(){var e=this.focusIndex,t=this.getMenuItemCount()-1;e++,e>t&&(e=0),this.setFocusIndex(e,!0)},getMenuItemCount:function(){var e=0;return this.$children.forEach(function(t){t._isMenuItem&&!t.disabled&&e++}),e},getSelectedIndex:function(){var e=-1,t=0;return this.$children.forEach(function(n){n.active&&(e=t),n._isMenuItem&&!n.disabled&&t++}),e},setFocusIndex:function(e,t){this.focusIndex=e,this.isKeyboardFocused=t},setScollPosition:function(e){var t=this.desktop,n=null;this.$children.forEach(function(e){e.active&&(n=e)});var i=t?32:48;if(n){var a=n.$el.offsetTop,o=a-i;o<i&&(o=0),this.$refs.list.scrollTop=o}}},watch:{focusIndex:function(e,t){var n=this;if(e!==t){var i=0;this.$children.forEach(function(t){if(t._isMenuItem&&!t.disabled){var a=i===e,o="none";a&&(o=n.isKeyboardFocused?"keyboard-focused":"focused"),t.focusState=o,i++}})}}},directives:{clickoutside:l["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(2),s=i(r),l=n(1),u=n(7),c=i(u),d=n(78),f=i(d);t["default"]={name:"mu-menu-item",props:{href:{type:String},target:{type:String},title:{type:String},titleClass:{type:[String,Object,Array]},afterText:{type:String},afterTextClass:{type:[String,Object,Array]},disabled:{type:Boolean,"default":!1},disableFocusRipple:{type:Boolean,"default":!1},inset:{type:Boolean,"default":!1},leftIcon:{type:String},leftIconColor:{type:String},leftIconClass:{type:[String,Object,Array]},rightIcon:{type:String},rightIconColor:{type:String},rightIconClass:{type:[String,Object,Array]},nestedMenuClass:{type:[String,Object,Array]},nestedMenuListClass:{type:[String,Object,Array]},value:{},nestedMenuValue:{}},computed:{showAfterText:function(){return!this.rightIcon&&this.afterText&&(!this.$slot||!this.$slot.after||0===this.$slot.after.length)},active:function(){return(0,l.isNotNull)(this.$parent.value)&&(0,l.isNotNull)(this.value)&&(this.$parent.value===this.value||this.$parent.multiple&&this.$parent.value.indexOf(this.value)!==-1)}},data:function(){return this._isMenuItem=!0,{openMenu:!1,trigger:null,focusState:"none"}},mounted:function(){this.trigger=this.$el,this.applyFocusState()},methods:{handleClick:function(e){this.$emit("click",e),this.$parent.handleClick(this),this.open(),(0,l.isNotNull)(this.value)&&this.$parent.handleChange(this.value)},filterColor:function(e){return(0,l.getColor)(e)},open:function(){this.openMenu=this.$slots&&this.$slots["default"]&&this.$slots["default"].length>0},close:function(){this.openMenu=!1},handleKeyboardFocus:function(e){this.$emit("keyboardFocus",e),this.$emit("keyboard-focus",e)},handleHover:function(e){this.$emit("hover",e)},handleHoverExit:function(e){this.$emit("hoverExit",e),this.$emit("hover-exit",e)},applyFocusState:function(){var e=this.$refs.button;if(e){var t=e.$el;switch(this.focusState){case"none":t.blur();break;case"focused":t.focus();break;case"keyboard-focused":e.setKeyboardFocus(),t.focus()}}}},watch:{focusState:function(){this.applyFocusState()}},components:{"abstract-button":o["default"],icon:s["default"],popover:c["default"],"mu-menu":f["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a);t["default"]={props:{icon:{type:String},index:{type:Number},isCircle:{type:Boolean,"default":!1},disabled:{type:Boolean,"default":!1},isActive:{type:Boolean,"default":!1},identifier:{type:String}},data:function(){return{}},methods:{handleHover:function(e){this.$emit("hover",e)},handleHoverExit:function(e){this.$emit("hoverExit",e),this.$emit("hover-exit",e)},handleClick:function(){this.index?this.$emit("click",this.index):this.$emit("click",this.identifier)}},components:{"abstract-button":o["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(409),o=i(a),r=n(61),s=i(r),l=n(13),u=i(l),c=n(79),d=i(c);t["default"]={name:"mu-pagination",props:{total:{type:Number,"default":1},current:{type:Number,"default":1},defaultPageSize:{type:Number,"default":10},pageSize:{type:Number},showSizeChanger:{type:Boolean,"default":!1},pageSizeOption:{type:Array,"default":function(){return[10,20,30,40]}}},data:function(){return{leftDisabled:!1,rightDisabled:!1,actualCurrent:this.current,actualPageSize:this.defaultPageSize,totalPageCount:0,pageList:[],quickJumpPage:""}},mounted:function(){this.iconIsDisabled(this.actualCurrent),this.showSizeChanger?this.actualPageSize=this.pageSizeOption[0]:this.pageSize&&(this.actualPageSize=this.pageSize),this.totalPageCount=Math.ceil(this.total/this.actualPageSize),this.pageList=this.calcPageList(this.actualCurrent)},methods:{handleClick:function(e){if("number"==typeof e)this.actualCurrent=e;else switch(e){case"singleBack":this.actualCurrent=Math.max(1,this.actualCurrent-1);break;case"backs":this.actualCurrent=Math.max(1,this.actualCurrent-5);break;case"forwards":this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent+5);break;case"singleForward":this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent+1)}},iconIsDisabled:function(e){this.leftDisabled=1===e,this.rightDisabled=e===this.totalPageCount},calcPageList:function(e){var t=[];if(this.totalPageCount>5){var n=Math.max(2,e-2),i=Math.min(e+2,this.totalPageCount-1);e-1<2&&(i=4),this.totalPageCount-e<2&&(n=this.totalPageCount-3);for(var a=n;a<=i;a++)t.push(a)}else for(var o=2;o<this.totalPageCount;o++)t.push(o);return t},pageSizeAndTotalChange:function(e){this.iconIsDisabled(e),this.pageList=this.calcPageList(e)}},components:{"page-item":o["default"],"select-field":s["default"],"text-field":u["default"],"menu-item":d["default"]},watch:{actualCurrent:function(e){0!==e&&(this.pageSizeAndTotalChange(e),this.$emit("pageChange",e),this.$emit("page-change",e))},actualPageSize:function(e,t){var n=t*(this.actualCurrent-1),i=this.actualCurrent;this.actualCurrent=Math.floor(n/e)+1,this.totalPageCount=Math.ceil(this.total/this.actualPageSize),i===this.actualCurrent&&this.pageSizeAndTotalChange(i),this.$emit("pageSizeChange",e),this.$emit("page-size-change",e)},total:function(e){var t=this.actualCurrent;this.actualCurrent=Math.min(this.totalPageCount,this.actualCurrent),this.totalPageCount=Math.ceil(this.total/this.actualPageSize),t===this.actualCurrent&&this.pageSizeAndTotalChange(t)},current:function(e){this.actualCurrent=e}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-paper",props:{circle:{type:Boolean,"default":!1},rounded:{type:Boolean,"default":!0},zDepth:{type:Number,"default":1}},computed:{paperClass:function(){var e=[];return this.circle&&e.push("mu-paper-circle"),this.rounded&&e.push("mu-paper-round"),e.push("mu-paper-"+this.zDepth),e}}}},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(53),r=a(o),s=n(62),l=a(s),u=n(123),c=a(u),d=n(35),f=i(d),h=36;t["default"]={props:{divider:{type:Boolean,"default":!1},content:{type:String,"default":""},values:{type:Array,"default":function(){return[]}},value:{},textAlign:{type:String,"default":""},width:{type:String,"default":""},visibleItemCount:{type:Number,"default":5}},data:function(){return{animate:!1}},computed:{contentHeight:function(){return h*this.visibleItemCount},valueIndex:function(){return this.values.indexOf(this.value)},dragRange:function(){var e=this.values,t=this.visibleItemCount;return[-h*(e.length-Math.ceil(t/2)),h*Math.floor(t/2)]}},mounted:function(){this.divider||(this.initEvents(),this.doOnValueChange())},methods:{value2Translate:function(e){var t=this.values,n=t.indexOf(e),i=Math.floor(this.visibleItemCount/2);if(n!==-1)return(n-i)*-h},translate2Value:function(e){e=Math.round(e/h)*h;var t=-(e-Math.floor(this.visibleItemCount/2)*h)/h;return this.values[t]},doOnValueChange:function(){var e=this.value,t=this.$refs.wrapper;c["default"].translateElement(t,null,this.value2Translate(e))},doOnValuesChange:function(){var e=this.$el,t=e.querySelectorAll(".mu-picker-item");Array.prototype.forEach.call(t,function(e,t){c["default"].translateElement(e,null,h*t)})},initEvents:function(){var e=this,t=this.$refs.wrapper,n=new l["default"](t),i=0,a=void 0,o=void 0;n.start(function(){i=c["default"].getElementTranslate(t).top}).drag(function(e,n){n.preventDefault(),n.stopPropagation();var r=i+e.y;c["default"].translateElement(t,0,r),a=r-o||r,o=r}).end(function(n){var i=7,o=c["default"].getElementTranslate(t).top,s=void 0;n.time<300&&(s=o+a*i);var l=e.dragRange;e.animate=!0,f.transitionEnd(t,function(){e.animate=!1}),r["default"].nextTick(function(){var n=void 0;n=s?Math.round(s/h)*h:Math.round(o/h)*h,n=Math.max(Math.min(n,l[1]),l[0]),c["default"].translateElement(t,null,n),e.$emit("change",e.translate2Value(n))})})}},watch:{values:function(e){this.valueIndex===-1&&(this.value=(e||[])[0])},value:function(){this.doOnValueChange()}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(412),o=i(a);t["default"]={name:"mu-picker",props:{visibleItemCount:{type:Number,"default":5},values:{type:Array,"default":function(){return[]}},slots:{type:Array,"default":function(){return[]}}},methods:{change:function(e,t){this.$emit("change",t[0],e)}},components:{"picker-slot":o["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(36),o=i(a),r=n(59),s=i(r),l=n(24),u=i(l),c=n(58),d=i(c);t["default"]={name:"mu-popover",mixins:[s["default"],d["default"],u["default"]],props:{overlay:{"default":!1},overlayOpacity:{"default":.01},trigger:{type:Element},autoPosition:{type:Boolean,"default":!0},anchorOrigin:{type:Object,"default":function(){return{vertical:"bottom",horizontal:"left"}}},targetOrigin:{type:Object,"default":function(){return{vertical:"top",horizontal:"left"}}},popoverClass:{type:[String,Object,Array]}},methods:{getAnchorPosition:function(e){var t=e.getBoundingClientRect(),n={top:t.top,left:t.left,width:e.width,height:e.height};return n.right=t.right||n.left+n.width,n.bottom=t.bottom||n.top+n.height,n.middle=n.left+(n.right-n.left)/2,n.center=n.top+(n.bottom-n.top)/2,n},getTargetPosition:function(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}},getElInfo:function(e){var t=e.getBoundingClientRect();return{left:t.left,top:t.top,width:e.offsetWidth,height:e.offsetHeight}},setStyle:function(){if(this.open){var e=this.targetOrigin,t=this.anchorOrigin,n=this.$refs.popup,i=this.getAnchorPosition(this.trigger),a=this.getTargetPosition(n),o={top:i[t.vertical]-a[e.vertical],left:i[t.horizontal]-a[e.horizontal]};if(i.top<0||i.top>window.innerHeight||i.left<0||i.left>window.innerWidth)return void this.close("overflow");this.autoPosition&&(a=this.getTargetPosition(n),o=this.applyAutoPositionIfNeeded(i,a,e,t,o)),n.style.left=Math.max(0,o.left)+"px",n.style.top=Math.max(0,o.top)+"px"}},getOverlapMode:function(e,t,n){return[e,t].indexOf(n)>=0?"auto":e===t?"inclusive":"exclusive"},getPositions:function(e,t){var n=(0,o["default"])({},e),i=(0,o["default"])({},t),a={x:["left","right"].filter(function(e){return e!==i.horizontal}),y:["top","bottom"].filter(function(e){return e!==i.vertical})},r={x:this.getOverlapMode(n.horizontal,i.horizontal,"middle"),y:this.getOverlapMode(n.vertical,i.vertical,"center")};return a.x.splice("auto"===r.x?0:1,0,"middle"),a.y.splice("auto"===r.y?0:1,0,"center"),"auto"!==r.y&&(n.vertical="top"===n.vertical?"bottom":"top","inclusive"===r.y&&(i.vertical=i.vertical)),"auto"!==r.x&&(n.horizontal="left"===n.horizontal?"right":"left","inclusive"===r.y&&(i.horizontal=i.horizontal)),{positions:a,anchorPos:n}},applyAutoPositionIfNeeded:function(e,t,n,i,a){var o=this.getPositions(i,n),r=o.positions,s=o.anchorPos;if(a.top<0||a.top+t.bottom>window.innerHeight){var l=e[s.vertical]-t[r.y[0]];l+t.bottom<=window.innerHeight?a.top=Math.max(0,l):(l=e[s.vertical]-t[r.y[1]],l+t.bottom<=window.innerHeight&&(a.top=Math.max(0,l)))}if(a.left<0||a.left+t.right>window.innerWidth){var u=e[s.horizontal]-t[r.x[0]];u+t.right<=window.innerWidth?a.left=Math.max(0,u):(u=e[s.horizontal]-t[r.x[1]],u+t.right<=window.innerWidth&&(a.left=Math.max(0,u)))}return a},close:function(e){this.$emit("close",e)},overlayClick:function(){this.close("overlay")},clickOutSide:function(e){this.close("clickOutSide")},onScroll:function(){this.setStyle()},onResize:function(){this.setStyle()},escPress:function(){this.close("esc")},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},mounted:function(){this.setStyle()},updated:function(){var e=this;setTimeout(function(){e.setStyle()},0)}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(24),o=i(a),r=n(1);t["default"]={name:"mu-popup",mixins:[o["default"]],props:{popupClass:{type:[String,Object,Array]},popupTransition:{type:String,"default":""},position:{type:String,"default":""}},data:function(){return{transition:this.popupTransition}},created:function(){this.popupTransition||(this.transition="popup-slide-"+this.position)},computed:{popupCss:function(){var e=this.position,t=this.popupClass,n=[];return e&&n.push("mu-popup-"+e),n.concat((0,r.convertClass)(t))}},methods:{overlayClick:function(){this.$emit("close","overlay")},escPress:function(){this.$emit("close","esc")},show:function(){this.$emit("show")},hide:function(){this.$emit("hide")}},watch:{popupTransition:function(e,t){e!==t&&(this.transition=e)}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),o=i(a),r=n(31),s=i(r);t["default"]={name:"mu-radio",props:{name:{type:String},value:{type:String},nativeValue:{type:String},label:{type:String,"default":""},labelLeft:{type:Boolean,"default":!1},labelClass:{type:[String,Object,Array]},disabled:{type:Boolean,"default":!1},uncheckIcon:{type:String,"default":""},checkedIcon:{type:String,"default":""},iconClass:{type:[String,Object,Array]}},data:function(){return{inputValue:this.value}},watch:{value:function(e){this.inputValue=e},inputValue:function(e){this.$emit("input",e)}},methods:{handleClick:function(){},handleMouseDown:function(e){this.disabled||0===e.button&&this.$children[0].start(e)},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(e){this.disabled||this.$children[0].start(e)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{icon:o["default"],"touch-ripple":s["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(1),s=n(2),l=i(s);t["default"]={name:"mu-raised-button",props:{icon:{type:String},iconClass:{type:[String,Array,Object]},label:{type:String},labelPosition:{type:String,"default":"after"},labelClass:{type:[String,Array,Object],"default":""},primary:{type:Boolean,"default":!1},secondary:{type:Boolean,"default":!1},disabled:{type:Boolean,"default":!1},keyboardFocused:{type:Boolean,"default":!1},fullWidth:{type:Boolean,"default":!1},type:{type:String},href:{type:String,"default":""},target:{type:String},backgroundColor:{type:String,"default":""},color:{type:String,"default":""},rippleColor:{type:String},rippleOpacity:{type:Number}},data:function(){return{focus:!1}},computed:{buttonStyle:function(){return{"background-color":(0,r.getColor)(this.backgroundColor),color:(0,r.getColor)(this.color)}},inverse:function(){return this.primary||this.secondary||this.backgroundColor},buttonClass:function(){return{"mu-raised-button-primary":this.primary,"mu-raised-button-secondary":this.secondary,"label-before":"before"===this.labelPosition,"mu-raised-button-inverse":this.inverse,"mu-raised-button-full":this.fullWidth,focus:this.focus,"no-label":!this.label}}},methods:{handleClick:function(e){this.$emit("click",e)},handleKeyboardFocus:function(e){this.focus=e,this.$emit("keyboardFocus",e),this.$emit("keyboard-focus",e)},handleHover:function(e){this.$emit("hover",e)},handleHoverExit:function(e){this.$emit("hoverExit",e),this.$emit("hover-exit",e)}},components:{"abstract-button":o["default"],icon:l["default"]}}},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(62),r=a(o),s=n(52),l=a(s),u=n(35),c=i(u),d=130,f=-68;t["default"]={name:"mu-refresh-control",props:{refreshing:{type:Boolean,"default":!1},trigger:{type:Element}},data:function(){return{y:0,draging:!1,state:"pending"}},computed:{refreshStyle:function(){var e={};if(!this.refreshing&&this.draging){var t="translate3d(0, "+(this.y+f)+"px, 0) ";e["-webkit-transform"]=e.transform=t}return e},circularStyle:function(){var e={};if(!this.refreshing&&this.draging){var t=this.y/d,n="rotate("+360*t+"deg)",i=this.y/Math.abs(f);e["-webkit-transform"]=e.transform=n,e.opacity=i}return e},refreshClass:function(){var e=[];switch(this.state){case"pending":break;case"ready":e.push("mu-refresh-control-noshow");break;case"dragStart":e.push("mu-refresh-control-hide");break;case"dragAnimate":e.push("mu-refresh-control-animate"),e.push("mu-refresh-control-hide");break;case"refreshAnimate":e.push("mu-refresh-control-animate"),e.push("mu-refresh-control-noshow")}return this.refreshing&&e.push("mu-refresh-control-refreshing"),e}},mounted:function(){this.bindDrag()},beforeDestory:function(){this.unbindDrag()},methods:{clearState:function(){this.state="ready",this.draging=!1,this.y=0},bindDrag:function(){var e=this;if(this.trigger){var t=this.drager=new r["default"](this.trigger),n=c.getOffset(this.$el).top+f;this.state="ready",t.start(function(){if(!e.refreshing){e.state="dragStart";var t=c.getOffset(e.$el).top;t===n&&(e.draging=!0)}}).drag(function(i,a){if(!(i.y<5)){var o=c.getOffset(e.$el).top;if(e.refreshing||!n||o<n)return void(e.draging=!1);o!==n||e.draging||(e.draging=!0,t.reset(a)),e.draging&&i.y>0&&(a.preventDefault(),a.stopPropagation()),e.y=i.y,e.y<0&&(e.y=1),e.y>d&&(e.y=d)}}).end(function(t,n){if(!t.y||t.y<5)return void e.clearState();var i=t.y+f>0&&e.draging;e.state="dragAnimate",i?(e.draging=!1,e.$emit("refresh")):(e.y=0,c.transitionEnd(e.$el,e.clearState.bind(e)))})}},unbindDrag:function(){this.drager&&(this.drager.destory(),this.drager=null)}},watch:{refreshing:function(e){e?this.state="refreshAnimate":c.transitionEnd(this.$el,this.clearState.bind(this))},trigger:function(e,t){e!==t&&(this.unbindDrag(),this.bindDrag())}},components:{circular:l["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(13),o=i(a),r=n(56),s=i(r);t["default"]={name:"mu-select-field",props:{label:{type:String},labelFloat:{type:Boolean,"default":!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,"default":!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},maxHeight:{type:Number},autoWidth:{type:Boolean,"default":!1},fullWidth:{type:Boolean,"default":!1},underlineShow:{type:Boolean,"default":!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},dropDownIconClass:{type:[String,Array,Object]},value:{},multiple:{type:Boolean,"default":!1},scroller:{type:[HTMLDocument,Element,Window]}},data:function(){var e=this.value;return e||(e=""),!this.multiple||e instanceof Array||(e=[]),{anchorEl:null,inputValue:e}},mounted:function(){this.anchorEl=this.$children[0].$refs.input},methods:{handlehange:function(e){if(e!==this.inputValue){if(this.multiple){var t=this.inputValue.indexOf(e);t===-1?this.inputValue.push(e):this.inputValue.splice(t,1)}else this.inputValue=e;this.$emit("change",this.inputValue)}},handleOpen:function(){this.$refs.textField.handleFocus()},handleClose:function(){this.$refs.textField.handleBlur()}},watch:{value:function(e){this.inputValue=e},inputValue:function(e,t){e!==t&&this.$emit("input",e)}},components:{"text-field":o["default"],"dropDown-menu":s["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(75),o=i(a),r=n(12),s=i(r);t["default"]={name:"mu-slider",props:{name:{type:String},value:{type:[Number,String],"default":0},max:{type:Number,"default":100},min:{type:Number,"default":0},step:{type:Number,"default":.1},disabled:{type:Boolean,"default":!1}},data:function(){return{inputValue:this.value,active:!1,hover:!1,focused:!1,dragging:!1}},computed:{percent:function(){var e=(this.inputValue-this.min)/(this.max-this.min)*100;return e>100?100:e<0?0:e},fillStyle:function(){return{width:this.percent+"%"}},thumbStyle:function(){return{left:this.percent+"%"}},sliderClass:function(){return{zero:this.inputValue<=this.min,active:this.active,disabled:this.disabled}}},created:function(){this.handleDragMouseMove=this.handleDragMouseMove.bind(this),this.handleMouseEnd=this.handleMouseEnd.bind(this),this.handleTouchMove=this.handleTouchMove.bind(this),this.handleTouchEnd=this.handleTouchEnd.bind(this)},methods:{handleKeydown:function(e){var t=this.min,n=this.max,i=this.step,a=void 0;switch((0,s["default"])(e)){case"page down":case"down":a="decrease";break;case"left":a="decrease";break;case"page up":case"up":a="increase";break;case"right":a="increase";break;case"home":a="min";break;case"end":a="max"}if(a){switch(e.preventDefault(),a){case"decrease":this.inputValue-=i;break;case"increase":this.inputValue+=i;break;case"min":this.inputValue=t;break;case"max":this.inputValue=n}this.inputValue=parseFloat(this.inputValue.toFixed(5)),this.inputValue>n?this.inputValue=n:this.inputValue<t&&(this.inputValue=t)}},handleMouseDown:function(e){this.disabled||(this.setValue(e),e.preventDefault(),document.addEventListener("mousemove",this.handleDragMouseMove),document.addEventListener("mouseup",this.handleMouseEnd),this.$el.focus(),this.onDragStart(e))},handleMouseUp:function(){this.disabled||(this.active=!1)},handleTouchStart:function(e){this.disabled||(this.setValue(e.touches[0]),document.addEventListener("touchmove",this.handleTouchMove),document.addEventListener("touchup",this.handleTouchEnd),document.addEventListener("touchend",this.handleTouchEnd),document.addEventListener("touchcancel",this.handleTouchEnd),e.preventDefault(),this.onDragStart(e))},handleTouchEnd:function(e){this.disabled||(document.removeEventListener("touchmove",this.handleTouchMove),document.removeEventListener("touchup",this.handleTouchEnd),document.removeEventListener("touchend",this.handleTouchEnd),document.removeEventListener("touchcancel",this.handleTouchEnd),this.onDragStop(e))},handleFocus:function(){this.disabled||(this.focused=!0)},handleBlur:function(){this.disabled||(this.focused=!1)},handleMouseEnter:function(){this.disabled||(this.hover=!0)},handleMouseLeave:function(){this.disabled||(this.hover=!1)},setValue:function(e){var t=this.$el,n=this.max,i=this.min,a=this.step,o=(e.clientX-t.getBoundingClientRect().left)/t.offsetWidth*(n-i);o=Math.round(o/a)*a+i,o=parseFloat(o.toFixed(5)),o>n?o=n:o<i&&(o=i),this.inputValue=o,this.$emit("change",o)},onDragStart:function(e){this.dragging=!0,this.active=!0,this.$emit("dragStart",e),this.$emit("drag-start",e)},onDragUpdate:function(e){var t=this;this.dragRunning||(this.dragRunning=!0,window.requestAnimationFrame(function(){t.dragRunning=!1,t.disabled||t.setValue(e)}))},onDragStop:function(e){this.dragging=!1,this.active=!1,this.$emit("dragStop",e),this.$emit("drag-stop",e)},handleDragMouseMove:function(e){this.onDragUpdate(e)},handleTouchMove:function(e){this.onDragUpdate(e.touches[0])},handleMouseEnd:function(e){document.removeEventListener("mousemove",this.handleDragMouseMove),document.removeEventListener("mouseup",this.handleMouseEnd),this.onDragStop(e)}},watch:{value:function(e){this.inputValue=e},inputValue:function(e){this.$emit("input",e)}},components:{"focus-ripple":o["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(22),o=i(a),r=n(25),s=n(33),l=i(s);t["default"]={name:"mu-snackbar",props:{action:{type:String},actionColor:{type:String},message:{type:String}},data:function(){return{zIndex:(0,r.getZIndex)()}},methods:{clickOutSide:function(){this.$emit("close","clickOutSide")},handleActionClick:function(){this.$emit("actionClick"),this.$emit("action-click")}},components:{"flat-button":o["default"]},directives:{clickoutside:l["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(63),o=i(a);t["default"]={name:"mu-step",props:{active:{type:Boolean,"default":!1},completed:{type:Boolean,"default":!1},disabled:{type:Boolean,"default":!1},index:{type:Number},last:{type:Boolean,"default":!1}},render:function(e){var t=this.active,n=this.completed,i=this.disabled,a=this.index,r=this.last,s=[];return this.$slots["default"]&&this.$slots["default"].length>0&&this.$slots["default"].forEach(function(e){if(e.componentOptions&&e.componentOptions.propsData){var l=a+1;e.componentOptions.propsData=(0,o["default"])({active:t,completed:n,disabled:i,last:r,num:l},e.componentOptions.propsData),s.push(e)}}),e("div",{"class":"mu-step"},s)}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(80),s=i(r);t["default"]={name:"mu-step-button",props:{active:{type:Boolean},completed:{type:Boolean},disabled:{type:Boolean},num:{type:[String,Number]},last:{type:Boolean},childrenInLabel:{type:Boolean,"default":!0}},methods:{handleClick:function(e){this.$emit("click",e)}},components:{abstractButton:o["default"],"step-label":s["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(74),o=i(a);t["default"]={name:"mu-step-content",props:{active:{type:Boolean},last:{type:Boolean}},components:{"expand-transition":o["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-step-label",props:{active:{type:Boolean},completed:{type:Boolean},disabled:{type:Boolean},num:{type:[String,Number]}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(424),o=i(a);t["default"]={name:"mu-stepper",props:{activeStep:{type:Number,"default":0},linear:{type:Boolean,"default":!0},orientation:{type:String,"default":"horizontal",validator:function(e){return["horizontal","vertical"].indexOf(e)!==-1}}},render:function(e){var t=this,n=this.activeStep,i=this.linear,a=this.orientation,r=[];return this.$slots["default"]&&this.$slots["default"].length>0&&!function(){var a=0;t.$slots["default"].forEach(function(t){if(t.componentOptions){a>0&&r.push(e(o["default"],{}));var s=t.componentOptions.propsData;n===a?s.active=!0:i&&n>a?s.completed=!0:i&&n<a&&(s.disabled=!0),s.index=a++,r.push(t)}}),r.length>0&&(r[r.length-1].componentOptions.propsData.last=!0)}(),e("div",{"class":["mu-stepper","vertical"===a?"mu-stepper-vertical":""]
},r)}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-sub-header",props:{inset:{type:Boolean,"default":!1}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(31),o=i(a);t["default"]={name:"mu-switch",props:{name:{type:String},value:{type:Boolean},label:{type:String,"default":""},labelLeft:{type:Boolean,"default":!1},labelClass:{type:[String,Object,Array]},trackClass:{type:[String,Object,Array]},thumbClass:{type:[String,Object,Array]},disabled:{type:Boolean,"default":!1}},data:function(){return{inputValue:this.value}},watch:{value:function(e){this.inputValue=e},inputValue:function(e){this.$emit("input",e)}},methods:{handleMouseDown:function(e){this.disabled||0===e.button&&this.$children[0].start(e)},handleClick:function(){},handleMouseUp:function(){this.disabled||this.$children[0].end()},handleMouseLeave:function(){this.disabled||this.$children[0].end()},handleTouchStart:function(e){this.disabled||this.$children[0].start(e)},handleTouchEnd:function(){this.disabled||this.$children[0].end()},handleChange:function(){this.$emit("change",this.inputValue)}},components:{"touch-ripple":o["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-table",props:{fixedFooter:{type:Boolean,"default":!0},fixedHeader:{type:Boolean,"default":!0},height:{type:String},enableSelectAll:{type:Boolean,"default":!1},allRowsSelected:{type:Boolean,"default":!1},multiSelectable:{type:Boolean,"default":!1},selectable:{type:Boolean,"default":!0},showCheckbox:{type:Boolean,"default":!0}},data:function(){return{isSelectAll:!1}},computed:{bodyStyle:function(){return{overflow:"auto",height:this.height}}},mounted:function(){this.allRowsSelected&&this.selectAll()},methods:{handleRowClick:function(e,t){this.$emit("rowClick",e,t),this.$emit("row-click",e,t)},handleRowHover:function(e,t){this.$emit("rowHover",e,t),this.$emit("row-hover",e,t)},handleRowHoverExit:function(e,t){this.$emit("rowHoverExit",e,t),this.$emit("row-hover-exit",e,t)},handleRowSelect:function(e){this.$emit("rowSelection",e),this.$emit("row-selection",e)},handleCellClick:function(e,t,n,i){this.$emit("cellClick",e,t,n,i),this.$emit("cell-click",e,t,n,i)},handleCellHover:function(e,t,n,i){this.$emit("cellHover",e,t,n,i),this.$emit("cell-hover",e,t,n,i)},handleCellHoverExit:function(e,t,n,i){this.$emit("cellHoverExit",e,t,n,i),this.$emit("cell-hover-exit",e,t,n,i)},changeSelectAll:function(e){this.isSelectAll=e},selectAll:function(){var e=this.getTbody();e&&e.selectAll()},unSelectAll:function(){var e=this.getTbody();e&&e.unSelectAll()},getTbody:function(){for(var e=0;e<this.$children.length;e++){var t=this.$children[e];if(t.isTbody)return t}}},watch:{allRowsSelected:function(e,t){e!==t&&(e?this.selectAll():this.unSelectAll())}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-tbody",data:function(){return{selectedRows:[]}},created:function(){this.isTbody=!0,this._unSelectAll=!1},computed:{showCheckbox:function(){return this.$parent.showCheckbox},selectable:function(){return this.$parent.selectable},multiSelectable:function(){return this.$parent.multiSelectable},enableSelectAll:function(){return this.$parent.enableSelectAll},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{handleRowClick:function(e,t){this.$parent.handleRowClick(this.getRowIndex(t),t.rowId,t)},selectRow:function(e){var t=arguments.length<=1||void 0===arguments[1]||arguments[1];if(this.selectable){var n=this.selectedRows.indexOf(e);if(n===-1){if(this.multiSelectable||(this.selectedRows=[]),this.selectedRows.push(e),this.isSelectAllRow())return void this.selectAll(!0);this.$parent.handleRowSelect&&t&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows))}}},isSelectAllRow:function(){var e=0;return this.$children.forEach(function(t){t.selectable&&e++}),e===this.selectedRows.length},unSelectRow:function(e){var t=arguments.length<=1||void 0===arguments[1]||arguments[1];if(this.selectable){var n=this.selectedRows.indexOf(e);n!==-1&&this.selectedRows.splice(n,1),this._unSelectAll=!0,this.$parent.changeSelectAll(!1),this.$parent.handleRowSelect&&t&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows))}},selectAll:function(e){var t=this;this.selectable&&this.multiSelectable&&(this._unSelectAll=!1,e||(this.selectedRows=[],this.$children.forEach(function(e){e.selectable&&t.selectedRows.push(e.rowId)})),this.$parent.changeSelectAll(!0),this.$parent.handleRowSelect&&this.$parent.handleRowSelect(this.convertSelectedRows(this.selectedRows)))},unSelectAll:function(){this.selectable&&this.multiSelectable&&!this._unSelectAll&&(this.selectedRows=[],this.$parent.changeSelectAll(!1),this.$parent.handleRowSelect&&this.$parent.handleRowSelect([]))},handleCellClick:function(e,t,n,i,a){this.$parent.handleCellClick&&this.$parent.handleCellClick(this.getRowIndex(a),t,n,i,a)},handleCellHover:function(e,t,n,i,a){this.$parent.handleCellHover&&this.$parent.handleCellHover(this.getRowIndex(a),t,n,i,a)},handleCellHoverExit:function(e,t,n,i,a){this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(this.getRowIndex(a),t,n,i,a)},handleRowHover:function(e,t,n){this.$parent.handleRowHover&&this.$parent.handleRowHover(this.getRowIndex(n),t,n)},handleRowHoverExit:function(e,t,n){this.$parent.handleRowHoverExit&&this.$parent.handleRowHoverExit(this.getRowIndex(n),t,n)},getRowIndex:function(e){return this.$children.indexOf(e)},convertSelectedRows:function(){var e=this,t=this.selectedRows.map(function(t){return e.convertRowIdToIndex(t)});return this.multiSelectable?t:t[0]},convertRowIdToIndex:function(e){for(var t=0;t<this.$children.length;t++){var n=this.$children[t];if(n.rowId&&n.rowId===e)return t}return-1}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-td",props:{name:{type:String}},methods:{handleMouseEnter:function(e){this.$emit("hover",e),this.$parent.handleCellHover&&this.$parent.handleCellHover(e,this.name,this)},handleMouseLeave:function(e){this.$emit("hoverExit",e),this.$emit("hover-exit",e),this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(e,this.name,this)},handleClick:function(e){this.$emit("click",e),this.$parent.handleCellClick&&this.$parent.handleCellClick(e,this.name,this)}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-tfoot",created:function(){this.isTfoot=!0},computed:{showCheckbox:function(){return this.$parent.showCheckbox}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(34),o=i(a);t["default"]={name:"mu-th",props:{tooltip:{type:String},tooltipPosition:{type:String,"default":"bottom-right"},touch:{type:Boolean,"default":!1}},data:function(){return{tooltipShown:!1,tooltipTrigger:null}},mounted:function(){this.tooltipTrigger=this.$refs.wrapper},computed:{verticalPosition:function(){var e=this.tooltipPosition.split("-");return e[0]},horizontalPosition:function(){var e=this.tooltipPosition.split("-");return e[1]}},methods:{showTooltip:function(){this.tooltipShown=!0},hideTooltip:function(){this.tooltipShown=!1}},components:{tooltip:o["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-thead",created:function(){this.isThead=!0},computed:{showCheckbox:function(){return this.$parent.showCheckbox},enableSelectAll:function(){return this.$parent.enableSelectAll},multiSelectable:function(){return this.$parent.multiSelectable},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{selectAll:function(){this.$parent.selectAll()},unSelectAll:function(){this.$parent.unSelectAll()}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),o=n(81),r=i(o),s=n(82),l=i(s),u=n(54),c=i(u),d=1;t["default"]={name:"mu-tr",props:{selectable:{type:Boolean,"default":!0},selected:{type:Boolean,"default":!1}},data:function(){return{hover:!1,rowId:"tr-"+d++}},mounted:function(){this.selected&&this.$parent.selectRow(this.rowId)},computed:{className:function(){return{hover:this.hover,selected:this.isSelected,stripe:!1}},isTh:function(){return this.$parent.isThead},isTf:function(){return this.$parent.isTfoot},isTb:function(){return this.$parent.isTbody},isSelected:function(){return this.$parent.selectedRows&&this.$parent.selectedRows.indexOf(this.rowId)!==-1},showCheckbox:function(){return this.$parent.showCheckbox},enableSelectAll:function(){return this.$parent.enableSelectAll},multiSelectable:function(){return this.$parent.multiSelectable},isSelectAll:function(){return this.$parent.isSelectAll}},methods:{handleHover:function(e){(0,a.isPc)()&&this.$parent.isTbody&&(this.hover=!0,this.$parent.handleRowHover&&this.$parent.handleRowHover(e,this.rowId,this))},handleExit:function(e){(0,a.isPc)()&&this.$parent.isTbody&&(this.hover=!1,this.$parent.handleRowHoverExit&&this.$parent.handleRowHoverExit(e,this.rowId,this))},handleClick:function(e){this.$parent.isTbody&&(this.selectable&&(this.isSelected?this.$parent.unSelectRow(this.rowId):this.$parent.selectRow(this.rowId)),this.$parent.handleRowClick(e,this))},handleCheckboxClick:function(e){e.stopPropagation()},handleCheckboxChange:function(e){this.selectable&&(e?this.$parent.selectRow(this.rowId):this.$parent.unSelectRow(this.rowId))},handleSelectAllChange:function(e){e?this.$parent.selectAll():this.$parent.unSelectAll()},handleCellHover:function(e,t,n){this.$parent.handleCellHover&&this.$parent.handleCellHover(e,t,n,this.rowId,this)},handleCellHoverExit:function(e,t,n){this.$parent.handleCellHoverExit&&this.$parent.handleCellHoverExit(e,t,n,this.rowId,this)},handleCellClick:function(e,t,n){this.$parent.handleCellClick&&this.$parent.handleCellClick(e,t,n,this.rowId,this)}},watch:{selected:function(e,t){e!==t&&(e?this.$parent.selectRow(this.rowId,!1):this.$parent.unSelectRow(this.rowId,!1))}},components:{"mu-td":r["default"],"mu-th":l["default"],checkbox:c["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=i(a),r=n(2),s=i(r),l=n(1);t["default"]={name:"mu-tab",props:{icon:{type:String,"default":""},iconClass:{type:[String,Object,Array]},title:{type:String,"default":""},titleClass:{type:[String,Object,Array]},href:{type:String},disabled:{type:Boolean},value:{}},computed:{active:function(){return(0,l.isNotNull)(this.value)&&this.$parent.value===this.value},textClass:function(){var e=this.icon,t=this.titleClass,n=[];return e&&n.push("has-icon"),n.concat((0,l.convertClass)(t))}},methods:{tabClick:function(e){this.$parent.handleTabClick&&this.$parent.handleTabClick(this.value,this),this.$emit("click",e)}},watch:{active:function(e,t){e!==t&&e&&this.$emit("active")}},components:{"abstract-button":o["default"],icon:s["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-tabs",props:{lineClass:{type:[String,Object,Array]},value:{}},data:function(){return{tabLightStyle:{width:"100%",transform:"translate3d(0, 0, 0)"}}},methods:{handleTabClick:function(e,t){this.value!==e&&this.$emit("change",e)},getActiveIndex:function(){var e=this;if(!this.$children||0===this.$children.length)return-1;var t=-1;return this.$children.forEach(function(n,i){if(n.value===e.value)return t=i,!1}),t},setTabLightStyle:function(){var e=100*this.getActiveIndex(),t=this.$children.length;this.tabLightStyle={width:t>0?(100/t).toFixed(4)+"%":"100%",transform:"translate3d("+e+"%, 0, 0)"}}},mounted:function(){this.setTabLightStyle()},watch:{value:function(e,t){e!==t&&this.$nextTick(function(){this.setTabLightStyle()})}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{placeholder:{type:String},value:{type:String},rows:{type:Number,"default":1},rowsMax:{type:Number},disabled:{type:Boolean,"default":!1},normalClass:{type:[String,Array,Object]}},methods:{resizeTextarea:function(){var e=this.$refs.textarea;if(e){var t=this.$refs.textareaHidden,n=window.getComputedStyle(e,null).getPropertyValue("line-height");n=Number(n.substring(0,n.indexOf("px")));var i=window.getComputedStyle(e,null).getPropertyValue("padding-top");i=Number(i.substring(0,i.indexOf("px")));var a=window.getComputedStyle(e,null).getPropertyValue("padding-bottom");a=Number(a.substring(0,a.indexOf("px")));var o=a+i+n*this.rows,r=a+i+n*(this.rowsMax||0),s=t.scrollHeight;e.style.height=(s<o?o:s>r&&r>0?r:s)+"px"}},handleInput:function(e){this.$emit("change",e.target.value)},handleFocus:function(e){this.$emit("focus",e)},handleBlur:function(e){this.$emit("blur",e)}},mounted:function(){this.resizeTextarea()},watch:{value:function(e,t){var n=this;e!==t&&this.$nextTick(function(){n.resizeTextarea()})}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),o=i(a),r=n(440),s=i(r),l=n(436),u=i(l),c=n(439),d=i(c),f=n(1),h=n(438),p=i(h);t["default"]={name:"mu-text-field",props:{type:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},label:{type:String},labelFloat:{type:Boolean,"default":!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},value:{},inputClass:{type:[String,Array,Object]},multiLine:{type:Boolean,"default":!1},rows:{type:Number,"default":1},rowsMax:{type:Number},errorText:{type:String},errorColor:{type:String},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},maxLength:{type:Number,"default":0},disabled:{type:Boolean,"default":!1},fullWidth:{type:Boolean,"default":!1},underlineShow:{type:Boolean,"default":!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]}},data:function(){return{focus:!1,inputValue:this.value,charLength:0}},computed:{textFieldClass:function(){return{"focus-state":this.focus,"has-label":this.label,"no-empty-state":this.inputValue,"has-icon":this.icon,error:this.errorText,"multi-line":this.multiLine,disabled:this.disabled,"full-width":this.fullWidth}},"float":function(){return this.labelFloat&&!this.focus&&!this.inputValue&&0!==this.inputValue},errorStyle:function(){return{color:!this.disabled&&this.errorText?(0,f.getColor)(this.errorColor):""}},showHint:function(){return!this["float"]&&!this.inputValue&&0!==this.inputValue}},methods:{handleFocus:function(e){this.focus=!0,this.$emit("focus",e)},handleBlur:function(e){this.focus=!1,this.$emit("blur",e)},handleChange:function(e){this.inputValue=e.target?e.target.value:e,this.$emit("change",this.inputValue)},handleLabelClick:function(){this.$emit("labelClick")}},watch:{value:function(e){this.inputValue=e},inputValue:function(e){this.charLength=this.maxLength&&String(this.inputValue)?String(this.inputValue).length:0,this.$emit("input",e)},charLength:function(e){e>this.maxLength&&!this.isTextOverflow&&(this.isTextOverflow=!0,this.$emit("textOverflow",!0),this.$emit("text-overflow",!0)),this.isTextOverflow&&e<=this.maxLength&&(this.isTextOverflow=!1,this.$emit("textOverflow",!1),this.$emit("text-overflow",!1))}},components:{icon:o["default"],underline:s["default"],"enhanced-textarea":u["default"],"text-field-label":d["default"],"text-field-hint":p["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{text:{type:String},show:{type:Boolean,"default":!0}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={props:{focus:{type:Boolean,"default":!1},"float":{type:Boolean,"default":!1},normalClass:{type:[String,Object,Array]},focusClass:{type:[String,Object,Array]}},computed:{labelClass:function(){var e=this["float"],t=this.focus,n=this.normalClass,a=this.focusClass,o=[];return e&&o.push("float"),o=o.concat((0,i.convertClass)(n)),t&&(o=o.concat((0,i.convertClass)(a))),o}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t["default"]={props:{focus:{type:Boolean,"default":!1},error:{type:Boolean},errorColor:{type:String},disabled:{type:Boolean},normalClass:{type:[String,Object,Array]},focusClass:{type:[String,Object,Array]}},computed:{lineClass:function(){var e=this.disabled,t=this.normalClass,n=[];return e&&n.push("disabled"),n.concat((0,i.convertClass)(t))},focusLineClass:function(){var e=this.normalClass,t=this.focus,n=this.focusClass,a=this.error,o=[];return o.concat((0,i.convertClass)(e)),a&&o.push("error"),t&&o.push("focus"),o.concat((0,i.convertClass)(n))},errorStyle:function(){return{"background-color":this.error?(0,i.getColor)(this.errorColor):""}}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(444),o=i(a),r=n(442),s=i(r),l=n(443),u=i(l),c=n(22),d=i(c);t["default"]={props:{autoOk:{type:Boolean,"default":!1},format:{type:String,"default":"ampm",validator:function(e){return["ampm","24hr"].indexOf(e)!==-1}},initialTime:{type:Date,"default":function(){return new Date}},okLabel:{type:String,"default":"确定"},cancelLabel:{type:String,"default":"取消"},landscape:{type:Boolean,"default":!1}},data:function(){return{selectedTime:this.initialTime,mode:"hour"}},methods:{getAffix:function(){if("ampm"!==this.format)return"";var e=this.selectedTime.getHours();return e<12?"am":"pm"},handleSelectAffix:function(e){if(e!==this.getAffix()){var t=this.selectedTime.getHours();return"am"===e?void this.handleChangeHours(t-12,e):void this.handleChangeHours(t+12,e)}},handleChangeHours:function(e,t){var n=this,i=new Date(this.selectedTime),a=void 0;"string"==typeof t&&(a=t,t=void 0),a||(a=this.getAffix()),"pm"===a&&e<12&&(e+=12),i.setHours(e),this.selectedTime=i,t&&setTimeout(function(){n.mode="minute",n.$emit("changeHours",i)},100)},handleChangeMinutes:function(e){var t=this,n=new Date(this.selectedTime);n.setMinutes(e),this.selectedTime=n,setTimeout(function(){t.$emit("changeMinutes",n),t.autoOk&&t.accept()},0)},accept:function(){this.$emit("accept",this.selectedTime)},dismiss:function(){this.$emit("dismiss")}},watch:{initialTime:function(e){this.selectedTime=e}},components:{"time-display":o["default"],"clock-hours":s["default"],"clock-minutes":u["default"],"flat-button":d["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(83),o=i(a),r=n(84),s=i(r),l=n(17);t["default"]={props:{format:{type:String,"default":"ampm",validator:function(e){return["ampm","24hr"].indexOf(e)!==-1}},initialHours:{type:Number,"default":(new Date).getHours()}},computed:{hours:function u(){for(var e="ampm"===this.format?12:24,u=[],t=1;t<=e;t++)u.push(t%24);return u}},methods:{getSelected:function(){var e=this.initialHours;return"ampm"===this.format&&(e%=12,e=e||12),e},isMousePressed:function(e){return"undefined"==typeof e.buttons?e.nativeEvent.which:e.buttons},handleUp:function(e){e.preventDefault(),this.setClock(e,!0)},handleMove:function(e){e.preventDefault(),1===this.isMousePressed(e)&&this.setClock(e,!1)},handleTouchMove:function(e){e.preventDefault(),this.setClock(e.changedTouches[0],!1)},handleTouchEnd:function(e){e.preventDefault(),this.setClock(e.changedTouches[0],!0)},setClock:function(e,t){if("undefined"==typeof e.offsetX){var n=(0,l.getTouchEventOffsetValues)(e);e.offsetX=n.offsetX,e.offsetY=n.offsetY}var i=this.getHours(e.offsetX,e.offsetY);this.$emit("change",i,t)},getHours:function(e,t){var n=30,i=e-this.center.x,a=t-this.center.y,o=this.basePoint.x-this.center.x,r=this.basePoint.y-this.center.y,s=Math.atan2(o,r)-Math.atan2(i,a),u=(0,l.rad2deg)(s);u=Math.round(u/n)*n,u%=360;var c=Math.floor(u/n)||0,d=Math.pow(i,2)+Math.pow(a,2),f=Math.sqrt(d);return c=c||12,"24hr"===this.format?f<90&&(c+=12,c%=24):c%=12,c}},mounted:function(){var e=this.$refs.mask;this.center={x:e.offsetWidth/2,y:e.offsetHeight/2},this.basePoint={x:this.center.x,y:0}},components:{"clock-number":o["default"],"clock-pointer":s["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(83),o=i(a),r=n(84),s=i(r),l=n(17);t["default"]={props:{initialMinutes:{type:Number,"default":function(){return(new Date).getMinutes()}}},mounted:function(){var e=this.$refs.mask;this.center={x:e.offsetWidth/2,y:e.offsetHeight/2},this.basePoint={x:this.center.x,y:0}},data:function(){return{minutes:null}},created:function(){this.minutes=this.getMinuteNumbers()},methods:{getMinuteNumbers:function(){for(var e=[],t=0;t<12;t++)e.push(5*t);var n=this.initialMinutes,i=!1,a=e.map(function(e){var t=n===e;return t&&(i=!0),{minute:e,isSelected:t}});return{numbers:a,hasSelected:i,selected:n}},isMousePressed:function(e){return"undefined"==typeof e.buttons?e.nativeEvent.which:e.buttons},handleUp:function(e){e.preventDefault(),this.setClock(e,!0)},handleMove:function(e){e.preventDefault(),1===this.isMousePressed(e)&&this.setClock(e,!1)},handleTouch:function(e){e.preventDefault(),this.setClock(e.changedTouches[0],!1)},setClock:function(e,t){if("undefined"==typeof e.offsetX){var n=(0,l.getTouchEventOffsetValues)(e);e.offsetX=n.offsetX,e.offsetY=n.offsetY}var i=this.getMinutes(e.offsetX,e.offsetY);this.$emit("change",i,t)},getMinutes:function(e,t){var n=6,i=e-this.center.x,a=t-this.center.y,o=this.basePoint.x-this.center.x,r=this.basePoint.y-this.center.y,s=Math.atan2(o,r)-Math.atan2(i,a),u=(0,l.rad2deg)(s);u=Math.round(u/n)*n,u%=360;var c=Math.floor(u/n)||0;return c}},watch:{initialMinutes:function(e){this.minutes=this.getMinuteNumbers()}},components:{"clock-number":o["default"],"clock-pointer":s["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(229),o=i(a),r=n(17),s=[[0,5],[54.5,16.6],[94.4,59.5],[109,114],[94.4,168.5],[54.5,208.4],[0,223],[-54.5,208.4],[-94.4,168.5],[-109,114],[-94.4,59.5],[-54.5,19.6]],l=[[0,40],[36.9,49.9],[64,77],[74,114],[64,151],[37,178],[0,188],[-37,178],[-64,151],[-74,114],[-64,77],[-37,50]];t["default"]={props:{value:{type:Number,"default":0},type:{type:String,"default":"minute",validator:function(e){return["hour","minute"].indexOf(e)!==-1}},selected:{type:Boolean,"default":!1}},computed:{isInner:function(){return(0,r.isInner)(this)},numberClass:function(){return{selected:this.selected,inner:this.isInner}},numberStyle:function(){var e=this.value;"hour"===this.type?e%=12:e/=5;var t=s[e];this.isInner&&(t=l[e]);var n=t,i=(0,o["default"])(n,2),a=i[0],r=i[1];return{transform:"translate("+a+"px, "+r+"px)",left:this.isInner?"calc(50% - 14px)":"calc(50% - 16px)"}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(17);t["default"]={props:{hasSelected:{type:Boolean,"default":!1},type:{type:String,"default":"minute",validator:function(e){return["hour","minute"].indexOf(e)!==-1}},value:{type:Number}},computed:{isInner:function(){return(0,i.isInner)(this)},pointerStyle:function(){var e=this.type,t=this.value,n=this.calcAngle,i="hour"===e?n(t,12):n(t,60);return{transform:"rotateZ("+i+"deg)"}}},methods:{calcAngle:function(e,t){e%=t;var n=360/t*e;return n}},render:function(e){return void 0===this.value||null===this.value?e("span",{}):e("div",{"class":{"mu-clock-pointer":!0,inner:this.isInner},style:this.pointerStyle},[e("div",{"class":{"mu-clock-pointer-mark":!0,"has-selected":this.hasSelected}})])}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{affix:{type:String,"default":"",validator:function(e){return["","pm","am"].indexOf(e)!==-1}},format:{type:String,validator:function(e){return e&&["ampm","24hr"].indexOf(e)!==-1}},mode:{type:String,"default":"hour",validator:function(e){return["hour","minute"].indexOf(e)!==-1}},selectedTime:{type:Date,"default":function(){return new Date},required:!0}},methods:{handleSelectAffix:function(e){this.$emit("selectAffix",e)},handleSelectHour:function(){this.$emit("selectHour")},handleSelectMin:function(){this.$emit("selectMin")}},computed:{sanitizeTime:function(){var e=this.selectedTime.getHours(),t=this.selectedTime.getMinutes().toString();return"ampm"===this.format&&(e%=12,e=e||12),e=e.toString(),e.length<2&&(e="0"+e),t.length<2&&(t="0"+t),[e,t]}}}},function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(13),r=a(o),s=n(446),l=a(s),u=n(17),c=i(u);t["default"]={name:"mu-time-picker",props:{autoOk:{type:Boolean,"default":!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,"default":"dialog",validator:function(e){return e&&["dialog","inline"].indexOf(e)!==-1}},mode:{type:String,"default":"portrait",validator:function(e){return e&&["portrait","landscape"].indexOf(e)!==-1}},format:{type:String,"default":"ampm",validator:function(e){return["ampm","24hr"].indexOf(e)!==-1}},label:{type:String},labelFloat:{type:Boolean,"default":!1},labelClass:{type:[String,Array,Object]},labelFocusClass:{type:[String,Array,Object]},disabled:{type:Boolean,"default":!1},hintText:{type:String},hintTextClass:{type:[String,Array,Object]},helpText:{type:String},helpTextClass:{type:[String,Array,Object]},errorText:{type:String},errorColor:{type:String},icon:{type:String},iconClass:{type:[String,Array,Object]},fullWidth:{type:Boolean,"default":!1},underlineShow:{type:Boolean,"default":!0},underlineClass:{type:[String,Array,Object]},underlineFocusClass:{type:[String,Array,Object]},inputClass:{type:[String,Array,Object]},value:{type:String}},data:function(){return{inputValue:this.value,dialogTime:null}},methods:{handleClick:function(){var e=this;this.disabled||setTimeout(function(){e.openDialog()},0)},handleFocus:function(e){e.target.blur(),this.$emit("focus",e)},openDialog:function(){this.disabled||(this.dialogTime=this.inputValue?c.strToTime(this.inputValue,this.format):new Date,this.$refs.dialog.open=!0)},handleAccept:function(e){var t=c.formatTime(e,this.format);this.inputValue!==t&&(this.inputValue=t,this.$emit("change",t))}},watch:{value:function(e){this.inputValue=e},inputValue:function(e){this.$emit("input",e)}},components:{"text-field":r["default"],"time-picker-dialog":l["default"]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(441),o=i(a),r=n(7),s=i(r),l=n(32),u=i(l);t["default"]={props:{autoOk:{type:Boolean,"default":!1},cancelLabel:{type:String},okLabel:{type:String},container:{type:String,"default":"dialog",validator:function(e){return e&&["dialog","inline"].indexOf(e)!==-1}},mode:{type:String,"default":"portrait",validator:function(e){return e&&["portrait","landscape"].indexOf(e)!==-1}},format:{type:String,"default":"ampm",validator:function(e){return["ampm","24hr"].indexOf(e)!==-1}},initialTime:{type:Date}},data:function(){return{open:!1,showClock:!1,trigger:null}},mounted:function(){this.trigger=this.$el},methods:{handleAccept:function(e){this.$emit("accept",e),this.open=!1},handleDismiss:function(){this.dismiss()},handleClose:function(){this.dismiss()},dismiss:function(){this.open=!1,this.$emit("dismiss")},hideClock:function(){this.showClock=!1}},watch:{open:function(e){e&&(this.showClock=!0)}},render:function(e){var t=this.showClock?e(o["default"],{props:{autoOk:this.autoOk,cancelLabel:this.cancelLabel,okLabel:this.okLabel,landscape:"landscape"===this.mode,initialTime:this.initialTime,format:this.format},on:{accept:this.handleAccept,dismiss:this.handleDismiss}}):void 0;return e("div",{},["dialog"===this.container?e(u["default"],{props:{open:this.open,dialogClass:["mu-time-picker-dialog",this.mode]},on:{close:this.handleClose,hide:this.hideClock}},[t]):e(s["default"],{props:{trigger:this.trigger,overlay:!1,open:this.open},on:{close:this.handleClose,hide:this.hideClock}},[t])])}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(25),o=n(33),r=i(o);t["default"]={name:"mu-toast",props:{message:{type:String}},methods:{clickOutSide:function(){this.$emit("close","clickOutSide")}},data:function(){return{zIndex:(0,a.getZIndex)()}},directives:{clickoutside:r["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"mu-tooltip",props:{label:{type:String},trigger:{type:Element},verticalPosition:{type:String,"default":"bottom"},horizontalPosition:{type:String,"default":"center"},show:{type:Boolean,"default":!1},touch:{type:Boolean,"default":!1}},data:function(){return{offsetWidth:0,triggerWidth:0,triggerHeight:0}},computed:{tooltipStyle:function(){var e=this.horizontalPosition,t=this.verticalPosition,n=this.offsetWidth,i=this.touch,a=this.triggerWidth,o=this.triggerHeight,r=this.show,s=i?10:0,l=i?-20:-10,u="bottom"===t?14+s:-14-s;return{right:"left"===e?"0":null,left:"center"===e?(n-a)/2*-1+"px":"right"===e?"0":"",top:r?"top"===t?l+"px":o-u+s+2+"px":"-3000px",transform:"translate(0px, "+u+"px)"}},rippleStyle:function(){var e=this.horizontalPosition,t=this.verticalPosition;return{left:"center"===e?"50%":"left"===e?"100%":"0%",top:"bottom"===t?"0":"100%"}}},methods:{setRippleSize:function(){var e=this.$refs.ripple,t=this.$el,n=parseInt(t.offsetWidth,10)/("center"===this.horizontalPosition?2:1),i=parseInt(t.offsetHeight,10),a=Math.ceil(2*Math.sqrt(Math.pow(i,2)+Math.pow(n,2)));this.show?(e.style.height=a+"px",e.style.width=a+"px"):(e.style.width="0px",e.style.height="0px")},setTooltipSize:function(){this.offsetWidth=this.$el.offsetWidth,this.trigger&&(this.triggerWidth=this.trigger.offsetWidth,this.triggerHeight=this.trigger.offsetHeight)}},mounted:function(){this.setRippleSize(),this.setTooltipSize()},beforeUpdate:function(){this.setTooltipSize()},updated:function(){this.setRippleSize()}}},function(e,t,n){e.exports={"default":n(231),__esModule:!0}},function(e,t,n){e.exports={"default":n(232),__esModule:!0}},function(e,t,n){e.exports={"default":n(234),__esModule:!0}},function(e,t,n){e.exports={"default":n(236),__esModule:!0}},function(e,t,n){e.exports={"default":n(237),__esModule:!0}},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var a=n(224),o=i(a);t["default"]=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,o["default"])(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var a=n(223),o=i(a),r=n(222),s=i(r);t["default"]=function(){function e(e,t){var n=[],i=!0,a=!1,o=void 0;try{for(var r,l=(0,s["default"])(e);!(i=(r=l.next()).done)&&(n.push(r.value),!t||n.length!==t);i=!0);}catch(u){a=!0,o=u}finally{try{!i&&l["return"]&&l["return"]()}finally{if(a)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if((0,o["default"])(Object(t)))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var a=n(226),o=i(a),r=n(225),s=i(r),l="function"==typeof s["default"]&&"symbol"==typeof o["default"]?function(e){return typeof e}:function(e){return e&&"function"==typeof s["default"]&&e.constructor===s["default"]?"symbol":typeof e;
};t["default"]="function"==typeof s["default"]&&"symbol"===l(o["default"])?function(e){return"undefined"==typeof e?"undefined":l(e)}:function(e){return e&&"function"==typeof s["default"]&&e.constructor===s["default"]?"symbol":"undefined"==typeof e?"undefined":l(e)}},function(e,t,n){n(51),n(50),e.exports=n(259)},function(e,t,n){n(51),n(50),e.exports=n(260)},function(e,t,n){n(262),e.exports=n(4).Object.assign},function(e,t,n){n(263);var i=n(4).Object;e.exports=function(e,t,n){return i.defineProperty(e,t,n)}},function(e,t,n){n(264),e.exports=n(4).Object.keys},function(e,t,n){n(266),n(265),n(267),n(268),e.exports=n(4).Symbol},function(e,t,n){n(50),n(51),e.exports=n(49).f("iterator")},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){e.exports=function(){}},function(e,t,n){var i=n(11),a=n(257),o=n(256);e.exports=function(e){return function(t,n,r){var s,l=i(t),u=a(l.length),c=o(r,u);if(e&&n!=n){for(;u>c;)if(s=l[c++],s!=s)return!0}else for(;u>c;c++)if((e||c in l)&&l[c]===n)return e||c||0;return!e&&-1}}},function(e,t,n){var i=n(238);e.exports=function(e,t,n){if(i(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,i){return e.call(t,n,i)};case 3:return function(n,i,a){return e.call(t,n,i,a)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var i=n(16),a=n(41),o=n(28);e.exports=function(e){var t=i(e),n=a.f;if(n)for(var r,s=n(e),l=o.f,u=0;s.length>u;)l.call(e,r=s[u++])&&t.push(r);return t}},function(e,t,n){e.exports=n(6).document&&document.documentElement},function(e,t,n){var i=n(37);e.exports=Array.isArray||function(e){return"Array"==i(e)}},function(e,t,n){"use strict";var i=n(70),a=n(29),o=n(42),r={};n(15)(r,n(5)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=i(r,{next:a(1,n)}),o(e,t+" Iterator")}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,n){var i=n(16),a=n(11);e.exports=function(e,t){for(var n,o=a(e),r=i(o),s=r.length,l=0;s>l;)if(o[n=r[l++]]===t)return n}},function(e,t,n){var i=n(30)("meta"),a=n(27),o=n(9),r=n(10).f,s=0,l=Object.isExtensible||function(){return!0},u=!n(14)(function(){return l(Object.preventExtensions({}))}),c=function(e){r(e,i,{value:{i:"O"+ ++s,w:{}}})},d=function(e,t){if(!a(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,i)){if(!l(e))return"F";if(!t)return"E";c(e)}return e[i].i},f=function(e,t){if(!o(e,i)){if(!l(e))return!0;if(!t)return!1;c(e)}return e[i].w},h=function(e){return u&&p.NEED&&l(e)&&!o(e,i)&&c(e),e},p=e.exports={KEY:i,NEED:!1,fastKey:d,getWeak:f,onFreeze:h}},function(e,t,n){"use strict";var i=n(16),a=n(41),o=n(28),r=n(46),s=n(68),l=Object.assign;e.exports=!l||n(14)(function(){var e={},t={},n=Symbol(),i="abcdefghijklmnopqrst";return e[n]=7,i.split("").forEach(function(e){t[e]=e}),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=i})?function(e,t){for(var n=r(e),l=arguments.length,u=1,c=a.f,d=o.f;l>u;)for(var f,h=s(arguments[u++]),p=c?i(h).concat(c(h)):i(h),m=p.length,v=0;m>v;)d.call(h,f=p[v++])&&(n[f]=h[f]);return n}:l},function(e,t,n){var i=n(10),a=n(18),o=n(16);e.exports=n(8)?Object.defineProperties:function(e,t){a(e);for(var n,r=o(t),s=r.length,l=0;s>l;)i.f(e,n=r[l++],t[n]);return e}},function(e,t,n){var i=n(28),a=n(29),o=n(11),r=n(47),s=n(9),l=n(67),u=Object.getOwnPropertyDescriptor;t.f=n(8)?u:function(e,t){if(e=o(e),t=r(t,!0),l)try{return u(e,t)}catch(n){}if(s(e,t))return a(!i.f.call(e,t),e[t])}},function(e,t,n){var i=n(11),a=n(71).f,o={}.toString,r="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return a(e)}catch(t){return r.slice()}};e.exports.f=function(e){return r&&"[object Window]"==o.call(e)?s(e):a(i(e))}},function(e,t,n){var i=n(9),a=n(46),o=n(43)("IE_PROTO"),r=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=a(e),i(e,o)?e[o]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?r:null}},function(e,t,n){var i=n(19),a=n(4),o=n(14);e.exports=function(e,t){var n=(a.Object||{})[e]||Object[e],r={};r[e]=t(n),i(i.S+i.F*o(function(){n(1)}),"Object",r)}},function(e,t,n){var i=n(45),a=n(38);e.exports=function(e){return function(t,n){var o,r,s=String(a(t)),l=i(n),u=s.length;return l<0||l>=u?e?"":void 0:(o=s.charCodeAt(l),o<55296||o>56319||l+1===u||(r=s.charCodeAt(l+1))<56320||r>57343?e?s.charAt(l):o:e?s.slice(l,l+2):(o-55296<<10)+(r-56320)+65536)}}},function(e,t,n){var i=n(45),a=Math.max,o=Math.min;e.exports=function(e,t){return e=i(e),e<0?a(e+t,0):o(e,t)}},function(e,t,n){var i=n(45),a=Math.min;e.exports=function(e){return e>0?a(i(e),9007199254740991):0}},function(e,t,n){var i=n(65),a=n(5)("iterator"),o=n(20);e.exports=n(4).getIteratorMethod=function(e){if(void 0!=e)return e[a]||e["@@iterator"]||o[i(e)]}},function(e,t,n){var i=n(18),a=n(258);e.exports=n(4).getIterator=function(e){var t=a(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return i(t.call(e))}},function(e,t,n){var i=n(65),a=n(5)("iterator"),o=n(20);e.exports=n(4).isIterable=function(e){var t=Object(e);return void 0!==t[a]||"@@iterator"in t||o.hasOwnProperty(i(t))}},function(e,t,n){"use strict";var i=n(239),a=n(246),o=n(20),r=n(11);e.exports=n(69)(Array,"Array",function(e,t){this._t=r(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,a(1)):"keys"==t?a(0,n):"values"==t?a(0,e[n]):a(0,[n,e[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(e,t,n){var i=n(19);i(i.S+i.F,"Object",{assign:n(249)})},function(e,t,n){var i=n(19);i(i.S+i.F*!n(8),"Object",{defineProperty:n(10).f})},function(e,t,n){var i=n(46),a=n(16);n(254)("keys",function(){return function(e){return a(i(e))}})},function(e,t){},function(e,t,n){"use strict";var i=n(6),a=n(9),o=n(8),r=n(19),s=n(73),l=n(248).KEY,u=n(14),c=n(44),d=n(42),f=n(30),h=n(5),p=n(49),m=n(48),v=n(247),y=n(242),b=n(244),g=n(18),_=n(11),x=n(47),C=n(29),w=n(70),S=n(252),k=n(251),O=n(10),M=n(16),$=k.f,F=O.f,j=S.f,P=i.Symbol,T=i.JSON,R=T&&T.stringify,D="prototype",E=h("_hidden"),A=h("toPrimitive"),B={}.propertyIsEnumerable,I=c("symbol-registry"),L=c("symbols"),z=c("op-symbols"),N=Object[D],H="function"==typeof P,W=i.QObject,V=!W||!W[D]||!W[D].findChild,Y=o&&u(function(){return 7!=w(F({},"a",{get:function(){return F(this,"a",{value:7}).a}})).a})?function(e,t,n){var i=$(N,t);i&&delete N[t],F(e,t,n),i&&e!==N&&F(N,t,i)}:F,K=function(e){var t=L[e]=w(P[D]);return t._k=e,t},G=H&&"symbol"==typeof P.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof P},Z=function(e,t,n){return e===N&&Z(z,t,n),g(e),t=x(t,!0),g(n),a(L,t)?(n.enumerable?(a(e,E)&&e[E][t]&&(e[E][t]=!1),n=w(n,{enumerable:C(0,!1)})):(a(e,E)||F(e,E,C(1,{})),e[E][t]=!0),Y(e,t,n)):F(e,t,n)},X=function(e,t){g(e);for(var n,i=y(t=_(t)),a=0,o=i.length;o>a;)Z(e,n=i[a++],t[n]);return e},U=function(e,t){return void 0===t?w(e):X(w(e),t)},q=function(e){var t=B.call(this,e=x(e,!0));return!(this===N&&a(L,e)&&!a(z,e))&&(!(t||!a(this,e)||!a(L,e)||a(this,E)&&this[E][e])||t)},J=function(e,t){if(e=_(e),t=x(t,!0),e!==N||!a(L,t)||a(z,t)){var n=$(e,t);return!n||!a(L,t)||a(e,E)&&e[E][t]||(n.enumerable=!0),n}},Q=function(e){for(var t,n=j(_(e)),i=[],o=0;n.length>o;)a(L,t=n[o++])||t==E||t==l||i.push(t);return i},ee=function(e){for(var t,n=e===N,i=j(n?z:_(e)),o=[],r=0;i.length>r;)!a(L,t=i[r++])||n&&!a(N,t)||o.push(L[t]);return o};H||(P=function(){if(this instanceof P)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(n){this===N&&t.call(z,n),a(this,E)&&a(this[E],e)&&(this[E][e]=!1),Y(this,e,C(1,n))};return o&&V&&Y(N,e,{configurable:!0,set:t}),K(e)},s(P[D],"toString",function(){return this._k}),k.f=J,O.f=Z,n(71).f=S.f=Q,n(28).f=q,n(41).f=ee,o&&!n(40)&&s(N,"propertyIsEnumerable",q,!0),p.f=function(e){return K(h(e))}),r(r.G+r.W+r.F*!H,{Symbol:P});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)h(te[ne++]);for(var te=M(h.store),ne=0;te.length>ne;)m(te[ne++]);r(r.S+r.F*!H,"Symbol",{"for":function(e){return a(I,e+="")?I[e]:I[e]=P(e)},keyFor:function(e){if(G(e))return v(I,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),r(r.S+r.F*!H,"Object",{create:U,defineProperty:Z,defineProperties:X,getOwnPropertyDescriptor:J,getOwnPropertyNames:Q,getOwnPropertySymbols:ee}),T&&r(r.S+r.F*(!H||u(function(){var e=P();return"[null]"!=R([e])||"{}"!=R({a:e})||"{}"!=R(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!G(e)){for(var t,n,i=[e],a=1;arguments.length>a;)i.push(arguments[a++]);return t=i[1],"function"==typeof t&&(n=t),!n&&b(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!G(t))return t}),i[1]=t,R.apply(T,i)}}}),P[D][A]||n(15)(P[D],A,P[D].valueOf),d(P,"Symbol"),d(Math,"Math",!0),d(i.JSON,"JSON",!0)},function(e,t,n){n(48)("asyncIterator")},function(e,t,n){n(48)("observable")},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){var i,a;n(275),i=n(124);var o=n(453);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(336),i=n(125);var o=n(514);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(307),i=n(126);var o=n(485);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(312),i=n(127);var o=n(490);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(283),i=n(128),a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),e.exports=i},function(e,t,n){var i,a;n(318),i=n(129);var o=n(496);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(284),i=n(130);var o=n(461);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(339),i=n(131);var o=n(517);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(302),i=n(132);var o=n(480);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(281),i=n(133);var o=n(459);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(290),i=n(134);var o=n(467);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(344),i=n(135);var o=n(522);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(288),i=n(136);var o=n(465);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(330),i=n(137);var o=n(509);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(309),i=n(138);var o=n(487);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(361),i=n(139);var o=n(536);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(278),i=n(140);var o=n(456);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(328),i=n(141);var o=n(507);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(295),i=n(142);var o=n(472);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(298),i=n(143);var o=n(475);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(319),i=n(144);var o=n(497);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(292),i=n(145);var o=n(469);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(305),i=n(146);var o=n(483);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(282),i=n(147),a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),e.exports=i},function(e,t,n){var i,a;n(349),i=n(148),a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),e.exports=i},function(e,t,n){var i,a;n(311),i=n(149);var o=n(489);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(329),i=n(150);var o=n(508);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(343),i=n(151);var o=n(521);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(310),i=n(152);var o=n(488);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(360),i=n(153);var o=n(535);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(332),i=n(154);var o=n(511);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(315),i=n(155);var o=n(493);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;i=n(156);var o=n(481);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(303),i=n(157);var o=n(482);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;i=n(158);var o=n(479);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;i=n(159);var o=n(498);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(286),i=n(160);var o=n(463);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(321),i=n(161);var o=n(500);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(348),i=n(162),a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),e.exports=i},function(e,t,n){var i,a;n(299),i=n(163);var o=n(476);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(342),i=n(164);var o=n(520);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(362),i=n(165);var o=n(537);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(322),i=n(166);var o=n(501);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(271),i=n(172);var o=n(449);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(345),i=n(174);var o=n(523);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(346),i=n(177);var o=n(524);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(337),i=n(178);var o=n(515);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(340),i=n(179);var o=n(518);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(359),i=n(180);var o=n(534);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(338),i=n(181);var o=n(516);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(334),i=n(182);var o=n(513);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(301),i=n(183);var o=n(478);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(279),i=n(184);var o=n(457);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(327),i=n(185);var o=n(506);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(325),i=n(186);var o=n(504);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(341),i=n(187);var o=n(519);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(363),i=n(188);var o=n(538);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(308),i=n(189);var o=n(486);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(304),i=n(190),a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),e.exports=i},function(e,t,n){var i,a;n(300),i=n(191);var o=n(477);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(287),i=n(192);var o=n(464);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(358),i=n(193);var o=n(533);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(351),i=n(195),a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),e.exports=i},function(e,t,n){var i,a;n(355),i=n(196);var o=n(531);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(326),i=n(197);var o=n(505);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(296),i=n(198);var o=n(473);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;i=n(199);var o=n(460);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;i=n(201);var o=n(527);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(323),i=n(203);var o=n(502);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(313),i=n(204);var o=n(491);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(291),i=n(205);var o=n(468);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(280),i=n(206);var o=n(458);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(273),i=n(207);var o=n(451);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(274),i=n(208);var o=n(452);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(347),i=n(209);var o=n(525);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(320),i=n(210);var o=n(499);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(324),i=n(211);var o=n(503);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(289),i=n(212);var o=n(466);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(276),i=n(213);var o=n(454);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(316),i=n(214);var o=n(494);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(352),i=n(217);var o=n(528);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(350),i=n(218);var o=n(526);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(335),i=n(219),a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),e.exports=i},function(e,t,n){var i,a;n(333),i=n(220);var o=n(512);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(297),i=n(221);var o=n(474);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-linear-progress",style:{height:e.size+"px","border-radius":(e.size?e.size/2:"")+"px"}},[n("div",{"class":e.linearClass,style:e.linearStyle})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-circle-wrapper active",style:{width:e.size+"px",height:e.size+"px"}},[n("div",{staticClass:"mu-circle-spinner active","class":{"mu-circle-secondary":e.secondary},style:e.spinnerStyle},[n("div",{staticClass:"mu-circle-clipper left"},[n("div",{staticClass:"mu-circle",style:{"border-width":e.borderWidth+"px"}})]),e._v(" "),e._m(0),e._v(" "),n("div",{
staticClass:"mu-circle-clipper right"},[n("div",{staticClass:"mu-circle",style:{"border-width":e.borderWidth+"px"}})])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-circle-gap-patch"},[n("div",{staticClass:"mu-circle"})])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-text-field-multiline"},[n("textarea",{ref:"textareaHidden",staticClass:"mu-text-field-textarea-hide mu-text-field-input",domProps:{value:e.value}}),e._v(" "),n("textarea",{ref:"textarea",staticClass:"mu-text-field-input mu-text-field-textarea","class":e.normalClass,attrs:{placeholder:e.placeholder,disabled:e.disabled},domProps:{value:e.value},on:{input:e.handleInput,focus:e.handleFocus,blur:e.handleBlur}})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-text-field","class":e.textFieldClass,style:e.focus?e.errorStyle:{}},[e.icon?n("icon",{staticClass:"mu-text-field-icon","class":e.iconClass,attrs:{value:e.icon}}):e._e(),e._v(" "),n("div",{ref:"content",staticClass:"mu-text-field-content",on:{click:e.handleLabelClick}},[e.label?n("text-field-label",{attrs:{"float":e["float"],focus:e.focus,normalClass:e.labelClass,focusClass:e.labelFocusClass}},[e._v(e._s(e.label))]):e._e(),e._v(" "),e.hintText?n("text-field-hint",{"class":e.hintTextClass,attrs:{text:e.hintText,show:e.showHint}}):e._e(),e._v(" "),e._t("default",[e.multiLine?e._e():n("input",{ref:"input",staticClass:"mu-text-field-input","class":e.inputClass,attrs:{type:e.type,disabled:e.disabled},domProps:{value:e.inputValue},on:{focus:e.handleFocus,input:e.handleChange,blur:e.handleBlur}}),e._v(" "),e.multiLine?n("enhanced-textarea",{ref:"textarea",attrs:{normalClass:e.inputClass,value:e.inputValue,disabled:e.disabled,rows:e.rows,rowsMax:e.rowsMax},on:{change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur}}):e._e()]),e._v(" "),e.underlineShow?n("underline",{attrs:{error:!!e.errorText,disabled:e.disabled,errorColor:e.errorColor,focus:e.focus,normalClass:e.underlineClass,focusClass:e.underlineFocusClass}}):e._e(),e._v(" "),e.errorText||e.helpText||e.maxLength>0?n("div",{staticClass:"mu-text-field-help","class":e.helpTextClass,style:e.errorStyle},[n("div",[e._v("\n            "+e._s(e.errorText||e.helpText)+"\n        ")]),e._v(" "),e.maxLength>0?n("div",[e._v("\n            "+e._s(e.charLength)+"/"+e._s(e.maxLength)+"\n        ")]):e._e()]):e._e()],2)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-appbar","class":["mu-paper-"+e.zDepth]},[n("div",{staticClass:"left"},[e._t("left")],2),e._v(" "),n("div",{staticClass:"mu-appbar-title","class":e.titleClass},[e._t("default",[n("span",[e._v(e._s(e.title))])])],2),e._v(" "),n("div",{staticClass:"right"},[e._t("right")],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-clock-hours"},[n("clock-pointer",{attrs:{hasSelected:"",value:e.getSelected(),type:"hour"}}),e._v(" "),e._l(e.hours,function(t){return n("clock-number",{key:t,attrs:{selected:e.getSelected()===t,type:"hour",value:t}})}),e._v(" "),n("div",{ref:"mask",staticClass:"mu-clock-hours-mask",on:{mouseup:e.handleUp,mousemove:e.handleMove,touchmove:e.handleTouchMove,touchend:e.handleTouchEnd}})],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"mu-step-label","class":{active:e.active,completed:e.completed,disabled:e.disabled}},[e.num||e.$slots.icon&&e.$slots.length>0?n("span",{staticClass:"mu-step-label-icon-container"},[e._t("icon",[e.completed?n("svg",{staticClass:"mu-step-label-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]):e._e(),e._v(" "),e.completed?e._e():n("div",{staticClass:"mu-step-label-circle"},[e._v("\n        "+e._s(e.num)+"\n      ")])])],2):e._e(),e._v(" "),e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-content-block"},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"mu-radio","class":{"label-left":e.labelLeft,disabled:e.disabled,"no-label":!e.label},on:{mousedown:e.handleMouseDown,mouseleave:e.handleMouseLeave,mouseup:e.handleMouseUp,touchstart:e.handleTouchStart,touchend:e.handleTouchEnd,touchcancel:e.handleTouchEnd,click:function(t){t.stopPropagation(),e.handleClick(t)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputValue,expression:"inputValue"}],attrs:{type:"radio",disabled:e.disabled,name:e.name},domProps:{value:e.nativeValue,checked:e._q(e.inputValue,e.nativeValue)},on:{change:[function(t){e.inputValue=e.nativeValue},e.handleChange]}}),e._v(" "),e.disabled?e._e():n("touch-ripple",{staticClass:"mu-radio-wrapper",attrs:{rippleWrapperClass:"mu-radio-ripple-wrapper"}},[e.label&&e.labelLeft?n("div",{staticClass:"mu-radio-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e(),e._v(" "),n("div",{staticClass:"mu-radio-icon"},[e.checkedIcon?e._e():n("svg",{staticClass:"mu-radio-icon-uncheck mu-radio-svg-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),e._v(" "),e.uncheckIcon?e._e():n("svg",{staticClass:"mu-radio-icon-checked mu-radio-svg-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),e._v(" "),e.uncheckIcon?n("icon",{staticClass:"mu-radio-icon-uncheck","class":e.iconClass,attrs:{value:e.uncheckIcon}}):e._e(),e._v(" "),e.checkedIcon?n("icon",{staticClass:"mu-radio-icon-checked","class":e.iconClass,attrs:{value:e.checkedIcon}}):e._e()],1),e._v(" "),e.label&&!e.labelLeft?n("div",{staticClass:"mu-radio-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e()]),e._v(" "),e.disabled?n("div",{staticClass:"mu-radio-wrapper"},[e.label&&e.labelLeft?n("div",{staticClass:"mu-radio-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e(),e._v(" "),n("div",{staticClass:"mu-radio-icon"},[e.checkedIcon?e._e():n("svg",{staticClass:"mu-radio-icon-uncheck mu-radio-svg-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),e._v(" "),e.uncheckIcon?e._e():n("svg",{staticClass:"mu-radio-icon-checked mu-radio-svg-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})]),e._v(" "),e.uncheckIcon?n("icon",{staticClass:"mu-radio-icon-uncheck","class":e.iconClass,attrs:{value:e.uncheckIcon}}):e._e(),e._v(" "),e.checkedIcon?n("icon",{staticClass:"mu-radio-icon-checked","class":e.iconClass,attrs:{value:e.checkedIcon}}):e._e()],1),e._v(" "),e.label&&!e.labelLeft?n("div",{staticClass:"mu-radio-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e()]):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-tabs"},[e._t("default"),e._v(" "),n("span",{staticClass:"mu-tab-link-highlight","class":e.lineClass,style:e.tabLightStyle})],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-card-header"},[e._t("avatar"),e._v(" "),e.title||e.subTitle?n("div",{staticClass:"mu-card-header-title"},[n("div",{staticClass:"mu-card-title","class":e.titleClass},[e._v("\n      "+e._s(e.title)+"\n    ")]),e._v(" "),n("div",{staticClass:"mu-card-sub-title","class":e.subTitleClass},[e._v("\n      "+e._s(e.subTitle)+"\n    ")])]):e._e(),e._v(" "),e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tbody",[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("transition",{attrs:{name:"mu-bottom-sheet"},on:{"after-enter":function(t){e.show()},"after-leave":function(t){e.hide()}}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],ref:"popup",staticClass:"mu-bottom-sheet","class":e.sheetClass,style:{"z-index":e.zIndex}},[e._t("default")],2)])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"mu-clock-number","class":e.numberClass,style:e.numberStyle},[e._v(e._s(0===e.value?"00":e.value))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-grid-list",style:e.gridListStyle},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c||t;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-step-connector"},[n("span",{staticClass:"mu-step-connector-line"})])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-card-title-container"},[n("div",{staticClass:"mu-card-title","class":e.titleClass},[e._v("\n    "+e._s(e.title)+"\n  ")]),e._v(" "),n("div",{staticClass:"mu-card-sub-title","class":e.subTitleClass},[e._v("\n    "+e._s(e.subTitle)+"\n  ")])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-clock","class":{"mu-clock-landspace":e.landscape}},[n("time-display",{attrs:{selectedTime:e.selectedTime,format:e.format,mode:e.mode,affix:e.getAffix()},on:{selectMin:function(t){e.mode="minute"},selectHour:function(t){e.mode="hour"},selectAffix:e.handleSelectAffix}}),e._v(" "),n("div",{staticClass:"mu-clock-container"},[n("div",{staticClass:"mu-clock-circle"}),e._v(" "),"hour"===e.mode?n("clock-hours",{attrs:{format:e.format,initialHours:e.selectedTime.getHours()},on:{change:e.handleChangeHours}}):e._e(),e._v(" "),"minute"===e.mode?n("clock-minutes",{attrs:{initialMinutes:e.selectedTime.getMinutes()},on:{change:e.handleChangeMinutes}}):e._e(),e._v(" "),n("div",{staticClass:"mu-clock-actions"},[n("flat-button",{attrs:{label:e.cancelLabel,primary:""},on:{click:e.dismiss}}),e._v(" "),n("flat-button",{attrs:{label:e.okLabel,primary:""},on:{click:e.accept}})],1)],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-card-media"},[e._t("default"),e._v(" "),e.title||e.subTitle?n("div",{staticClass:"mu-card-media-title"},[e.title?n("div",{staticClass:"mu-card-title","class":e.titleClass},[e._v("\n      "+e._s(e.title)+"\n    ")]):e._e(),e._v(" "),e.subTitle?n("div",{staticClass:"mu-card-sub-title","class":e.subTitleClass},[e._v("\n      "+e._s(e.subTitle)+"\n    ")]):e._e()]):e._e()],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-tab-link","class":{"mu-tab-active":e.active},attrs:{href:e.href,disabled:e.disabled,"center-ripple":!1},on:{click:e.tabClick}},[e._t("default",[n("icon",{"class":e.iconClass,attrs:{value:e.icon}})]),e._v(" "),e.title?n("div",{staticClass:"mu-tab-text","class":e.textClass},[e._v(e._s(e.title))]):e._e()],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-date-display","class":e.displayClass},[n("div",{staticClass:"mu-date-display-year","class":{disabled:e.disableYearSelection},on:{click:e.handleSelectYear}},e._l(e.displayDates,function(t){return n("transition",{attrs:{name:"mu-date-display-"+e.slideType}},[n("div",{key:t.getFullYear(),staticClass:"mu-date-display-slideIn-wrapper"},[n("div",{staticClass:"mu-date-display-year-title"},[e._v("\n          "+e._s(t.getFullYear())+"\n        ")])])])})),e._v(" "),n("div",{staticClass:"mu-date-display-monthday",on:{click:e.handleSelectMonth}},e._l(e.displayDates,function(t){return n("transition",{attrs:{name:"mu-date-display-"+e.slideType}},[n("div",{key:e.dateTimeFormat.formatDisplay(t),staticClass:"mu-date-display-slideIn-wrapper"},[n("div",{staticClass:"mu-date-display-monthday-title"},[e._v("\n          "+e._s(e.dateTimeFormat.formatDisplay(t))+"\n        ")])])])}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("abstract-button",{ref:"button",staticClass:"mu-menu-item-wrapper","class":{active:e.active},attrs:{href:e.href,target:e.target,centerRipple:!1,disableFocusRipple:e.disableFocusRipple,disabled:e.disabled,containerElement:"div"},on:{click:e.handleClick,keyboardFocus:e.handleKeyboardFocus,hover:e.handleHover,hoverExit:e.handleHoverExit}},[n("div",{staticClass:"mu-menu-item","class":{"have-left-icon":e.leftIcon||e.inset}},[n("icon",{staticClass:"mu-menu-item-left-icon","class":e.leftIconClass,style:{color:e.filterColor(e.leftIconColor)},attrs:{value:e.leftIcon}}),e._v(" "),n("div",{staticClass:"mu-menu-item-title","class":e.titleClass},[e._t("title",[e._v("\n           "+e._s(e.title)+"\n         ")])],2),e._v(" "),e.rightIcon?e._e():n("div",[e.showAfterText?n("span",{"class":e.afterTextClass},[e._v(e._s(e.afterText))]):e._e(),e._v(" "),e._t("after")],2),e._v(" "),n("icon",{staticClass:"mu-menu-item-right-icon","class":e.rightIconClass,style:{color:e.filterColor(e.rightIconColor)},attrs:{value:e.rightIcon}})],1)]),e._v(" "),e.$slots&&e.$slots["default"]&&e.$slots["default"].length>0?n("popover",{attrs:{open:e.openMenu,anchorOrigin:{vertical:"top",horizontal:"right"},trigger:e.trigger},on:{close:e.close}},[e.openMenu?n("mu-menu",{"class":e.nestedMenuClass,attrs:{desktop:e.$parent.desktop,popover:"",listClass:e.nestedMenuListClass,maxHeight:e.$parent.maxHeight,value:e.nestedMenuValue}},[e._t("default")],2):e._e()],1):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mu-overlay-fade"}},[e.show?n("div",{staticClass:"mu-overlay",style:e.overlayStyle,on:{click:e.handleClick,touchmove:e.prevent}}):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-calendar-monthday-content"},e._l(e.weeksArray,function(t,i){return n("div",{key:i,staticClass:"mu-calendar-monthday-row"},e._l(t,function(t,a){return n("day-button",{key:"dayButton"+i+a,attrs:{disabled:e.isDisableDate(t),selected:e.equalsDate(t),date:t},on:{click:function(n){e.handleClick(t)}}})}))}))},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.fixedHeader?n("div",[n("table",{staticClass:"mu-table"},[e._t("header")],2)]):e._e(),e._v(" "),n("div",{style:e.bodyStyle},[n("table",{staticClass:"mu-table"},[e.fixedHeader?e._e():e._t("header"),e._v(" "),e._t("default"),e._v(" "),e.fixedFooter?e._e():e._t("footer")],2)]),e._v(" "),e.fixedFooter?n("div",[n("table",{staticClass:"mu-table"},[e._t("footer")],2)]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-tooltip","class":{touched:e.touch,"when-shown":e.show},style:e.tooltipStyle},[n("div",{ref:"ripple",staticClass:"mu-tooltip-ripple","class":{"when-shown":e.show},style:e.rippleStyle}),e._v(" "),n("span",{staticClass:"mu-tooltip-label"},[e._v(e._s(e.label))])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-calendar-toolbar"},[n("icon-button",{attrs:{disabled:!e.prevMonth},on:{click:function(t){t.stopPropagation(),e.prev(t)}}},[n("svg",{staticClass:"mu-calendar-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}})])]),e._v(" "),n("div",{staticClass:"mu-calendar-toolbar-title-wrapper"},e._l(e.displayDates,function(t){return n("transition",{attrs:{name:"mu-calendar-slide-"+e.slideType}},[n("div",{key:t.getTime(),staticClass:"mu-calendar-toolbar-title"},[e._v("\n        "+e._s(e.dateTimeFormat.formatMonth(t))+"\n      ")])])})),e._v(" "),n("icon-button",{attrs:{disabled:!e.nextMonth},on:{click:function(t){t.stopPropagation(),e.next(t)}}},[n("svg",{staticClass:"mu-calendar-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}})])])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-icon-button",attrs:{type:e.type,href:e.href,target:e.target,disabled:e.disabled,keyboardFocused:e.keyboardFocused},on:{click:e.handleClick,hover:e.handleHover,hoverExit:e.handleHoverExit,keyboardFocus:e.handleKeyboardFocus},nativeOn:{touchstart:function(t){e.handleStop(t)},mousedown:function(t){e.handleStop(t)}}},[e._t("default",[n("icon",{"class":e.iconClass,attrs:{value:e.icon}})]),e._v(" "),e.tooltip?n("tooltip",{attrs:{trigger:e.tooltipTrigger,verticalPosition:e.verticalPosition,horizontalPosition:e.horizontalPosition,show:e.tooltipShown,label:e.tooltip,touch:e.touch}}):e._e()],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-step-button",attrs:{centerRipple:!1,disabled:e.disabled},on:{click:e.handleClick}},[e.childrenInLabel?n("step-label",{attrs:{active:e.active,completed:e.completed,num:e.num,disabled:e.disabled}},[e._t("default"),e._v(" "),e._t("icon",null,{slot:"icon"})],2):e._e(),e._v(" "),e.childrenInLabel?e._e():e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("transition",{attrs:{name:e.transition},on:{"after-enter":function(t){e.show()},"after-leave":function(t){e.hide()}}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],ref:"popup",staticClass:"mu-popup","class":e.popupCss,style:{"z-index":e.zIndex}},[e._t("default")],2)])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col","class":e.classObj},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-card-actions"},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-flexbox-item",style:e.itemStyle},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-float-button","class":[e.buttonClass],style:e.buttonStyle,attrs:{type:e.type,href:e.href,target:e.target,disabled:e.disabled},on:{click:e.handleClick,keyboardFocus:e.handleKeyboardFocus,hover:e.handleHover,hoverExit:e.handleHoverExit}},[n("div",{staticClass:"mu-float-button-wrapper"},[e._t("default",[n("icon",{"class":e.iconClass,attrs:{value:this.icon}})])],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-date-picker","class":{fullWidth:e.fullWidth}},[n("text-field",{attrs:{value:e.inputValue,disabled:e.disabled,fullWidth:e.fullWidth,label:e.label,labelFloat:e.labelFloat,labelClass:e.labelClass,labelFocusClass:e.labelFocusClass,hintText:e.hintText,hintTextClass:e.hintTextClass,helpText:e.helpText,helpTextClass:e.helpTextClass,errorText:e.errorText,errorColor:e.errorColor,icon:e.icon,iconClass:e.iconClass,inputClass:e.inputClass,underlineShow:e.underlineShow,underlineClass:e.underlineClass,underlineFocusClass:e.underlineFocusClass},on:{focus:e.handleFocus,labelClick:e.handleClick}}),e._v(" "),e.disabled?e._e():n("date-picker-dialog",{ref:"dialog",attrs:{initialDate:e.dialogDate,mode:e.mode,maxDate:e.maxLimitDate,minDate:e.minLimitDate,shouldDisableDate:e.shouldDisableDate,firstDayOfWeek:e.firstDayOfWeek,container:e.container,disableYearSelection:e.disableYearSelection,dateTimeFormat:e.dateTimeFormat,autoOk:e.autoOk,okLabel:e.okLabel,cancelLabel:e.cancelLabel},on:{accept:e.handleAccept}})],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-list"},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-avatar",style:e.avatarStyle,on:{click:e.handleClick}},[n("div",{staticClass:"mu-avatar-inner"},[e.icon?n("icon",{"class":e.iconClass,attrs:{value:e.icon,size:e.iconSize}}):e._e(),e._v(" "),e.src?n("img",{"class":e.imgClass,attrs:{src:e.src}}):e._e(),e._v(" "),e._t("default")],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mu-snackbar"}},[n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.clickOutSide,expression:"clickOutSide"}],staticClass:"mu-snackbar",style:{"z-index":e.zIndex}},[n("div",{staticClass:"mu-snackbar-message"},[e._v("\n      "+e._s(e.message)+"\n    ")]),e._v(" "),e.action?n("flat-button",{staticClass:"mu-snackbar-action",attrs:{color:e.actionColor,rippleColor:"#FFF",rippleOpacity:.3,secondary:"",label:e.action},on:{click:e.handleActionClick}}):e._e()],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-chip","class":e.classNames,style:e.style,on:{mouseenter:e.onMouseenter,mouseup:e.onMouseup,mousedown:e.onMousedown,mouseleave:e.onMouseleave,touchstart:e.onTouchstart,click:e.handleClick,touchend:e.onTouchend,touchcancel:e.onTouchend}},[e._t("default"),e._v(" "),e.showDelete&&!e.disabled?n("svg",{staticClass:"mu-chip-delete-icon","class":e.deleteIconClass,attrs:{viewBox:"0 0 24 24"},on:{click:function(t){t.stopPropagation(),e.handleDelete(t)}}},[n("path",{attrs:{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}})]):e._e()],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("paper",{staticClass:"mu-drawer","class":{open:e.open,right:e.right},style:e.drawerStyle,attrs:{zDepth:e.zDepth}},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"mu-year-button","class":{selected:e.selected,hover:e.hover},on:{click:e.handleClick,mouseenter:e.handleHover,mouseleave:e.handleHoverExit}},[n("span",{staticClass:"mu-year-button-text"},[e._v(e._s(e.year))])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-badge-container"},[e._t("default"),e._v(" "),n("em",{staticClass:"mu-badge","class":e.badgeInternalClass,style:e.badgeStyle},[e._t("content",[e._v("\n      "+e._s(e.content)+"\n    ")])],2)],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",{key:e.rowId,staticClass:"mu-tr","class":e.className,on:{click:e.handleClick,mouseenter:e.handleHover,mouseleave:e.handleExit}},[e.isTh&&e.showCheckbox?n("mu-th",{staticClass:"mu-checkbox-col"},[n("checkbox",{attrs:{value:e.isSelectAll&&e.enableSelectAll,disabled:!e.enableSelectAll||!e.multiSelectable},on:{change:e.handleSelectAllChange}})],1):e._e(),e._v(" "),e.isTb&&e.showCheckbox?n("mu-td",{staticClass:"mu-checkbox-col"},[n("checkbox",{ref:"checkLabel",attrs:{disabled:!e.selectable||!e.$parent.selectable,value:e.isSelected},on:{change:e.handleCheckboxChange},nativeOn:{click:function(t){e.handleCheckboxClick(t)}}})],1):e._e(),e._v(" "),e.isTf&&e.showCheckbox?n("mu-td",{staticClass:"mu-checkbox-col"}):e._e(),e._v(" "),e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("th",{staticClass:"mu-th",on:{mouseenter:e.showTooltip,mouseleave:e.hideTooltip}},[n("div",{ref:"wrapper",staticClass:"mu-th-wrapper"},[e._t("default"),e._v(" "),e.tooltip?n("tooltip",{attrs:{trigger:e.tooltipTrigger,verticalPosition:e.verticalPosition,horizontalPosition:e.horizontalPosition,show:e.tooltipShown,label:e.tooltip,touch:e.touch}}):e._e()],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-flexbox","class":{"mu-flex-col":"vertical"===e.orient,"mu-flex-row":"horizontal"===e.orient},style:e.styles},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-clock-minutes"},[n("clock-pointer",{attrs:{hasSelected:"",value:e.minutes.selected,hasSelected:e.minutes.hasSelected,type:"minute"}}),e._v(" "),e._l(e.minutes.numbers,function(e){return n("clock-number",{key:e.minute,attrs:{selected:e.isSelected,type:"minute",value:e.minute}})}),e._v(" "),n("div",{ref:"mask",staticClass:"mu-clock-minutes-mask",on:{mouseup:e.handleUp,mousemove:e.handleMove,touchmove:e.handleTouch,touchend:e.handleTouch}})],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td",{staticClass:"mu-td",on:{mouseenter:e.handleMouseEnter,mouseleave:e.handleMouseLeave,click:e.handleClick}},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-buttom-item","class":{"mu-bottom-item-active":e.active},attrs:{href:e.href,disableTouchRipple:e.shift,"center-ripple":!1,wrapperClass:"mu-buttom-item-wrapper"},nativeOn:{click:function(t){e.handleClick(t)}}},[e.icon?n("icon",{staticClass:"mu-bottom-item-icon","class":e.iconClass,attrs:{value:e.icon}}):e._e(),e._v(" "),e._t("default"),e._v(" "),e.title?n("span",{staticClass:"mu-bottom-item-text","class":e.titleClass},[e._v(e._s(e.title))]):e._e()],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-calendar-year-container"},[n("div",{ref:"container",staticClass:"mu-calendar-year"},[n("div",{staticClass:"mu-calendar-year-list"},e._l(e.years,function(t){return n("year-button",{key:"yearButton"+t,attrs:{year:t,selected:t===e.selectedDate.getFullYear()},on:{click:function(n){e.handleClick(t)}}})}))])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row","class":{"no-gutter":!e.gutter}},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-text-field-label","class":e.labelClass},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:e.style},[n("div",{staticClass:"mu-grid-tile","class":e.tileClass},[e._t("default"),e._v(" "),n("div",{staticClass:"mu-grid-tile-titlebar","class":e.titleBarClass},[n("div",{staticClass:"mu-grid-tile-title-container"},[n("div",{staticClass:"mu-grid-tile-title"},[e._t("title",[e._v("\n            "+e._s(e.title)+"\n          ")])],2),e._v(" "),n("div",{staticClass:"mu-grid-tile-subtitle"},[e._t("subTitle",[e._v("\n            "+e._s(e.subTitle)+"\n          ")])],2)]),e._v(" "),n("div",{staticClass:"mu-grid-tile-action"},[e._t("action")],2)])],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mu-ripple"}},[n("div",{staticClass:"mu-circle-ripple",style:e.styles})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",{staticClass:"mu-thead"},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("hr",{staticClass:"mu-text-field-line","class":e.lineClass}),e._v(" "),e.disabled?e._e():n("hr",{staticClass:"mu-text-field-focus-line","class":e.focusLineClass,style:e.errorStyle})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-refresh-control","class":e.refreshClass,style:e.refreshStyle},[n("svg",{directives:[{name:"show",rawName:"v-show",value:!e.refreshing&&e.draging,expression:"!refreshing && draging"}],staticClass:"mu-refresh-svg-icon",style:e.circularStyle,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}})]),e._v(" "),n("circular",{directives:[{name:"show",rawName:"v-show",value:e.refreshing,expression:"refreshing"}],attrs:{size:24,"border-width":2}})],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"mu-switch","class":{"label-left":e.labelLeft,disabled:e.disabled,"no-label":!e.label},on:{mousedown:e.handleMouseDown,mouseleave:e.handleMouseLeave,mouseup:e.handleMouseUp,touchstart:e.handleTouchStart,touchend:e.handleTouchEnd,touchcancel:e.handleTouchEnd,click:function(t){t.stopPropagation(),e.handleClick(t)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputValue,expression:"inputValue"}],attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:Array.isArray(e.inputValue)?e._i(e.inputValue,null)>-1:e.inputValue},on:{change:[function(t){var n=e.inputValue,i=t.target,a=!!i.checked;if(Array.isArray(n)){var o=null,r=e._i(n,o);a?r<0&&(e.inputValue=n.concat(o)):r>-1&&(e.inputValue=n.slice(0,r).concat(n.slice(r+1)))}else e.inputValue=a},e.handleChange]}}),e._v(" "),n("div",{staticClass:"mu-switch-wrapper"},[e.label&&e.labelLeft?n("div",{staticClass:"mu-switch-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e(),e._v(" "),n("div",{staticClass:"mu-switch-container"},[n("div",{staticClass:"mu-switch-track","class":e.trackClass}),e._v(" "),e.disabled?n("div",{staticClass:"mu-switch-thumb","class":e.thumbClass}):e._e(),e._v(" "),e.disabled?e._e():n("touch-ripple",{staticClass:"mu-switch-thumb",attrs:{rippleWrapperClass:"mu-switch-ripple-wrapper"}})],1),e._v(" "),e.label&&!e.labelLeft?n("div",{staticClass:"mu-switch-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e()])]);
},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-raised-button","class":e.buttonClass,style:e.buttonStyle,attrs:{type:e.type,href:e.href,target:e.target,rippleColor:e.rippleColor,rippleOpacity:e.rippleOpacity,disabled:e.disabled,keyboardFocused:e.keyboardFocused,wrapperClass:"mu-raised-button-wrapper",centerRipple:!1},on:{KeyboardFocus:e.handleKeyboardFocus,hover:e.handleHover,hoverExit:e.handleHoverExit,click:e.handleClick}},[e.label&&"before"===e.labelPosition?n("span",{staticClass:"mu-raised-button-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e(),e._v(" "),n("icon",{"class":e.iconClass,attrs:{value:e.icon}}),e._v(" "),e._t("default"),e._v(" "),e.label&&"after"===e.labelPosition?n("span",{staticClass:"mu-raised-button-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e()],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-calendar","class":{"mu-calendar-landspace":"landscape"===e.mode}},[n("date-display",{attrs:{monthDaySelected:e.displayMonthDay,disableYearSelection:e.disableYearSelection,selectedDate:e.selectedDate,dateTimeFormat:e.dateTimeFormat},on:{selectYear:e.selectYear,selectMonth:e.selectMonth}}),e._v(" "),n("div",{staticClass:"mu-calendar-container"},[e.displayMonthDay?n("div",{staticClass:"mu-calendar-monthday-container"},[n("calendar-toolbar",{attrs:{slideType:e.slideType,nextMonth:e.nextMonth,prevMonth:e.prevMonth,displayDates:e.displayDates,dateTimeFormat:e.dateTimeFormat},on:{monthChange:e.handleMonthChange}}),e._v(" "),n("div",{staticClass:"mu-calendar-week"},e._l(e.weekTexts,function(t){return n("span",{staticClass:"mu-calendar-week-day"},[e._v(e._s(t))])})),e._v(" "),n("div",{staticClass:"mu-calendar-monthday"},e._l(e.displayDates,function(t){return n("transition",{attrs:{name:"mu-calendar-slide-"+e.slideType}},[n("div",{key:t.getTime(),staticClass:"mu-calendar-monthday-slide"},[n("calendar-month",{attrs:{shouldDisableDate:e.shouldDisableDate,displayDate:t,firstDayOfWeek:e.firstDayOfWeek,maxDate:e.maxDate,minDate:e.minDate,selectedDate:e.selectedDate},on:{selected:e.handleSelected}})],1)])}))],1):e._e(),e._v(" "),e.displayMonthDay?e._e():n("calendar-year",{attrs:{selectedDate:e.selectedDate,maxDate:e.maxDate,minDate:e.minDate},on:{change:e.handleYearChange}}),e._v(" "),n("div",{staticClass:"mu-calendar-actions"},[n("flat-button",{attrs:{label:e.cancelLabel,primary:""},on:{click:e.handleCancel}}),e._v(" "),e.autoOk?e._e():n("flat-button",{attrs:{label:e.okLabel,primary:""},on:{click:e.handleOk}})],1)],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("transition",{attrs:{name:"mu-dialog-slide"},on:{"after-enter":function(t){e.show()},"after-leave":function(t){e.hide()}}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],ref:"popup",staticClass:"mu-dialog-wrapper","class":e.dialogClass,style:{"z-index":e.zIndex}},[n("div",{staticClass:"mu-dialog"},[e.showTitle?n("h3",{ref:"title",staticClass:"mu-dialog-title","class":e.headerClass},[e._t("title",[e._v("\n            "+e._s(e.title)+"\n          ")])],2):e._e(),e._v(" "),n("div",{staticClass:"mu-dialog-body ","class":e.bodyClass,style:e.bodyStyle},[e._t("default")],2),e._v(" "),e.showFooter?n("div",{ref:"footer",staticClass:"mu-dialog-actions","class":e.footerClass},[e._t("actions")],2):e._e()])])])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"mu-checkbox","class":{"label-left":e.labelLeft,disabled:e.disabled,"no-label":!e.label},on:{mousedown:e.handleMouseDown,mouseup:e.handleMouseUp,mouseleave:e.handleMouseLeave,touchstart:e.handleTouchStart,touchend:e.handleTouchEnd,touchcancel:e.handleTouchEnd,click:function(t){t.stopPropagation(),e.handleClick(t)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputValue,expression:"inputValue"}],attrs:{type:"checkbox",disabled:e.disabled,name:e.name},domProps:{value:e.nativeValue,checked:Array.isArray(e.inputValue)?e._i(e.inputValue,e.nativeValue)>-1:e.inputValue},on:{change:[function(t){var n=e.inputValue,i=t.target,a=!!i.checked;if(Array.isArray(n)){var o=e.nativeValue,r=e._i(n,o);a?r<0&&(e.inputValue=n.concat(o)):r>-1&&(e.inputValue=n.slice(0,r).concat(n.slice(r+1)))}else e.inputValue=a},e.handleChange]}}),e._v(" "),e.disabled?e._e():n("touch-ripple",{staticClass:"mu-checkbox-wrapper",attrs:{rippleWrapperClass:"mu-checkbox-ripple-wrapper"}},[e.label&&e.labelLeft?n("div",{staticClass:"mu-checkbox-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e(),e._v(" "),n("div",{staticClass:"mu-checkbox-icon"},[e.checkedIcon?e._e():n("svg",{staticClass:"mu-checkbox-icon-uncheck mu-checkbox-svg-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}})]),e._v(" "),e.uncheckIcon?e._e():n("svg",{staticClass:"mu-checkbox-icon-checked mu-checkbox-svg-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]),e._v(" "),e.uncheckIcon?n("icon",{staticClass:"mu-checkbox-icon-uncheck","class":e.iconClass,attrs:{value:e.uncheckIcon}}):e._e(),e._v(" "),e.checkedIcon?n("icon",{staticClass:"mu-checkbox-icon-checked","class":e.iconClass,attrs:{value:e.checkedIcon}}):e._e()],1),e._v(" "),e.label&&!e.labelLeft?n("div",{staticClass:"mu-checkbox-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e()]),e._v(" "),e.disabled?n("div",{staticClass:"mu-checkbox-wrapper"},[e.label&&e.labelLeft?n("div",{staticClass:"mu-checkbox-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e(),e._v(" "),n("div",{staticClass:"mu-checkbox-icon"},[e.checkedIcon?e._e():n("svg",{staticClass:"mu-checkbox-icon-uncheck mu-checkbox-svg-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}})]),e._v(" "),e.uncheckIcon?e._e():n("svg",{staticClass:"mu-checkbox-icon-checked mu-checkbox-svg-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})]),e._v(" "),e.uncheckIcon?n("icon",{staticClass:"mu-checkbox-icon-uncheck","class":e.iconClass,attrs:{value:e.uncheckIcon}}):e._e(),e._v(" "),e.checkedIcon?n("icon",{staticClass:"mu-checkbox-icon-checked","class":e.iconClass,attrs:{value:e.checkedIcon}}):e._e()],1),e._v(" "),e.label&&!e.labelLeft?n("div",{staticClass:"mu-checkbox-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e()]):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{mousedown:e.handleMouseDown,mouseup:function(t){e.end()},mouseleave:function(t){e.end()},touchstart:e.handleTouchStart,touchend:function(t){e.end()},touchcancel:function(t){e.end()}}},[n("div",{ref:"holder",staticClass:"mu-ripple-wrapper","class":e.rippleWrapperClass},e._l(e.ripples,function(e){return n("circle-ripple",{key:e.key,attrs:{color:e.color,opacity:e.opacity,"merge-style":e.style}})})),e._v(" "),e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-flat-button","class":e.buttonClass,style:e.buttonStyle,attrs:{disabled:e.disabled,keyboardFocused:e.keyboardFocused,wrapperClass:"mu-flat-button-wrapper",type:e.type,href:e.href,target:e.target,rippleColor:e.rippleColor,rippleOpacity:e.rippleOpacity,centerRipple:!1},on:{click:e.handleClick,keyboardFocus:e.handleKeyboardFocus,hover:e.handleHover,hoverExit:e.handleHoverExit}},[e.label&&"before"===e.labelPosition?n("span",{staticClass:"mu-flat-button-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e(),e._v(" "),n("icon",{"class":e.iconClass,attrs:{value:e.icon}}),e._v(" "),e._t("default"),e._v(" "),e.label&&"after"===e.labelPosition?n("span",{staticClass:"mu-flat-button-label","class":e.labelClass},[e._v(e._s(e.label))]):e._e()],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mu-toast"}},[n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.clickOutSide,expression:"clickOutSide"}],staticClass:"mu-toast",style:{"z-index":e.zIndex}},[e._v("\n    "+e._s(e.message)+"\n  ")])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("transition",{attrs:{name:"mu-popover"},on:{"after-enter":function(t){e.show()},"after-leave":function(t){e.hide()}}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],ref:"popup",staticClass:"mu-popover","class":e.popoverClass,style:{"z-index":e.zIndex}},[e._t("default")],2)])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-auto-complete","class":{fullWidth:e.fullWidth}},[n("text-field",{directives:[{name:"model",rawName:"v-model",value:e.searchText,expression:"searchText"}],ref:"textField",attrs:{value:e.searchText,disabled:e.disabled,inputClass:e.inputClass,label:e.label,labelFloat:e.labelFloat,labelClass:e.labelClass,labelFocusClass:e.labelFocusClass,hintText:e.hintText,hintTextClass:e.hintTextClass,helpText:e.helpText,helpTextClass:e.helpTextClass,errorText:e.errorText,errorColor:e.errorColor,icon:e.icon,iconClass:e.iconClass,fullWidth:e.fullWidth,underlineShow:e.underlineShow,underlineClass:e.underlineClass,underlineFocusClass:e.underlineFocusClass},domProps:{value:e.searchText},on:{focus:e.handleFocus,input:[function(t){e.searchText=t},e.handleInput],blur:e.handleBlur},nativeOn:{keydown:function(t){e.handleKeyDown(t)}}}),e._v(" "),n("popover",{attrs:{overlay:!1,autoPosition:!1,scroller:e.scroller,open:e.open&&e.list.length>0,trigger:e.anchorEl,anchorOrigin:e.anchorOrigin,targetOrigin:e.targetOrigin},on:{close:e.handleClose}},[e.open?n("mu-menu",{ref:"menu",staticClass:"mu-auto-complete-menu",style:{width:(e.menuWidth&&e.menuWidth>e.inputWidth?e.menuWidth:e.inputWidth)+"px"},attrs:{maxHeight:e.maxHeight,disableAutoFocus:e.focusTextField,initiallyKeyboardFocused:"",autoWidth:!1},on:{itemClick:e.handleItemClick},nativeOn:{mousedown:function(t){e.handleMouseDown(t)}}},e._l(e.list,function(t){return n("menu-item",{staticClass:"mu-auto-complete-menu-item",attrs:{disableFocusRipple:e.disableFocusRipple,afterText:"",leftIcon:t.leftIcon,leftIconColor:t.leftIconColor,rightIconColor:t.rightIconColor,rightIcon:t.rightIcon,value:t.value,title:t.text},nativeOn:{mousedown:function(t){e.handleMouseDown(t)}}})})):e._e()],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.total?n("div",{staticClass:"mu-pagination"},[n("page-item",{attrs:{identifier:"singleBack",disabled:e.leftDisabled},on:{click:e.handleClick}},[n("svg",{staticClass:"mu-pagination-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}})])]),e._v(" "),n("page-item",{attrs:{index:1,isActive:1===e.actualCurrent},on:{click:e.handleClick}}),e._v(" "),e.totalPageCount>5&&e.actualCurrent-1>=4?n("page-item",{attrs:{identifier:"backs",title:"前5页"},on:{click:e.handleClick}},[n("span",[e._v("...")])]):e._e(),e._v(" "),e._l(e.pageList,function(t){return n("page-item",{attrs:{index:t,isActive:e.actualCurrent===t},on:{click:e.handleClick}})}),e._v(" "),e.totalPageCount>5&&e.totalPageCount-e.actualCurrent>=4?n("page-item",{attrs:{identifier:"forwards",title:"后5页"},on:{click:e.handleClick}},[n("span",[e._v("...")])]):e._e(),e._v(" "),1!==e.totalPageCount?n("page-item",{attrs:{index:e.totalPageCount,isActive:e.actualCurrent===e.totalPageCount},on:{click:e.handleClick}}):e._e(),e._v(" "),n("page-item",{attrs:{identifier:"singleForward",disabled:e.rightDisabled},on:{click:e.handleClick}},[n("svg",{staticClass:"mu-pagination-svg-icon",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}})])]),e._v(" "),e.showSizeChanger?n("select-field",{directives:[{name:"model",rawName:"v-model",value:e.actualPageSize,expression:"actualPageSize"}],style:{width:"100px"},domProps:{value:e.actualPageSize},on:{input:function(t){e.actualPageSize=t}}},e._l(e.pageSizeOption,function(e){return n("menu-item",{style:{width:"100px"},attrs:{value:e,title:e+" / 页"}})})):e._e()],2):e._e()},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-picker"},[e._l(e.slots,function(t,i){return n("picker-slot",{attrs:{divider:t.divider,content:t.content,"text-align":t.textAlign,width:t.width,value:e.values[i],values:t.values,"visible-item-count":e.visibleItemCount},on:{change:function(t){e.change(i,arguments)}}})}),e._v(" "),n("div",{staticClass:"mu-picker-center-highlight"})],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-card"},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-paper","class":e.paperClass},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("text-field",{ref:"textField",staticClass:"mu-select-field",attrs:{label:e.label,labelFloat:e.labelFloat,underlineShow:e.underlineShow,labelClass:e.labelClass,labelFocusClass:e.labelFocusClass,underlineClass:e.underlineClass,underlineFocusClass:e.underlineFocusClass,fullWidth:e.fullWidth,hintText:e.hintText,hintTextClass:e.hintTextClass,helpText:e.helpText,helpTextClass:e.helpTextClass,icon:e.icon,iconClass:e.iconClass,value:e.inputValue instanceof Array?e.inputValue.join(""):e.inputValue,disabled:e.disabled,errorText:e.errorText,errorColor:e.errorColor}},[n("dropDown-menu",{attrs:{anchorEl:e.anchorEl,scroller:e.scroller,value:e.inputValue,disabled:e.disabled,maxHeight:e.maxHeight,autoWidth:e.autoWidth,iconClass:e.dropDownIconClass,multiple:e.multiple,anchorOrigin:{vertical:"bottom",horizontal:"left"}},on:{open:e.handleOpen,close:e.handleClose,change:e.handlehange}},[e._t("default")],2)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-icon-menu"},[n("icon-button",{attrs:{tooltip:e.tooltip,tooltipPosition:e.tooltipPosition,icon:e.icon,iconClass:e.iconClass},on:{click:e.handleOpen}},[e._t("icon")],2),e._v(" "),n("popover",{attrs:{open:e.openMenu,trigger:e.trigger,scroller:e.scroller,anchorOrigin:e.anchorOrigin,targetOrigin:e.targetOrigin},on:{close:e.handleClose}},[e.openMenu?n("mu-menu",{"class":e.menuClass,attrs:{popover:"",value:e.value,listClass:e.menuListClass,multiple:e.multiple,desktop:e.desktop,maxHeight:e.maxHeight},on:{change:e.change,itemClick:e.itemClick}},[e._t("default")],2):e._e()],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("hr",{staticClass:"mu-divider","class":{inset:e.inset,shallowInset:e.shallowInset}})},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-card-text"},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("abstract-button",{staticClass:"mu-item-wrapper",style:e.disabled?e.itemStyle:{},attrs:{containerElement:"div",href:e.href,disabled:e.disabled,disableFocusRipple:e.disableRipple,disableTouchRipple:e.disableRipple,target:e.target,wrapperStyle:e.itemStyle,centerRipple:!1},on:{click:e.handleClick,keyboardFocus:e.handleKeyboardFocus,hover:e.handleHover,hoverExit:e.handleHoverExit}},[n("div",{"class":e.itemClass},[e.showLeft?n("div",{staticClass:"mu-item-left"},[e._t("left"),e._v(" "),e._t("leftAvatar")],2):e._e(),e._v(" "),n("div",{staticClass:"mu-item-content"},[e.showTitleRow?n("div",{staticClass:"mu-item-title-row"},[n("div",{staticClass:"mu-item-title","class":e.titleClass},[e._t("title",[e._v("\n               "+e._s(e.title)+"\n             ")])],2),e._v(" "),n("div",{staticClass:"mu-item-after","class":e.afterTextClass},[e._t("after",[e._v("\n                "+e._s(e.afterText)+"\n              ")])],2)]):e._e(),e._v(" "),e.showDescribe?n("div",{staticClass:"mu-item-text","class":e.describeTextClass,style:e.textStyle},[e._t("describe",[e._v("\n            "+e._s(e.describeText)+"\n          ")])],2):e._e(),e._v(" "),e._t("default")],2),e._v(" "),e.showRight?n("div",{staticClass:"mu-item-right"},[e.toggleNested?n("icon-button",{on:{click:function(t){t.stopPropagation(),e.handleToggleNested(t)}}},[e.nestedOpen?n("svg",{staticClass:"mu-item-svg-icon","class":e.toggleIconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}})]):e._e(),e._v(" "),e.nestedOpen?e._e():n("svg",{staticClass:"mu-item-svg-icon","class":e.toggleIconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}})])]):e._e(),e._v(" "),e._t("right"),e._v(" "),e._t("rightAvatar")],2):e._e()])]),e._v(" "),n("expand-transition",[e.showNested?n("mu-list",{"class":e.nestedListClass,attrs:{nestedLevel:e.nestedLevel,value:e.nestedSelectValue},on:{change:e.handleNestedChange}},[e._t("nested")],2):e._e()],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("abstract-button",{staticClass:"mu-pagination-item","class":{circle:e.isCircle,active:e.isActive},attrs:{wrapperClass:"mu-pagination-item-wrapper",centerRipple:!1,disabled:e.disabled,containerElement:"div"},on:{click:e.handleClick,hover:e.handleHover,hoverExit:e.handleHoverExit}},[e.index?n("span",[e._v(e._s(e.index))]):e._e(),e._v(" "),e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-text-field-hint","class":{show:e.show}},[e._v("\n  "+e._s(e.text)+"\n")])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-time-picker","class":{fullWidth:e.fullWidth}},[n("text-field",{attrs:{value:e.inputValue,fullWidth:e.fullWidth,inputClass:e.inputClass,label:e.label,labelFloat:e.labelFloat,labelClass:e.labelClass,labelFocusClass:e.labelFocusClass,hintText:e.hintText,hintTextClass:e.hintTextClass,helpText:e.helpText,helpTextClass:e.helpTextClass,disabled:e.disabled,errorText:e.errorText,errorColor:e.errorColor,icon:e.icon,iconClass:e.iconClass,underlineShow:e.underlineShow,underlineClass:e.underlineClass,underlineFocusClass:e.underlineFocusClass},on:{focus:e.handleFocus,labelClick:e.handleClick}}),e._v(" "),e.disabled?e._e():n("time-picker-dialog",{ref:"dialog",attrs:{initialTime:e.dialogTime,format:e.format,mode:e.mode,container:e.container,autoOk:e.autoOk,okLabel:e.okLabel,cancelLabel:e.cancelLabel},on:{accept:e.handleAccept}})],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tfoot",{staticClass:"mu-tfoot"},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-time-display"},[n("div",{staticClass:"mu-time-display-text"},[n("div",{staticClass:"mu-time-display-affix"}),e._v(" "),n("div",{staticClass:"mu-time-display-time"},[n("span",{staticClass:"mu-time-display-clickable","class":{inactive:"minute"===e.mode},on:{click:e.handleSelectHour}},[e._v(e._s(e.sanitizeTime[0]))]),e._v(" "),n("span",[e._v(":")]),e._v(" "),n("span",{staticClass:"mu-time-display-clickable","class":{inactive:"hour"===e.mode},on:{click:e.handleSelectMin}},[e._v(e._s(e.sanitizeTime[1]))])]),e._v(" "),n("div",{staticClass:"mu-time-display-affix"},["ampm"===e.format?n("div",{staticClass:"mu-time-display-clickable","class":{inactive:"am"===e.affix},on:{click:function(t){e.handleSelectAffix("pm")}}},[e._v("\n        PM\n      ")]):e._e(),e._v(" "),"ampm"===e.format?n("div",{staticClass:"mu-time-display-clickable mu-time-display-affix-top","class":{inactive:"pm"===e.affix},on:{click:function(t){e.handleSelectAffix("am")}}},[e._v("\n        AM\n      ")]):e._e()])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-focus-ripple-wrapper"},[n("div",{ref:"innerCircle",staticClass:"mu-focus-ripple",style:e.style})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"mu-expand"},on:{"before-enter":e.beforeEnter,enter:e.enter,"after-enter":e.afterEnter,"before-leave":e.beforeLeave,leave:e.leave,"after-leave":e.afterLeave}},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-sub-header","class":{inset:e.inset}},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.clickoutside,expression:"clickoutside"}],staticClass:"mu-menu",style:{width:e.contentWidth},attrs:{tabindex:"0"},on:{keydown:e.handleKeydown}},[n("div",{ref:"list",staticClass:"mu-menu-list","class":e.menuListClass,style:{width:e.contentWidth,"max-height":e.maxHeight+"px"}},[e._t("default")],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-step-content","class":{last:e.last}},[n("div",{staticStyle:{position:"relative",overflow:"hidden",height:"100%"}},[n("expand-transition",[e.active?n("div",{ref:"inner",staticClass:"mu-step-content-inner"},[e._t("default")],2):e._e()])],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-picker-slot","class":{"mu-picker-slot-divider":e.divider},style:{width:e.width}},[e.divider?e._e():n("div",{ref:"wrapper",staticClass:"mu-picker-slot-wrapper","class":{animate:e.animate},style:{height:e.contentHeight+"px"}},e._l(e.values,function(t){return n("div",{staticClass:"mu-picker-item","class":{selected:t===e.value},style:{"text-align":e.textAlign}},[e._v(e._s(t.text||t))])})),e._v(" "),e.divider?n("div",[e._v(e._s(e.content))]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-dropDown-menu","class":{disabled:e.disabled}},[n("svg",{staticClass:"mu-dropDown-menu-icon","class":e.iconClass,attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})]),e._v(" "),n("div",{staticClass:"mu-dropDown-menu-text","class":e.labelClass,on:{click:e.handleOpen}},[n("div",{staticClass:"mu-dropDown-menu-text-overflow"},[e._v(e._s(e.label))])]),e._v(" "),n("div",{staticClass:"mu-dropDown-menu-line","class":e.underlineClass}),e._v(" "),!e.disabled&&e.$slots&&e.$slots["default"]&&e.$slots["default"].length>0?n("popover",{attrs:{scroller:e.scroller,open:e.openMenu,trigger:e.trigger,anchorOrigin:e.anchorOrigin},on:{close:e.handleClose}},[e.openMenu?n("mu-menu",{"class":e.menuClass,style:{width:e.menuWidth+"px"},attrs:{listClass:e.menuListClass,value:e.value,multiple:e.multiple,autoWidth:e.autoWidth,popover:"",desktop:"",maxHeight:e.maxHeight},on:{change:e.change,itemClick:e.itemClick}},[e._t("default")],2):e._e()],1):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-circular-progress",style:{width:e.size+"px",height:e.size+"px"}},["indeterminate"===e.mode?n("circular",{attrs:{size:e.size,color:e.color,borderWidth:e.strokeWidth}}):e._e(),e._v(" "),"determinate"===e.mode?n("svg",{staticClass:"mu-circular-progress-determinate",style:e.circularSvgStyle,attrs:{viewBox:"0 0 "+e.size+" "+e.size}},[n("circle",{staticClass:"mu-circular-progress-determinate-path",style:e.circularPathStyle,attrs:{r:e.radius,cx:e.size/2,cy:e.size/2,fill:"none","stroke-miterlimit":"20","stroke-width":e.strokeWidth}})]):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-infinite-scroll"},[n("circular",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],attrs:{size:24}}),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"mu-infinite-scroll-text"},[e._v(e._s(e.loadingText))])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mu-slider","class":e.sliderClass,attrs:{tabindex:"0"},on:{focus:e.handleFocus,blur:e.handleBlur,keydown:e.handleKeydown,touchstart:e.handleTouchStart,touchend:e.handleTouchEnd,touchcancel:e.handleTouchEnd,mousedown:e.handleMouseDown,mouseup:e.handleMouseUp,mouseenter:e.handleMouseEnter,mouseleave:e.handleMouseLeave}},[n("div",{staticClass:"mu-slider-track"}),e._v(" "),n("div",{staticClass:"mu-slider-fill",style:e.fillStyle}),e._v(" "),n("div",{staticClass:"mu-slider-thumb",style:e.thumbStyle},[!e.focused&&!e.hover||e.active?e._e():n("focus-ripple")],1)])},staticRenderFns:[]}}])});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(10)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./muse-ui.css", function() {
			var newContent = require("!!../../css-loader/index.js!./muse-ui.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(16),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\HTML5\\vue\\kugo\\component\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c69c47de", Component.options)
  } else {
    hotAPI.reload("data-v-c69c47de", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.2.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // inject instance registration hooks
    var hooks = data.hook || (data.hook = {});
    hooks.init = function (vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.prepatch = function (oldVnode, vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.destroy = function (vnode) {
      if (matched.instances[name] === vnode.child) {
        matched.instances[name] = undefined;
      }
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      warn(false, ("props in \"" + (route.path) + "\" is a " + (typeof config) + ", expecting an object, function or boolean."));
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more comformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  if (query) {
    var parsedQuery;
    try {
      parsedQuery = parseQuery(query);
    } catch (e) {
      process.env.NODE_ENV !== 'production' && warn(false, e.message);
      parsedQuery = {};
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key];
    }
    return parsedQuery
  } else {
    return extraQuery
  }
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom
) {
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (ref) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  return (path || '/') + stringifyQuery(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active';
    var compareTarget = location.path ? createRoute(null, location) : route;
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.target && e.target.getAttribute) {
    var target = e.target.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this.$root._route }
  });

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop();
    } else {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function createRouteMap (
  routes,
  oldPathMap,
  oldNameMap
) {
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathMap, nameMap, route);
  });

  return {
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
      });
    } else {
      var aliasRoute = {
        path: route.alias,
        children: route.children
      };
      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
    }
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = index$1;

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCache = Object.create(null);

function getRouteRegex (path) {
  var hit = regexpCache[path];
  var keys, regexp;

  if (hit) {
    keys = hit.keys;
    regexp = hit.regexp;
  } else {
    keys = [];
    regexp = index(path, keys);
    regexpCache[path] = { keys: keys, regexp: regexp };
  }

  return { keys: keys, regexp: regexp }
}

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : (current && current.path) || '/';
  var query = resolveQuery(parsedPath.query, next.query);
  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */

function createMatcher (routes) {
  var ref = createRouteMap(routes);
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      var paramNames = getRouteRegex(record.path).keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      process.env.NODE_ENV !== 'production' && warn(
        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
      );
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  path,
  params,
  pathname
) {
  var ref = getRouteRegex(path);
  var regexp = ref.regexp;
  var keys = ref.keys;
  var m = pathname.match(regexp);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) { params[key.name] = val; }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        position = getElementPosition(el);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */


var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
  }
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, onAbort);
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function () { onAbort && onAbort(); };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    hook(route, current, function (to) {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true);
        abort();
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
        abort();
      } else {
        // confirm transition and pass on the value
        next(to);
      }
    });
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { return cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  return function boundRouteGuard () {
    return guard.apply(instance, arguments)
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

function resolveAsyncComponents (matched) {
  return flatMapComponents(matched, function (def, _, match, key) {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        var resolve = once(function (resolvedDef) {
          match.components[key] = resolvedDef;
          next();
        });

        var reject = once(function (reason) {
          warn(false, ("Failed to resolve async component " + key + ": " + reason));
          next(false);
        });

        var res = def(resolve, reject);
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject);
        }
      }
    }
  })
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    if (called) { return }
    called = true;
    return fn.apply(this, arguments)
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var i = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  );
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || []);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn);
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn);
};

VueRouter.prototype.onReady = function onReady (cb) {
  this.history.onReady(cb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(to, current || this.history.current, append);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.2.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = VueRouter;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(24)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}*,:after,:before{box-sizing:border-box}html{font-size:62.5%}body{font-family:Roboto,Lato,sans-serif;line-height:1.5;font-size:14px;font-weight:400;width:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);background-color:#fff;color:rgba(0,0,0,.87)}body,html{overflow-x:hidden;overflow-y:auto}pre{white-space:pre-wrap;word-break:break-all;margin:0}a{text-decoration:none;color:#ff4081;user-select:none;-webkit-user-select:none}.mu-icon{font-size:24px;cursor:inherit}.mu-badge-container{display:inline-block;position:relative}.mu-badge{font-size:10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 6px;line-height:1.5;font-size:12px;font-style:normal;background-color:#bdbdbd;color:#fff;border-radius:3px;overflow:hidden}.mu-badge-float{position:absolute;top:-12px;right:-12px}.mu-badge-circle{border-radius:50%;padding:0;width:24px;height:24px;overflow:hidden}.mu-badge-primary{background-color:#03a9f4}.mu-badge-secondary{background-color:#ff4081}.mu-appbar{-ms-flex-item-align:start;align-self:flex-start;color:#fff;background-color:#03a9f4;height:56px;padding:0 8px;width:100%;z-index:100}.mu-appbar,.mu-appbar>.left,.mu-appbar>.right{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-flex:0;-webkit-flex-shrink:0;-ms-flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0}.mu-appbar>.left,.mu-appbar>.right{height:100%}.mu-appbar .mu-icon-button{color:inherit}.mu-appbar .mu-flat-button{color:inherit;height:100%;line-height:100%;min-width:auto}.mu-appbar-title{-webkit-box-flex:1;-ms-flex:1;flex:1;padding-left:8px;padding-right:8px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;font-size:20px;font-weight:400;line-height:56px}@media (min-width:480px){.mu-appbar-title{line-height:64px}.mu-appbar{height:64px}.mu-appbar-title{font-size:24px}}.mu-icon-button{position:relative;display:inline-block;overflow:visible;line-height:1;width:48px;height:48px;border-radius:50%;font-size:24px;padding:12px;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;color:inherit;text-decoration:none;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:cubic-bezier(.23,1,.32,1);transition-timing-function:cubic-bezier(.23,1,.32,1);-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-box-flex:0;-webkit-flex-shrink:0;-ms-flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0;margin:0;outline:0;cursor:pointer}.mu-icon-button .mu-circle-ripple{color:rgba(0,0,0,.87)}.mu-icon-button.disabled{color:rgba(0,0,0,.38);cursor:not-allowed}.mu-ripple-wrapper{height:100%;width:100%;position:absolute;top:0;left:0;overflow:hidden}.mu-circle-ripple{position:absolute;width:100%;height:100%;left:0;top:0;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:50%;background-color:currentColor;background-clip:padding-box;opacity:.1}.mu-ripple-enter-active,.mu-ripple-leave-active{-webkit-transition:opacity 2s cubic-bezier(.23,1,.32,1),-webkit-transform 1s cubic-bezier(.23,1,.32,1);transition:opacity 2s cubic-bezier(.23,1,.32,1),-webkit-transform 1s cubic-bezier(.23,1,.32,1);transition:opacity 2s cubic-bezier(.23,1,.32,1),transform 1s cubic-bezier(.23,1,.32,1);transition:opacity 2s cubic-bezier(.23,1,.32,1),transform 1s cubic-bezier(.23,1,.32,1),-webkit-transform 1s cubic-bezier(.23,1,.32,1)}.mu-ripple-enter{-webkit-transform:scale(0);transform:scale(0)}.mu-ripple-leave-active{opacity:0!important}.mu-focus-ripple-wrapper{height:100%;width:100%;position:absolute;top:0;left:0;overflow:hidden}.mu-focus-ripple{position:absolute;height:100%;width:100%;border-radius:50%;opacity:.16;background-color:currentColor;-webkit-animation:mu-pulsate .75s cubic-bezier(.445,.05,.55,.95);animation:mu-pulsate .75s cubic-bezier(.445,.05,.55,.95);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-direction:alternate;animation-direction:alternate}@-webkit-keyframes mu-pulsate{0%{-webkit-transform:scale(.72);transform:scale(.72)}to{-webkit-transform:scale(.85);transform:scale(.85)}}@keyframes mu-pulsate{0%{-webkit-transform:scale(.72);transform:scale(.72)}to{-webkit-transform:scale(.85);transform:scale(.85)}}.mu-tooltip{position:absolute;font-size:10px;line-height:22px;padding:0 8px;z-index:300;color:#fff;overflow:hidden;top:-1000px;border-radius:2px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:0;-webkit-transition:top 0ms cubic-bezier(.23,1,.32,1) .45s,opacity .45s cubic-bezier(.23,1,.32,1) 0ms,-webkit-transform .45s cubic-bezier(.23,1,.32,1) 0ms;transition:top 0ms cubic-bezier(.23,1,.32,1) .45s,opacity .45s cubic-bezier(.23,1,.32,1) 0ms,-webkit-transform .45s cubic-bezier(.23,1,.32,1) 0ms;transition:top 0ms cubic-bezier(.23,1,.32,1) .45s,transform .45s cubic-bezier(.23,1,.32,1) 0ms,opacity .45s cubic-bezier(.23,1,.32,1) 0ms;transition:top 0ms cubic-bezier(.23,1,.32,1) .45s,transform .45s cubic-bezier(.23,1,.32,1) 0ms,opacity .45s cubic-bezier(.23,1,.32,1) 0ms,-webkit-transform .45s cubic-bezier(.23,1,.32,1) 0ms}.mu-tooltip.when-shown{opacity:.9;-webkit-transition:top 0ms cubic-bezier(.23,1,.32,1) 0ms,opacity .45s cubic-bezier(.23,1,.32,1) 0ms,-webkit-transform .45s cubic-bezier(.23,1,.32,1) 0ms;transition:top 0ms cubic-bezier(.23,1,.32,1) 0ms,opacity .45s cubic-bezier(.23,1,.32,1) 0ms,-webkit-transform .45s cubic-bezier(.23,1,.32,1) 0ms;transition:top 0ms cubic-bezier(.23,1,.32,1) 0ms,transform .45s cubic-bezier(.23,1,.32,1) 0ms,opacity .45s cubic-bezier(.23,1,.32,1) 0ms;transition:top 0ms cubic-bezier(.23,1,.32,1) 0ms,transform .45s cubic-bezier(.23,1,.32,1) 0ms,opacity .45s cubic-bezier(.23,1,.32,1) 0ms,-webkit-transform .45s cubic-bezier(.23,1,.32,1) 0ms}.mu-tooltip.touched{font-size:14px;line-height:32px;padding:0 16px}.mu-tooltip-ripple{position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);border-radius:50%;background-color:transparent;-webkit-transition:width 0ms cubic-bezier(.23,1,.32,1) .45s,height 0ms cubic-bezier(.23,1,.32,1) .45s,background-color .45s cubic-bezier(.23,1,.32,1) 0ms;transition:width 0ms cubic-bezier(.23,1,.32,1) .45s,height 0ms cubic-bezier(.23,1,.32,1) .45s,background-color .45s cubic-bezier(.23,1,.32,1) 0ms}.mu-tooltip-ripple.when-shown{background-color:#616161;-webkit-transition:width .45s cubic-bezier(.23,1,.32,1) 0ms,height .45s cubic-bezier(.23,1,.32,1) 0ms,background-color .45s cubic-bezier(.23,1,.32,1) 0ms;transition:width .45s cubic-bezier(.23,1,.32,1) 0ms,height .45s cubic-bezier(.23,1,.32,1) 0ms,background-color .45s cubic-bezier(.23,1,.32,1) 0ms}.mu-tooltip-label{white-space:nowrap;position:relative}.mu-flat-button{display:inline-block;overflow:hidden;position:relative;border-radius:2px;height:36px;line-height:36px;min-width:88px;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:cubic-bezier(.23,1,.32,1);transition-timing-function:cubic-bezier(.23,1,.32,1);-webkit-transform:translateZ(0);transform:translateZ(0);text-decoration:none;text-transform:uppercase;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;color:rgba(0,0,0,.87);-webkit-box-flex:0;-webkit-flex-shrink:0;-ms-flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0;margin:0;outline:0;padding:0;cursor:pointer}.mu-flat-button.hover{background-color:rgba(0,0,0,.1)}.mu-flat-button.disabled{color:rgba(0,0,0,.38);cursor:not-allowed;background:none}.mu-flat-button .mu-icon{vertical-align:middle;margin-left:12px;margin-right:0}.mu-flat-button .mu-icon+.mu-flat-button-label{padding-left:8px}.mu-flat-button.no-label .mu-icon{margin-left:0}.mu-flat-button .mu-circle-ripple{color:rgba(0,0,0,.87)}.mu-flat-button.label-before{padding-right:8px}.mu-flat-button.label-before .mu-icon{margin-right:4px;margin-left:0}.mu-flat-button.label-before .mu-flat-button-label{padding-right:8px}.mu-flat-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%}.mu-flat-button-primary{color:#03a9f4}.mu-flat-button-secondary{color:#ff4081}.mu-flat-button-label{vertical-align:middle;padding-right:16px;padding-left:16px;font-size:14px}.mu-raised-button{display:inline-block;overflow:hidden;position:relative;border-radius:2px;height:36px;line-height:36px;min-width:88px;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:cubic-bezier(.23,1,.32,1);transition-timing-function:cubic-bezier(.23,1,.32,1);-webkit-transform:translateZ(0);transform:translateZ(0);text-decoration:none;text-transform:uppercase;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;color:rgba(0,0,0,.87);-webkit-box-flex:0;-webkit-flex-shrink:0;-ms-flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0;margin:0;outline:0;padding:0;cursor:pointer;box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)}.mu-raised-button.focus{box-shadow:0 3px 10px rgba(0,0,0,.156863),0 3px 10px rgba(0,0,0,.227451)}.mu-raised-button.hover .mu-raised-button-wrapper{background-color:rgba(0,0,0,.1)}.mu-raised-button.disabled{color:rgba(0,0,0,.3);cursor:not-allowed;background-color:#e6e6e6;box-shadow:none}.mu-raised-button.disabled.hover,.mu-raised-button.disabled:active,.mu-raised-button.disabled:hover{box-shadow:none}.mu-raised-button.disabled.hover .mu-raised-button-wrapper,.mu-raised-button.disabled:active .mu-raised-button-wrapper,.mu-raised-button.disabled:hover .mu-raised-button-wrapper{background-color:transparent}.mu-raised-button .mu-icon{vertical-align:middle;margin-left:12px;margin-right:0}.mu-raised-button .mu-icon+.mu-raised-button-label{padding-left:8px}.mu-raised-button.no-label .mu-icon{margin:0}.mu-raised-button.label-before .mu-raised-button-wrapper{padding-right:8px}.mu-raised-button.label-before .mu-icon{margin-right:4px;margin-left:0}.mu-raised-button.label-before .mu-raised-button-label{padding-right:8px}.mu-raised-button:active{box-shadow:0 3px 10px rgba(0,0,0,.156863),0 3px 10px rgba(0,0,0,.227451)}.mu-raised-button-wrapper{border-radius:2px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;height:100%}.mu-raised-button-primary{background-color:#03a9f4}.mu-raised-button-secondary{background-color:#ff4081}.mu-raised-button-full{width:100%}.mu-raised-button.mu-raised-button-inverse{color:#fff}.mu-raised-button.mu-raised-button-inverse .mu-circle-ripple{opacity:.3}.mu-raised-button.mu-raised-button-inverse.hover .mu-raised-button-wrapper{background-color:hsla(0,0%,100%,.3)}.mu-raised-button-label{vertical-align:middle;padding-right:16px;padding-left:16px}.mu-float-button{position:relative;display:inline-block;overflow:visible;line-height:1;width:56px;height:56px;border-radius:50%;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#03a9f4;color:#fff;text-decoration:none;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:cubic-bezier(.23,1,.32,1);transition-timing-function:cubic-bezier(.23,1,.32,1);-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-box-flex:0;-webkit-flex-shrink:0;-ms-flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0;margin:0;outline:0;padding:0;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,.156863),0 3px 10px rgba(0,0,0,.227451)}.mu-float-button .mu-circle-ripple{opacity:.3}.mu-float-button.disabled{color:rgba(0,0,0,.3);cursor:not-allowed;background-color:#e6e6e6;box-shadow:none}.mu-float-button.disabled.hover,.mu-float-button.disabled:active,.mu-float-button.disabled:hover{box-shadow:none}.mu-float-button.disabled.hover .mu-float-button-wrapper,.mu-float-button.disabled:active .mu-float-button-wrapper,.mu-float-button.disabled:hover .mu-float-button-wrapper{background-color:transparent}.mu-float-button.hover,.mu-float-button:active{box-shadow:0 10px 30px rgba(0,0,0,.188235),0 6px 10px rgba(0,0,0,.227451)}.mu-float-button.hover .mu-float-button-wrapper,.mu-float-button:active .mu-float-button-wrapper{background-color:hsla(0,0%,100%,.3)}.mu-float-button-wrapper{border-radius:50%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;left:0;top:0;right:0;bottom:0}.mu-float-button-mini{width:40px;height:40px}.mu-float-button-secondary{background-color:#ff4081}.mu-content-block{padding:8px 16px;width:100%}.mu-content-block p{margin-top:1em;margin-bottom:1em}.mu-content-block p:first-child{margin-top:0}.mu-content-block p:last-child{margin-bottom:0}.mu-list{padding:8px 0;width:100%;position:relative;overflow-x:hidden;overflow-y:visible}.mu-list .mu-sub-header:first-child{margin-top:-8px}.mu-item-wrapper{display:block;color:inherit;position:relative;outline:none;cursor:pointer}.mu-item-wrapper.hover{background-color:rgba(0,0,0,.1)}.mu-item-wrapper.disabled{cursor:default}.mu-item{min-height:48px;display:-webkit-box;display:-ms-flexbox;display:flex;padding:16px;color:rgba(0,0,0,.87);position:relative}.mu-item.show-left{padding-left:72px}.mu-item.show-right{padding-right:56px}.mu-item.has-avatar{min-height:56px}.mu-item.selected{color:#03a9f4}.mu-item-toggle-button{color:rgba(0,0,0,.87);position:absolute;right:4px;top:0}.mu-item-left,.mu-item-right{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;width:40px;height:100%;position:absolute;color:#757575;top:0;max-height:72px}.mu-item-left{left:16px}.mu-item.selected .mu-item-left{color:#03a9f4}.mu-item-right{right:12px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.mu-item-right>.mu-icon-button,.mu-item-right>.mu-icon-menu{-ms-flex-item-align:start;align-self:flex-start}.mu-item-content{width:100%;-ms-flex-item-align:center;align-self:center}.mu-item-title-row{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative;width:100%;line-height:1}.mu-item-title{-webkit-box-flex:1;-ms-flex:1;flex:1;display:block;font-size:16px;max-width:100%}.mu-item-sub-title{line-height:1;margin-top:4px}.mu-item-after{margin-left:auto;color:rgba(0,0,0,.54);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mu-item-text{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;position:relative;overflow:hidden;font-size:14px;line-height:18px;margin-top:4px;max-height:40px;max-width:100%;text-overflow:ellipsis;word-break:break-all;color:rgba(0,0,0,.54)}.mu-item-svg-icon{display:inline-block;width:24px;height:24px;fill:currentColor;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-expand-enter-active,.mu-expand-leave-active{-webkit-transition:height .45s cubic-bezier(.23,1,.32,1),padding .45s cubic-bezier(.23,1,.32,1);transition:height .45s cubic-bezier(.23,1,.32,1),padding .45s cubic-bezier(.23,1,.32,1);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateZ(0);transform:translateZ(0)}.mu-sub-header{color:rgba(0,0,0,.54);font-size:14px;line-height:48px;padding-left:16px;width:100%}.mu-sub-header.inset{padding-left:72px}.mu-divider{margin:0;height:1px;border:none;background-color:rgba(0,0,0,.12);width:100%}.mu-divider.inset{margin-left:72px}.mu-divider.shallow-inset{margin-left:16px}html.pixel-ratio-2 .mu-divider{-webkit-transform:scaleY(.5);transform:scaleY(.5)}html.pixel-ratio-3 .mu-divider{-webkit-transform:scaleY(.33);transform:scaleY(.33)}.mu-refresh-control{display:-webkit-box;display:-ms-flexbox;display:flex;margin:0 auto;width:40px;height:40px;color:#03a9f4;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background-color:#fff;border-radius:50%;box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647);position:absolute;left:50%;margin-left:-18px;margin-top:24px;z-index:90}.mu-refresh-control .mu-icon{display:inline-block;vertical-align:middle}.mu-refresh-svg-icon{display:inline-block;width:28px;height:28px;fill:currentColor;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-refresh-control-animate{-webkit-transition:all .45s ease;transition:all .45s ease}.mu-refresh-control-hide{opacity:1;-webkit-transform:translate3d(0,-68px,0);transform:translate3d(0,-68px,0)}.mu-refresh-control-noshow{opacity:0;-webkit-transform:scale(.01);transform:scale(.01)}.mu-refresh-control-refreshing{-webkit-transform:scale(1);transform:scale(1);opacity:1}.mu-circle-wrapper{display:inline-block;vertical-align:middle;position:relative;width:48px;height:48px}.mu-circle-wrapper.active{-webkit-animation:container-rotate 1568ms linear infinite;animation:container-rotate 1568ms linear infinite}.mu-circle-wrapper .mu-circle{border-radius:50%}.mu-circle-wrapper .left{float:left!important}.mu-circle-wrapper .right{float:right!important}.mu-circle-spinner{position:absolute;width:100%;height:100%;opacity:0;border-color:#03a9f4;opacity:1;-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(.4,0,.2,1) infinite both}.mu-circle-secondary{border-color:#ff4081}.mu-circle-clipper{display:inline-block;position:relative;width:50%}.mu-circle-clipper,.mu-circle-gap-patch{height:100%;overflow:hidden;border-color:inherit}.mu-circle-gap-patch{position:absolute;top:0;left:45%;width:10%}.mu-circle-gap-patch .mu-circle{width:1000%;left:-450%}.mu-circle-clipper .mu-circle{width:200%;height:100%;border-width:3px;border-style:solid;border-color:inherit;border-bottom-color:transparent!important;border-radius:50%;-webkit-animation:none;animation:none;position:absolute;top:0;right:0;bottom:0}.mu-circle-spinner.active .mu-circle-clipper.left .mu-circle{-webkit-animation:left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:left-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both}.mu-circle-spinner.active .mu-circle-clipper.right .mu-circle{-webkit-animation:right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both;animation:right-spin 1333ms cubic-bezier(.4,0,.2,1) infinite both}.mu-circle-clipper.left .mu-circle{left:0;border-right-color:transparent!important;-webkit-transform:rotate(129deg);transform:rotate(129deg)}.mu-circle-clipper.right .mu-circle{left:-100%;border-left-color:transparent!important;-webkit-transform:rotate(-129deg);transform:rotate(-129deg)}@-webkit-keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg)}to{-webkit-transform:rotate(3turn)}}@keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg);transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg);transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg);transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg);transform:rotate(945deg)}to{-webkit-transform:rotate(3turn);transform:rotate(3turn)}}@-webkit-keyframes left-spin{0%{-webkit-transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg)}}@keyframes left-spin{0%{-webkit-transform:rotate(130deg);transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg);transform:rotate(130deg)}}@-webkit-keyframes right-spin{0%{-webkit-transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg)}}@keyframes right-spin{0%{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}}@-webkit-keyframes container-rotate{to{-webkit-transform:rotate(1turn)}}@keyframes container-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.mu-infinite-scroll{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:36px;line-height:36px;width:100%}.mu-infinite-scroll-text{margin-left:16px;font-size:16px}.mu-avatar{display:inline-block;height:40px;width:40px;font-size:20px;color:#fff;background-color:#bdbdbd;text-align:center;border-radius:50%}.mu-avatar img{border-radius:50%;width:100%;height:100%;display:block}.mu-avatar-inner{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.mu-tabs{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#03a9f4;color:#fff;text-align:center;position:relative;z-index:100;width:100%}.mu-tab-link-highlight{position:absolute;left:0;bottom:0;height:2px;background-color:#ff4081;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-tab-link{min-height:48px;padding-top:12px;padding-bottom:12px;font-size:14px;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;text-decoration:none;border:none;outline:none;-webkit-box-flex:1;-ms-flex:1;flex:1;color:inherit;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;line-height:normal;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:hsla(0,0%,100%,.7);-webkit-transition:all .45s cubic-bezier(.445,.05,.55,.95);transition:all .45s cubic-bezier(.445,.05,.55,.95);cursor:pointer}.mu-tab-active{color:#fff}.mu-tab-text.has-icon{margin-top:8px}.mu-paper{-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);color:rgba(0,0,0,.87);background-color:#fff;box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)}.mu-paper-round{border-radius:2px}.mu-paper-circle{border-radius:50%}.mu-paper-1{box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)}.mu-paper-2{box-shadow:0 3px 10px rgba(0,0,0,.156863),0 3px 10px rgba(0,0,0,.227451)}.mu-paper-3,.mu-paper-4{box-shadow:0 14px 45px rgba(0,0,0,.247059),0 10px 18px rgba(0,0,0,.219608)}.mu-paper-5{box-shadow:0 19px 60px rgba(0,0,0,.298039),0 15px 20px rgba(0,0,0,.219608)}.mu-bottom-nav{height:56px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;text-align:center;position:relative;width:100%;color:#fff}.mu-bottom-nav-shift{background-color:#03a9f4}.mu-bottom-nav-shift-wrapper{height:100%;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;text-align:center}.mu-buttom-item{-webkit-box-flex:1;-ms-flex:1;flex:1;min-width:80px;max-width:168px;position:relative;height:100%;color:rgba(0,0,0,.54);padding:0;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;text-decoration:none;border:none;outline:none;-webkit-transition:all .4s cubic-bezier(.445,.05,.55,.95);transition:all .4s cubic-bezier(.445,.05,.55,.95);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-bottom-nav-shift .mu-buttom-item{color:hsla(0,0%,100%,.7);padding:8px 12px 10px;min-width:56px;max-width:168px}.mu-bottom-nav-shift .mu-buttom-item,.mu-buttom-item-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.mu-buttom-item-wrapper{height:100%}.mu-bottom-item-active .mu-bottom-item-text{font-size:14px}.mu-bottom-nav-shift .mu-bottom-item-active{-webkit-box-flex:1.7;-ms-flex:1.7;flex:1.7;min-width:96px;max-width:168px}.mu-bottom-item-text{font-size:12px;-webkit-transition:all .4s cubic-bezier(.23,1,.32,1),color .3s,font-size .3s;transition:all .4s cubic-bezier(.23,1,.32,1),color .3s,font-size .3s;-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-bottom-item-active .mu-bottom-item-text{color:#03a9f4}.mu-bottom-nav-shift .mu-bottom-item-active .mu-bottom-item-text{color:#fff}.mu-bottom-nav-shift .mu-bottom-item-text{opacity:0;-webkit-transform:scale(1) translate3d(0,6px,0);transform:scale(1) translate3d(0,6px,0)}.mu-bottom-nav-shift .mu-bottom-item-active .mu-bottom-item-text{-webkit-transform:scale(1) translate3d(0,2px,0);transform:scale(1) translate3d(0,2px,0);opacity:1}.mu-bottom-item-icon{-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);-webkit-backface-visibility:hidden;backface-visibility:hidden;width:24px}.mu-bottom-item-active .mu-bottom-item-icon{color:#03a9f4}.mu-bottom-nav-shift .mu-bottom-item-active .mu-bottom-item-icon{color:#fff}.mu-bottom-nav-shift .mu-bottom-item-icon{margin:auto;-webkit-transform:translate3d(0,8px,0);transform:translate3d(0,8px,0)}.mu-bottom-nav-shift .mu-bottom-item-active .mu-bottom-item-icon{-webkit-transform:scale(1) translateZ(0);transform:scale(1) translateZ(0)}.mu-card{background-color:#fff;position:relative;border-radius:2px;box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)}.mu-card-header{padding:16px;font-weight:500;position:relative;white-space:nowrap}.mu-card-header .mu-avatar{margin-right:16px}.mu-card-header-title{display:inline-block;vertical-align:top;white-space:normal;padding-right:90px}.mu-card-header-title .mu-card-title{font-size:15px;color:rgba(0,0,0,.87)}.mu-card-header-title .mu-card-sub-title{font-size:14px;color:rgba(0,0,0,.57)}.mu-card-media{position:relative}.mu-card-media>img{width:100%;max-width:100%;min-width:100%;display:block;vertical-align:top}.mu-card-media-title{position:absolute;left:0;right:0;bottom:0;padding:16px;background-color:rgba(0,0,0,.54)}.mu-card-media-title .mu-card-title{font-size:24px;color:hsla(0,0%,100%,.87);line-height:36px}.mu-card-media-title .mu-card-sub-title{color:hsla(0,0%,100%,.54);font-size:14px}.mu-card-title-container{padding:16px;position:relative}.mu-card-title-container .mu-card-title{font-size:24px;color:rgba(0,0,0,.87);line-height:36px}.mu-card-title-container .mu-card-sub-title{font-size:14px;color:rgba(0,0,0,.54);display:block}.mu-card-text{padding:16px;font-size:14px;color:rgba(0,0,0,.87)}.mu-card-actions{padding:8px;position:relative}.mu-chip{border-radius:16px;line-height:32px;white-space:nowrap;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#e0e0e0;color:rgba(0,0,0,.87);padding:0 12px;cursor:default}.mu-chip .mu-avatar:first-child{margin-left:-12px;margin-right:4px}.mu-chip.active{box-shadow:0 1px 6px rgba(0,0,0,.12),0 1px 4px rgba(0,0,0,.12)}.mu-chip.hover{background-color:#cecece;cursor:pointer}.mu-chip.hover .mu-chip-delete-icon{color:rgba(0,0,0,.4)}.mu-chip-delete-icon{display:inline-block;margin-right:-8px;margin-left:4px;color:rgba(0,0,0,.26);fill:currentColor;height:24px;width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1)}.mu-overlay{position:absolute;left:0;right:0;top:0;bottom:0;background-color:#000;opacity:.4;z-index:1000}.mu-overlay-fade-enter-active,.mu-overlay-fade-leave-active{-webkit-transition:opacity .45s cubic-bezier(.23,1,.32,1);transition:opacity .45s cubic-bezier(.23,1,.32,1)}.mu-overlay-fade-enter,.mu-overlay-fade-leave-active{opacity:0!important}.mu-dialog-wrapper{position:fixed;left:50%;top:50%;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);width:75%;max-width:768px}.mu-dialog{width:100%;padding:0;background-color:#fff;border-radius:2px;font-size:16px;box-shadow:0 19px 60px rgba(0,0,0,.298039),0 15px 20px rgba(0,0,0,.219608)}.mu-dialog-title{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:24px 24px 20px;margin:0;font-size:22px;font-weight:400;line-height:32px;color:rgba(0,0,0,.87)}.mu-dialog-title+.mu-dialog-body{padding-top:0}.mu-dialog-title.scrollable{border-bottom:1px solid rgba(0,0,0,.12)}.mu-dialog-body{padding:24px 24px 20px;color:rgba(0,0,0,.6)}.mu-dialog-actions{min-height:48px;padding:8px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.mu-dialog-actions .mu-raised-button+.mu-raised-button{margin-left:10px}.mu-dialog-actions.scrollable{border-top:1px solid rgba(0,0,0,.12)}.mu-dialog-slide-enter-active,.mu-dialog-slide-leave-active{-webkit-transition:opacity .45s cubic-bezier(.23,1,.32,1);transition:opacity .45s cubic-bezier(.23,1,.32,1)}.mu-dialog-slide-enter-active .mu-dialog,.mu-dialog-slide-leave-active .mu-dialog{-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transition:-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1)}.mu-dialog-slide-enter,.mu-dialog-slide-leave-active{opacity:0}.mu-dialog-slide-enter .mu-dialog{-webkit-transform:translate3d(0,-64px,0);transform:translate3d(0,-64px,0)}.mu-dialog-slide-leave-active .mu-dialog{-webkit-transform:translate3d(0,64px,0);transform:translate3d(0,64px,0)}.mu-toast{height:48px;line-height:48px;padding:0 24px;background-color:rgba(0,0,0,.87);color:#fff;border-radius:24px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;word-wrap:break-word;max-width:568px;width:100%;position:fixed;left:0;bottom:0}@media only screen and (max-width:992px) and (min-width:601px){.mu-toast{width:auto;min-width:288px;left:5%;bottom:7%}}@media only screen and (min-width:993px){.mu-toast{width:auto;min-width:8%;top:10%;right:7%;left:auto;bottom:auto;min-width:288px}}.mu-toast-enter-active,.mu-toast-leave-active{-webkit-transition:opacity .4s cubic-bezier(.23,1,.32,1),-webkit-transform .4s cubic-bezier(.23,1,.32,1);transition:opacity .4s cubic-bezier(.23,1,.32,1),-webkit-transform .4s cubic-bezier(.23,1,.32,1);transition:transform .4s cubic-bezier(.23,1,.32,1),opacity .4s cubic-bezier(.23,1,.32,1);transition:transform .4s cubic-bezier(.23,1,.32,1),opacity .4s cubic-bezier(.23,1,.32,1),-webkit-transform .4s cubic-bezier(.23,1,.32,1);-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-toast-enter,.mu-toast-leave-active{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}.mu-snackbar{position:fixed;bottom:0;left:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#fff;background-color:rgba(0,0,0,.87);padding:0 24px;min-height:48px;width:100%;max-width:568px}.mu-snackbar-action{margin:0 -16px 0 24px}.mu-snackbar-message{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;padding-top:8px;padding-bottom:8px}@media only screen and (max-width:992px) and (min-width:601px){.mu-snackbar{width:auto;min-width:288px;left:5%;bottom:7%}}@media only screen and (min-width:993px){.mu-snackbar{width:auto;min-width:8%;top:10%;right:7%;left:auto;bottom:auto;min-width:288px}}.mu-snackbar-enter-active,.mu-snackbar-leave-active{-webkit-transition:opacity .4s cubic-bezier(.23,1,.32,1),-webkit-transform .4s cubic-bezier(.23,1,.32,1);transition:opacity .4s cubic-bezier(.23,1,.32,1),-webkit-transform .4s cubic-bezier(.23,1,.32,1);transition:transform .4s cubic-bezier(.23,1,.32,1),opacity .4s cubic-bezier(.23,1,.32,1);transition:transform .4s cubic-bezier(.23,1,.32,1),opacity .4s cubic-bezier(.23,1,.32,1),-webkit-transform .4s cubic-bezier(.23,1,.32,1);-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-snackbar-enter,.mu-snackbar-leave-active{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}.mu-popup{position:fixed;background-color:#fff;top:50%;left:50%;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-popup-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0)}.mu-popup-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.mu-popup-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0)}.mu-popup-left{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.popup-slide-bottom-enter-active,.popup-slide-bottom-leave-active,.popup-slide-left-enter-active,.popup-slide-left-leave-active,.popup-slide-right-enter-active,.popup-slide-right-leave-active,.popup-slide-top-enter-active,.popup-slide-top-leave-active{-webkit-transition:-webkit-transform .3s ease;transition:-webkit-transform .3s ease;transition:transform .3s ease;transition:transform .3s ease,-webkit-transform .3s ease}.popup-slide-top-enter,.popup-slide-top-leave-active{-webkit-transform:translate3d(-50%,-100%,0);transform:translate3d(-50%,-100%,0)}.popup-slide-right-enter,.popup-slide-right-leave-active{-webkit-transform:translate3d(100%,-50%,0);transform:translate3d(100%,-50%,0)}.popup-slide-bottom-enter,.popup-slide-bottom-leave-active{-webkit-transform:translate3d(-50%,100%,0);transform:translate3d(-50%,100%,0)}.popup-slide-left-enter,.popup-slide-left-leave-active{-webkit-transform:translate3d(-100%,-50%,0);transform:translate3d(-100%,-50%,0)}.popup-fade-enter-active,.popup-fade-leave-active{-webkit-transition:opacity .3s;transition:opacity .3s}.popup-fade-enter,.popup-fade-leave-active{opacity:0}.mu-menu{z-index:90;outline:none}.mu-menu-list{padding:8px 0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow-y:auto;-webkit-overflow-scrolling:touch}.mu-menu-list>.mu-divider{margin:7px 0 8px}.mu-menu-list>.mu-sub-header{padding-left:24px;margin-top:-8px}.mu-menu-destop{padding:16px 0}.mu-menu-destop>.mu-sub-header{margin-top:-16px}.mu-menu-item-wrapper{display:block;font-size:16px;height:48px;line-height:48px;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);color:rgba(0,0,0,.87);position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-menu-destop .mu-menu-item-wrapper{height:32px;line-height:32px;font-size:15px}.mu-menu-item-wrapper.hover{background-color:rgba(0,0,0,.1)}.mu-menu-item-wrapper.active{color:#ff4081}.mu-menu-item-wrapper.disabled{color:rgba(0,0,0,.38);cursor:not-allowed}.mu-menu-item{padding:0 16px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mu-menu-destop .mu-menu-item{padding:0 24px}.mu-menu-item.have-left-icon{padding-left:72px}.mu-menu-item-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;word-wrap:break-word}.mu-menu-item-left-icon{position:absolute;top:0;left:4px;margin:12px;color:#757575}.mu-menu-destop .mu-menu-item-left-icon{top:4px;left:24px;margin:0}.mu-menu-item-right-icon{position:absolute;top:0;right:4px;margin:12px;color:#757575}.mu-menu-destop .mu-menu-item-right-icon{top:4px;right:24px;margin:0}.mu-popover{position:fixed;background:#fff;border-radius:2px;max-height:100%;overflow:visible;-webkit-overflow-scrolling:touch;box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647);-webkit-transform-origin:center top;transform-origin:center top}.mu-popover-enter-active,.mu-popover-leave-active{-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}.mu-popover-enter,.mu-popover-leave-active{-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0}.mu-bottom-sheet{background-color:#fff;position:fixed;left:0;right:0;bottom:0}.mu-bottom-sheet-enter-active,.mu-bottom-sheet-leave-active{-webkit-transition:-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1);-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-bottom-sheet-enter,.mu-bottom-sheet-leave-active{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.mu-icon-menu{display:inline-block;position:relative}.mu-dropDown-menu{display:inline-block;font-size:15px;height:48px;position:relative;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);cursor:pointer;overflow:hidden}.mu-dropDown-menu.disabled{color:rgba(0,0,0,.38);cursor:not-allowed}.mu-dropDown-menu-icon{position:absolute;right:16px;top:16px;color:rgba(0,0,0,.12);fill:currentColor;display:inline-block;width:24px;height:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-dropDown-menu-text{padding-left:24px;padding-right:48px;line-height:56px;opacity:1;position:relative;color:rgba(0,0,0,.87)}.mu-dropDown-menu.disabled .mu-dropDown-menu-text{color:rgba(0,0,0,.38)}.mu-dropDown-menu-text-overflow{white-space:nowrap;overflow:hidden;width:100%}.mu-dropDown-menu-line{bottom:1px;left:0;margin:-1px 24px;right:0;position:absolute;height:1px;background-color:rgba(0,0,0,.12);-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1)}html.pixel-ratio-2 .mu-dropDown-menu-line{-webkit-transform:scaleY(.5);transform:scaleY(.5)}html.pixel-ratio-3 .mu-dropDown-menu-line{-webkit-transform:scaleY(.33);transform:scaleY(.33)}.mu-drawer{width:256px;position:fixed;top:0;bottom:0;overflow:auto;-webkit-overflow-scrolling:touch;-webkit-transition-property:visibility,-webkit-transform;transition-property:visibility,-webkit-transform;transition-property:transform,visibility;transition-property:transform,visibility,-webkit-transform;-webkit-transition-duration:.45s;transition-duration:.45s;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);border-radius:0;left:0;visibility:hidden;z-index:200}.mu-drawer::-webkit-scrollbar{display:none!important;width:0!important;height:0!important;-webkit-appearance:none;opacity:0!important}.mu-drawer.right{right:0;left:auto;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.mu-drawer.open{-webkit-transform:translateZ(0);transform:translateZ(0);visibility:visible}.mu-picker{background:#fff;overflow:hidden;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative;-webkit-mask-box-image:-webkit-linear-gradient(bottom,transparent,transparent 5%,#fff 20%,#fff 80%,transparent 95%,transparent);-webkit-mask-box-image:linear-gradient(0deg,transparent,transparent 5%,#fff 20%,#fff 80%,transparent 95%,transparent)}.mu-picker-center-highlight{height:36px;box-sizing:border-box;position:absolute;left:0;width:100%;top:50%;margin-top:-18px;pointer-events:none;border-top:1px solid rgba(0,0,0,.12);border-bottom:1px solid rgba(0,0,0,.12)}.mu-picker-center-highlight:before{left:0;top:0;bottom:auto;right:auto}.mu-picker-center-highlight:after{left:0;bottom:0;right:auto;top:auto}.mu-picker-slot{-webkit-box-flex:1;-webkit-flex-shrink:1;-ms-flex:0 1 auto;-ms-flex-negative:1;flex-shrink:1;font-size:18px;overflow:hidden;position:relative;max-height:100%;text-align:center}.mu-picker-slot.mu-picker-slot-divider{color:rgba(0,0,0,.87);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;line-height:36px}.mu-picker-slot-wrapper.animate{-webkit-transition:-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1)}.mu-picker-item,.mu-picker-slot-wrapper.animate{-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-picker-item{line-height:36px;padding:0 10px;font-size:20px;white-space:nowrap;position:relative;overflow:hidden;text-overflow:ellipsis;color:rgba(0,0,0,.54);left:0;top:0;width:100%;box-sizing:border-box;-webkit-transition-duration:.3s;transition-duration:.3s}.mu-picker-item.selected{color:rgba(0,0,0,.87);-webkit-transform:translateZ(0) rotateX(0);transform:translateZ(0) rotateX(0)}.mu-text-field{font-size:16px;width:256px;min-height:48px;display:inline-block;position:relative;color:rgba(0,0,0,.54);margin-bottom:8px}.mu-text-field.full-width{width:100%}.mu-text-field.has-icon{padding-left:56px}.mu-text-field.focus-state{color:#03a9f4}.mu-text-field.focus-state.error{color:#f44336}.mu-text-field.has-label{min-height:72px}.mu-text-field-icon{position:absolute;left:16px;top:12px}.mu-text-field.has-label .mu-text-field-icon{top:36px}.mu-text-field-content{display:block;cursor:pointer;height:100%;padding-bottom:12px;padding-top:4px}.mu-text-field.disabled .mu-text-field-content{color:rgba(0,0,0,.38);cursor:not-allowed}.mu-text-field.has-label .mu-text-field-content{padding-top:28px;padding-bottom:12px}.mu-text-field-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border:none;background:none;border-radius:0 0 0 0;box-shadow:none;display:block;padding:0;margin:0;width:100%;height:32px;font-style:inherit;font-variant:inherit;font-weight:inherit;font-stretch:inherit;font-size:inherit;color:rgba(0,0,0,.87);font-family:inherit;position:relative}.mu-text-field-help{position:absolute;margin-top:6px;font-size:12px;line-height:12px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;left:0;right:0}.mu-text-field.has-icon .mu-text-field-help{left:56px}.mu-text-field.error .mu-text-field-help{color:#f44336}.mu-text-field.disabled .mu-text-field-help{color:inherit}.mu-text-field-line{margin:0;height:1px;border:none;background-color:rgba(0,0,0,.12);left:0;right:0;position:absolute}.mu-text-field.has-icon .mu-text-field-line{left:56px}.mu-text-field-line.disabled{height:auto;background-color:transparent;border-bottom:2px dotted rgba(0,0,0,.38)}.mu-text-field-focus-line{margin:0;height:2px;border:none;background-color:#03a9f4;position:absolute;left:0;right:0;margin-top:-1px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1)}.mu-text-field.has-icon .mu-text-field-focus-line{left:56px}.mu-text-field-focus-line.error,.mu-text-field-focus-line.focus{-webkit-transform:scaleX(1);transform:scaleX(1)}.mu-text-field-focus-line.error{background-color:#f44336}.mu-text-field-textarea{resize:vertical;line-height:1.5;position:relative;height:100%}.mu-text-field-multiline{width:100%;position:relative}.mu-text-field-textarea-hide{width:100%;height:auto;resize:none;position:absolute;padding:0;overflow:auto;visibility:hidden}.mu-text-field-label{line-height:20px;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);z-index:1;cursor:text;-webkit-transform:translateZ(0) scale(.75);transform:translateZ(0) scale(.75);-webkit-transform-origin:left top;transform-origin:left top;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-text-field.has-label .mu-text-field-label{top:8px;position:absolute}.mu-text-field.has-label .mu-text-field-label.float{-webkit-transform:translate3d(0,28px,0) scale(1);transform:translate3d(0,28px,0) scale(1);color:rgba(0,0,0,.38)}.mu-text-field-hint{position:absolute;opacity:0;-webkit-transition:opacity .45s cubic-bezier(.23,1,.32,1);transition:opacity .45s cubic-bezier(.23,1,.32,1);color:rgba(0,0,0,.38);line-height:34px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:text}.mu-text-field-hint.show{opacity:1}.mu-text-field.multi-line .mu-text-field-hint{line-height:1.5}.mu-select-field .mu-dropDown-menu{display:block;width:100%;height:32px}.mu-select-field .mu-dropDown-menu-text{line-height:32px;height:32px;padding-left:0;padding-right:24px;word-wrap:break-word;overflow:hidden}.mu-select-field .mu-dropDown-menu-line{display:none}.mu-select-field .mu-dropDown-menu-icon{right:0;top:6px}.mu-checkbox{position:relative;display:inline-block;height:24px;line-height:24px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-checkbox input[type=checkbox]{display:none}.mu-checkbox input[type=checkbox]:checked+.mu-checkbox-wrapper .mu-checkbox-icon-uncheck{opacity:0;-webkit-transition:opacity .65s cubic-bezier(.23,1,.32,1) .15s;transition:opacity .65s cubic-bezier(.23,1,.32,1) .15s;color:#03a9f4}.mu-checkbox input[type=checkbox]:checked+.mu-checkbox-wrapper .mu-checkbox-icon-checked{opacity:1;-webkit-transform:scale(1);transform:scale(1);-webkit-transition:opacity 0ms cubic-bezier(.23,1,.32,1),-webkit-transform .8s cubic-bezier(.23,1,.32,1);transition:opacity 0ms cubic-bezier(.23,1,.32,1),-webkit-transform .8s cubic-bezier(.23,1,.32,1);transition:opacity 0ms cubic-bezier(.23,1,.32,1),transform .8s cubic-bezier(.23,1,.32,1);transition:opacity 0ms cubic-bezier(.23,1,.32,1),transform .8s cubic-bezier(.23,1,.32,1),-webkit-transform .8s cubic-bezier(.23,1,.32,1)}.mu-checkbox input[type=checkbox]:checked+.mu-checkbox-wrapper .mu-checkbox-ripple-wrapper{color:#03a9f4}.mu-checkbox *{pointer-events:none}.mu-checkbox.disabled{cursor:not-allowed}.mu-checkbox-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:24px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.mu-checkbox-icon{width:24px;height:24px;vertical-align:middle;position:relative;margin-right:16px}.mu-checkbox.label-left .mu-checkbox-icon{margin-right:0;margin-left:16px}.mu-checkbox.no-label .mu-checkbox-icon{margin-left:0;margin-right:0}.mu-checkbox-label{color:rgba(0,0,0,.87)}.mu-checkbox.disabled .mu-checkbox-label{color:rgba(0,0,0,.38)}.mu-checkbox-svg-icon{display:inline-block;fill:currentColor;height:24px;width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-checkbox-icon-uncheck{position:absolute;left:0;top:0;opacity:1;-webkit-transition:opacity 1s cubic-bezier(.23,1,.32,1) .2s;transition:opacity 1s cubic-bezier(.23,1,.32,1) .2s;color:rgba(0,0,0,.87)}.mu-checkbox.disabled .mu-checkbox-icon-uncheck{color:rgba(0,0,0,.38)}.mu-checkbox-icon-checked{position:absolute;left:0;top:0;opacity:0;color:#03a9f4;-webkit-transform:scale(0);transform:scale(0);-webkit-transition:opacity .45s cubic-bezier(.23,1,.32,1),-webkit-transform 0ms cubic-bezier(.23,1,.32,1) .45s;transition:opacity .45s cubic-bezier(.23,1,.32,1),-webkit-transform 0ms cubic-bezier(.23,1,.32,1) .45s;transition:opacity .45s cubic-bezier(.23,1,.32,1),transform 0ms cubic-bezier(.23,1,.32,1) .45s;transition:opacity .45s cubic-bezier(.23,1,.32,1),transform 0ms cubic-bezier(.23,1,.32,1) .45s,-webkit-transform 0ms cubic-bezier(.23,1,.32,1) .45s}.mu-checkbox.disabled .mu-checkbox-icon-checked{color:rgba(0,0,0,.38)}.mu-checkbox-ripple-wrapper{width:48px;height:48px;top:-12px;left:-12px}.mu-checkbox.label-left .mu-checkbox-ripple-wrapper{right:-12px;left:auto}.mu-radio{position:relative;display:inline-block;height:24px;line-height:24px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-radio input[type=radio]{display:none}.mu-radio input[type=radio]:checked+.mu-radio-wrapper .mu-radio-icon-uncheck{opacity:0;-webkit-transform:scale(0);transform:scale(0);color:#03a9f4}.mu-radio input[type=radio]:checked+.mu-radio-wrapper .mu-radio-icon-checked{opacity:1;-webkit-transform:scale(1);transform:scale(1)}.mu-radio input[type=radio]:checked+.mu-radio-wrapper .mu-radio-ripple-wrapper{color:#03a9f4}.mu-radio *{pointer-events:none}.mu-radio.disabled{cursor:not-allowed}.mu-radio-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:24px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.mu-radio-icon{width:24px;height:24px;vertical-align:middle;position:relative;margin-right:16px}.mu-radio.label-left .mu-radio-icon{margin-right:0;margin-left:16px}.mu-radio.no-label .mu-radio-icon{margin-left:0;margin-right:0}.mu-radio-label{color:rgba(0,0,0,.87);-webkit-box-flex:1;-ms-flex:1;flex:1;font-size:16px}.mu-radio.disabled .mu-radio-label{color:rgba(0,0,0,.38)}.mu-radio-svg-icon{display:inline-block;fill:currentColor;height:24px;width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-radio-icon-uncheck{position:absolute;left:0;top:0;opacity:1;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);color:rgba(0,0,0,.87)}.mu-radio.disabled .mu-radio-icon-uncheck{color:rgba(0,0,0,.38)}.mu-radio-icon-checked{position:absolute;left:0;top:0;opacity:0;color:#03a9f4;-webkit-transform:scale(0);transform:scale(0);-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1)}.mu-radio.disabled .mu-radio-icon-checked{color:rgba(0,0,0,.38)}.mu-radio-ripple-wrapper{width:48px;height:48px;top:-12px;left:-12px}.mu-radio.label-left .mu-radio-ripple-wrapper{right:-12px;left:auto}.mu-switch{position:relative;display:inline-block;height:24px;line-height:24px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-switch input[type=checkbox]{display:none}.mu-switch input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-track{background-color:rgba(3,169,244,.5)}.mu-switch input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-thumb{background-color:#03a9f4;color:#03a9f4;-webkit-transform:translate3d(18px,0,0);transform:translate3d(18px,0,0)}.mu-switch.disabled input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-track{background-color:#bdbdbd}.mu-switch.disabled input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-thumb{background-color:#e0e0e0}.mu-switch *{pointer-events:none}.mu-switch.disabled{cursor:not-allowed}.mu-switch-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:24px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.mu-switch-container{width:38px;padding:4px 0 4px 2px;position:relative;margin-right:8px;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1)}.mu-switch.label-left .mu-switch-container{margin-right:0;margin-left:8px}.mu-switch.no-label .mu-switch-container{margin-left:0;margin-right:0}.mu-switch-label{color:rgba(0,0,0,.87)}.mu-switch.disabled .mu-switch-label{color:rgba(0,0,0,.38)}.mu-switch-track{width:100%;height:14px;border-radius:30px;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1)}.mu-switch-track,.mu-switch.disabled .mu-switch-track{background-color:#bdbdbd}.mu-switch-thumb{position:absolute;top:1px;left:0;width:20px;height:20px;line-height:24px;color:rgba(0,0,0,.87);background-color:#f5f5f5;border-radius:50%;box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647);-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-switch.disabled .mu-switch-thumb{background-color:#e0e0e0}.mu-switch-ripple-wrapper{height:200%;width:200%;top:-10px;left:-10px}.mu-slider{width:100%;position:relative;height:24px;margin-bottom:16px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:none}.mu-slider-track{right:0;background-color:#bdbdbd}.mu-slider-fill,.mu-slider-track{position:absolute;height:2px;left:0;top:50%;margin-top:-1px}.mu-slider-fill{width:100%;background-color:#03a9f4}.mu-slider.disabled .mu-slider-fill{background-color:#bdbdbd}.mu-slider-thumb{position:absolute;top:50%;width:12px;height:12px;background-color:#03a9f4;color:#03a9f4;border-radius:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transition:background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1);transition:background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1);cursor:pointer}.mu-slider.active .mu-slider-thumb{width:20px;height:20px}.mu-slider.disabled .mu-slider-thumb,.mu-slider.zero .mu-slider-thumb{border:2px solid #bdbdbd;color:#bdbdbd;background-color:#fff}.mu-slider.disabled .mu-slider-thumb .mu-focus-ripple-wrapper,.mu-slider.zero .mu-slider-thumb .mu-focus-ripple-wrapper{top:-14px;left:-14px}.mu-slider.disabled .mu-slider-thumb{cursor:default}.mu-slider-thumb .mu-focus-ripple-wrapper{width:36px;height:36px;top:-12px;left:-12px}.mu-linear-progress{position:relative;height:4px;display:block;width:100%;background-color:#bdbdbd;border-radius:2px;margin:0;overflow:hidden}.mu-linear-progress-indeterminate{width:40%;-webkit-animation:mu-linear-progress-animate .84s cubic-bezier(.445,.05,.55,.95);animation:mu-linear-progress-animate .84s cubic-bezier(.445,.05,.55,.95);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.mu-linear-progress-determinate,.mu-linear-progress-indeterminate{position:absolute;top:0;bottom:0;border-radius:2px;background-color:#03a9f4}.mu-linear-progress-determinate{left:0;-webkit-transition:width .3s linear;transition:width .3s linear}@-webkit-keyframes mu-linear-progress-animate{0%{left:-40%}to{left:100%}}@keyframes mu-linear-progress-animate{0%{left:-40%}to{left:100%}}.mu-circular-progress{display:inline-block;position:relative;overflow:hidden}.mu-circular-progress-determinate{position:relative}.mu-circular-progress-determinate-path{stroke:#03a9f4;stroke-linecap:round;-webkit-transition:all .3s linear;transition:all .3s linear}.mu-grid-list{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.mu-grid-tile{position:relative;display:block;height:100%;overflow:hidden}.mu-grid-tile>img{height:100%;-webkit-transform:translateX(-50%);transform:translateX(-50%);position:relative;left:50%}.mu-grid-tile-titlebar{position:absolute;left:0;right:0;bottom:0;height:48px;background-color:rgba(0,0,0,.4);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mu-grid-tile.multiline .mu-grid-tile-titlebar{height:68px}.mu-grid-tile.top .mu-grid-tile-titlebar{bottom:auto;top:0}.mu-grid-tile-title-container{margin-left:16px;margin-right:0;color:#fff;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:hidden}.mu-grid-tile.action-left .mu-grid-tile-title-container{margin-right:16px;margin-left:0}.mu-grid-tile-action{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.mu-grid-tile.action-left .mu-grid-tile-action{-webkit-box-ordinal-group:0;-ms-flex-order:-1;order:-1}.mu-grid-tile-action .mu-icon{color:#fff}.mu-grid-tile-title{font-size:16px}.mu-grid-tile-subtitle,.mu-grid-tile-title{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;word-wrap:break-word}.mu-grid-tile-subtitle{font-size:12px}.mu-table{background-color:#fff;padding:0 24px;width:100%;border-collapse:collapse;border-spacing:0;table-layout:fixed}.mu-thead{border-bottom:1px solid rgba(0,0,0,.12)}.mu-tr{border-bottom:1px solid rgba(0,0,0,.12);color:rgba(0,0,0,.87);height:48px}.mu-tr:last-child{border-bottom:none}.mu-tr.selected{background-color:#f5f5f5}.mu-tr.hover{background-color:#eee}.mu-tr.stripe{background-color:rgba(247,252,255,.4)}.mu-tfoot .mu-tr{border-top:1px solid rgba(0,0,0,.12)}.mu-tr .mu-checkbox{vertical-align:middle}.mu-checkbox-col{width:72px}.mu-td{padding-left:24px;padding-right:24px;height:48px;text-align:left;font-size:13px;white-space:nowrap;text-overflow:ellipsis}.mu-th{font-weight:400;font-size:12px;padding-left:24px;padding-right:24px;height:56px;text-align:left;white-space:nowrap;text-overflow:ellipsis;color:rgba(0,0,0,.54);position:relative}.mu-th-wrapper{position:relative;padding-top:12px;padding-bottom:12px}.mu-date-picker{display:inline-block;position:relative;width:256px}.mu-date-picker.fullWidth{width:100%}.mu-date-picker-dialog{width:310px}.mu-date-picker-dialog.landscape{width:479px}.mu-date-picker-dialog.landscape .mu-dialog-body{min-height:330px;min-width:479px}.mu-date-picker-dialog .mu-dialog-body{padding:0;min-height:434px;min-width:310px}.mu-calendar{color:rgba(0,0,0,.87);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:310px}.mu-calendar-landspace{width:479px}.mu-calendar-container{-ms-flex-direction:column;flex-direction:column}.mu-calendar-container,.mu-calendar-monthday-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal}.mu-calendar-monthday-container{-ms-flex-line-pack:justify;align-content:space-between;-ms-flex-direction:column;flex-direction:column;font-size:12px;font-weight:400;padding:0 8px;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1)}.mu-calendar-monthday-container,.mu-calendar-week{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.mu-calendar-week{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;font-weight:500;height:20px;line-height:15px;opacity:.5;text-align:center}.mu-calendar-week-day{width:42px}.mu-calendar-monthday{position:relative;overflow:hidden;height:214px}.mu-calendar-monthday-slide{position:absolute;height:100%;width:100%;top:0;left:0}.mu-calendar-actions{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin:0;max-height:48px;padding:0}.mu-calendar-actions .mu-flat-button{min-width:64px;margin:4px 8px 8px 0}.mu-calendar-slide-next-enter-active,.mu-calendar-slide-next-leave-active,.mu-calendar-slide-prev-enter-active,.mu-calendar-slide-prev-leave-active{-webkit-transition:opacity .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:opacity .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1),opacity .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1),opacity .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1);-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-calendar-slide-next-enter{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.mu-calendar-slide-next-leave-active{opacity:0}.mu-calendar-slide-next-leave-active,.mu-calendar-slide-prev-enter{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.mu-calendar-slide-prev-leave-active{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);opacity:0}.mu-date-display{width:100%;font-weight:700;display:block;background-color:#03a9f4;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-left-radius:0;color:#fff;padding:20px}.mu-calendar-landspace .mu-date-display{width:165px;height:330px;float:left;border-top-right-radius:0;border-bottom-left-radius:2px}.mu-date-display-year{position:relative;overflow:hidden;margin:0;font-size:16px;font-weight:500;line-height:16px;height:16px;opacity:.7;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);margin-bottom:10px}.mu-date-display.selected-year .mu-date-display-year{opacity:1}.mu-date-display-year-title{cursor:pointer}.mu-date-display-year.disabled .mu-date-display-year-title{cursor:not-allowed}.mu-date-display-year-title .mu-date-display.selected-year{cursor:default}.mu-date-display-monthday{position:relative;display:block;overflow:hidden;font-size:36px;line-height:36px;height:38px;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);width:100%;font-weight:500}.mu-date-display.selected-year .mu-date-display-monthday{opacity:.7}.mu-calendar-landspace .mu-date-display-monthday{height:100%}.mu-date-display-slideIn-wrapper{position:absolute;height:100%;width:100%;top:0;left:0}.mu-date-display-monthday-title{cursor:default;width:100%;display:block}.mu-date-display.selected-year .mu-date-display-monthday-title{cursor:pointer}.mu-date-display-next-enter-active,.mu-date-display-next-leave-active,.mu-date-display-prev-enter-active,.mu-date-display-prev-leave-active{-webkit-transition:opacity .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:opacity .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1),opacity .45s cubic-bezier(.23,1,.32,1);transition:transform .45s cubic-bezier(.23,1,.32,1),opacity .45s cubic-bezier(.23,1,.32,1),-webkit-transform .45s cubic-bezier(.23,1,.32,1);-webkit-backface-visibility:hidden;backface-visibility:hidden}.mu-date-display-next-enter{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);opacity:0}.mu-date-display-next-leave-active,.mu-date-display-prev-enter{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}.mu-date-display-prev-leave-active{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);opacity:0}.mu-calendar-toolbar{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;height:48px}.mu-calendar-toolbar-title-wrapper{position:relative;overflow:hidden;height:100%;font-size:14px;font-weight:500;text-align:center;width:100%}.mu-calendar-toolbar-title{position:absolute;height:100%;width:100%;top:0;left:0;line-height:48px}.mu-calendar-svg-icon{display:block;fill:currentColor;height:24px;width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-calendar-monthday-content{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;font-weight:400;height:228px;line-height:2;position:relative;text-align:center}.mu-calendar-monthday-content,.mu-calendar-monthday-row{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}.mu-calendar-monthday-row{-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around;height:34px;margin-bottom:2px}.mu-day-button{display:inline-block;background:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:none;text-decoration:none;cursor:pointer;margin:0;padding:4px 0;font-size:inherit;font-weight:400;position:relative;border:10px;width:42px}.mu-day-button.disabled{opacity:.4}.mu-day-empty{font-weight:400;padding:4px 0;position:relative;width:42px}.mu-day-button-bg{position:absolute;top:0;left:4px;height:34px;background-color:#03a9f4;border-radius:50%;opacity:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);width:34px}.mu-day-button.hover .mu-day-button-bg,.mu-day-button.selected .mu-day-button-bg{-webkit-transform:scale(1);transform:scale(1)}.mu-day-button.hover .mu-day-button-bg{opacity:.6}.mu-day-button.selected .mu-day-button-bg{opacity:1}.mu-day-button-text{font-weight:400;position:relative;color:rgba(0,0,0,.87)}.mu-day-button.now .mu-day-button-text{color:#03a9f4}.mu-day-button.hover .mu-day-button-text,.mu-day-button.selected .mu-day-button-text{color:#fff}.mu-calendar-year-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-top:10px;width:310px;height:272px;overflow:hidden}.mu-calendar-year{background-color:#fff;height:inherit;line-height:35px;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;position:relative}.mu-calendar-year-list{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;min-height:100%}.mu-year-button{position:relative;display:block;background:none;cursor:pointer;outline:none;text-decoration:none;margin:0 auto;padding:0;border:10px;font-size:14px;font-weight:inherit;text-align:center;line-height:inherit}.mu-year-button-text{-ms-flex-item-align:center;align-self:center;color:rgba(0,0,0,.87);font-size:17px;font-weight:400;position:relative;top:-1px}.mu-year-button.selected .mu-year-button-text{color:#03a9f4;font-size:26px;font-weight:500}.mu-year-button.hover .mu-year-button-text{color:#03a9f4}.mu-time-picker{display:inline-block;position:relative;width:256px}.mu-time-picker.fullWidth{width:100%}.mu-time-picker-dialog{width:280px}.mu-time-picker-dialog.landscape{width:479px}.mu-time-picker-dialog.landscape .mu-dialog-body{min-height:352px;min-width:479px}.mu-time-picker-dialog .mu-dialog-body{padding:0;min-height:450px;min-width:280px}.mu-clock{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:280px}.mu-clock-landspace{width:479px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.mu-clock-container{height:280px;padding:10px;box-sizing:content-box;position:relative;padding-bottom:62px}.mu-clock-landspace .mu-clock-container{width:300px}.mu-clock-circle{position:absolute;top:20px;width:260px;height:260px;border-radius:100%;background-color:rgba(0,0,0,.07)}.mu-clock-landspace .mu-clock-circle{left:50%;margin-left:-130px}.mu-clock-actions{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;padding:8px;position:absolute;left:0;bottom:0;right:0}.mu-time-display{padding:14px 0;border-top-left-radius:2px;border-top-right-radius:2px;background-color:#03a9f4;color:#fff}.mu-clock-landspace .mu-time-display{width:179px;position:relative}.mu-time-display-text{margin:6px 0;line-height:58px;height:58px;font-size:58px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.mu-clock-landspace .mu-time-display-text,.mu-time-display-text{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.mu-clock-landspace .mu-time-display-text{margin:0;position:absolute;left:0;right:0;top:0;bottom:0;height:auto;-webkit-box-align:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-size:48px}.mu-time-display-affix{-webkit-box-flex:1;-ms-flex:1 1;flex:1 1;position:relative;line-height:17px;height:17px;font-size:17px}.mu-clock-landspace .mu-time-display-affix{-webkit-box-flex:0;-ms-flex:none;flex:none;height:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.mu-time-display-time{margin:0 10px}.mu-clock-landspace .mu-time-display-time{margin-top:-28px}.mu-time-display-clickable{cursor:pointer}.mu-time-display-clickable.inactive{opacity:.7}.mu-clock-landspace .mu-time-display-clickable{margin-top:8px}.mu-time-display-affix-top{position:absolute;top:-20px;left:0}.mu-clock-landspace .mu-time-display-affix-top{position:static;-webkit-box-ordinal-group:0;-ms-flex-order:-1;order:-1}.mu-clock-hours{height:100%;width:100%;border-radius:100%;position:relative;pointer-events:none;box-sizing:border-box}.mu-clock-hours-mask{height:100%;width:100%;pointer-events:auto}.mu-clock-number{display:inline-block;width:32px;height:32px;line-height:24px;position:absolute;top:10px;text-align:center;padding-top:5px;font-size:1.1em;pointer-events:none;border-radius:100%;box-sizing:border-box;-webkit-transform:translateY(5px);transform:translateY(5px);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mu-clock-number.selected{background-color:#03a9f4;color:#fff}.mu-clock-number.inner{width:28px;height:28px}.mu-clock-pointer{height:40%;background-color:#03a9f4;width:2px;left:49%;position:absolute;bottom:50%;-webkit-transform-origin:center bottom 0;transform-origin:center bottom 0;pointer-events:none}.mu-clock-pointer.inner{height:30%}.mu-clock-pointer-mark{box-sizing:content-box;background-color:#fff;border:4px solid #03a9f4;width:7px;height:7px;position:absolute;top:-5px;left:-6px;border-radius:100%}.mu-clock-pointer-mark.has-selected{display:none}.mu-clock-minutes{height:100%;width:100%;border-radius:100%;position:relative;pointer-events:none;box-sizing:border-box}.mu-clock-minutes-mask{height:100%;width:100%;pointer-events:auto}.mu-step{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin-left:-6px}.mu-stepper-vertical .mu-step{margin-top:-14px;margin-left:0}.mu-step:first-child{margin-left:0}.mu-step-button{border:10px;display:inline-block;cursor:pointer;text-decoration:none;margin:0;padding:0;outline:none;font-size:inherit;font-weight:inherit;-webkit-transform:translate(0);transform:translate(0);background-color:transparent;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1) 0ms;transition:all .45s cubic-bezier(.23,1,.32,1) 0ms}.mu-stepper-vertical .mu-step-button{width:100%}.mu-step-button.hover{background-color:rgba(0,0,0,.06)}.mu-step-label{height:72px;color:rgba(0,0,0,.87);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:14px;padding-left:14px;padding-right:14px}.mu-stepper-vertical .mu-step-label{height:64px}.mu-step-label.disabled{color:rgba(0,0,0,.38);cursor:not-allowed}.mu-step-label.active{font-weight:500}.mu-step-label-icon-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-right:8px;width:24px}.mu-step-label-icon{display:block;font-size:24px;width:24px;height:24px;color:#9e9e9e;fill:currentColor}.mu-step-label.disabled .mu-step-label-icon{color:#9e9e9e}.mu-step-label.active .mu-step-label-icon,.mu-step-label.completed .mu-step-label-icon{color:#03a9f4}.mu-step-label-circle{width:20px;height:20px;font-size:12px;line-height:20px;text-align:center;overflow:hidden;border-radius:100%;color:#fff}.mu-step-label-circle,.mu-step-label.disabled .mu-step-label-circle{background-color:#9e9e9e}.mu-step-label.active .mu-step-label-circle,.mu-step-label.completed .mu-step-label-circle{background-color:#03a9f4}.mu-step-content{margin-top:-14px;margin-left:25px;padding-left:21px;padding-right:16px;overflow:hidden}.mu-stepper-vertical .mu-step-content{border-left:1px solid #bdbdbd}.mu-step-content.last{border-left:none}.mu-step-content-inner{position:relative;width:100%;top:0;left:0;overflow:hidden}.mu-stepper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:center;align-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.mu-stepper-vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}.mu-step-connector{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.mu-stepper-vertical .mu-step-connector{margin-left:25px}.mu-step-connector-line{display:block;border-color:#bdbdbd;margin-left:-6px;border-top-style:solid;border-top-width:1px}.mu-stepper-vertical .mu-step-connector-line{border-top:none;border-left-style:solid;border-left-width:1px;min-height:28px;margin-left:0}.mu-auto-complete{display:inline-block;position:relative;width:256px}.mu-auto-complete.fullWidth{width:100%}.mu-auto-complete-menu-item{width:100%;overflow:hidden}.mu-pagination{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mu-pagination-svg-icon{display:inline-block;width:24px;height:24px;fill:currentColor;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1)}.mu-pagination-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:16px;height:32px;min-width:32px;padding-left:8px;padding-right:8px;line-height:32px;margin:0 8px;-webkit-transition:all .45s cubic-bezier(.23,1,.32,1);transition:all .45s cubic-bezier(.23,1,.32,1);color:rgba(0,0,0,.87);position:relative;cursor:pointer;border-radius:2px}.mu-pagination-item.hover{background-color:rgba(0,0,0,.1)}.mu-pagination-item.active{color:#fff;background-color:#03a9f4}.mu-pagination-item.disabled{color:rgba(0,0,0,.38);cursor:not-allowed}.mu-pagination-item.circle,.mu-pagination-item.circle .mu-ripple-wrapper{border-radius:50%}.mu-pagination-item-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:100%;width:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.row{display:flex;justify-content:space-between;flex-wrap:wrap;align-items:flex-start}.row>[class*=col-]{box-sizing:border-box}@media all and (max-width:600px){.row .col-auto{width:100%}.row .col-100{width:100%;width:calc((100% - 16px*0) / 1)}.row.no-gutter .col-100{width:100%}.row .col-95{width:95%;width:calc((100% - 16px*0.05263157894736836) / 1.0526315789473684)}.row.no-gutter .col-95{width:95%}.row .col-90{width:90%;width:calc((100% - 16px*0.11111111111111116) / 1.1111111111111112)}.row.no-gutter .col-90{width:90%}.row .col-85{width:85%;width:calc((100% - 16px*0.17647058823529416) / 1.1764705882352942)}.row.no-gutter .col-85{width:85%}.row .col-80{width:80%;width:calc((100% - 16px*0.25) / 1.25)}.row.no-gutter .col-80{width:80%}.row .col-75{width:75%;width:calc((100% - 16px*0.33333333333333326) / 1.3333333333333333)}.row.no-gutter .col-75{width:75%}.row .col-70{width:70%;width:calc((100% - 16px*0.4285714285714286) / 1.4285714285714286)}.row.no-gutter .col-70{width:70%}.row .col-66{width:66.66666666666666%;width:calc((100% - 16px*0.5000000000000002) / 1.5000000000000002)}.row.no-gutter .col-66{width:66.66666666666666%}.row .col-65{width:65%;width:calc((100% - 16px*0.5384615384615385) / 1.5384615384615385)}.row.no-gutter .col-65{width:65%}.row .col-60{width:60%;width:calc((100% - 16px*0.6666666666666667) / 1.6666666666666667)}.row.no-gutter .col-60{width:60%}.row .col-55{width:55%;width:calc((100% - 16px*0.8181818181818181) / 1.8181818181818181)}.row.no-gutter .col-55{width:55%}.row .col-50{width:50%;width:calc((100% - 16px*1) / 2)}.row.no-gutter .col-50{width:50%}.row .col-45{width:45%;width:calc((100% - 16px*1.2222222222222223) / 2.2222222222222223)}.row.no-gutter .col-45{width:45%}.row .col-40{width:40%;width:calc((100% - 16px*1.5) / 2.5)}.row.no-gutter .col-40{width:40%}.row .col-35{width:35%;width:calc((100% - 16px*1.8571428571428572) / 2.857142857142857)}.row.no-gutter .col-35{width:35%}.row .col-33{width:33.333333333333336%;width:calc((100% - 16px*2) / 3)}.row.no-gutter .col-33{width:33.333333333333336%}.row .col-30{width:30%;width:calc((100% - 16px*2.3333333333333335) / 3.3333333333333335)}.row.no-gutter .col-30{width:30%}.row .col-25{width:25%;width:calc((100% - 16px*3) / 4)}.row.no-gutter .col-25{width:25%}.row .col-20{width:20%;width:calc((100% - 16px*4) / 5)}.row.no-gutter .col-20{width:20%}.row .col-15{width:15%;width:calc((100% - 16px*5.666666666666667) / 6.666666666666667)}.row.no-gutter .col-15{width:15%}.row .col-10{width:10%;width:calc((100% - 16px*9) / 10)}.row.no-gutter .col-10{width:10%}.row .col-5{width:5%;width:calc((100% - 16px*19) / 20)}.row.no-gutter .col-5{width:5%}.row .col-auto:nth-last-child(1),.row .col-auto:nth-last-child(1)~.col-auto{width:100%;width:calc((100% - 16px*0) / 1)}.row.no-gutter .col-auto:nth-last-child(1),.row.no-gutter .col-auto:nth-last-child(1)~.col-auto{width:100%}.row .col-auto:nth-last-child(2),.row .col-auto:nth-last-child(2)~.col-auto{width:50%;width:calc((100% - 16px*1) / 2)}.row.no-gutter .col-auto:nth-last-child(2),.row.no-gutter .col-auto:nth-last-child(2)~.col-auto{width:50%}.row .col-auto:nth-last-child(3),.row .col-auto:nth-last-child(3)~.col-auto{width:33.33333333%;width:calc((100% - 16px*2) / 3)}.row.no-gutter .col-auto:nth-last-child(3),.row.no-gutter .col-auto:nth-last-child(3)~.col-auto{width:33.33333333%}.row .col-auto:nth-last-child(4),.row .col-auto:nth-last-child(4)~.col-auto{width:25%;width:calc((100% - 16px*3) / 4)}.row.no-gutter .col-auto:nth-last-child(4),.row.no-gutter .col-auto:nth-last-child(4)~.col-auto{width:25%}.row .col-auto:nth-last-child(5),.row .col-auto:nth-last-child(5)~.col-auto{width:20%;width:calc((100% - 16px*4) / 5)}.row.no-gutter .col-auto:nth-last-child(5),.row.no-gutter .col-auto:nth-last-child(5)~.col-auto{width:20%}.row .col-auto:nth-last-child(6),.row .col-auto:nth-last-child(6)~.col-auto{width:16.66666667%;width:calc((100% - 16px*5) / 6)}.row.no-gutter .col-auto:nth-last-child(6),.row.no-gutter .col-auto:nth-last-child(6)~.col-auto{width:16.66666667%}.row .col-auto:nth-last-child(7),.row .col-auto:nth-last-child(7)~.col-auto{width:14.28571429%;width:calc((100% - 16px*6) / 7)}.row.no-gutter .col-auto:nth-last-child(7),.row.no-gutter .col-auto:nth-last-child(7)~.col-auto{width:14.28571429%}.row .col-auto:nth-last-child(8),.row .col-auto:nth-last-child(8)~.col-auto{width:12.5%;width:calc((100% - 16px*7) / 8)}.row.no-gutter .col-auto:nth-last-child(8),.row.no-gutter .col-auto:nth-last-child(8)~.col-auto{width:12.5%}.row .col-auto:nth-last-child(9),.row .col-auto:nth-last-child(9)~.col-auto{width:11.11111111%;width:calc((100% - 16px*8) / 9)}.row.no-gutter .col-auto:nth-last-child(9),.row.no-gutter .col-auto:nth-last-child(9)~.col-auto{width:11.11111111%}.row .col-auto:nth-last-child(10),.row .col-auto:nth-last-child(10)~.col-auto{width:10%;width:calc((100% - 16px*9) / 10)}.row.no-gutter .col-auto:nth-last-child(10),.row.no-gutter .col-auto:nth-last-child(10)~.col-auto{width:10%}.row .col-auto:nth-last-child(11),.row .col-auto:nth-last-child(11)~.col-auto{width:9.09090909%;width:calc((100% - 16px*10) / 11)}.row.no-gutter .col-auto:nth-last-child(11),.row.no-gutter .col-auto:nth-last-child(11)~.col-auto{width:9.09090909%}.row .col-auto:nth-last-child(12),.row .col-auto:nth-last-child(12)~.col-auto{width:8.33333333%;width:calc((100% - 16px*11) / 12)}.row.no-gutter .col-auto:nth-last-child(12),.row.no-gutter .col-auto:nth-last-child(12)~.col-auto{width:8.33333333%}.row .col-auto:nth-last-child(13),.row .col-auto:nth-last-child(13)~.col-auto{width:7.69230769%;width:calc((100% - 16px*12) / 13)}.row.no-gutter .col-auto:nth-last-child(13),.row.no-gutter .col-auto:nth-last-child(13)~.col-auto{width:7.69230769%}.row .col-auto:nth-last-child(14),.row .col-auto:nth-last-child(14)~.col-auto{width:7.14285714%;width:calc((100% - 16px*13) / 14)}.row.no-gutter .col-auto:nth-last-child(14),.row.no-gutter .col-auto:nth-last-child(14)~.col-auto{width:7.14285714%}.row .col-auto:nth-last-child(15),.row .col-auto:nth-last-child(15)~.col-auto{width:6.66666667%;width:calc((100% - 16px*14) / 15)}.row.no-gutter .col-auto:nth-last-child(15),.row.no-gutter .col-auto:nth-last-child(15)~.col-auto{width:6.66666667%}.row .col-auto:nth-last-child(16),.row .col-auto:nth-last-child(16)~.col-auto{width:6.25%;width:calc((100% - 16px*15) / 16)}.row.no-gutter .col-auto:nth-last-child(16),.row.no-gutter .col-auto:nth-last-child(16)~.col-auto{width:6.25%}.row .col-auto:nth-last-child(17),.row .col-auto:nth-last-child(17)~.col-auto{width:5.88235294%;width:calc((100% - 16px*16) / 17)}.row.no-gutter .col-auto:nth-last-child(17),.row.no-gutter .col-auto:nth-last-child(17)~.col-auto{width:5.88235294%}.row .col-auto:nth-last-child(18),.row .col-auto:nth-last-child(18)~.col-auto{width:5.55555556%;width:calc((100% - 16px*17) / 18)}.row.no-gutter .col-auto:nth-last-child(18),.row.no-gutter .col-auto:nth-last-child(18)~.col-auto{width:5.55555556%}.row .col-auto:nth-last-child(19),.row .col-auto:nth-last-child(19)~.col-auto{width:5.26315789%;width:calc((100% - 16px*18) / 19)}.row.no-gutter .col-auto:nth-last-child(19),.row.no-gutter .col-auto:nth-last-child(19)~.col-auto{width:5.26315789%}.row .col-auto:nth-last-child(20),.row .col-auto:nth-last-child(20)~.col-auto{width:5%;width:calc((100% - 16px*19) / 20)}.row.no-gutter .col-auto:nth-last-child(20),.row.no-gutter .col-auto:nth-last-child(20)~.col-auto{width:5%}.row .col-auto:nth-last-child(21),.row .col-auto:nth-last-child(21)~.col-auto{width:4.76190476%;width:calc((100% - 16px*20) / 21)}.row.no-gutter .col-auto:nth-last-child(21),.row.no-gutter .col-auto:nth-last-child(21)~.col-auto{width:4.76190476%}}@media all and (max-width:992px) and (min-width:601px){.row .tablet-100{width:100%;width:calc((100% - 16px*0) / 1)}.row.no-gutter .tablet-100{width:100%}.row .tablet-95{width:95%;width:calc((100% - 16px*0.05263157894736836) / 1.0526315789473684)}.row.no-gutter .tablet-95{width:95%}.row .tablet-90{width:90%;width:calc((100% - 16px*0.11111111111111116) / 1.1111111111111112)}.row.no-gutter .tablet-90{width:90%}.row .tablet-85{width:85%;width:calc((100% - 16px*0.17647058823529416) / 1.1764705882352942)}.row.no-gutter .tablet-85{width:85%}.row .tablet-80{width:80%;width:calc((100% - 16px*0.25) / 1.25)}.row.no-gutter .tablet-80{width:80%}.row .tablet-75{width:75%;width:calc((100% - 16px*0.33333333333333326) / 1.3333333333333333)}.row.no-gutter .tablet-75{width:75%}.row .tablet-70{width:70%;width:calc((100% - 16px*0.4285714285714286) / 1.4285714285714286)}.row.no-gutter .tablet-70{width:70%}.row .tablet-66{width:66.66666666666666%;width:calc((100% - 16px*0.5000000000000002) / 1.5000000000000002)}.row.no-gutter .tablet-66{width:66.66666666666666%}.row .tablet-65{width:65%;width:calc((100% - 16px*0.5384615384615385) / 1.5384615384615385)}.row.no-gutter .tablet-65{width:65%}.row .tablet-60{width:60%;width:calc((100% - 16px*0.6666666666666667) / 1.6666666666666667)}.row.no-gutter .tablet-60{width:60%}.row .tablet-55{width:55%;width:calc((100% - 16px*0.8181818181818181) / 1.8181818181818181)}.row.no-gutter .tablet-55{width:55%}.row .tablet-50{width:50%;width:calc((100% - 16px*1) / 2)}.row.no-gutter .tablet-50{width:50%}.row .tablet-45{width:45%;width:calc((100% - 16px*1.2222222222222223) / 2.2222222222222223)}.row.no-gutter .tablet-45{width:45%}.row .tablet-40{width:40%;width:calc((100% - 16px*1.5) / 2.5)}.row.no-gutter .tablet-40{width:40%}.row .tablet-35{width:35%;width:calc((100% - 16px*1.8571428571428572) / 2.857142857142857)}.row.no-gutter .tablet-35{width:35%}.row .tablet-33{width:33.333333333333336%;width:calc((100% - 16px*2) / 3)}.row.no-gutter .tablet-33{width:33.333333333333336%}.row .tablet-30{width:30%;width:calc((100% - 16px*2.3333333333333335) / 3.3333333333333335)}.row.no-gutter .tablet-30{width:30%}.row .tablet-25{width:25%;width:calc((100% - 16px*3) / 4)}.row.no-gutter .tablet-25{width:25%}.row .tablet-20{width:20%;width:calc((100% - 16px*4) / 5)}.row.no-gutter .tablet-20{width:20%}.row .tablet-15{width:15%;width:calc((100% - 16px*5.666666666666667) / 6.666666666666667)}.row.no-gutter .tablet-15{width:15%}.row .tablet-10{width:10%;width:calc((100% - 16px*9) / 10)}.row.no-gutter .tablet-10{width:10%}.row .tablet-5{width:5%;width:calc((100% - 16px*19) / 20)}.row.no-gutter .tablet-5{width:5%}.row .tablet-auto:nth-last-child(1),.row .tablet-auto:nth-last-child(1)~.col-auto{width:100%;width:calc((100% - 16px*0) / 1)}.row.no-gutter .tablet-auto:nth-last-child(1),.row.no-gutter .tablet-auto:nth-last-child(1)~.tablet-auto{width:100%}.row .tablet-auto:nth-last-child(2),.row .tablet-auto:nth-last-child(2)~.col-auto{width:50%;width:calc((100% - 16px*1) / 2)}.row.no-gutter .tablet-auto:nth-last-child(2),.row.no-gutter .tablet-auto:nth-last-child(2)~.tablet-auto{width:50%}.row .tablet-auto:nth-last-child(3),.row .tablet-auto:nth-last-child(3)~.col-auto{width:33.33333333%;width:calc((100% - 16px*2) / 3)}.row.no-gutter .tablet-auto:nth-last-child(3),.row.no-gutter .tablet-auto:nth-last-child(3)~.tablet-auto{width:33.33333333%}.row .tablet-auto:nth-last-child(4),.row .tablet-auto:nth-last-child(4)~.col-auto{width:25%;width:calc((100% - 16px*3) / 4)}.row.no-gutter .tablet-auto:nth-last-child(4),.row.no-gutter .tablet-auto:nth-last-child(4)~.tablet-auto{width:25%}.row .tablet-auto:nth-last-child(5),.row .tablet-auto:nth-last-child(5)~.col-auto{width:20%;width:calc((100% - 16px*4) / 5)}.row.no-gutter .tablet-auto:nth-last-child(5),.row.no-gutter .tablet-auto:nth-last-child(5)~.tablet-auto{width:20%}.row .tablet-auto:nth-last-child(6),.row .tablet-auto:nth-last-child(6)~.col-auto{width:16.66666667%;width:calc((100% - 16px*5) / 6)}.row.no-gutter .tablet-auto:nth-last-child(6),.row.no-gutter .tablet-auto:nth-last-child(6)~.tablet-auto{width:16.66666667%}.row .tablet-auto:nth-last-child(7),.row .tablet-auto:nth-last-child(7)~.col-auto{width:14.28571429%;width:calc((100% - 16px*6) / 7)}.row.no-gutter .tablet-auto:nth-last-child(7),.row.no-gutter .tablet-auto:nth-last-child(7)~.tablet-auto{width:14.28571429%}.row .tablet-auto:nth-last-child(8),.row .tablet-auto:nth-last-child(8)~.col-auto{width:12.5%;width:calc((100% - 16px*7) / 8)}.row.no-gutter .tablet-auto:nth-last-child(8),.row.no-gutter .tablet-auto:nth-last-child(8)~.tablet-auto{width:12.5%}.row .tablet-auto:nth-last-child(9),.row .tablet-auto:nth-last-child(9)~.col-auto{width:11.11111111%;width:calc((100% - 16px*8) / 9)}.row.no-gutter .tablet-auto:nth-last-child(9),.row.no-gutter .tablet-auto:nth-last-child(9)~.tablet-auto{width:11.11111111%}.row .tablet-auto:nth-last-child(10),.row .tablet-auto:nth-last-child(10)~.col-auto{width:10%;width:calc((100% - 16px*9) / 10)}.row.no-gutter .tablet-auto:nth-last-child(10),.row.no-gutter .tablet-auto:nth-last-child(10)~.tablet-auto{width:10%}.row .tablet-auto:nth-last-child(11),.row .tablet-auto:nth-last-child(11)~.col-auto{width:9.09090909%;width:calc((100% - 16px*10) / 11)}.row.no-gutter .tablet-auto:nth-last-child(11),.row.no-gutter .tablet-auto:nth-last-child(11)~.tablet-auto{width:9.09090909%}.row .tablet-auto:nth-last-child(12),.row .tablet-auto:nth-last-child(12)~.col-auto{width:8.33333333%;width:calc((100% - 16px*11) / 12)}.row.no-gutter .tablet-auto:nth-last-child(12),.row.no-gutter .tablet-auto:nth-last-child(12)~.tablet-auto{width:8.33333333%}.row .tablet-auto:nth-last-child(13),.row .tablet-auto:nth-last-child(13)~.col-auto{width:7.69230769%;width:calc((100% - 16px*12) / 13)}.row.no-gutter .tablet-auto:nth-last-child(13),.row.no-gutter .tablet-auto:nth-last-child(13)~.tablet-auto{width:7.69230769%}.row .tablet-auto:nth-last-child(14),.row .tablet-auto:nth-last-child(14)~.col-auto{width:7.14285714%;width:calc((100% - 16px*13) / 14)}.row.no-gutter .tablet-auto:nth-last-child(14),.row.no-gutter .tablet-auto:nth-last-child(14)~.tablet-auto{width:7.14285714%}.row .tablet-auto:nth-last-child(15),.row .tablet-auto:nth-last-child(15)~.col-auto{width:6.66666667%;width:calc((100% - 16px*14) / 15)}.row.no-gutter .tablet-auto:nth-last-child(15),.row.no-gutter .tablet-auto:nth-last-child(15)~.tablet-auto{width:6.66666667%}.row .tablet-auto:nth-last-child(16),.row .tablet-auto:nth-last-child(16)~.col-auto{width:6.25%;width:calc((100% - 16px*15) / 16)}.row.no-gutter .tablet-auto:nth-last-child(16),.row.no-gutter .tablet-auto:nth-last-child(16)~.tablet-auto{width:6.25%}.row .tablet-auto:nth-last-child(17),.row .tablet-auto:nth-last-child(17)~.col-auto{width:5.88235294%;width:calc((100% - 16px*16) / 17)}.row.no-gutter .tablet-auto:nth-last-child(17),.row.no-gutter .tablet-auto:nth-last-child(17)~.tablet-auto{width:5.88235294%}.row .tablet-auto:nth-last-child(18),.row .tablet-auto:nth-last-child(18)~.col-auto{width:5.55555556%;width:calc((100% - 16px*17) / 18)}.row.no-gutter .tablet-auto:nth-last-child(18),.row.no-gutter .tablet-auto:nth-last-child(18)~.tablet-auto{width:5.55555556%}.row .tablet-auto:nth-last-child(19),.row .tablet-auto:nth-last-child(19)~.col-auto{width:5.26315789%;width:calc((100% - 16px*18) / 19)}.row.no-gutter .tablet-auto:nth-last-child(19),.row.no-gutter .tablet-auto:nth-last-child(19)~.tablet-auto{width:5.26315789%}.row .tablet-auto:nth-last-child(20),.row .tablet-auto:nth-last-child(20)~.col-auto{width:5%;width:calc((100% - 16px*19) / 20)}.row.no-gutter .tablet-auto:nth-last-child(20),.row.no-gutter .tablet-auto:nth-last-child(20)~.tablet-auto{width:5%}.row .tablet-auto:nth-last-child(21),.row .tablet-auto:nth-last-child(21)~.col-auto{width:4.76190476%;width:calc((100% - 16px*20) / 21)}.row.no-gutter .tablet-auto:nth-last-child(21),.row.no-gutter .tablet-auto:nth-last-child(21)~.tablet-auto{width:4.76190476%}}@media all and (min-width:993px){.row .desktop-100{width:100%;width:calc((100% - 16px*0) / 1)}.row.no-gutter .desktop-100{width:100%}.row .desktop-95{width:95%;width:calc((100% - 16px*0.05263157894736836) / 1.0526315789473684)}.row.no-gutter .desktop-95{width:95%}.row .desktop-90{width:90%;width:calc((100% - 16px*0.11111111111111116) / 1.1111111111111112)}.row.no-gutter .desktop-90{width:90%}.row .desktop-85{width:85%;width:calc((100% - 16px*0.17647058823529416) / 1.1764705882352942)}.row.no-gutter .desktop-85{width:85%}.row .desktop-80{width:80%;width:calc((100% - 16px*0.25) / 1.25)}.row.no-gutter .desktop-80{width:80%}.row .desktop-75{width:75%;width:calc((100% - 16px*0.33333333333333326) / 1.3333333333333333)}.row.no-gutter .desktop-75{width:75%}.row .desktop-70{width:70%;width:calc((100% - 16px*0.4285714285714286) / 1.4285714285714286)}.row.no-gutter .desktop-70{width:70%}.row .desktop-66{width:66.66666666666666%;width:calc((100% - 16px*0.5000000000000002) / 1.5000000000000002)}.row.no-gutter .desktop-66{width:66.66666666666666%}.row .desktop-65{width:65%;width:calc((100% - 16px*0.5384615384615385) / 1.5384615384615385)}.row.no-gutter .desktop-65{width:65%}.row .desktop-60{width:60%;width:calc((100% - 16px*0.6666666666666667) / 1.6666666666666667)}.row.no-gutter .desktop-60{width:60%}.row .desktop-55{width:55%;width:calc((100% - 16px*0.8181818181818181) / 1.8181818181818181)}.row.no-gutter .desktop-55{width:55%}.row .desktop-50{width:50%;width:calc((100% - 16px*1) / 2)}.row.no-gutter .desktop-50{width:50%}.row .desktop-45{width:45%;width:calc((100% - 16px*1.2222222222222223) / 2.2222222222222223)}.row.no-gutter .desktop-45{width:45%}.row .desktop-40{width:40%;width:calc((100% - 16px*1.5) / 2.5)}.row.no-gutter .desktop-40{width:40%}.row .desktop-35{width:35%;width:calc((100% - 16px*1.8571428571428572) / 2.857142857142857)}.row.no-gutter .desktop-35{width:35%}.row .desktop-33{width:33.333333333333336%;width:calc((100% - 16px*2) / 3)}.row.no-gutter .desktop-33{width:33.333333333333336%}.row .desktop-30{width:30%;width:calc((100% - 16px*2.3333333333333335) / 3.3333333333333335)}.row.no-gutter .desktop-30{width:30%}.row .desktop-25{width:25%;width:calc((100% - 16px*3) / 4)}.row.no-gutter .desktop-25{width:25%}.row .desktop-20{width:20%;width:calc((100% - 16px*4) / 5)}.row.no-gutter .desktop-20{width:20%}.row .desktop-15{width:15%;width:calc((100% - 16px*5.666666666666667) / 6.666666666666667)}.row.no-gutter .desktop-15{width:15%}.row .desktop-10{width:10%;width:calc((100% - 16px*9) / 10)}.row.no-gutter .desktop-10{width:10%}.row .desktop-5{width:5%;width:calc((100% - 16px*19) / 20)}.row.no-gutter .desktop-5{width:5%}.row .desktop-auto:nth-last-child(1),.row .desktop-auto:nth-last-child(1)~.col-auto{width:100%;width:calc((100% - 16px*0) / 1)}.row.no-gutter .desktop-auto:nth-last-child(1),.row.no-gutter .desktop-auto:nth-last-child(1)~.desktop-auto{width:100%}.row .desktop-auto:nth-last-child(2),.row .desktop-auto:nth-last-child(2)~.col-auto{width:50%;width:calc((100% - 16px*1) / 2)}.row.no-gutter .desktop-auto:nth-last-child(2),.row.no-gutter .desktop-auto:nth-last-child(2)~.desktop-auto{width:50%}.row .desktop-auto:nth-last-child(3),.row .desktop-auto:nth-last-child(3)~.col-auto{width:33.33333333%;width:calc((100% - 16px*2) / 3)}.row.no-gutter .desktop-auto:nth-last-child(3),.row.no-gutter .desktop-auto:nth-last-child(3)~.desktop-auto{width:33.33333333%}.row .desktop-auto:nth-last-child(4),.row .desktop-auto:nth-last-child(4)~.col-auto{width:25%;width:calc((100% - 16px*3) / 4)}.row.no-gutter .desktop-auto:nth-last-child(4),.row.no-gutter .desktop-auto:nth-last-child(4)~.desktop-auto{width:25%}.row .desktop-auto:nth-last-child(5),.row .desktop-auto:nth-last-child(5)~.col-auto{width:20%;width:calc((100% - 16px*4) / 5)}.row.no-gutter .desktop-auto:nth-last-child(5),.row.no-gutter .desktop-auto:nth-last-child(5)~.desktop-auto{width:20%}.row .desktop-auto:nth-last-child(6),.row .desktop-auto:nth-last-child(6)~.col-auto{width:16.66666667%;width:calc((100% - 16px*5) / 6)}.row.no-gutter .desktop-auto:nth-last-child(6),.row.no-gutter .desktop-auto:nth-last-child(6)~.desktop-auto{width:16.66666667%}.row .desktop-auto:nth-last-child(7),.row .desktop-auto:nth-last-child(7)~.col-auto{width:14.28571429%;width:calc((100% - 16px*6) / 7)}.row.no-gutter .desktop-auto:nth-last-child(7),.row.no-gutter .desktop-auto:nth-last-child(7)~.desktop-auto{width:14.28571429%}.row .desktop-auto:nth-last-child(8),.row .desktop-auto:nth-last-child(8)~.col-auto{width:12.5%;width:calc((100% - 16px*7) / 8)}.row.no-gutter .desktop-auto:nth-last-child(8),.row.no-gutter .desktop-auto:nth-last-child(8)~.desktop-auto{width:12.5%}.row .desktop-auto:nth-last-child(9),.row .desktop-auto:nth-last-child(9)~.col-auto{width:11.11111111%;width:calc((100% - 16px*8) / 9)}.row.no-gutter .desktop-auto:nth-last-child(9),.row.no-gutter .desktop-auto:nth-last-child(9)~.desktop-auto{width:11.11111111%}.row .desktop-auto:nth-last-child(10),.row .desktop-auto:nth-last-child(10)~.col-auto{width:10%;width:calc((100% - 16px*9) / 10)}.row.no-gutter .desktop-auto:nth-last-child(10),.row.no-gutter .desktop-auto:nth-last-child(10)~.desktop-auto{width:10%}.row .desktop-auto:nth-last-child(11),.row .desktop-auto:nth-last-child(11)~.col-auto{width:9.09090909%;width:calc((100% - 16px*10) / 11)}.row.no-gutter .desktop-auto:nth-last-child(11),.row.no-gutter .desktop-auto:nth-last-child(11)~.desktop-auto{width:9.09090909%}.row .desktop-auto:nth-last-child(12),.row .desktop-auto:nth-last-child(12)~.col-auto{width:8.33333333%;width:calc((100% - 16px*11) / 12)}.row.no-gutter .desktop-auto:nth-last-child(12),.row.no-gutter .desktop-auto:nth-last-child(12)~.desktop-auto{width:8.33333333%}.row .desktop-auto:nth-last-child(13),.row .desktop-auto:nth-last-child(13)~.col-auto{width:7.69230769%;width:calc((100% - 16px*12) / 13)}.row.no-gutter .desktop-auto:nth-last-child(13),.row.no-gutter .desktop-auto:nth-last-child(13)~.desktop-auto{width:7.69230769%}.row .desktop-auto:nth-last-child(14),.row .desktop-auto:nth-last-child(14)~.col-auto{width:7.14285714%;width:calc((100% - 16px*13) / 14)}.row.no-gutter .desktop-auto:nth-last-child(14),.row.no-gutter .desktop-auto:nth-last-child(14)~.desktop-auto{width:7.14285714%}.row .desktop-auto:nth-last-child(15),.row .desktop-auto:nth-last-child(15)~.col-auto{width:6.66666667%;width:calc((100% - 16px*14) / 15)}.row.no-gutter .desktop-auto:nth-last-child(15),.row.no-gutter .desktop-auto:nth-last-child(15)~.desktop-auto{width:6.66666667%}.row .desktop-auto:nth-last-child(16),.row .desktop-auto:nth-last-child(16)~.col-auto{width:6.25%;width:calc((100% - 16px*15) / 16)}.row.no-gutter .desktop-auto:nth-last-child(16),.row.no-gutter .desktop-auto:nth-last-child(16)~.desktop-auto{width:6.25%}.row .desktop-auto:nth-last-child(17),.row .desktop-auto:nth-last-child(17)~.col-auto{width:5.88235294%;width:calc((100% - 16px*16) / 17)}.row.no-gutter .desktop-auto:nth-last-child(17),.row.no-gutter .desktop-auto:nth-last-child(17)~.desktop-auto{width:5.88235294%}.row .desktop-auto:nth-last-child(18),.row .desktop-auto:nth-last-child(18)~.col-auto{width:5.55555556%;width:calc((100% - 16px*17) / 18)}.row.no-gutter .desktop-auto:nth-last-child(18),.row.no-gutter .desktop-auto:nth-last-child(18)~.desktop-auto{width:5.55555556%}.row .desktop-auto:nth-last-child(19),.row .desktop-auto:nth-last-child(19)~.col-auto{width:5.26315789%;width:calc((100% - 16px*18) / 19)}.row.no-gutter .desktop-auto:nth-last-child(19),.row.no-gutter .desktop-auto:nth-last-child(19)~.desktop-auto{width:5.26315789%}.row .desktop-auto:nth-last-child(20),.row .desktop-auto:nth-last-child(20)~.col-auto{width:5%;width:calc((100% - 16px*19) / 20)}.row.no-gutter .desktop-auto:nth-last-child(20),.row.no-gutter .desktop-auto:nth-last-child(20)~.desktop-auto{width:5%}.row .desktop-auto:nth-last-child(21),.row .desktop-auto:nth-last-child(21)~.col-auto{width:4.76190476%;width:calc((100% - 16px*20) / 21)}.row.no-gutter .desktop-auto:nth-last-child(21),.row.no-gutter .desktop-auto:nth-last-child(21)~.desktop-auto{width:4.76190476%}}.mu-flexbox{width:100%;text-align:left;display:-webkit-box;display:-ms-flexbox;display:flex;box-align:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mu-flexbox .mu-flexbox-item{-webkit-box-flex:1;-ms-flex:1;flex:1;min-width:20px;width:0}.mu-flexbox-item>.mu-flexbox{width:100%}.mu-flexbox .mu-flexbox-item:first-child{margin-left:0!important;margin-top:0!important}.mu-flex-col{box-orient:vertical;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.mu-flex-col>.mu-flexbox-item{width:100%}.mu-flex-row{box-direction:row;box-orient:horizontal;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.logo[data-v-4ffdad92]{\n\tdisplay: block;\n\twidth: 50%;\n\theight: 70%;\n}\n", "", {"version":3,"sources":["E:/HTML5/vue/kugo/component/kheader.vue?49636856"],"names":[],"mappings":";AAQA;CACA,eAAA;CACA,WAAA;CACA,YAAA;CACA","file":"kheader.vue","sourcesContent":["<template>\r\n\t<mu-appbar title=\"Title\">\r\n\t \t<a href=\"\" class=\"logo\">\r\n\t\t\t<img src=\"../public/image/logo.png\" alt=\"\">\t\r\n\t \t</a>\r\n\t</mu-appbar>\r\n</template>\r\n<style scoped>\r\n\t.logo{\r\n\t\tdisplay: block;\r\n\t\twidth: 50%;\r\n\t\theight: 70%;\r\n\t}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	var fixedCss = css.replace(/url *\( *(.+?) *\)/g, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAAAvCAQAAAAF++1VAAARvElEQVR42u1ceXgUxRJvcnKGECAiIAokkEAkF/gQBIGogHKqyAMVFQWRZ+Qh6vPgCiooiIiACsGPgKLccooRTRCQO5IYEgkIBEJiyMHm3s1e/Wp2+prZ2SMb4K9MfR/szkz3Tnd1V/3qVzVBGLkQH9wXv4234jP4BjZhjK24DGfjH/ACHIcbu2zdIC7E4eG0WT+8GtTh+NBbNuPh2Kthem+nYobi37Fbh+UcfrpBObdHMV3xPlynw3gGxzZM8q1WzPO4Ctf9sFQnNOybW6cYb5yoMecG3YmcpEMJu2YlTd0xM2VudmLRb+YK+/tqUnDLhqm+FYppamfCrEWpu2bdfT+KRt1QB9QGBaIWqCVqjdq36fbNS9f2Wk0qNHD2crtbOIw+eIxNwuvYzg9/BNiyUb1+uycs2a34AD6Jz+Oi26sYH7xHOc1FKXPHoVjUFdShMSjUCLV4r2/uVgDQomrOnWh9yxTzi/wbJe+ixpqecbLwrRl+Hzchn6fZ1lgeXsrO1F16iKN8dOBNGI0PbgPPHIOH4LHgPt6AxbMW78XH8d/4H+wl3rhW/GnTjW0zbEpxEasg3x0janLFluUn17kT37TD97gh/mAcj+M1MLV9wMyel39h35voDrv+RmMdtqSNYN/BJBtzqiLhkz++KrcrO4E6Ik/9oBfEb+yYORr5uNUqDu+0ya/4oE3O4EycCxNfhs3OHHbCaN7FZPFCxdnxj6BI5KbHWBJcckBsfWUNcm02TrmDKPLuNU8iNrV6VhtcK39e9ixqpeptgXzFkP9GsO37U6RV7eW++H+0t6XPoG4u98VnDqWYP1fBfuMKzXuWqfr7Cnt0HJjNzYCen9ad6NkfhSFf99fTat+iTWLHR8a7bFPkzgOG9TP/JH8q/GXiQ/Ts2IdRU1Vv79Nr51fDnojAlcTo/f72WFxDRpW2eMKFvjhKIRE4UNHPNFyvw1yA7lL095dn/VzYSDtIFncLqKVbXbd8qk+5ABxqcsc69zSN3Xk8043hQ7CJmq8tY+kuABOrNiS+tdkEQer3DqWmy5A/aXh1mqtfsabgMNbP0vopRnca3Ss8VVsP1VtVmCx3MFwIFUufGQa7xYvZyCQiS+1c1xJiPyUZiVFeE0MO7ydzsVNz1hEf1KXJYratbn2esZQsjEx65erOtMVk8syb4m98SJ7w+oYpeBAT4s9MD7CJNtPAatGEkl/dmoiSXdRn7aqfYq7+oDCWT2r8VrWxRH+1KkeXVnyk8Odruy5+l52Y9umhhN1vrH95ycT4kXGDfXvDwouSOzjOG4LL7yUYsffoecM51FEBrH/kbfIT/UMkf1QZweGzseTRu52CBj/YlTbR27Z76vwbKXLLQYNgYZBrtedcTcW0YLqIavcqg6/t/83b4e6E/jYbedt6GXHmrdT5qfNPCTvHajm5RDonysEEk8AhFh+m5xdPQOKoV7I+TO89MXFov4Ew5dKk90IRqAeMLwR1Qfegu1B7dAcJRZoif+RN4fJAESBDw5ZaXZeeQD2ELXpC2BtfQBuiNMNifv7YPDfNYaF094Zpxkx5RUFv3uRKf9fGDu6mv9JbvHJoQfYa/q0sTaeSiixxatM+Q8T02qI0EL0AZ7K+RMHyWSp5MwTT/yeY/hB2TfR+Z9nvp6MY1Bj5spG5FcdwmGyFuKWroiFz6QU/oVByrjOFrdJxcglMzZ3s/kBLhfAwbZx6mUCbBGGLdPcnT1t1sneKG0Cu+OJtrhRTmY0iWY/jMNuvp5aumyIsnS/hGbvTXcgkbP/rwuJSA/CHBfWXjVHOShcOnY0lgF/DNJeg4GGyv0bdhSuDhCGMc6QYX1zO9ksqDKCxVkiH8cXvUGfbmShA4cxcpM6HFsFiC4uwZ94d7EQxX7gkRifT0FWyyVU51Ewa8qVvssBTySxAgEglWc09+08PoeC6IBms9p3aT2G5Lt9zdKHdHV6WK7zHw7OFqW+KM7iZS3xRYfpFGcPbb3wFtReuvMivAIRvpa2YB/hNu2ap9gvCWfRaxiobEIzjarSafnwL1KJGX+HCcN5Hfg4Vs9eVYkpJ2sFUHtZPsslmnfx9/cvoXrDQVO6C0O85XKBsu2EK8rLupIop3cYgjCzb8HIsG+Z84llfQ23xFXwzjgFshJ+JCwUFCGP/SLj9QfArmoqZy6lK4MQCVdN3nUUmH6J2sAaM/O5N8WA3W9lPuZUps+BHJ8bsT5dDtDIzEAnrtRk9PWMUaqHCh2fVTdOXwz1PcYSmQczqFrUClZJdNXfc2GAlteTpAYatOXmudOaFMmGmRGO3nRlJneRRtRXD7HjpcaAqlRC3kWz/bbvp9YwnOI1grvp6CtwdoDnlDDBU/03Mn5aUyzFJ6XEZpOvSrDBJhn/K0lUTWAvhZHthJ1o79EX+yr5MQ8gIjtLWuVthGTUxZV/a5HgKFz1R1pV+7tn/fNTNUItFgi6yYQviis5JQmGKJ2amsCwDFp0DH5PJos0NzL1ruK+dM603uJ6BFIliK0MtL/JJbR7h4J6WZC1lTXiYeLBeFojQ01fOGKocKlyJtoWTw4jnKYah20VItdtM5anzfHvnryMA9gjqhNHRJvnf2ZZROfdKVTlmYozjR/7zGMd2pmG4zFxZXyk7g6LtPcyhhM/7KhjAKu7VZw/RZgkRz+mDseromFEtYYlmS82H/wY9N3W4FwbwVk/GObinF32w7ydK//+xfGSY/Ay/j1YqpiC56GsbC5VMF0XutwI3NYP0d8dLsfBMrald16WhEO7JgOCI4l6J8Hqw86qnEmyXJWE7FAB31V+63xQOoQpx87T7DTuPIMA6K/MuOethDTujzyN4q+kjHbCwI+TrlzafnS39//1/tvaT4cflqXV5/or9FBNCjOADDIaFWfVu3JNBlCIuOdl4XkexlPoENBp+01MUp+ull/OIfwFnrnb9T2k1SvsUdXD6SPfweyES1sZl04mTXlG+W8J3/QZefFT6/tULpfPrMgAwdBxH/guzGAr2QBj3ZMnvKKKUPBJl9QJ8JnukLayXzhC5JXkg8+xMtaU+irn+q7BjACwHaE+fZEA4vqm54pxsgVwfFhCUtsn7mCh5mVUvAWMUU/u47Mn0dSLKYZFQNjeSA3mbKZP2QKD8be1LKEgANCaCGLvjVLo8JI9kk1GeTWR5sioOGlE/EAFwAetY1PGB3Y5ZwCPs4hSBuNk/ztuJYoTIaEScGkEpGQVDAVkSobJzr8g0HiRGblPWatfywXiyF/qLagFVH7OZsl4srdVcSNBREN4ZX2LZD5oQn+khTf+tKgKcYNhXdFBbKFkrhRyO7gHrxaEboDK1j/mSB3sJQy3Vgkte40QxDJVZawP6OPAxRwV7mtO0DyyJVmJGCOP7BtjIPdciebsJyraMQBopfwu5X1gesXQZBnWkFA5E73RHrfJMMcAcqIATCoLsL8hD98r/c9GfFQxutPoqEx7s6E7YobKt9Nq1fShUN1a0m5fmOFQMG1z1BQistMn/fN7TN6/I9KgxniN/cwWKzQoCZHOApGTV8jNejH1IeLmUR1e60woC6VWZORCITmZkNsWvY5ELJDrojmLUZeaq6SNdibFEGENbzXHeiQssa3GAfQQn50FROAlaGuP5uJcyjpnNN1a4Ouo4LOymezC68baiAHOyA8VkC5F/D807fLkKcrfDtJFIfs8D6SvoLkJRrti0n0bblO5Lf89ctfK56z8xryH5nsUkzI20z1EueEqGGyTxRtmuy7T376ajOyE14UQ+bsFHMW2Eio2QxV9GgOZCwyhNanMN6mzTwcP4glShMD/IAVe253XV+mbZkPTP5d1UniRWm2UM03iYMJF6dxD5d+F7CsxMJ37l2v0kQPwNVOoiLbvyOdTMFvfHydzBogkoynxSvgY4TPIam2U+QLE8SBI6bnDZywTMXEIxbMEwm7BuSnKEi0KRwTyUAGNsjz4b4fVCHPiWfSojZQ5wGsH4e2aXNiEvrhg/a4XALivdP9uqwCLL7tG76jeRDj8V7QhvkXWkzZUN4immvA2W5ULASIjHy5v9Qzkvp31MHi4rBuL+HVXnpz4GLG8TWjABSguiEYu5AlJx6UyK5QQ0irUsZIugJ3muUM88TE0uU60o84Q7LkGSTI64nuVnv3gBQuJgDr8wPj7ZQT7my6EKcpDnNV+jLLIu0HCBnzfkH+mkeJhAnqmASCHWQRQzydVQ/1g+pw8l1pOmirLvTXo+gK/S4EFSRtAP+CnO2TajEYvmVF4G6mQng6YhpJ/HPFNM8SGmWrHQmC/gcsCFPUmSLIGfH/0QaoYk3yok9ld35YpRZjAbq4GldHw+iec1r3cVc39V2T+Iu2yhgvTv7sALzXY11P3vHCKTZCgEANGCSzZ5WsN1EVggH5t7f4C1kbOgp53k5nviC8yg0IB5hmeKubiRqRaxeMjM0yOQqIhkuHAjhypSUQlowMsoELfFv0jnSCWmSajxSn1JzWdJBxiKZvxniwZaa4Vg7vAWP5aLMfLMHmRRHJH+ia6Guur5PAK6y/5Q1J0g/AQhXTJU5yWJpywzuRZdvMc+RihIzlh134CHwunUQdaW5pRWMEiybZDLQ8fUfuxjVdHSEGxQeJIYARowJVT+BQBH1kEfMeXwxyxeIjtCzKKvp3UePlva0YeAHKCfssRv8IP8EVuH2dZuE85US8ldsPmOcv6EkEyZqzRTSVP1pPBo4tDKOQzZKfcdCQGhwCfMrt8NBEN+Q3lySEJ11ogROqN2teMpUQ+Om1oJVmByYjHqBHkSp4IvMjLrVQVYHkIr2VhFRGsBGjEVFP4ssRPyYRCqYM2V63ux2mXjL0Ie/c8tLVl1Mn8MdRGBl+IxG0EB62bBhl+BpFuww0iHoL2YAVC80EIUa5G8+X17mwk1c+5rFbJbxgB8F1WvHWiEAGu0o5AIDtIkWi+zBAEHMBe4KX0tlFQeOJI23FiBBwnQVguwcLE/PkJK4cfg/9KKN+LbulDF4FZmoc6z7PTUprS7UKvQXfmxrOZ15FK98RpFancaODvHdWV6OUuiCPyEMkB9HqCcfSwZoaRMSUnSyU/I5L+FD4Eb3w3/UnRjnThUWKOSE64FGJAJUZkcnB4Tw9sD7zH/4INNnngYq7n1fQKzMMqq4wEkWJpOOMmBH31bGhk9aidyviQ7MTyCDbhaQbdXZ5R2rINammNFBRckBmI1Ay436xN1p1AETRebbliuQhk2FwNLUgQr2QlFSQkvj3jXadogCwxZECsT9ujQX1XyGzsiKrNlGA651s5iRleR66wB0qmVWL5k+FXewbD/YoBq4h1WblRUDJZWjHb7rZUcZZkorCBniYHeroZ6bQ9QkJXO70kYR2Kuk6pKxwpgtLu6V42jvwqxEPdUwzwEy0eQijHZ2Ep32KaWEJvC3tFqBT44WnIQQqjfxXBh50xYVCFQ9Kd4P8a7MkXZ2LAH93ChlA5Qz64oYqjKgRiim9Py2MddDTV7TWQ3VyEdGIkm9sXp1Rel+F/BaDuoxjSV5STBmo0QQE1MxSJ3GG21wGSqwTLa4nd3OFGLRtRm0acto2VfisMfHECgxhtlhc3KUtQG1LQbnJaf5vsiQ8B6qqLzynMQNPVA3k6VOcZ4RJfmTHbMRO0tc3Qnta+WHrv4PcB3GtI9f3rhqaWSHF2Y+CIYph6q7GrUvoki7tsav2vW+pdnPwl3RsI7coonBQzX3iMJ1Hytiy7OfsbT8NTHC5Jzt2Qnpi/f8yYs3WiaunPzHUx4nWKLhnvTA5v7MbxBMwbIlFFAKiyA4muN9/9LjwHxEO76lR5YFd1cCOBCIBEdXQ2FlABbLIDs2kIJqyRttQpEYLoVyA+KYKUq4dv4xyNQc1s1dijA9E6gxnbw+951fmsZNcqaZdF7UrmT+QWQJKEudkuD1Oc9/+0xpYfrppWKs1DQBDXMqFHDVN/Sv4yB/A9Mrshwk1u9lDIHLHaYk4KmBrmZf0sGBXw7/up2rff5eUamIHlrPCilJ2rdMMW384/8INTsrq6JkzJXFf5cdd5UbquUsZoray4WpWav3fgKlEpHg0Nr+KMLt0Ax/wdenZPKx5HRYgAAAABJRU5ErkJggg=="

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(17)

var Component = __webpack_require__(2)(
  /* script */
  null,
  /* template */
  __webpack_require__(15),
  /* scopeId */
  "data-v-4ffdad92",
  /* cssModules */
  null
)
Component.options.__file = "E:\\HTML5\\vue\\kugo\\component\\kheader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] kheader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ffdad92", Component.options)
  } else {
    hotAPI.reload("data-v-4ffdad92", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

//
//
//

var kheader = __webpack_require__(13);
module.exports = {
	data:function(){
		return {

		}
	},
	components:{
		kheader:kheader
	}
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mu-appbar', {
    attrs: {
      "title": "Title"
    }
  }, [_c('a', {
    staticClass: "logo",
    attrs: {
      "href": ""
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(12),
      "alt": ""
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4ffdad92", module.exports)
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('kheader')
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-c69c47de", module.exports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(18)("7f516c25", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4ffdad92\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./kheader.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4ffdad92\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./kheader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(19)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(21)
var ieee754 = __webpack_require__(22)
var isArray = __webpack_require__(23)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_muse_ui__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_muse_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_muse_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_muse_ui_dist_muse_ui_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_muse_ui_dist_muse_ui_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_muse_ui_dist_muse_ui_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_router__ = __webpack_require__(7);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_muse_ui___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vue_router__["a" /* default */]);

var index = __webpack_require__(6);
var router = new __WEBPACK_IMPORTED_MODULE_3_vue_router__["a" /* default */]({
	routes:[{
		path:"/index",
		component:index
	}]
})

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
	el:"#kugo",
	data:{
		name:"abc123"
	},
	router:router
})

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map