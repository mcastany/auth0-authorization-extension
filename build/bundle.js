module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var tools = __webpack_require__(1);

var config = __webpack_require__(2);

var logger = __webpack_require__(4);

var factory = function factory(wtConfig, wtStorage) {
  logger.info('Starting Authorization Extension - Version:', "2.9.0");
  logger.info(' > WT_URL:', wtConfig('WT_URL'));
  logger.info(' > PUBLIC_WT_URL:', wtConfig('PUBLIC_WT_URL')); // Require in place to load the dependency only when needed
  // and avoid Blocked event loop errors

  return __webpack_require__(6)(wtConfig, wtStorage);
}; // Loading all modules at the beginning takes too much time
// that causes "Blocked event loop errors"
// This function is a helper to avoid this type of errors


var _createServer = function createServer(context, req, res) {
  // To avoid the  "Blocked event loop" error we delay loading the application module
  setImmediate(function () {
    var publicUrl = req.x_wt && req.x_wt.ectx && req.x_wt.ectx.PUBLIC_WT_URL || false;

    if (!publicUrl) {
      config.setValue('PUBLIC_WT_URL', tools.urlHelpers.getWebtaskUrl(req));
    } // After the application has been initialized we remove the
    // artificial delay in processing


    _createServer = tools.createServer(factory);

    _createServer(context, req, res);
  });
};

module.exports = function (context, req, res) {
  _createServer(context, req, res);
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("auth0-extension-hapi-tools@1.3.1");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_tools__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (Object(auth0_extension_tools__WEBPACK_IMPORTED_MODULE_0__["config"])());

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("auth0-extension-tools@1.3.2");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var winston = __webpack_require__(5);

winston.emitErrs = true;
var logger = new winston.Logger({
  transports: [new winston.transports.Console({
    timestamp: true,
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  })],
  exitOnError: false
});
module.exports = logger;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("winston@1.0.0");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _lib_storage_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _lib_storage_getdb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _lib_storage_getdb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_storage_getdb__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_storage_providers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lib_logger__WEBPACK_IMPORTED_MODULE_5__);







module.exports = function (cfg, storageContext, cb) {
  if (cb == null) {
    cb = function cb(err) {
      if (err) {
        _lib_logger__WEBPACK_IMPORTED_MODULE_5___default.a.error('Hapi initialization failed.');
        _lib_logger__WEBPACK_IMPORTED_MODULE_5___default.a.error(err);
      } else {
        _lib_logger__WEBPACK_IMPORTED_MODULE_5___default.a.info('Hapi initialization completed.');
      }
    };
  } // Set configuration provider.


  _lib_config__WEBPACK_IMPORTED_MODULE_0__["default"].setProvider(function (key) {
    return cfg(key) || Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"})[key];
  }); // Initialize the storage layer.

  Object(_lib_storage_getdb__WEBPACK_IMPORTED_MODULE_2__["init"])(new _lib_storage_database__WEBPACK_IMPORTED_MODULE_1__["default"]({
    provider: Object(_lib_storage_providers__WEBPACK_IMPORTED_MODULE_3__["createProvider"])(storageContext)
  })); // Start the server.

  return Object(___WEBPACK_IMPORTED_MODULE_4__["default"])(cb);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Database; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_tools__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var checkUnique = function checkUnique() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Record with that identifier is already exists.';
  var id = arguments.length > 2 ? arguments[2] : undefined;

  if (items.length === 0) {
    return null;
  }

  if (id && items.length === 1 && items[0]._id === id) {
    // eslint-disable-line no-underscore-dangle
    return null;
  }

  return bluebird__WEBPACK_IMPORTED_MODULE_4___default.a.reject(new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_5__["ValidationError"](errorMessage));
};

var Database = /*#__PURE__*/function () {
  function Database() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Database);

    if (!options.provider) {
      throw new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_5__["ArgumentError"]("The 'provider' has to be set when initializing the database.");
    }

    this.provider = options.provider;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Database, [{
    key: "getStatus",
    value: function getStatus() {
      if (!Object(_config__WEBPACK_IMPORTED_MODULE_6__["default"])('STORAGE_TYPE') || Object(_config__WEBPACK_IMPORTED_MODULE_6__["default"])('STORAGE_TYPE') === 'webtask') {
        return this.provider.storageContext.read().then(function (data) {
          return {
            size: Buffer.byteLength(JSON.stringify(data), 'utf8'),
            type: 'default'
          };
        });
      }

      return bluebird__WEBPACK_IMPORTED_MODULE_4___default.a.resolve({
        size: null,
        type: Object(_config__WEBPACK_IMPORTED_MODULE_6__["default"])('STORAGE_TYPE')
      });
    }
  }, {
    key: "canChange",
    value: function canChange(type, checkFor, id) {
      return this.provider.getAll(type).then(function (items) {
        return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.filter(items, function (item) {
          return item[checkFor] && lodash__WEBPACK_IMPORTED_MODULE_3___default.a.includes(item[checkFor], id);
        });
      }).then(function (items) {
        if (items.length) {
          var names = items.map(function (item) {
            return item.name;
          }).join(', ');
          var message = `Unable to touch ${checkFor} while used in ${type}: ${names}`;
          return bluebird__WEBPACK_IMPORTED_MODULE_4___default.a.reject(new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_5__["ValidationError"](message));
        }

        return bluebird__WEBPACK_IMPORTED_MODULE_4___default.a.resolve();
      });
    }
  }, {
    key: "getApiKey",
    value: function getApiKey() {
      return this.provider.getAll('configuration').then(function (records) {
        return records.length ? records[0].apikey : null;
      });
    }
  }, {
    key: "updateApiKey",
    value: function updateApiKey(apikey) {
      var _this = this;

      return this.provider.getAll('configuration').then(function (records) {
        return records.length ? records[0] : {};
      }).then(function (data) {
        return _this.provider.update('configuration', 'v1', _objectSpread(_objectSpread({}, data), {}, {
          apikey
        }), true);
      });
    }
  }, {
    key: "getConfiguration",
    value: function getConfiguration() {
      return this.provider.getAll('configuration').then(function (records) {
        return records.length ? records[0] : null;
      });
    }
  }, {
    key: "updateConfiguration",
    value: function updateConfiguration(data) {
      return this.provider.update('configuration', 'v1', data, true);
    }
  }, {
    key: "getRules",
    value: function getRules() {
      return this.provider.getAll('rules');
    }
  }, {
    key: "createRule",
    value: function createRule(rule) {
      return this.provider.create('rules', rule);
    }
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      return this.provider.getAll('permissions');
    }
  }, {
    key: "getPermission",
    value: function getPermission(id) {
      return this.provider.get('permissions', id);
    }
  }, {
    key: "createPermission",
    value: function createPermission(permission) {
      var _this2 = this;

      return this.getPermissions().then(function (permissions) {
        return checkUnique(permissions.filter(function (item) {
          return item.name.toLowerCase() === permission.name.toLowerCase() && item.applicationId === permission.applicationId;
        }), `Permission with name "${permission.name}" already exists for this application`);
      }).then(function () {
        return _this2.provider.create('permissions', permission);
      });
    }
  }, {
    key: "updatePermission",
    value: function updatePermission(id, permission) {
      var _this3 = this;

      return this.getPermissions().then(function (permissions) {
        return checkUnique(permissions.filter(function (item) {
          return item.name.toLowerCase() === permission.name.toLowerCase() && item.applicationId === permission.applicationId;
        }), `Permission with name "${permission.name}" already exists for this application`, id);
      }).then(function () {
        return _this3.canChange('roles', 'permissions', id);
      }).then(function () {
        return _this3.canChange('groups', 'permissions', id);
      }).then(function () {
        return _this3.provider.update('permissions', id, permission);
      });
    }
  }, {
    key: "deletePermission",
    value: function deletePermission(id) {
      var _this4 = this;

      return this.canChange('roles', 'permissions', id).then(function () {
        return _this4.provider.delete('permissions', id);
      });
    }
  }, {
    key: "getRoles",
    value: function getRoles() {
      return this.provider.getAll('roles');
    }
  }, {
    key: "getRole",
    value: function getRole(id) {
      return this.provider.get('roles', id);
    }
  }, {
    key: "createRole",
    value: function createRole(role) {
      var _this5 = this;

      return this.getRoles().then(function (roles) {
        return checkUnique(roles.filter(function (item) {
          return item.name.toLowerCase() === role.name.toLowerCase() && item.applicationId === role.applicationId;
        }), `Role with name "${role.name}" already exists for this application`);
      }).then(function () {
        return _this5.provider.create('roles', role);
      });
    }
  }, {
    key: "updateRole",
    value: function updateRole(id, role) {
      var _this6 = this;

      return this.getRoles().then(function (roles) {
        return checkUnique(roles.filter(function (item) {
          return item.name.toLowerCase() === role.name.toLowerCase() && item.applicationId === role.applicationId;
        }), `Role with name "${role.name}" already exists for this application`, id);
      }).then(function () {
        return _this6.provider.update('roles', id, role);
      });
    }
  }, {
    key: "deleteRole",
    value: function deleteRole(id) {
      var _this7 = this;

      return this.canChange('groups', 'roles', id).then(function () {
        return _this7.provider.delete('roles', id);
      });
    }
  }, {
    key: "getGroups",
    value: function getGroups() {
      return this.provider.getAll('groups');
    }
  }, {
    key: "getGroup",
    value: function getGroup(id) {
      return this.provider.get('groups', id);
    }
  }, {
    key: "createGroup",
    value: function createGroup(group) {
      var _this8 = this;

      return this.getGroups().then(function (groups) {
        return checkUnique(groups.filter(function (item) {
          return item.name.toLowerCase() === group.name.toLowerCase();
        }), `Group with name "${group.name}" already exists`);
      }).then(function () {
        return _this8.provider.create('groups', group);
      });
    }
  }, {
    key: "updateGroup",
    value: function updateGroup(id, group) {
      var _this9 = this;

      return this.getGroups().then(function (groups) {
        return checkUnique(groups.filter(function (item) {
          return item.name.toLowerCase() === group.name.toLowerCase();
        }), `Group with name "${group.name}" already exists`, id);
      }).then(function () {
        return _this9.provider.update('groups', id, group);
      });
    }
  }, {
    key: "deleteGroup",
    value: function deleteGroup(id) {
      var _this10 = this;

      return this.canChange('groups', 'nested', id).then(function () {
        return _this10.provider.delete('groups', id);
      });
    }
  }, {
    key: "getApplications",
    value: function getApplications() {
      return this.provider.getAll('applications');
    }
  }, {
    key: "getApplication",
    value: function getApplication(clientId) {
      return this.provider.get('applications', clientId);
    }
  }, {
    key: "updateApplication",
    value: function updateApplication(clientId, application) {
      return this.provider.update('applications', clientId, application, true);
    }
  }]);

  return Database;
}();



/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("lodash@3.10.1");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("bluebird@3.5.0");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var _db = null;

module.exports.init = function (db) {
  _db = db;
};

module.exports.getDb = function () {
  if (!_db) {
    throw new Error('The database has not been initialized.');
  }

  return _db;
};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProvider", function() { return createProvider; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var auth0_extension_s3_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var auth0_extension_s3_tools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_s3_tools__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_logger__WEBPACK_IMPORTED_MODULE_4__);





function createProvider(storageContext) {
  switch (Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('STORAGE_TYPE')) {
    case 's3':
      {
        _logger__WEBPACK_IMPORTED_MODULE_4___default.a.info('Initializing the S3 Storage Context.');
        var context = new auth0_extension_s3_tools__WEBPACK_IMPORTED_MODULE_1__["S3StorageContext"]({
          path: Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('S3_PATH'),
          bucket: Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('S3_BUCKET'),
          keyId: Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('S3_KEY'),
          keySecret: Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('S3_SECRET'),
          defaultData: {}
        });
        return new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__["BlobRecordProvider"](context, {
          concurrentWrites: false
        });
      }

    case 'webtask':
    default:
      {
        _logger__WEBPACK_IMPORTED_MODULE_4___default.a.info('Initializing the Webtask Storage Context.');

        var _context = storageContext ? new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__["WebtaskStorageContext"](storageContext, {
          force: 0
        }) : new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__["FileStorageContext"](path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '../../data.json'), {
          mergeWrites: true
        });

        return new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__["BlobRecordProvider"](_context, {
          concurrentWrites: false
        });
      }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("auth0-extension-s3-tools@1.1.1");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth0_hapi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _auth0_hapi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_auth0_hapi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var good__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var good__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(good__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var inert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27);
/* harmony import */ var inert__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(inert__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var relish__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28);
/* harmony import */ var relish__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(relish__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var blipp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);
/* harmony import */ var blipp__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(blipp__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var hapi_auth_jwt2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30);
/* harmony import */ var hapi_auth_jwt2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(hapi_auth_jwt2__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var good_console__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31);
/* harmony import */ var good_console__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(good_console__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var hapi_swagger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(32);
/* harmony import */ var hapi_swagger__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(hapi_swagger__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lib_logger__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(33);
/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_plugins__WEBPACK_IMPORTED_MODULE_11__);












/* harmony default export */ __webpack_exports__["default"] = (function (cb) {
  var goodPlugin = {
    register: good__WEBPACK_IMPORTED_MODULE_2___default.a,
    options: {
      ops: {
        interval: 30000
      },
      reporters: {
        console: []
      }
    }
  };
  var hapiSwaggerPlugin = {
    register: hapi_swagger__WEBPACK_IMPORTED_MODULE_8___default.a,
    options: {
      documentationPage: false,
      swaggerUI: false
    }
  };

  if (true) {
    goodPlugin.options.reporters.console.push(new good_console__WEBPACK_IMPORTED_MODULE_7___default.a({
      color: !!Object(_lib_config__WEBPACK_IMPORTED_MODULE_9__["default"])('LOG_COLOR')
    }));
    goodPlugin.options.reporters.console.push('stdout');
  }

  var relishPlugin = relish__WEBPACK_IMPORTED_MODULE_4___default()({});
  console.log('create hapi server');
  var server = new _auth0_hapi__WEBPACK_IMPORTED_MODULE_1___default.a.Server();
  server.connection({
    host: 'localhost',
    port: 3000,
    routes: {
      cors: true,
      validate: {
        failAction: relishPlugin.failAction
      }
    }
  });
  console.log('before server register');
  server.register([goodPlugin, inert__WEBPACK_IMPORTED_MODULE_3___default.a, blipp__WEBPACK_IMPORTED_MODULE_5___default.a, hapi_auth_jwt2__WEBPACK_IMPORTED_MODULE_6___default.a, hapiSwaggerPlugin].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(_plugins__WEBPACK_IMPORTED_MODULE_11___default.a)), function (err) {
    console.log('after server register');

    if (err) {
      return cb(err, null);
    } // Use the server logger.


    _lib_logger__WEBPACK_IMPORTED_MODULE_10___default.a.debug = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      server.log(['debug'], args.join(' '));
    };

    _lib_logger__WEBPACK_IMPORTED_MODULE_10___default.a.info = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      server.log(['info'], args.join(' '));
    };

    _lib_logger__WEBPACK_IMPORTED_MODULE_10___default.a.error = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      server.log(['error'], args.join(' '));
    };

    return cb(null, server);
  });
  server.ext('onPreResponse', function (request, reply) {
    if (request.response && request.response.isBoom && request.response.output) {
      server.log(['error'], `Request: ${request.method.toUpperCase()} ${request.url.path}`);
      server.log(['error'], `Response: ${JSON.stringify(request.response, null, 2)}`);
    }

    return reply.continue();
  });
  return server;
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(20);

var iterableToArray = __webpack_require__(22);

var unsupportedIterableToArray = __webpack_require__(23);

var nonIterableSpread = __webpack_require__(24);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(21);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(21);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@auth0/hapi@13.6.0");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("good@7.0.1");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("inert@4.0.1");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("relish@0.2.4");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("blipp@2.3.0");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("hapi-auth-jwt2@7.0.1");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("good-console@6.1.2");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("hapi-swagger@7.4.0");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [{
  register: __webpack_require__(34)
}, {
  register: __webpack_require__(41)
}, {
  register: __webpack_require__(42)
}, {
  register: __webpack_require__(43)
}, {
  register: __webpack_require__(47)
}, {
  register: __webpack_require__(166)
}, {
  register: __webpack_require__(167)
}];

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var boom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var boom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(boom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jwks_rsa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37);
/* harmony import */ var jwks_rsa__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jwks_rsa__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _lib_apiaccess__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(39);








var hashApiKey = function hashApiKey(key) {
  return crypto__WEBPACK_IMPORTED_MODULE_1___default.a.createHmac('sha256', `${key} + ${Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_CLIENT_SECRET')}`).update(Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('EXTENSION_SECRET')).digest('hex');
};

module.exports.register = function (server, options, next) {
  server.auth.scheme('extension-secret', function () {
    return {
      authenticate: function authenticate(request, reply) {
        var apiKey = request.headers['x-api-key'];
        return request.storage.getApiKey().then(function (key) {
          if (apiKey && apiKey === hashApiKey(key)) {
            return reply.continue({
              credentials: {
                user: 'rule'
              }
            });
          }

          return reply(boom__WEBPACK_IMPORTED_MODULE_0___default.a.unauthorized('Invalid API Key'));
        });
      }
    };
  });
  server.auth.strategy('extension-secret', 'extension-secret');
  var jwtOptions = {
    dashboardAdmin: {
      key: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('EXTENSION_SECRET'),
      verifyOptions: {
        audience: 'urn:api-authz',
        issuer: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('PUBLIC_WT_URL'),
        algorithms: ['HS256']
      }
    },
    resourceServer: {
      key: jwks_rsa__WEBPACK_IMPORTED_MODULE_2___default.a.hapiJwt2Key({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 2,
        jwksUri: `https://${Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_DOMAIN')}/.well-known/jwks.json`
      }),
      verifyOptions: {
        audience: 'urn:auth0-authz-api',
        issuer: `https://${Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_DOMAIN')}/`,
        algorithms: ['RS256']
      }
    }
  };
  server.auth.strategy('jwt', 'jwt', {
    // Get the complete decoded token, because we need info from the header (the kid)
    complete: true,
    verifyFunc: function verifyFunc(decoded, req, callback) {
      if (!decoded) {
        return callback(null, false);
      }

      var header = req.headers.authorization;

      if (header && header.indexOf('Bearer ') === 0) {
        var token = header.split(' ')[1];

        if (decoded && decoded.payload && decoded.payload.iss === `https://${Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_DOMAIN')}/`) {
          return jwtOptions.resourceServer.key(decoded, function (keyErr, key) {
            if (keyErr) {
              return callback(boom__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(keyErr), null, null);
            }

            return jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default.a.verify(token, key, jwtOptions.resourceServer.verifyOptions, function (err) {
              if (err) {
                return callback(boom__WEBPACK_IMPORTED_MODULE_0___default.a.unauthorized('Invalid token', 'Token'), null, null);
              }

              if (decoded.payload.gty && decoded.payload.gty !== 'client-credentials') {
                return callback(boom__WEBPACK_IMPORTED_MODULE_0___default.a.unauthorized('Invalid token', 'Token'), null, null);
              }

              if (!decoded.payload.sub.endsWith('@clients')) {
                return callback(boom__WEBPACK_IMPORTED_MODULE_0___default.a.unauthorized('Invalid token', 'Token'), null, null);
              }

              if (decoded.payload.scope && typeof decoded.payload.scope === 'string') {
                decoded.payload.scope = decoded.payload.scope.split(' '); // eslint-disable-line no-param-reassign
              }

              return callback(null, true, decoded.payload);
            });
          });
        } else if (decoded && decoded.payload && decoded.payload.iss === Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('PUBLIC_WT_URL')) {
          return jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default.a.verify(token, jwtOptions.dashboardAdmin.key, jwtOptions.dashboardAdmin.verifyOptions, function (err) {
            if (err) {
              return callback(boom__WEBPACK_IMPORTED_MODULE_0___default.a.unauthorized('Invalid token', 'Token'), null, null);
            }

            if (!decoded.payload.access_token || !decoded.payload.access_token.length) {
              return callback(boom__WEBPACK_IMPORTED_MODULE_0___default.a.unauthorized('Invalid token', 'Token'), null, null);
            }

            decoded.payload.scope = _lib_apiaccess__WEBPACK_IMPORTED_MODULE_6__["scopes"].map(function (scope) {
              return scope.value;
            }); // eslint-disable-line no-param-reassign

            return callback(null, true, decoded.payload);
          });
        }
      }

      return callback(null, false);
    }
  });
  server.auth.default('jwt');
  var session = {
    register: auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4__["plugins"].dashboardAdminSession,
    options: {
      stateKey: 'authz-state',
      nonceKey: 'authz-nonce',
      sessionStorageKey: 'authz:apiToken',
      rta: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_RTA').replace('https://', ''),
      domain: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_DOMAIN'),
      scopes: 'read:resource_servers create:resource_servers update:resource_servers delete:resource_servers read:clients read:connections read:rules create:rules update:rules update:rules_configs read:users',
      baseUrl: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('PUBLIC_WT_URL'),
      audience: 'urn:api-authz',
      secret: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('EXTENSION_SECRET'),
      clientName: 'Authorization Extension',
      onLoginSuccess: function onLoginSuccess(decoded, req, callback) {
        if (decoded) {
          decoded.scope = _lib_apiaccess__WEBPACK_IMPORTED_MODULE_6__["scopes"].map(function (scope) {
            return scope.value;
          }); // eslint-disable-line no-param-reassign

          return callback(null, true, decoded);
        }

        return callback(null, false);
      }
    }
  };
  server.register(session, function (err) {
    if (err) {
      next(err);
    }

    next();
  });
};

module.exports.register.attributes = {
  name: 'auth'
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("boom@3.2.2");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("jwks-rsa@1.1.1");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken@7.1.9");

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApi", function() { return getApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createApi", function() { return createApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateApi", function() { return updateApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteApi", function() { return deleteApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scopes", function() { return scopes; });
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);




var apiIdentifier = 'urn:auth0-authz-api';
var allScopes = [{
  value: 'read:users'
}, {
  value: 'read:applications'
}, {
  value: 'read:connections'
}, {
  value: 'read:configuration'
}, {
  value: 'update:configuration'
}, {
  value: 'read:groups'
}, {
  value: 'create:groups'
}, {
  value: 'update:groups'
}, {
  value: 'delete:groups'
}, {
  value: 'read:roles'
}, {
  value: 'create:roles'
}, {
  value: 'update:roles'
}, {
  value: 'delete:roles'
}, {
  value: 'read:permissions'
}, {
  value: 'create:permissions'
}, {
  value: 'update:permissions'
}, {
  value: 'delete:permissions'
}, {
  value: 'read:resource-server'
}, {
  value: 'create:resource-server'
}, {
  value: 'update:resource-server'
}, {
  value: 'delete:resource-server'
}];

var getToken = function getToken(req) {
  var isAdministrator = req.auth && req.auth.credentials && req.auth.credentials.access_token && req.auth.credentials.access_token.length;

  if (isAdministrator) {
    return bluebird__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(req.auth.credentials.access_token);
  }

  return auth0_extension_tools__WEBPACK_IMPORTED_MODULE_2__["managementApi"].getAccessTokenCached(Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('AUTH0_DOMAIN'), Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('AUTH0_CLIENT_ID'), Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('AUTH0_CLIENT_SECRET'));
};

var makeRequest = function makeRequest(req, path, method, payload) {
  return new bluebird__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve, reject) {
    return getToken(req).then(function (token) {
      superagent__WEBPACK_IMPORTED_MODULE_1___default()(method, `https://${Object(_config__WEBPACK_IMPORTED_MODULE_3__["default"])('AUTH0_DOMAIN')}/api/v2/${path}`).send(payload || {}).set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`).end(function (err, res) {
        if (err) {
          return reject(err);
        }

        return resolve(res.body);
      });
    });
  });
};

var getApi = function getApi(req) {
  return makeRequest(req, 'resource-servers', 'GET').then(function (apis) {
    var api = apis.filter(function (item) {
      return item.identifier === apiIdentifier;
    });
    return api[0] || {};
  });
};
var createApi = function createApi(req, lifeTime) {
  var payload = {
    name: 'auth0-authorization-extension-api',
    identifier: apiIdentifier,
    signing_alg: 'RS256',
    scopes: allScopes,
    token_lifetime: lifeTime
  };
  return makeRequest(req, 'resource-servers', 'POST', payload);
};
var updateApi = function updateApi(req, lifeTime) {
  return getApi(req).then(function (api) {
    var defaultLifetimeValue = 86400;

    if (!api.id) {
      return createApi(req, lifeTime || defaultLifetimeValue);
    }

    return makeRequest(req, `resource-servers/${api.id}`, 'PATCH', {
      token_lifetime: lifeTime || defaultLifetimeValue
    });
  });
};
var deleteApi = function deleteApi(req, silent) {
  return getApi(req).then(function (api) {
    if (api.id) {
      return makeRequest(req, `resource-servers/${api.id}`, 'DELETE');
    }

    if (!api.id && !silent) {
      return bluebird__WEBPACK_IMPORTED_MODULE_0___default.a.reject(new Error('Unable to disable resource-server. Is it enabled?'));
    }

    return bluebird__WEBPACK_IMPORTED_MODULE_0___default.a.resolve();
  });
};
var scopes = allScopes;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("superagent@1.2.0");

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname, module) {/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);


module.exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/app/{param*}',
    config: {
      auth: false
    },
    handler: {
      directory: {
        path: path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '../../dist'),
        redirectToSlash: true
      }
    }
  });
  next();
};

module.exports.register.attributes = {
  name: 'assets'
};
/* WEBPACK VAR INJECTION */}.call(this, "/", __webpack_require__(7)(module)))

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_logger__WEBPACK_IMPORTED_MODULE_2__);




var tools = __webpack_require__(3);

var Boom = __webpack_require__(35);

var validateHookToken = function validateHookToken(domain, webtaskUrl, extensionSecret) {
  if (domain === null || domain === undefined) {
    throw new tools.ArgumentError('Must provide the domain');
  }

  if (typeof domain !== 'string' || domain.length === 0) {
    throw new tools.ArgumentError(`The provided domain is invalid: ${domain}`);
  }

  if (webtaskUrl === null || webtaskUrl === undefined) {
    throw new tools.ArgumentError('Must provide the webtaskUrl');
  }

  if (typeof webtaskUrl !== 'string' || webtaskUrl.length === 0) {
    throw new tools.ArgumentError(`The provided webtaskUrl is invalid: ${webtaskUrl}`);
  }

  if (extensionSecret === null || extensionSecret === undefined) {
    throw new tools.ArgumentError('Must provide the extensionSecret');
  }

  if (typeof extensionSecret !== 'string' || extensionSecret.length === 0) {
    throw new tools.ArgumentError(`The provided extensionSecret is invalid: ${extensionSecret}`);
  }

  return function (hookPath) {
    if (hookPath === null || hookPath === undefined) {
      throw new tools.ArgumentError('Must provide the hookPath');
    }

    if (typeof hookPath !== 'string' || hookPath.length === 0) {
      throw new tools.ArgumentError(`The provided hookPath is invalid: ${hookPath}`);
    }

    return {
      method(req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          var token = req.headers.authorization.split(' ')[1];

          try {
            _lib_logger__WEBPACK_IMPORTED_MODULE_2___default.a.info(`Validating hook token with signature: ${extensionSecret.substr(0, 4)}...`);

            if (tools.validateHookToken(domain, webtaskUrl, hookPath, extensionSecret, token)) {
              return res();
            }
          } catch (e) {
            _lib_logger__WEBPACK_IMPORTED_MODULE_2___default.a.error('Invalid token:', token);
            return res(Boom.wrap(e, 401, e.message));
          }
        }

        var err = new tools.HookTokenError(`Hook token missing for the call to: ${hookPath}`);
        return res(Boom.unauthorized(err, 401, err.message));
      }

    };
  };
};

module.exports.register = function (server, options, next) {
  server.decorate('server', 'handlers', {
    managementClient: auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_0__["handlers"].managementApiClient({
      domain: Object(_lib_config__WEBPACK_IMPORTED_MODULE_1__["default"])('AUTH0_DOMAIN'),
      clientId: Object(_lib_config__WEBPACK_IMPORTED_MODULE_1__["default"])('AUTH0_CLIENT_ID'),
      clientSecret: Object(_lib_config__WEBPACK_IMPORTED_MODULE_1__["default"])('AUTH0_CLIENT_SECRET'),
      logger: _lib_logger__WEBPACK_IMPORTED_MODULE_2___default.a.error
    }),
    validateHookToken: validateHookToken(Object(_lib_config__WEBPACK_IMPORTED_MODULE_1__["default"])('AUTH0_DOMAIN'), Object(_lib_config__WEBPACK_IMPORTED_MODULE_1__["default"])('WT_URL'), Object(_lib_config__WEBPACK_IMPORTED_MODULE_1__["default"])('EXTENSION_SECRET'))
  });
  next();
};

module.exports.register.attributes = {
  name: 'handlers'
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname, module) {/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45);
/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ejs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _views_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(46);
/* harmony import */ var _views_index__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_views_index__WEBPACK_IMPORTED_MODULE_6__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }








var assembleHtmlRoute = function assembleHtmlRoute(link) {
  return {
    method: 'GET',
    path: link,
    config: {
      description: 'Render HTML',
      auth: false
    },
    handler: function handler(req, reply) {
      var cfg = {
        AUTH0_DOMAIN: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_DOMAIN'),
        AUTH0_CLIENT_ID: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_CLIENT_ID'),
        BASE_URL: auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4__["urlHelpers"].getBaseUrl(req),
        API_BASE: auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4__["urlHelpers"].getBaseUrl(req),
        BASE_PATH: auth0_extension_hapi_tools__WEBPACK_IMPORTED_MODULE_4__["urlHelpers"].getBasePath(req),
        SEARCH_ENGINE: Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('AUTH0_RTA').replace('https://', '') !== 'auth0.auth0.com' ? 'v2' : 'v3'
      }; // Development.

      if (false) {} // Render from CDN.


      var clientVersion = Object(_lib_config__WEBPACK_IMPORTED_MODULE_5__["default"])('CLIENT_VERSION');

      if (clientVersion) {
        return reply(ejs__WEBPACK_IMPORTED_MODULE_2___default.a.render(_views_index__WEBPACK_IMPORTED_MODULE_6___default.a, {
          config: cfg,
          assets: {
            version: clientVersion
          }
        }));
      } // Render locally.


      return fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFile(path__WEBPACK_IMPORTED_MODULE_3___default.a.join(__dirname, '../../dist/manifest.json'), 'utf8', function (err, data) {
        var locals = {
          config: cfg,
          assets: {
            app: '/app/bundle.js'
          }
        };

        if (!err && data) {
          locals.assets = JSON.parse(data);

          if (locals.assets.app) {
            locals.assets.app = `/app/${locals.assets.app}`;
          }

          if (locals.assets.vendors) {
            locals.assets.vendors = `/app/${locals.assets.vendors}`;
          }

          if (locals.assets.style) {
            locals.assets.style = `/app/${locals.assets.style}`;
          }
        } // Render the HTML page.


        reply(ejs__WEBPACK_IMPORTED_MODULE_2___default.a.render(_views_index__WEBPACK_IMPORTED_MODULE_6___default.a, locals));
      });
    }
  };
};

var clientRoutes = ['/', '/api', '/configuration', '/configuration/rule', '/configuration/api', '/roles', '/roles/{id}', '/groups', '/groups/{id}', '/permissions', '/permissions/{id}', '/users', '/users/{id}', '/import-export'];

module.exports.register = function (server, options, next) {
  clientRoutes.map(function (link) {
    return server.route(assembleHtmlRoute(link));
  });
  next();
};

module.exports.register.attributes = {
  name: 'html'
};
/* WEBPACK VAR INJECTION */}.call(this, "/", __webpack_require__(7)(module)))

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("ejs@2.3.1");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Auth0 - Authorization</title>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/4.8.10/lib/logos/img/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.8.10/index.min.css" />
  <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css">
  <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="<%= assets.style %>"><% } %>
  <% if (assets.version) { %><link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-authz/assets/auth0-authz.ui.<%= assets.version %>.css"><% } %>
</head>
<body>
  <div id="app"></div>
  <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"></script>
  <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;</script>
  <% if (assets.vendors) { %><script type="text/javascript" src="<%= assets.vendors %>"></script><% } %>
  <% if (assets.app) { %><script type="text/javascript" src="<%= assets.app %>"></script><% } %>
  <% if (assets.version) { %>
  <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-authz/assets/auth0-authz.ui.vendors.<%= assets.version %>.js"></script>
  <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-authz/assets/auth0-authz.ui.<%= assets.version %>.js"></script>
  <% } %>
</body>
</html>`;

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


module.exports.register = function (server, options, next) {
  server.route(__webpack_require__(48)(server));
  server.route(__webpack_require__(96)(server));
  server.route(__webpack_require__(97)(server));
  server.route(__webpack_require__(98)(server));
  server.route(__webpack_require__(99)(server));
  server.route(__webpack_require__(100)(server));
  server.route(__webpack_require__(101)(server));
  server.route(__webpack_require__(104)(server));
  server.route(__webpack_require__(108)(server));
  server.route(__webpack_require__(109)(server));
  server.route(__webpack_require__(110)(server));
  server.route(__webpack_require__(111)(server));
  server.route(__webpack_require__(112)(server));
  server.route(__webpack_require__(113)(server));
  server.route(__webpack_require__(114)(server));
  server.route(__webpack_require__(115)(server));
  server.route(__webpack_require__(116)(server));
  server.route(__webpack_require__(117)(server));
  server.route(__webpack_require__(118)(server));
  server.route(__webpack_require__(119)(server));
  server.route(__webpack_require__(121)(server));
  server.route(__webpack_require__(122)(server));
  server.route(__webpack_require__(123)(server));
  server.route(__webpack_require__(124)(server));
  server.route(__webpack_require__(125)(server));
  server.route(__webpack_require__(127)(server));
  server.route(__webpack_require__(128)(server));
  server.route(__webpack_require__(129)(server));
  server.route(__webpack_require__(130)(server));
  server.route(__webpack_require__(131)(server));
  server.route(__webpack_require__(133)(server));
  server.route(__webpack_require__(134)(server));
  server.route(__webpack_require__(135)(server));
  server.route(__webpack_require__(136)(server));
  server.route(__webpack_require__(137)(server));
  server.route(__webpack_require__(138)(server));
  server.route(__webpack_require__(140)(server));
  server.route(__webpack_require__(141)(server));
  server.route(__webpack_require__(142)(server));
  server.route(__webpack_require__(143)(server));
  server.route(__webpack_require__(145)(server));
  server.route(__webpack_require__(149)(server));
  server.route(__webpack_require__(151)(server));
  server.route(__webpack_require__(153)(server));
  server.route(__webpack_require__(154)(server));
  server.route(__webpack_require__(155)(server));
  server.route(__webpack_require__(157)(server));
  server.route(__webpack_require__(158)(server));
  server.route(__webpack_require__(159)(server));
  server.route(__webpack_require__(160)(server));
  server.route(__webpack_require__(161)(server));
  server.route(__webpack_require__(162)(server));
  server.route(__webpack_require__(163)(server));
  server.route(__webpack_require__(164)(server));
  server.route(__webpack_require__(165)(server));
  server.route({
    method: 'GET',
    path: '/admins/login',
    config: {
      auth: false
    },
    handler: function handler(request, reply) {
      return reply('Redirecting to login page...').redirect(`${Object(_lib_config__WEBPACK_IMPORTED_MODULE_0__["default"])('PUBLIC_WT_URL')}/login`);
    }
  });
  next();
};

module.exports.register.attributes = {
  name: 'routes'
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_policy_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);
/* harmony import */ var _lib_queries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);




module.exports = function () {
  return {
    method: 'POST',
    path: '/api/users/{userId}/policy/{clientId}',
    config: {
      auth: {
        strategies: ['jwt', 'extension-secret']
      },
      description: "Execute the authorization policy for a user in the context of a client. This will return the user's groups but also roles and permissions that apply to the current client.",
      tags: ['api'],
      validate: {
        params: {
          userId: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required(),
          clientId: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required()
        },
        payload: _schemas_policy_request__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var _req$params = req.params,
          userId = _req$params.userId,
          clientId = _req$params.clientId;
      var _req$payload = req.payload,
          connectionName = _req$payload.connectionName,
          groups = _req$payload.groups;

      if (req.storage.provider && req.storage.provider.storageContext && req.storage.provider.storageContext.read) {
        return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_2__["getUserData"])(req.storage, userId, clientId, connectionName, groups).then(function (data) {
          return reply(data);
        }).catch(function (err) {
          return reply.error(err);
        });
      }

      return reply.error(new Error('Storage error.'));
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("joi@9.0.4");

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  connectionName: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required(),
  groups: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string())
}));

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionsCached", function() { return getConnectionsCached; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPermissionsCached", function() { return getPermissionsCached; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRolesCached", function() { return getRolesCached; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGroupsCached", function() { return getGroupsCached; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMappingsWithNames", function() { return getMappingsWithNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChildGroups", function() { return getChildGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParentGroups", function() { return getParentGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRolesForGroups", function() { return getRolesForGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRolesForUser", function() { return getRolesForUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPermissionsForRoles", function() { return getPermissionsForRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPermissionsByRoles", function() { return getPermissionsByRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMembers", function() { return getMembers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDynamicUserGroups", function() { return getDynamicUserGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserGroups", function() { return getUserGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGroupExpanded", function() { return getGroupExpanded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGroupsExpanded", function() { return getGroupsExpanded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserData", function() { return getUserData; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nconf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);
/* harmony import */ var nconf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nconf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lru_memoizer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93);
/* harmony import */ var lru_memoizer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lru_memoizer__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _multipartRequest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var avoidBlock = function avoidBlock(action) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new bluebird__WEBPACK_IMPORTED_MODULE_4___default.a(function (resolve, reject) {
      setImmediate(function () {
        try {
          resolve(action.apply(void 0, args));
        } catch (e) {
          reject(e);
        }
      });
    });
  };
};

var compact = function compact(entity) {
  return {
    _id: entity._id,
    name: entity.name,
    description: entity.description
  };
};
/*
 * Cache connections.
 */


var getConnectionsCached = lru_memoizer__WEBPACK_IMPORTED_MODULE_5___default()({
  load: function load(auth0, callback) {
    Object(_multipartRequest__WEBPACK_IMPORTED_MODULE_6__["default"])(auth0, 'connections', {
      fields: 'id,name,strategy'
    }).then(function (connections) {
      return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.chain(connections).sortBy(function (conn) {
        return conn.name.toLowerCase();
      }).value();
    }).then(function (connections) {
      return callback(null, connections);
    }).catch(function (err) {
      return callback(err);
    });
  },
  hash: function hash(auth0) {
    return auth0.hash || 'connections';
  },
  max: 100,
  maxAge: nconf__WEBPACK_IMPORTED_MODULE_3___default.a.get('DATA_CACHE_MAX_AGE')
});
/*
 * Cache permissions.
 */

var getPermissionsCached = lru_memoizer__WEBPACK_IMPORTED_MODULE_5___default()({
  load: function load(db, callback) {
    db.getPermissions().then(function (permissions) {
      callback(null, permissions);
    }).catch(function (err) {
      return callback(err);
    });
  },
  hash: function hash(db) {
    return db.hash || 'permissions';
  },
  max: 100,
  maxAge: nconf__WEBPACK_IMPORTED_MODULE_3___default.a.get('DATA_CACHE_MAX_AGE')
});
/*
 * Cache roles.
 */

var getRolesCached = lru_memoizer__WEBPACK_IMPORTED_MODULE_5___default()({
  load: function load(db, callback) {
    db.getRoles().then(function (roles) {
      callback(null, roles);
    }).catch(function (err) {
      return callback(err);
    });
  },
  hash: function hash(db) {
    return db.hash || 'roles';
  },
  max: 100,
  maxAge: nconf__WEBPACK_IMPORTED_MODULE_3___default.a.get('DATA_CACHE_MAX_AGE')
});
/*
 * Cache groups.
 */

var getGroupsCached = lru_memoizer__WEBPACK_IMPORTED_MODULE_5___default()({
  load: function load(db, callback) {
    db.getGroups().then(function (groups) {
      callback(null, groups);
    }).catch(function (err) {
      return callback(err);
    });
  },
  hash: function hash(db) {
    return db.hash || 'groups';
  },
  max: 100,
  maxAge: nconf__WEBPACK_IMPORTED_MODULE_3___default.a.get('DATA_CACHE_MAX_AGE')
});
/*
 * Get the full connection names for all mappings.
 */

var getMappingsWithNames = function getMappingsWithNames(auth0, groupMappings) {
  return new bluebird__WEBPACK_IMPORTED_MODULE_4___default.a(function (resolve, reject) {
    getConnectionsCached(auth0, function (err, connections) {
      if (err) {
        return reject(err);
      }

      var mappings = [];
      groupMappings.forEach(function (m) {
        var connection = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.find(connections, {
          name: m.connectionName
        });

        if (connection) {
          var currentMapping = m;
          currentMapping.connectionName = `${connection.name} (${connection.strategy})`;
          mappings.push(currentMapping);
        }
      });
      return resolve(mappings);
    });
  });
};
/*
 * Resolve all child groups.
 */

var getChildGroups = function getChildGroups(groups, selectedGroups) {
  var groupsFlat = []; // Recursive method to find roles.

  var findGroups = function findGroups(groupId) {
    // Only process each role once.
    if (groupsFlat.indexOf(groupId) === -1) {
      groupsFlat.push(groupId); // Process the child groups.

      var group = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.find(groups, {
        _id: groupId
      });

      if (group && group.nested) {
        lodash__WEBPACK_IMPORTED_MODULE_2___default.a.forEach(group.nested, function (nestedId) {
          findGroups(nestedId);
        });
      }
    }
  }; // Process the user's groups.


  selectedGroups.forEach(function (g) {
    return findGroups(g._id);
  }); // Return the groups.

  return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(groups, function (g) {
    return groupsFlat.indexOf(g._id) > -1;
  });
};
/*
 * Resolve all parent groups.
 */

var getParentGroups = function getParentGroups(groups, selectedGroups) {
  var groupsFlat = []; // Recursive method to find roles.

  var findGroups = function findGroups(groupId) {
    // Only process each role once.
    if (groupsFlat.indexOf(groupId) === -1) {
      groupsFlat.push(groupId); // Process the parent groups.

      var parentGroups = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(groups, function (group) {
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(group.nested || [], groupId);
      });

      parentGroups.forEach(function (g) {
        return findGroups(g._id);
      });
    }
  }; // Process the user's groups.


  selectedGroups.forEach(function (g) {
    return findGroups(g._id);
  }); // Return the groups.

  return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(groups, function (g) {
    return groupsFlat.indexOf(g._id) > -1;
  });
};
/*
 * Resolve all roles for a list of groups.
 */

var getRolesForGroups = function getRolesForGroups(selectedGroups, selectedRoles) {
  var result = [];
  var groups = {};
  selectedGroups.forEach(function (group) {
    if (group.roles) {
      group.roles.forEach(function (role) {
        if (!groups[role]) {
          groups[role] = group;
        }
      });
    }
  });
  selectedRoles.forEach(function (role) {
    if (groups[role._id]) {
      // eslint-disable-line no-underscore-dangle
      result.push({
        role,
        group: groups[role._id]
      }); // eslint-disable-line no-underscore-dangle
    }
  });
  return result;
};
/*
 * Get all roles for a user.
 */

var getRolesForUser = function getRolesForUser(database, userId) {
  return database.getGroups().then(function (groups) {
    // get all groups user belong to
    var userGroups = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(groups, function (group) {
      return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(group.members, userId);
    });

    return getParentGroups(groups, userGroups).filter(function (group) {
      return group.roles && group.roles.length;
    }).map(function (group) {
      return group.roles;
    }); // return roles for user's groups and their parents
  }).then(function (roles) {
    return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.uniq(lodash__WEBPACK_IMPORTED_MODULE_2___default.a.flattenDeep(roles));
  }).then(function (roleIds) {
    return database.getRoles().then(function (roles) {
      var groupRoles = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(roles, function (role) {
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(roleIds, role._id);
      });

      var userRoles = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(roles, function (role) {
        return role.users && lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(role.users, userId);
      });

      return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.uniq([].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(groupRoles), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(userRoles)), '_id');
    });
  });
};
/*
 * Get all permissions for list of roles.
 */

var getPermissionsForRoles = function getPermissionsForRoles(database, userRoles) {
  return database.getPermissions().then(function (permissions) {
    var permIds = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.flattenDeep(lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(userRoles, function (role) {
      return role.permissions;
    }));

    return permissions.filter(function (permission) {
      return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(permIds, permission._id);
    });
  });
};
/*
 * Get all permissions for list of roles, grouped by role.
 */

var getPermissionsByRoles = function getPermissionsByRoles(database, roles) {
  return new bluebird__WEBPACK_IMPORTED_MODULE_4___default.a(function (resolve, reject) {
    getPermissionsCached(database, function (err, permissions) {
      if (err) {
        return reject(err);
      }

      var rolesList = [];

      lodash__WEBPACK_IMPORTED_MODULE_2___default.a.forEach(roles, function (role) {
        var rolePermissions = permissions.filter(function (permission) {
          return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(role.permissions, permission._id);
        });
        rolesList.push(_objectSpread(_objectSpread({}, role), {}, {
          permissions: lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(rolePermissions, function (permission) {
            return {
              _id: permission._id,
              name: permission.name,
              description: permission.description
            };
          })
        }));
      });

      return resolve(rolesList);
    });
  });
};
/*
 * Resolve all users for a list of groups.
 */

var getMembers = function getMembers(selectedGroups) {
  var users = {}; // Process the user's groups.

  selectedGroups.forEach(function (g) {
    if (g.members) {
      g.members.forEach(function (m) {
        if (!users[m]) {
          users[m] = g;
        }
      });
    }
  }); // Return the users.

  return Object.keys(users).map(function (userId) {
    return {
      userId,
      group: users[userId]
    };
  });
};
/*
 * Match a connection/group memberships to a mapping.
 */

var matchMapping = function matchMapping(mapping, connectionName, groupMemberships) {
  return mapping.connectionName === connectionName && groupMemberships.indexOf(mapping.groupName) > -1;
};
/*
 * Match a connection/group memberships to multiple mappings.
 */


var matchMappings = function matchMappings(mappings, connectionName, groupMemberships) {
  return mappings && lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(mappings, function (mapping) {
    return matchMapping(mapping, connectionName, groupMemberships);
  }).length > 0;
};
/*
 * Calculate dynamic group memberships.
 */


function getDynamicUserGroups(db, connectionName, groupMemberships, allGroups) {
  return new bluebird__WEBPACK_IMPORTED_MODULE_4___default.a(function (resolve, reject) {
    if (!connectionName) {
      return resolve([]);
    }

    if (!groupMemberships || groupMemberships.length === 0) {
      return resolve([]);
    }

    var getGroups = function getGroups(cb) {
      if (allGroups && allGroups.length) {
        return cb(null, allGroups);
      }

      return getGroupsCached(db, cb);
    };

    return getGroups(function (err, groups) {
      if (err) {
        return reject(err);
      }

      var dynamicGroups = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(groups, function (group) {
        return matchMappings(group.mappings, connectionName, groupMemberships);
      });

      return resolve(dynamicGroups);
    });
  });
}
/*
 * Get the groups a user belongs to.
 */

function getUserGroups(db, userId, connectionName, groupMemberships) {
  if (!Array.isArray(groupMemberships) || groupMemberships === undefined || groupMemberships === null) {
    groupMemberships = [];
  }

  return new bluebird__WEBPACK_IMPORTED_MODULE_4___default.a(function (resolve, reject) {
    getGroupsCached(db, function (err, groups) {
      if (err) {
        return reject(err);
      } // Get the direct groups memberships of a user.


      var userGroups = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(groups, function (group) {
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(group.members, userId);
      }); // Calculate the dynamic user groups based on external and internal group memberships.


      return getDynamicUserGroups(db, connectionName, [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(groupMemberships), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(userGroups.map(function (g) {
        return g.name;
      }))), groups).then(function (dynamicGroups) {
        var nestedGroups = getParentGroups(groups, lodash__WEBPACK_IMPORTED_MODULE_2___default.a.union(userGroups, dynamicGroups));
        return resolve(nestedGroups);
      }).catch(reject);
    });
  });
}
/*
 * Get expanded group data
 */

function getGroupExpanded(db, groupId) {
  return new bluebird__WEBPACK_IMPORTED_MODULE_4___default.a(function (resolve, reject) {
    getGroupsCached(db, function (error, groups) {
      if (error) {
        return reject(error);
      }

      return getRolesCached(db, function (err, allRoles) {
        if (err) {
          return reject(err);
        }

        var currentGroup = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.find(groups, {
          _id: groupId
        });

        var parentGroups = getParentGroups(groups, [currentGroup]).filter(function (g) {
          return g._id !== currentGroup._id;
        });
        var roles = getRolesForGroups([currentGroup].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(parentGroups)), allRoles).map(function (r) {
          return r.role;
        });

        var formatRole = function formatRole(r) {
          return {
            _id: r._id,
            name: r.name,
            description: r.description,
            applicationId: r.applicationId,
            applicationType: r.applicationType,
            permissions: r.permissions && r.permissions.map(compact)
          };
        };

        return getPermissionsByRoles(db, roles).then(function (rolesList) {
          return resolve({
            _id: currentGroup._id,
            name: currentGroup.name,
            description: currentGroup.description,
            roles: rolesList.map(formatRole)
          });
        });
      });
    });
  });
}
/*
 * Get expanded group data
 */

function getGroupsExpanded(db, groups) {
  return new bluebird__WEBPACK_IMPORTED_MODULE_4___default.a(function (resolve, reject) {
    getGroupsCached(db, function (error, allGroups) {
      if (error) {
        return reject(error);
      }

      return getRolesCached(db, function (err, allRoles) {
        if (err) {
          return reject(err);
        }

        var groupsWithParents = getParentGroups(allGroups, groups);
        var roles = getRolesForGroups(groupsWithParents, allRoles).map(function (r) {
          return r.role;
        });

        var formatRole = function formatRole(r) {
          return {
            _id: r._id,
            name: r.name,
            description: r.description,
            applicationId: r.applicationId,
            applicationType: r.applicationType,
            permissions: r.permissions && r.permissions.map(compact)
          };
        };

        return getPermissionsByRoles(db, roles).then(function (rolesList) {
          return resolve({
            groups: groupsWithParents.map(compact),
            roles: rolesList.map(formatRole)
          });
        });
      });
    });
  });
}
/*
 * Get all user's groups, roles and permissions
 */

function getUserData(db, userId, clientId, connectionName, groupMemberships) {
  var result = {
    groups: [],
    roles: []
  };
  return db.provider.storageContext.read().then(function (data) {
    var _data$groups = data.groups,
        groups = _data$groups === void 0 ? [] : _data$groups,
        _data$roles = data.roles,
        roles = _data$roles === void 0 ? [] : _data$roles,
        _data$permissions = data.permissions,
        permissions = _data$permissions === void 0 ? [] : _data$permissions;

    var userGroups = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(groups, function (group) {
      return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(group.members, userId);
    });

    if (!Array.isArray(groupMemberships)) {
      groupMemberships = [];
    }

    return avoidBlock(getDynamicUserGroups)(db, connectionName, [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(groupMemberships), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(userGroups.map(function (g) {
      return g.name;
    }))), groups).then(avoidBlock(function (dynamicGroups) {
      var parentGroups = getParentGroups(groups, lodash__WEBPACK_IMPORTED_MODULE_2___default.a.union(userGroups, dynamicGroups));
      result.groups = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.uniq(parentGroups.map(function (group) {
        return group.name;
      }));
      return parentGroups;
    })).then(avoidBlock(function (allUserGroups) {
      var clearRoles = getRolesForGroups(allUserGroups, roles).map(function (record) {
        return record.role;
      });
      var directRoles = roles.filter(function (role) {
        return role.users && role.users.indexOf(userId) > -1;
      });
      var userRoles = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(clearRoles), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(directRoles));
      var relevantRoles = userRoles.filter(function (role) {
        return role.applicationId === clientId;
      });
      result.roles = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.uniq(relevantRoles.map(function (role) {
        return role.name;
      }));
      return relevantRoles;
    })).then(avoidBlock(function (relevantRoles) {
      var permIds = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.flattenDeep(lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(relevantRoles, function (role) {
        return role.permissions;
      }));

      var userPermissions = permissions.filter(function (permission) {
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(permIds, permission._id);
      });
      result.permissions = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.uniq(userPermissions.map(function (permission) {
        return permission.name;
      }));
      return result;
    }));
  });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * nconf.js: Top-level include for the nconf module
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var async = __webpack_require__(53),
    common = __webpack_require__(54),
    Provider = __webpack_require__(58).Provider;

//
// `nconf` is by default an instance of `nconf.Provider`.
//
var nconf = module.exports = new Provider();

//
// Expose the version from the package.json
//
nconf.version = __webpack_require__(59).version;

//
// Setup all stores as lazy-loaded getters.
//
['argv', 'env', 'file', 'literal', 'memory'].forEach(function (store) {
    var name = common.capitalize(store);

    nconf.__defineGetter__(name, function () {
        return __webpack_require__(60)("./" + store)[name];
    });
});

//
// Expose the various components included with nconf
//
nconf.key           = common.key;
nconf.path          = common.path;
nconf.loadFiles     = common.loadFiles;
nconf.loadFilesSync = common.loadFilesSync;
nconf.formats       = __webpack_require__(55);
nconf.Provider      = Provider;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("async@2.1.2");

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * utils.js: Utility functions for the nconf module.
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var fs = __webpack_require__(44),
    async = __webpack_require__(53),
    formats = __webpack_require__(55),
    Memory = __webpack_require__(57).Memory;

var common = exports;

//
// ### function path (key)
// #### @key {string} The ':' delimited key to split
// Returns a fully-qualified path to a nested nconf key.
// If given null or undefined it should return an empty path.
// '' should still be respected as a path.
//
common.path = function (key, separator) {
  separator = separator || ':';
  return key == null ? [] : key.split(separator);
};

//
// ### function key (arguments)
// Returns a `:` joined string from the `arguments`.
//
common.key = function () {
  return Array.prototype.slice.call(arguments).join(':');
};

//
// ### function key (arguments)
// Returns a joined string from the `arguments`,
// first argument is the join delimiter.
//
common.keyed = function () {
  return Array.prototype.slice.call(arguments, 1).join(arguments[0]);
};

//
// ### function loadFiles (files, callback)
// #### @files {Object|Array} List of files (or settings object) to load.
// #### @callback {function} Continuation to respond to when complete.
// Loads all the data in the specified `files`.
//
common.loadFiles = function (files, callback) {
  if (!files) {
    return callback(null, {});
  }

  var options = Array.isArray(files) ? { files: files } : files;

  //
  // Set the default JSON format if not already
  // specified
  //
  options.format = options.format || formats.json;

  function parseFile (file, next) {
    fs.readFile(file, function (err, data) {
      return !err
        ? next(null, options.format.parse(data.toString()))
        : next(err);
    });
  }

  async.map(options.files, parseFile, function (err, objs) {
    return err ? callback(err) : callback(null, common.merge(objs));
  });
};

//
// ### function loadFilesSync (files)
// #### @files {Object|Array} List of files (or settings object) to load.
// Loads all the data in the specified `files` synchronously.
//
common.loadFilesSync = function (files) {
  if (!files) {
    return;
  }

  //
  // Set the default JSON format if not already
  // specified
  //
  var options = Array.isArray(files) ? { files: files } : files;
  options.format = options.format || formats.json;

  return common.merge(options.files.map(function (file) {
    return options.format.parse(fs.readFileSync(file, 'utf8'));
  }));
};

//
// ### function merge (objs)
// #### @objs {Array} Array of object literals to merge
// Merges the specified `objs` using a temporary instance
// of `stores.Memory`.
//
common.merge = function (objs) {
  var store = new Memory();

  objs.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      store.merge(key, obj[key]);
    });
  });

  return store.store;
};

//
// ### function capitalize (str)
// #### @str {string} String to capitalize
// Capitalizes the specified `str`.
//
common.capitalize = function (str) {
  return str && str[0].toUpperCase() + str.slice(1);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * formats.js: Default formats supported by nconf
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var ini = __webpack_require__(56);

var formats = exports;

//
// ### @json
// Standard JSON format which pretty prints `.stringify()`.
//
formats.json = {
  stringify: function (obj, replacer, spacing) {
    return JSON.stringify(obj, replacer || null, spacing || 2)
  },
  parse: JSON.parse
};

//
// ### @ini
// Standard INI format supplied from the `ini` module
// http://en.wikipedia.org/wiki/INI_file
//
formats.ini = ini;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

exports.parse = exports.decode = decode

exports.stringify = exports.encode = encode

exports.safe = safe
exports.unsafe = unsafe

var eol = typeof process !== 'undefined' &&
  process.platform === 'win32' ? '\r\n' : '\n'

function encode (obj, opt) {
  var children = []
  var out = ''

  if (typeof opt === 'string') {
    opt = {
      section: opt,
      whitespace: false
    }
  } else {
    opt = opt || {}
    opt.whitespace = opt.whitespace === true
  }

  var separator = opt.whitespace ? ' = ' : '='

  Object.keys(obj).forEach(function (k, _, __) {
    var val = obj[k]
    if (val && Array.isArray(val)) {
      val.forEach(function (item) {
        out += safe(k + '[]') + separator + safe(item) + '\n'
      })
    } else if (val && typeof val === 'object') {
      children.push(k)
    } else {
      out += safe(k) + separator + safe(val) + eol
    }
  })

  if (opt.section && out.length) {
    out = '[' + safe(opt.section) + ']' + eol + out
  }

  children.forEach(function (k, _, __) {
    var nk = dotSplit(k).join('\\.')
    var section = (opt.section ? opt.section + '.' : '') + nk
    var child = encode(obj[k], {
      section: section,
      whitespace: opt.whitespace
    })
    if (out.length && child.length) {
      out += eol
    }
    out += child
  })

  return out
}

function dotSplit (str) {
  return str.replace(/\1/g, '\u0002LITERAL\\1LITERAL\u0002')
    .replace(/\\\./g, '\u0001')
    .split(/\./).map(function (part) {
      return part.replace(/\1/g, '\\.')
      .replace(/\2LITERAL\\1LITERAL\2/g, '\u0001')
    })
}

function decode (str) {
  var out = {}
  var p = out
  var section = null
  //          section     |key      = value
  var re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i
  var lines = str.split(/[\r\n]+/g)

  lines.forEach(function (line, _, __) {
    if (!line || line.match(/^\s*[;#]/)) return
    var match = line.match(re)
    if (!match) return
    if (match[1] !== undefined) {
      section = unsafe(match[1])
      p = out[section] = out[section] || {}
      return
    }
    var key = unsafe(match[2])
    var value = match[3] ? unsafe(match[4]) : true
    switch (value) {
      case 'true':
      case 'false':
      case 'null': value = JSON.parse(value)
    }

    // Convert keys with '[]' suffix to an array
    if (key.length > 2 && key.slice(-2) === '[]') {
      key = key.substring(0, key.length - 2)
      if (!p[key]) {
        p[key] = []
      } else if (!Array.isArray(p[key])) {
        p[key] = [p[key]]
      }
    }

    // safeguard against resetting a previously defined
    // array by accidentally forgetting the brackets
    if (Array.isArray(p[key])) {
      p[key].push(value)
    } else {
      p[key] = value
    }
  })

  // {a:{y:1},"a.b":{x:2}} --> {a:{y:1,b:{x:2}}}
  // use a filter to return the keys that have to be deleted.
  Object.keys(out).filter(function (k, _, __) {
    if (!out[k] ||
      typeof out[k] !== 'object' ||
      Array.isArray(out[k])) {
      return false
    }
    // see if the parent section is also an object.
    // if so, add it to that, and mark this one for deletion
    var parts = dotSplit(k)
    var p = out
    var l = parts.pop()
    var nl = l.replace(/\\\./g, '.')
    parts.forEach(function (part, _, __) {
      if (!p[part] || typeof p[part] !== 'object') p[part] = {}
      p = p[part]
    })
    if (p === out && nl === l) {
      return false
    }
    p[nl] = out[k]
    return true
  }).forEach(function (del, _, __) {
    delete out[del]
  })

  return out
}

function isQuoted (val) {
  return (val.charAt(0) === '"' && val.slice(-1) === '"') ||
    (val.charAt(0) === "'" && val.slice(-1) === "'")
}

function safe (val) {
  return (typeof val !== 'string' ||
    val.match(/[=\r\n]/) ||
    val.match(/^\[/) ||
    (val.length > 1 &&
     isQuoted(val)) ||
    val !== val.trim())
      ? JSON.stringify(val)
      : val.replace(/;/g, '\\;').replace(/#/g, '\\#')
}

function unsafe (val, doUnesc) {
  val = (val || '').trim()
  if (isQuoted(val)) {
    // remove the single quotes before calling JSON.parse
    if (val.charAt(0) === "'") {
      val = val.substr(1, val.length - 2)
    }
    try { val = JSON.parse(val) } catch (_) {}
  } else {
    // walk the val to find the first not-escaped ; character
    var esc = false
    var unesc = ''
    for (var i = 0, l = val.length; i < l; i++) {
      var c = val.charAt(i)
      if (esc) {
        if ('\\;#'.indexOf(c) !== -1) {
          unesc += c
        } else {
          unesc += '\\' + c
        }
        esc = false
      } else if (';#'.indexOf(c) !== -1) {
        break
      } else if (c === '\\') {
        esc = true
      } else {
        unesc += c
      }
    }
    if (esc) {
      unesc += '\\'
    }
    return unesc.trim()
  }
  return val
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * memory.js: Simple memory storage engine for nconf configuration(s)
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var common = __webpack_require__(54);

//
// ### function Memory (options)
// #### @options {Object} Options for this instance
// Constructor function for the Memory nconf store which maintains
// a nested json structure based on key delimiters `:`.
//
// e.g. `my:nested:key` ==> `{ my: { nested: { key: } } }`
//
var Memory = exports.Memory = function (options) {
  options       = options || {};
  this.type     = 'memory';
  this.store    = {};
  this.mtimes   = {};
  this.readOnly = false;
  this.loadFrom = options.loadFrom || null;
  this.logicalSeparator = options.logicalSeparator || ':';

  if (this.loadFrom) {
    this.store = common.loadFilesSync(this.loadFrom);
  }
};

//
// ### function get (key)
// #### @key {string} Key to retrieve for this instance.
// Retrieves the value for the specified key (if any).
//
Memory.prototype.get = function (key) {
  var target = this.store,
      path   = common.path(key, this.logicalSeparator);

  //
  // Scope into the object to get the appropriate nested context
  //
  while (path.length > 0) {
    key = path.shift();
    if (target && target.hasOwnProperty(key)) {
      target = target[key];
      continue;
    }
    return undefined;
  }

  return target;
};

//
// ### function set (key, value)
// #### @key {string} Key to set in this instance
// #### @value {literal|Object} Value for the specified key
// Sets the `value` for the specified `key` in this instance.
//
Memory.prototype.set = function (key, value) {
  if (this.readOnly) {
    return false;
  }

  var target = this.store,
      path   = common.path(key, this.logicalSeparator);

  if (path.length === 0) {
    //
    // Root must be an object
    //
    if (!value || typeof value !== 'object') {
      return false;
    }
    else {
      this.reset();
      this.store = value;
      return true;
    }
  }

  //
  // Update the `mtime` (modified time) of the key
  //
  this.mtimes[key] = Date.now();

  //
  // Scope into the object to get the appropriate nested context
  //
  while (path.length > 1) {
    key = path.shift();
    if (!target[key] || typeof target[key] !== 'object') {
      target[key] = {};
    }

    target = target[key];
  }

  // Set the specified value in the nested JSON structure
  key = path.shift();
  target[key] = value;
  return true;
};

//
// ### function clear (key)
// #### @key {string} Key to remove from this instance
// Removes the value for the specified `key` from this instance.
//
Memory.prototype.clear = function (key) {
  if (this.readOnly) {
    return false;
  }

  var target = this.store,
      value  = target,
      path   = common.path(key, this.logicalSeparator);

  //
  // Remove the key from the set of `mtimes` (modified times)
  //
  delete this.mtimes[key];

  //
  // Scope into the object to get the appropriate nested context
  //
  for (var i = 0; i < path.length - 1; i++) {
    key = path[i];
    value = target[key];
    if (typeof value !== 'function' && typeof value !== 'object') {
      return false;
    }
    target = value;
  }

  // Delete the key from the nested JSON structure
  key = path[i];
  delete target[key];
  return true;
};

//
// ### function merge (key, value)
// #### @key {string} Key to merge the value into
// #### @value {literal|Object} Value to merge into the key
// Merges the properties in `value` into the existing object value
// at `key`. If the existing value `key` is not an Object, it will be
// completely overwritten.
//
Memory.prototype.merge = function (key, value) {
  if (this.readOnly) {
    return false;
  }

  //
  // If the key is not an `Object` or is an `Array`,
  // then simply set it. Merging is for Objects.
  //
  if (typeof value !== 'object' || Array.isArray(value) || value === null) {
    return this.set(key, value);
  }

  var self    = this,
      target  = this.store,
      path    = common.path(key, this.logicalSeparator),
      fullKey = key;

  //
  // Update the `mtime` (modified time) of the key
  //
  this.mtimes[key] = Date.now();

  //
  // Scope into the object to get the appropriate nested context
  //
  while (path.length > 1) {
    key = path.shift();
    if (!target[key]) {
      target[key] = {};
    }

    target = target[key];
  }

  // Set the specified value in the nested JSON structure
  key = path.shift();

  //
  // If the current value at the key target is not an `Object`,
  // or is an `Array` then simply override it because the new value
  // is an Object.
  //
  if (typeof target[key] !== 'object' || Array.isArray(target[key])) {
    target[key] = value;
    return true;
  }

  return Object.keys(value).every(function (nested) {
    return self.merge(common.keyed(self.logicalSeparator, fullKey, nested), value[nested]);
  });
};

//
// ### function reset (callback)
// Clears all keys associated with this instance.
//
Memory.prototype.reset = function () {
  if (this.readOnly) {
    return false;
  }

  this.mtimes = {};
  this.store  = {};
  return true;
};

//
// ### function loadSync
// Returns the store managed by this instance
//
Memory.prototype.loadSync = function () {
  return this.store || {};
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * provider.js: Abstraction providing an interface into pluggable configuration storage.
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var async = __webpack_require__(53),
    common = __webpack_require__(54);

//
// ### function Provider (options)
// #### @options {Object} Options for this instance.
// Constructor function for the Provider object responsible
// for exposing the pluggable storage features of `nconf`.
//
var Provider = exports.Provider = function (options) {
  //
  // Setup default options for working with `stores`,
  // `overrides`, `process.env` and `process.argv`.
  //
  options       = options || {};
  this.stores  = {};
  this.sources = [];
  this.init(options);
};

//
// Define wrapper functions for using basic stores
// in this instance
//

['argv', 'env'].forEach(function (type) {
  Provider.prototype[type] = function () {
    var args = [type].concat(Array.prototype.slice.call(arguments));
    return this.add.apply(this, args);
  };
});

//
// ### function file (key, options)
// #### @key {string|Object} Fully qualified options, name of file store, or path.
// #### @path {string|Object} **Optional** Full qualified options, or path.
// Adds a new `File` store to this instance. Accepts the following options
//
//    nconf.file({ file: '.jitsuconf', dir: process.env.HOME, search: true });
//    nconf.file('path/to/config/file');
//    nconf.file('userconfig', 'path/to/config/file');
//    nconf.file('userconfig', { file: '.jitsuconf', search: true });
//
Provider.prototype.file = function (key, options) {
  if (arguments.length == 1) {
    options = typeof key === 'string' ? { file: key } : key;
    key = 'file';
  }
  else {
    options = typeof options === 'string'
      ? { file: options }
      : options;
  }

  options.type = 'file';
  return this.add(key, options);
};

//
// Define wrapper functions for using
// overrides and defaults
//
['defaults', 'overrides'].forEach(function (type) {
  Provider.prototype[type] = function (options) {
    options = options || {};
    if (!options.type) {
      options.type = 'literal';
    }

    return this.add(type, options);
  };
});

//
// ### function use (name, options)
// #### @type {string} Type of the nconf store to use.
// #### @options {Object} Options for the store instance.
// Adds (or replaces) a new store with the specified `name`
// and `options`. If `options.type` is not set, then `name`
// will be used instead:
//
//    provider.use('file');
//    provider.use('file', { type: 'file', filename: '/path/to/userconf' })
//
Provider.prototype.use = function (name, options) {
  options  = options      || {};
  var type = options.type || name;

  function sameOptions (store) {
    return Object.keys(options).every(function (key) {
      return options[key] === store[key];
    });
  }

  var store = this.stores[name],
      update = store && !sameOptions(store);

  if (!store || update) {
    if (update) {
      this.remove(name);
    }

    this.add(name, options);
  }

  return this;
};

//
// ### function add (name, options)
// #### @name {string} Name of the store to add to this instance
// #### @options {Object} Options for the store to create
// Adds a new store with the specified `name` and `options`. If `options.type`
// is not set, then `name` will be used instead:
//
//    provider.add('memory');
//    provider.add('userconf', { type: 'file', filename: '/path/to/userconf' })
//
Provider.prototype.add = function (name, options, usage) {
  options  = options      || {};
  var type = options.type || name;

  if (!__webpack_require__(52)[common.capitalize(type)]) {
    throw new Error('Cannot add store with unknown type: ' + type);
  }

  this.stores[name] = this.create(type, options, usage);

  if (this.stores[name].loadSync) {
    this.stores[name].loadSync();
  }

  return this;
};

//
// ### function remove (name)
// #### @name {string} Name of the store to remove from this instance
// Removes a store with the specified `name` from this instance. Users
// are allowed to pass in a type argument (e.g. `memory`) as name if
// this was used in the call to `.add()`.
//
Provider.prototype.remove = function (name) {
  delete this.stores[name];
  return this;
};

//
// ### function create (type, options)
// #### @type {string} Type of the nconf store to use.
// #### @options {Object} Options for the store instance.
// Creates a store of the specified `type` using the
// specified `options`.
//
Provider.prototype.create = function (type, options, usage) {
  return new (__webpack_require__(52)[common.capitalize(type.toLowerCase())])(options, usage);
};

//
// ### function init (options)
// #### @options {Object} Options to initialize this instance with.
// Initializes this instance with additional `stores` or `sources` in the
// `options` supplied.
//
Provider.prototype.init = function (options) {
  var self = this;

  //
  // Add any stores passed in through the options
  // to this instance.
  //
  if (options.type) {
    this.add(options.type, options);
  }
  else if (options.store) {
    this.add(options.store.name || options.store.type, options.store);
  }
  else if (options.stores) {
    Object.keys(options.stores).forEach(function (name) {
      var store = options.stores[name];
      self.add(store.name || name || store.type, store);
    });
  }

  //
  // Add any read-only sources to this instance
  //
  if (options.source) {
    this.sources.push(this.create(options.source.type || options.source.name, options.source));
  }
  else if (options.sources) {
    Object.keys(options.sources).forEach(function (name) {
      var source = options.sources[name];
      self.sources.push(self.create(source.type || source.name || name, source));
    });
  }
};

//
// ### function get (key, callback)
// #### @key {string} Key to retrieve for this instance.
// #### @callback {function} **Optional** Continuation to respond to when complete.
// Retrieves the value for the specified key (if any).
//
Provider.prototype.get = function (key, callback) {
  if (typeof key === 'function') {
    // Allow a * key call to be made
    callback = key;
    key = null;
  }

  //
  // If there is no callback we can short-circuit into the default
  // logic for traversing stores.
  //
  if (!callback) {
    return this._execute('get', 1, key, callback);
  }

  //
  // Otherwise the asynchronous, hierarchical `get` is
  // slightly more complicated because we do not need to traverse
  // the entire set of stores, but up until there is a defined value.
  //
  var current = 0,
      names = Object.keys(this.stores),
      self = this,
      response,
      mergeObjs = [];

  async.whilst(function () {
    return typeof response === 'undefined' && current < names.length;
  }, function (next) {
    var store = self.stores[names[current]];
    current++;

    if (store.get.length >= 2) {
      return store.get(key, function (err, value) {
        if (err) {
          return next(err);
        }

        response = value;

        // Merge objects if necessary
        if (response && typeof response === 'object' && !Array.isArray(response)) {
          mergeObjs.push(response);
          response = undefined;
        }

        next();
      });
    }

    response = store.get(key);

    // Merge objects if necessary
    if (response && typeof response === 'object' && !Array.isArray(response)) {
      mergeObjs.push(response);
      response = undefined;
    }

    next();
  }, function (err) {
    if (!err && mergeObjs.length) {
      response = common.merge(mergeObjs.reverse());
    }
    return err ? callback(err) : callback(null, response);
  });
};

//
// ### function set (key, value, callback)
// #### @key {string} Key to set in this instance
// #### @value {literal|Object} Value for the specified key
// #### @callback {function} **Optional** Continuation to respond to when complete.
// Sets the `value` for the specified `key` in this instance.
//
Provider.prototype.set = function (key, value, callback) {
  return this._execute('set', 2, key, value, callback);
};


//
// ### function required (keys)
// #### @keys {array} List of keys
// Throws an error if any of `keys` has no value, otherwise returns `true`
Provider.prototype.required = function (keys) {
  if (!Array.isArray(keys)) {
    throw new Error('Incorrect parameter, array expected');
  }

  var missing = [];
  keys.forEach(function(key) {
    if (typeof this.get(key) === 'undefined') {
      missing.push(key);
    }
  }, this);

  if (missing.length) {
    throw new Error('Missing required keys: ' + missing.join(', '));
  } else {
    return true;
  }

};

//
// ### function reset (callback)
// #### @callback {function} **Optional** Continuation to respond to when complete.
// Clears all keys associated with this instance.
//
Provider.prototype.reset = function (callback) {
  return this._execute('reset', 0, callback);
};

//
// ### function clear (key, callback)
// #### @key {string} Key to remove from this instance
// #### @callback {function} **Optional** Continuation to respond to when complete.
// Removes the value for the specified `key` from this instance.
//
Provider.prototype.clear = function (key, callback) {
  return this._execute('clear', 1, key, callback);
};

//
// ### function merge ([key,] value [, callback])
// #### @key {string} Key to merge the value into
// #### @value {literal|Object} Value to merge into the key
// #### @callback {function} **Optional** Continuation to respond to when complete.
// Merges the properties in `value` into the existing object value at `key`.
//
// 1. If the existing value `key` is not an Object, it will be completely overwritten.
// 2. If `key` is not supplied, then the `value` will be merged into the root.
//
Provider.prototype.merge = function () {
  var self = this,
      args = Array.prototype.slice.call(arguments),
      callback = typeof args[args.length - 1] === 'function' && args.pop(),
      value = args.pop(),
      key = args.pop();

  function mergeProperty (prop, next) {
    return self._execute('merge', 2, prop, value[prop], next);
  }

  if (!key) {
    if (Array.isArray(value) || typeof value !== 'object') {
      return onError(new Error('Cannot merge non-Object into top-level.'), callback);
    }

    return async.forEach(Object.keys(value), mergeProperty, callback || function () { })
  }

  return this._execute('merge', 2, key, value, callback);
};

//
// ### function load (callback)
// #### @callback {function} Continuation to respond to when complete.
// Responds with an Object representing all keys associated in this instance.
//
Provider.prototype.load = function (callback) {
  var self = this;

  function getStores () {
    var stores = Object.keys(self.stores);
    stores.reverse();
    return stores.map(function (name) {
      return self.stores[name];
    });
  }

  function loadStoreSync(store) {
    if (!store.loadSync) {
      throw new Error('nconf store ' + store.type + ' has no loadSync() method');
    }

    return store.loadSync();
  }

  function loadStore(store, next) {
    if (!store.load && !store.loadSync) {
      return next(new Error('nconf store ' + store.type + ' has no load() method'));
    }

    return store.loadSync
      ? next(null, store.loadSync())
      : store.load(next);
  }

  function loadBatch (targets, done) {
    if (!done) {
      return common.merge(targets.map(loadStoreSync));
    }

    async.map(targets, loadStore, function (err, objs) {
      return err ? done(err) : done(null, common.merge(objs));
    });
  }

  function mergeSources (data) {
    //
    // If `data` was returned then merge it into
    // the system store.
    //
    if (data && typeof data === 'object') {
      self.use('sources', {
        type: 'literal',
        store: data
      });
    }
  }

  function loadSources () {
    var sourceHierarchy = self.sources.splice(0);
    sourceHierarchy.reverse();

    //
    // If we don't have a callback and the current
    // store is capable of loading synchronously
    // then do so.
    //
    if (!callback) {
      mergeSources(loadBatch(sourceHierarchy));
      return loadBatch(getStores());
    }

    loadBatch(sourceHierarchy, function (err, data) {
      if (err) {
        return callback(err);
      }

      mergeSources(data);
      return loadBatch(getStores(), callback);
    });
  }

  return self.sources.length
    ? loadSources()
    : loadBatch(getStores(), callback);
};

//
// ### function save (callback)
// #### @callback {function} **optional**  Continuation to respond to when
// complete.
// Instructs each provider to save.  If a callback is provided, we will attempt
// asynchronous saves on the providers, falling back to synchronous saves if
// this isn't possible.  If a provider does not know how to save, it will be
// ignored.  Returns an object consisting of all of the data which was
// actually saved.
//
Provider.prototype.save = function (value, callback) {
  if (!callback && typeof value === 'function') {
    callback = value;
    value = null;
  }

  var self = this,
      names = Object.keys(this.stores);

  function saveStoreSync(memo, name) {
    var store = self.stores[name];

    //
    // If the `store` doesn't have a `saveSync` method,
    // just ignore it and continue.
    //
    if (store.saveSync) {
      var ret = store.saveSync();
      if (typeof ret == 'object' && ret !== null) {
        memo.push(ret);
      }
    }
    return memo;
  }

  function saveStore(memo, name, next) {
    var store = self.stores[name];

    //
    // If the `store` doesn't have a `save` or saveSync`
    // method(s), just ignore it and continue.
    //

    if (store.save) {
      return store.save(value, function (err, data) {
        if (err) {
          return next(err);
        }

        if (typeof data == 'object' && data !== null) {
          memo.push(data);
        }

        next(null, memo);
      });
    }
    else if (store.saveSync) {
      memo.push(store.saveSync());
    }

    next(null, memo);
  }

  //
  // If we don't have a callback and the current
  // store is capable of saving synchronously
  // then do so.
  //
  if (!callback) {
    return common.merge(names.reduce(saveStoreSync, []));
  }

  async.reduce(names, [], saveStore, function (err, objs) {
    return err ? callback(err) : callback(null, common.merge(objs));
  });
};

//
// ### @private function _execute (action, syncLength, [arguments])
// #### @action {string} Action to execute on `this.store`.
// #### @syncLength {number} Function length of the sync version.
// #### @arguments {Array} Arguments array to apply to the action
// Executes the specified `action` on all stores for this instance, ensuring a callback supplied
// to a synchronous store function is still invoked.
//
Provider.prototype._execute = function (action, syncLength /* [arguments] */) {
  var args = Array.prototype.slice.call(arguments, 2),
      callback = typeof args[args.length - 1] === 'function' && args.pop(),
      destructive = ['set', 'clear', 'merge', 'reset'].indexOf(action) !== -1,
      self = this,
      response,
      mergeObjs = [],
      keys = Object.keys(this.stores);


  function runAction (name, next) {
    var store = self.stores[name];

    if (destructive && store.readOnly) {
      return next();
    }

    return store[action].length > syncLength
      ? store[action].apply(store, args.concat(next))
      : next(null, store[action].apply(store, args));
  }

  if (callback) {
    return async.forEach(keys, runAction, function (err) {
      return err ? callback(err) : callback();
    });
  }

  keys.forEach(function (name) {
    if (typeof response === 'undefined') {
      var store = self.stores[name];

      if (destructive && store.readOnly) {
        return;
      }

      response = store[action].apply(store, args);

      // Merge objects if necessary
      if (response && action === 'get' && typeof response === 'object' && !Array.isArray(response)) {
        mergeObjs.push(response);
        response = undefined;
      }
    }
  });

  if (mergeObjs.length) {
    response = common.merge(mergeObjs.reverse());
  }

  return response;
}

//
// Throw the `err` if a callback is not supplied
//
function onError(err, callback) {
  if (callback) {
    return callback(err);
  }

  throw err;
}


/***/ }),
/* 59 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_args\":[[\"nconf@0.8.5\",\"/Users/marcoscastany/Repos/auth0-authorization-extension\"]],\"_from\":\"nconf@0.8.5\",\"_id\":\"nconf@0.8.5\",\"_inBundle\":false,\"_integrity\":\"sha1-8pQeFWGVL6kGu7MjKM+I1MY155Q=\",\"_location\":\"/nconf\",\"_phantomChildren\":{\"decamelize\":\"1.2.0\",\"os-locale\":\"1.4.0\",\"string-width\":\"1.0.2\",\"strip-ansi\":\"3.0.1\",\"wrap-ansi\":\"2.1.0\",\"y18n\":\"3.2.1\"},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"nconf@0.8.5\",\"name\":\"nconf\",\"escapedName\":\"nconf\",\"rawSpec\":\"0.8.5\",\"saveSpec\":null,\"fetchSpec\":\"0.8.5\"},\"_requiredBy\":[\"/\"],\"_resolved\":\"https://a0us.jfrog.io/a0us/api/npm/npm/nconf/-/nconf-0.8.5.tgz\",\"_spec\":\"0.8.5\",\"_where\":\"/Users/marcoscastany/Repos/auth0-authorization-extension\",\"author\":{\"name\":\"Charlie Robbins\",\"email\":\"charlie.robbins@gmail.com\"},\"bugs\":{\"url\":\"https://github.com/flatiron/nconf/issues\"},\"dependencies\":{\"async\":\"^1.4.0\",\"ini\":\"^1.3.0\",\"secure-keys\":\"^1.0.0\",\"yargs\":\"^3.19.0\"},\"description\":\"Hierarchical node.js configuration with files, environment variables, command-line arguments, and atomic object merging.\",\"devDependencies\":{\"coveralls\":\"^2.11.4\",\"istanbul\":\"^0.4.1\",\"vows\":\"0.8.x\"},\"engines\":{\"node\":\">= 0.4.0\"},\"homepage\":\"https://github.com/flatiron/nconf#readme\",\"keywords\":[\"configuration\",\"key value store\",\"plugabble\"],\"license\":\"MIT\",\"main\":\"./lib/nconf\",\"name\":\"nconf\",\"repository\":{\"type\":\"git\",\"url\":\"git+ssh://git@github.com/flatiron/nconf.git\"},\"scripts\":{\"cover\":\"istanbul cover vows -- test/*-test.js test/**/*-test.js  --spec\",\"coveralls\":\"cat coverage/lcov.info | coveralls\",\"test\":\"vows test/*-test.js test/**/*-test.js --spec\"},\"version\":\"0.8.5\"}");

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./argv": 61,
	"./argv.js": 61,
	"./env": 89,
	"./env.js": 89,
	"./file": 90,
	"./file.js": 90,
	"./literal": 92,
	"./literal.js": 92,
	"./memory": 57,
	"./memory.js": 57
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 60;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * argv.js: Simple memory-based store for command-line arguments.
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var util = __webpack_require__(62),
    Memory = __webpack_require__(57).Memory;

//
// ### function Argv (options)
// #### @options {Object} Options for this instance.
// Constructor function for the Argv nconf store, a simple abstraction
// around the Memory store that can read command-line arguments.
//
var Argv = exports.Argv = function (options, usage) {
  Memory.call(this, options);

  this.type     = 'argv';
  this.readOnly = true;
  this.options  = options || false;
  this.usage    = usage;
};

// Inherit from the Memory store
util.inherits(Argv, Memory);

//
// ### function loadSync ()
// Loads the data passed in from `process.argv` into this instance.
//
Argv.prototype.loadSync = function () {
  this.loadArgv();
  return this.store;
};

//
// ### function loadArgv ()
// Loads the data passed in from the command-line arguments
// into this instance.
//
Argv.prototype.loadArgv = function () {
  var self = this,
      yargs, argv;

  yargs = typeof this.options === 'object'
    ? __webpack_require__(63)(process.argv.slice(2)).options(this.options)
    : __webpack_require__(63)(process.argv.slice(2));

  if (typeof this.usage === 'string') { yargs.usage(this.usage) }

  argv = yargs.argv

  if (!argv) {
    return;
  }

  this.readOnly = false;
  Object.keys(argv).forEach(function (key) {
    if (typeof argv[key] !== 'undefined') {
      self.set(key, argv[key]);
    }
  });

  this.showHelp = yargs.showHelp
  this.help     = yargs.help

  this.readOnly = true;
  return this.store;
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var assert = __webpack_require__(64)
var Completion = __webpack_require__(65)
var Parser = __webpack_require__(66)
var path = __webpack_require__(16)
var tokenizeArgString = __webpack_require__(69)
var Usage = __webpack_require__(70)
var Validation = __webpack_require__(82)
var Y18n = __webpack_require__(83)

Argv(process.argv.slice(2))

var exports = module.exports = Argv
function Argv (processArgs, cwd) {
  processArgs = processArgs || [] // handle calling yargs().

  var self = {}
  var completion = null
  var usage = null
  var validation = null
  var y18n = Y18n({
    directory: path.resolve(__dirname, './locales'),
    updateFiles: false
  })

  if (!cwd) cwd = process.cwd()

  self.$0 = process.argv
    .slice(0, 2)
    .map(function (x, i) {
      // ignore the node bin, specify this in your
      // bin file with #!/usr/bin/env node
      if (i === 0 && /\b(node|iojs)$/.test(x)) return
      var b = rebase(cwd, x)
      return x.match(/^\//) && b.length < x.length ? b : x
    })
    .join(' ').trim()

  if (Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"})._ !== undefined && process.argv[1] === Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"})._) {
    self.$0 = Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"})._.replace(
      path.dirname(process.execPath) + '/', ''
    )
  }

  var options
  self.resetOptions = self.reset = function () {
    // put yargs back into its initial
    // state, this is useful for creating a
    // nested CLI.
    options = {
      array: [],
      boolean: [],
      string: [],
      narg: {},
      key: {},
      alias: {},
      default: {},
      defaultDescription: {},
      choices: {},
      requiresArg: [],
      count: [],
      normalize: [],
      config: {},
      envPrefix: undefined
    }

    usage = Usage(self, y18n) // handle usage output.
    validation = Validation(self, usage, y18n) // handle arg validation.
    completion = Completion(self, usage)

    demanded = {}
    groups = {}

    exitProcess = true
    strict = false
    helpOpt = null
    versionOpt = null
    commandHandlers = {}
    self.parsed = false

    return self
  }
  self.resetOptions()

  self.boolean = function (bools) {
    options.boolean.push.apply(options.boolean, [].concat(bools))
    return self
  }

  self.array = function (arrays) {
    options.array.push.apply(options.array, [].concat(arrays))
    return self
  }

  self.nargs = function (key, n) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function (k) {
        self.nargs(k, key[k])
      })
    } else {
      options.narg[key] = n
    }
    return self
  }

  self.choices = function (key, values) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function (k) {
        self.choices(k, key[k])
      })
    } else {
      options.choices[key] = (options.choices[key] || []).concat(values)
    }
    return self
  }

  self.normalize = function (strings) {
    options.normalize.push.apply(options.normalize, [].concat(strings))
    return self
  }

  self.config = function (key, msg, parseFn) {
    if (typeof msg === 'function') {
      parseFn = msg
      msg = null
    }
    self.describe(key, msg || usage.deferY18nLookup('Path to JSON config file'))
    ;(Array.isArray(key) ? key : [key]).forEach(function (k) {
      options.config[k] = parseFn || true
    })
    return self
  }

  self.example = function (cmd, description) {
    usage.example(cmd, description)
    return self
  }

  self.command = function (cmd, description, fn) {
    if (description !== false) {
      usage.command(cmd, description)
    }
    if (fn) commandHandlers[cmd] = fn
    return self
  }

  var commandHandlers = {}
  self.getCommandHandlers = function () {
    return commandHandlers
  }

  self.string = function (strings) {
    options.string.push.apply(options.string, [].concat(strings))
    return self
  }

  self.default = function (key, value, defaultDescription) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function (k) {
        self.default(k, key[k])
      })
    } else {
      if (defaultDescription) options.defaultDescription[key] = defaultDescription
      if (typeof value === 'function') {
        if (!options.defaultDescription[key]) options.defaultDescription[key] = usage.functionDescription(value)
        value = value.call()
      }
      options.default[key] = value
    }
    return self
  }

  self.alias = function (x, y) {
    if (typeof x === 'object') {
      Object.keys(x).forEach(function (key) {
        self.alias(key, x[key])
      })
    } else {
      // perhaps 'x' is already an alias in another list?
      // if so we should append to x's list.
      var aliases = null
      Object.keys(options.alias).forEach(function (key) {
        if (~options.alias[key].indexOf(x)) aliases = options.alias[key]
      })

      if (aliases) { // x was an alias itself.
        aliases.push(y)
      } else { // x is a new alias key.
        options.alias[x] = (options.alias[x] || []).concat(y)
      }

      // wait! perhaps we've created two lists of aliases
      // that reference each other?
      if (options.alias[y]) {
        Array.prototype.push.apply((options.alias[x] || aliases), options.alias[y])
        delete options.alias[y]
      }
    }
    return self
  }

  self.count = function (counts) {
    options.count.push.apply(options.count, [].concat(counts))
    return self
  }

  var demanded = {}
  self.demand = self.required = self.require = function (keys, max, msg) {
    // you can optionally provide a 'max' key,
    // which will raise an exception if too many '_'
    // options are provided.
    if (typeof max !== 'number') {
      msg = max
      max = Infinity
    }

    if (typeof keys === 'number') {
      if (!demanded._) demanded._ = { count: 0, msg: null, max: max }
      demanded._.count = keys
      demanded._.msg = msg
    } else if (Array.isArray(keys)) {
      keys.forEach(function (key) {
        self.demand(key, msg)
      })
    } else {
      if (typeof msg === 'string') {
        demanded[keys] = { msg: msg }
      } else if (msg === true || typeof msg === 'undefined') {
        demanded[keys] = { msg: undefined }
      }
    }

    return self
  }
  self.getDemanded = function () {
    return demanded
  }

  self.requiresArg = function (requiresArgs) {
    options.requiresArg.push.apply(options.requiresArg, [].concat(requiresArgs))
    return self
  }

  self.implies = function (key, value) {
    validation.implies(key, value)
    return self
  }

  self.usage = function (msg, opts) {
    if (!opts && typeof msg === 'object') {
      opts = msg
      msg = null
    }

    usage.usage(msg)

    if (opts) self.options(opts)

    return self
  }

  self.epilogue = self.epilog = function (msg) {
    usage.epilog(msg)
    return self
  }

  self.fail = function (f) {
    usage.failFn(f)
    return self
  }

  self.check = function (f) {
    validation.check(f)
    return self
  }

  self.defaults = self.default

  self.describe = function (key, desc) {
    options.key[key] = true
    usage.describe(key, desc)
    return self
  }

  self.parse = function (args) {
    return parseArgs(args)
  }

  self.option = self.options = function (key, opt) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function (k) {
        self.options(k, key[k])
      })
    } else {
      assert(typeof opt === 'object', 'second argument to option must be an object')

      options.key[key] = true // track manually set keys.

      if (opt.alias) self.alias(key, opt.alias)

      var demand = opt.demand || opt.required || opt.require

      if (demand) {
        self.demand(key, demand)
      } if ('config' in opt) {
        self.config(key, opt.configParser)
      } if ('default' in opt) {
        self.default(key, opt.default)
      } if ('nargs' in opt) {
        self.nargs(key, opt.nargs)
      } if ('choices' in opt) {
        self.choices(key, opt.choices)
      } if ('group' in opt) {
        self.group(key, opt.group)
      } if (opt.boolean || opt.type === 'boolean') {
        self.boolean(key)
        if (opt.alias) self.boolean(opt.alias)
      } if (opt.array || opt.type === 'array') {
        self.array(key)
        if (opt.alias) self.array(opt.alias)
      } if (opt.string || opt.type === 'string') {
        self.string(key)
        if (opt.alias) self.string(opt.alias)
      } if (opt.count || opt.type === 'count') {
        self.count(key)
      } if (opt.defaultDescription) {
        options.defaultDescription[key] = opt.defaultDescription
      }

      var desc = opt.describe || opt.description || opt.desc
      if (desc) {
        self.describe(key, desc)
      }

      if (opt.requiresArg) {
        self.requiresArg(key)
      }
    }

    return self
  }
  self.getOptions = function () {
    return options
  }

  var groups = {}
  self.group = function (opts, groupName) {
    var seen = {}
    groups[groupName] = (groups[groupName] || []).concat(opts).filter(function (key) {
      if (seen[key]) return false
      return (seen[key] = true)
    })
    return self
  }
  self.getGroups = function () {
    return groups
  }

  // as long as options.envPrefix is not undefined,
  // parser will apply env vars matching prefix to argv
  self.env = function (prefix) {
    if (prefix === false) options.envPrefix = undefined
    else options.envPrefix = prefix || ''
    return self
  }

  self.wrap = function (cols) {
    usage.wrap(cols)
    return self
  }

  var strict = false
  self.strict = function () {
    strict = true
    return self
  }
  self.getStrict = function () {
    return strict
  }

  self.showHelp = function (level) {
    if (!self.parsed) parseArgs(processArgs) // run parser, if it has not already been executed.
    usage.showHelp(level)
    return self
  }

  var versionOpt = null
  self.version = function (ver, opt, msg) {
    versionOpt = opt || 'version'
    usage.version(ver)
    self.boolean(versionOpt)
    self.describe(versionOpt, msg || usage.deferY18nLookup('Show version number'))
    return self
  }

  var helpOpt = null
  self.addHelpOpt = function (opt, msg) {
    helpOpt = opt
    self.boolean(opt)
    self.describe(opt, msg || usage.deferY18nLookup('Show help'))
    return self
  }

  self.showHelpOnFail = function (enabled, message) {
    usage.showHelpOnFail(enabled, message)
    return self
  }

  var exitProcess = true
  self.exitProcess = function (enabled) {
    if (typeof enabled !== 'boolean') {
      enabled = true
    }
    exitProcess = enabled
    return self
  }
  self.getExitProcess = function () {
    return exitProcess
  }

  self.help = function () {
    if (arguments.length > 0) return self.addHelpOpt.apply(self, arguments)

    if (!self.parsed) parseArgs(processArgs) // run parser, if it has not already been executed.

    return usage.help()
  }

  var completionCommand = null
  self.completion = function (cmd, desc, fn) {
    // a function to execute when generating
    // completions can be provided as the second
    // or third argument to completion.
    if (typeof desc === 'function') {
      fn = desc
      desc = null
    }

    // register the completion command.
    completionCommand = cmd || 'completion'
    if (!desc && desc !== false) {
      desc = 'generate bash completion script'
    }
    self.command(completionCommand, desc)

    // a function can be provided
    if (fn) completion.registerFunction(fn)

    return self
  }

  self.showCompletionScript = function ($0) {
    $0 = $0 || self.$0
    console.log(completion.generateCompletionScript($0))
    return self
  }

  self.locale = function (locale) {
    if (arguments.length === 0) {
      guessLocale()
      return y18n.getLocale()
    }
    detectLocale = false
    y18n.setLocale(locale)
    return self
  }

  self.updateStrings = self.updateLocale = function (obj) {
    detectLocale = false
    y18n.updateLocale(obj)
    return self
  }

  var detectLocale = true
  self.detectLocale = function (detect) {
    detectLocale = detect
    return self
  }
  self.getDetectLocale = function () {
    return detectLocale
  }

  self.getUsageInstance = function () {
    return usage
  }

  self.getValidationInstance = function () {
    return validation
  }

  self.terminalWidth = function () {
    return __webpack_require__(80).width
  }

  Object.defineProperty(self, 'argv', {
    get: function () {
      var args = null

      try {
        args = parseArgs(processArgs)
      } catch (err) {
        usage.fail(err.message)
      }

      return args
    },
    enumerable: true
  })

  function parseArgs (args) {
    args = normalizeArgs(args)

    var parsed = Parser(args, options, y18n)
    var argv = parsed.argv
    var aliases = parsed.aliases

    argv.$0 = self.$0

    self.parsed = parsed

    guessLocale() // guess locale lazily, so that it can be turned off in chain.

    // while building up the argv object, there
    // are two passes through the parser. If completion
    // is being performed short-circuit on the first pass.
    if (completionCommand &&
      (process.argv.join(' ')).indexOf(completion.completionKey) !== -1 &&
      !argv[completion.completionKey]) {
      return argv
    }

    // if there's a handler associated with a
    // command defer processing to it.
    var handlerKeys = Object.keys(self.getCommandHandlers())
    for (var i = 0, command; (command = handlerKeys[i]) !== undefined; i++) {
      if (~argv._.indexOf(command)) {
        runCommand(command, self, argv)
        return self.argv
      }
    }

    // generate a completion script for adding to ~/.bashrc.
    if (completionCommand && ~argv._.indexOf(completionCommand) && !argv[completion.completionKey]) {
      self.showCompletionScript()
      if (exitProcess) {
        process.exit(0)
      }
    }

    // we must run completions first, a user might
    // want to complete the --help or --version option.
    if (completion.completionKey in argv) {
      // we allow for asynchronous completions,
      // e.g., loading in a list of commands from an API.
      completion.getCompletion(function (completions) {
        ;(completions || []).forEach(function (completion) {
          console.log(completion)
        })

        if (exitProcess) {
          process.exit(0)
        }
      })
      return
    }

    var helpOrVersion = false
    Object.keys(argv).forEach(function (key) {
      if (key === helpOpt && argv[key]) {
        helpOrVersion = true
        self.showHelp('log')
        if (exitProcess) {
          process.exit(0)
        }
      } else if (key === versionOpt && argv[key]) {
        helpOrVersion = true
        usage.showVersion()
        if (exitProcess) {
          process.exit(0)
        }
      }
    })

    // If the help or version options where used and exitProcess is false,
    // we won't run validations
    if (!helpOrVersion) {
      if (parsed.error) throw parsed.error

      // if we're executed via bash completion, don't
      // bother with validation.
      if (!argv[completion.completionKey]) {
        validation.nonOptionCount(argv)
        validation.missingArgumentValue(argv)
        validation.requiredArguments(argv)
        if (strict) validation.unknownArguments(argv, aliases)
        validation.customChecks(argv, aliases)
        validation.limitedChoices(argv)
        validation.implications(argv)
      }
    }

    setPlaceholderKeys(argv)

    return argv
  }

  function guessLocale () {
    if (!detectLocale) return

    try {
      var osLocale = __webpack_require__(84)
      self.locale(osLocale.sync({ spawn: false }))
    } catch (err) {
      // if we explode looking up locale just noop
      // we'll keep using the default language 'en'.
    }
  }

  function runCommand (command, yargs, argv) {
    setPlaceholderKeys(argv)
    yargs.getCommandHandlers()[command](yargs.reset(), argv)
  }

  function setPlaceholderKeys (argv) {
    Object.keys(options.key).forEach(function (key) {
      // don't set placeholder keys for dot
      // notation options 'foo.bar'.
      if (~key.indexOf('.')) return
      if (typeof argv[key] === 'undefined') argv[key] = undefined
    })
  }

  function normalizeArgs (args) {
    if (typeof args === 'string') {
      return tokenizeArgString(args)
    }
    return args
  }

  singletonify(self)
  return self
}

// rebase an absolute path to a relative one with respect to a base directory
// exported for tests
exports.rebase = rebase
function rebase (base, dir) {
  return path.relative(base, dir)
}

/*  Hack an instance of Argv with process.argv into Argv
    so people can do
    require('yargs')(['--beeble=1','-z','zizzle']).argv
    to parse a list of args and
    require('yargs').argv
    to get a parsed version of process.argv.
*/
function singletonify (inst) {
  Object.keys(inst).forEach(function (key) {
    if (key === 'argv') {
      Argv.__defineGetter__(key, inst.__lookupGetter__(key))
    } else {
      Argv[key] = typeof inst[key] === 'function' ? inst[key].bind(inst) : inst[key]
    }
  })
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var fs = __webpack_require__(44)
var path = __webpack_require__(16)

// add bash completions to your
//  yargs-powered applications.
module.exports = function (yargs, usage) {
  var self = {
    completionKey: 'get-yargs-completions'
  }

  // get a list of completion commands.
  self.getCompletion = function (done) {
    var completions = []
    var current = process.argv[process.argv.length - 1]
    var previous = process.argv.slice(process.argv.indexOf('--' + self.completionKey) + 1)
    var argv = yargs.parse(previous)

    // a custom completion function can be provided
    // to completion().
    if (completionFunction) {
      if (completionFunction.length < 3) {
        var result = completionFunction(current, argv)

        // promise based completion function.
        if (typeof result.then === 'function') {
          return result.then(function (list) {
            process.nextTick(function () { done(list) })
          }).catch(function (err) {
            process.nextTick(function () { throw err })
          })
        }

        // synchronous completion function.
        return done(result)
      } else {
        // asynchronous completion function
        return completionFunction(current, argv, function (completions) {
          done(completions)
        })
      }
    }

    var handlers = yargs.getCommandHandlers()
    for (var i = 0, ii = previous.length; i < ii; ++i) {
      if (handlers[previous[i]]) {
        return handlers[previous[i]](yargs.reset())
      }
    }

    if (!current.match(/^-/)) {
      usage.getCommands().forEach(function (command) {
        if (previous.indexOf(command[0]) === -1) {
          completions.push(command[0])
        }
      })
    }

    if (current.match(/^-/)) {
      Object.keys(yargs.getOptions().key).forEach(function (key) {
        completions.push('--' + key)
      })
    }

    done(completions)
  }

  // generate the completion script to add to your .bashrc.
  self.generateCompletionScript = function ($0) {
    var script = fs.readFileSync(
      path.resolve(__dirname, '../completion.sh.hbs'),
      'utf-8'
    )
    var name = path.basename($0)

    // add ./to applications not yet installed as bin.
    if ($0.match(/\.js$/)) $0 = './' + $0

    script = script.replace(/{{app_name}}/g, name)
    return script.replace(/{{app_path}}/g, $0)
  }

  // register a function to perform your own custom
  // completions., this function can be either
  // synchrnous or asynchronous.
  var completionFunction = null
  self.registerFunction = function (fn) {
    completionFunction = fn
  }

  return self
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// fancy-pants parsing of argv, originally forked
// from minimist: https://www.npmjs.com/package/minimist
var camelCase = __webpack_require__(67)
var path = __webpack_require__(16)

function increment (orig) {
  return orig !== undefined ? orig + 1 : 0
}

module.exports = function (args, opts, y18n) {
  if (!opts) opts = {}

  var __ = y18n.__
  var error = null
  var flags = { arrays: {}, bools: {}, strings: {}, counts: {}, normalize: {}, configs: {}, defaulted: {} }

  ;[].concat(opts['array']).filter(Boolean).forEach(function (key) {
    flags.arrays[key] = true
  })

  ;[].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
    flags.bools[key] = true
  })

  ;[].concat(opts.string).filter(Boolean).forEach(function (key) {
    flags.strings[key] = true
  })

  ;[].concat(opts.count).filter(Boolean).forEach(function (key) {
    flags.counts[key] = true
  })

  ;[].concat(opts.normalize).filter(Boolean).forEach(function (key) {
    flags.normalize[key] = true
  })

  Object.keys(opts.config).forEach(function (k) {
    flags.configs[k] = opts.config[k]
  })

  var aliases = {}
  var newAliases = {}

  extendAliases(opts.key)
  extendAliases(opts.alias)
  extendAliases(opts.default)

  var defaults = opts['default'] || {}
  Object.keys(defaults).forEach(function (key) {
    if (/-/.test(key) && !opts.alias[key]) {
      aliases[key] = aliases[key] || []
    }
    (aliases[key] || []).forEach(function (alias) {
      defaults[alias] = defaults[key]
    })
  })

  var argv = { _: [] }

  Object.keys(flags.bools).forEach(function (key) {
    setArg(key, !(key in defaults) ? false : defaults[key])
    setDefaulted(key)
  })

  var notFlags = []
  if (args.indexOf('--') !== -1) {
    notFlags = args.slice(args.indexOf('--') + 1)
    args = args.slice(0, args.indexOf('--'))
  }

  for (var i = 0; i < args.length; i++) {
    var arg = args[i]
    var broken
    var key
    var letters
    var m
    var next
    var value

    // -- seperated by =
    if (arg.match(/^--.+=/)) {
      // Using [\s\S] instead of . because js doesn't support the
      // 'dotall' regex modifier. See:
      // http://stackoverflow.com/a/1068308/13216
      m = arg.match(/^--([^=]+)=([\s\S]*)$/)

      // nargs format = '--f=monkey washing cat'
      if (checkAllAliases(m[1], opts.narg)) {
        args.splice(i + 1, m[1], m[2])
        i = eatNargs(i, m[1], args)
      // arrays format = '--f=a b c'
      } else if (checkAllAliases(m[1], flags.arrays) && args.length > i + 1) {
        args.splice(i + 1, m[1], m[2])
        i = eatArray(i, m[1], args)
      } else {
        setArg(m[1], m[2])
      }
    } else if (arg.match(/^--no-.+/)) {
      key = arg.match(/^--no-(.+)/)[1]
      setArg(key, false)

    // -- seperated by space.
    } else if (arg.match(/^--.+/)) {
      key = arg.match(/^--(.+)/)[1]

      // nargs format = '--foo a b c'
      if (checkAllAliases(key, opts.narg)) {
        i = eatNargs(i, key, args)
      // array format = '--foo a b c'
      } else if (checkAllAliases(key, flags.arrays) && args.length > i + 1) {
        i = eatArray(i, key, args)
      } else {
        next = args[i + 1]

        if (next !== undefined && !next.match(/^-/) &&
          !checkAllAliases(key, flags.bools) &&
          !checkAllAliases(key, flags.counts)) {
          setArg(key, next)
          i++
        } else if (/^(true|false)$/.test(next)) {
          setArg(key, next)
          i++
        } else {
          setArg(key, defaultForType(guessType(key, flags)))
        }
      }

    // dot-notation flag seperated by '='.
    } else if (arg.match(/^-.\..+=/)) {
      m = arg.match(/^-([^=]+)=([\s\S]*)$/)
      setArg(m[1], m[2])

    // dot-notation flag seperated by space.
    } else if (arg.match(/^-.\..+/)) {
      next = args[i + 1]
      key = arg.match(/^-(.\..+)/)[1]

      if (next !== undefined && !next.match(/^-/) &&
        !checkAllAliases(key, flags.bools) &&
        !checkAllAliases(key, flags.counts)) {
        setArg(key, next)
        i++
      } else {
        setArg(key, defaultForType(guessType(key, flags)))
      }
    } else if (arg.match(/^-[^-]+/)) {
      letters = arg.slice(1, -1).split('')
      broken = false

      for (var j = 0; j < letters.length; j++) {
        next = arg.slice(j + 2)

        if (letters[j + 1] && letters[j + 1] === '=') {
          value = arg.slice(j + 3)
          key = letters[j]

          // nargs format = '-f=monkey washing cat'
          if (checkAllAliases(letters[j], opts.narg)) {
            args.splice(i + 1, 0, value)
            i = eatNargs(i, key, args)
          // array format = '-f=a b c'
          } else if (checkAllAliases(key, flags.arrays) && args.length > i + 1) {
            args.splice(i + 1, 0, value)
            i = eatArray(i, key, args)
          } else {
            setArg(key, value)
          }

          broken = true
          break
        }

        if (next === '-') {
          setArg(letters[j], next)
          continue
        }

        if (/[A-Za-z]/.test(letters[j]) &&
          /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
          setArg(letters[j], next)
          broken = true
          break
        }

        if (letters[j + 1] && letters[j + 1].match(/\W/)) {
          setArg(letters[j], arg.slice(j + 2))
          broken = true
          break
        } else {
          setArg(letters[j], defaultForType(guessType(letters[j], flags)))
        }
      }

      key = arg.slice(-1)[0]

      if (!broken && key !== '-') {
        // nargs format = '-f a b c'
        if (checkAllAliases(key, opts.narg)) {
          i = eatNargs(i, key, args)
        // array format = '-f a b c'
        } else if (checkAllAliases(key, flags.arrays) && args.length > i + 1) {
          i = eatArray(i, key, args)
        } else {
          if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) &&
            !checkAllAliases(key, flags.bools) &&
            !checkAllAliases(key, flags.counts)) {
            setArg(key, args[i + 1])
            i++
          } else if (args[i + 1] && /true|false/.test(args[i + 1])) {
            setArg(key, args[i + 1])
            i++
          } else {
            setArg(key, defaultForType(guessType(key, flags)))
          }
        }
      }
    } else {
      argv._.push(
        flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)
      )
    }
  }

  // order of precedence:
  // 1. command line arg
  // 2. value from config file
  // 3. value from env var
  // 4. configured default value
  applyEnvVars(opts, argv, true) // special case: check env vars that point to config file
  setConfig(argv)
  applyEnvVars(opts, argv, false)
  applyDefaultsAndAliases(argv, aliases, defaults)

  Object.keys(flags.counts).forEach(function (key) {
    setArg(key, defaults[key])
  })

  notFlags.forEach(function (key) {
    argv._.push(key)
  })

  // how many arguments should we consume, based
  // on the nargs option?
  function eatNargs (i, key, args) {
    var toEat = checkAllAliases(key, opts.narg)

    if (args.length - (i + 1) < toEat) error = Error(__('Not enough arguments following: %s', key))

    for (var ii = i + 1; ii < (toEat + i + 1); ii++) {
      setArg(key, args[ii])
    }

    return (i + toEat)
  }

  // if an option is an array, eat all non-hyphenated arguments
  // following it... YUM!
  // e.g., --foo apple banana cat becomes ["apple", "banana", "cat"]
  function eatArray (i, key, args) {
    for (var ii = i + 1; ii < args.length; ii++) {
      if (/^-/.test(args[ii])) break
      i = ii
      setArg(key, args[ii])
    }

    return i
  }

  function setArg (key, val) {
    unsetDefaulted(key)

    // handle parsing boolean arguments --foo=true --bar false.
    if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
      if (typeof val === 'string') val = val === 'true'
    }

    if (/-/.test(key) && !(aliases[key] && aliases[key].length)) {
      var c = camelCase(key)
      aliases[key] = [c]
      newAliases[c] = true
    }

    var value = !checkAllAliases(key, flags.strings) && isNumber(val) ? Number(val) : val

    if (checkAllAliases(key, flags.counts)) {
      value = increment
    }

    var splitKey = key.split('.')
    setKey(argv, splitKey, value)

    // alias references an inner-value within
    // a dot-notation object. see #279.
    if (~key.indexOf('.') && aliases[key]) {
      aliases[key].forEach(function (x) {
        x = x.split('.')
        setKey(argv, x, value)
      })
    }

    ;(aliases[splitKey[0]] || []).forEach(function (x) {
      x = x.split('.')

      // handle populating dot notation for both
      // the key and its aliases.
      if (splitKey.length > 1) {
        var a = [].concat(splitKey)
        a.shift() // nuke the old key.
        x = x.concat(a)
      }

      setKey(argv, x, value)
    })

    var keys = [key].concat(aliases[key] || [])
    for (var i = 0, l = keys.length; i < l; i++) {
      if (flags.normalize[keys[i]]) {
        keys.forEach(function (key) {
          argv.__defineSetter__(key, function (v) {
            val = path.normalize(v)
          })

          argv.__defineGetter__(key, function () {
            return typeof val === 'string' ? path.normalize(val) : val
          })
        })
        break
      }
    }
  }

  // set args from config.json file, this should be
  // applied last so that defaults can be applied.
  function setConfig (argv) {
    var configLookup = {}

    // expand defaults/aliases, in-case any happen to reference
    // the config.json file.
    applyDefaultsAndAliases(configLookup, aliases, defaults)

    Object.keys(flags.configs).forEach(function (configKey) {
      var configPath = argv[configKey] || configLookup[configKey]
      if (configPath) {
        try {
          var config = null
          var resolvedConfigPath = path.resolve(process.cwd(), configPath)

          if (typeof flags.configs[configKey] === 'function') {
            try {
              config = flags.configs[configKey](resolvedConfigPath)
            } catch (e) {
              config = e
            }
            if (config instanceof Error) {
              error = config
              return
            }
          } else {
            config = __webpack_require__(68)(resolvedConfigPath)
          }

          Object.keys(config).forEach(function (key) {
            // setting arguments via CLI takes precedence over
            // values within the config file.
            if (argv[key] === undefined || (flags.defaulted[key])) {
              delete argv[key]
              setArg(key, config[key])
            }
          })
        } catch (ex) {
          if (argv[configKey]) error = Error(__('Invalid JSON config file: %s', configPath))
        }
      }
    })
  }

  function applyEnvVars (opts, argv, configOnly) {
    if (typeof opts.envPrefix === 'undefined') return

    var prefix = typeof opts.envPrefix === 'string' ? opts.envPrefix : ''
    Object.keys(Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"})).forEach(function (envVar) {
      if (prefix === '' || envVar.lastIndexOf(prefix, 0) === 0) {
        var key = camelCase(envVar.substring(prefix.length))
        if (((configOnly && flags.configs[key]) || !configOnly) && (!(key in argv) || flags.defaulted[key])) {
          setArg(key, Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"})[envVar])
        }
      }
    })
  }

  function applyDefaultsAndAliases (obj, aliases, defaults) {
    Object.keys(defaults).forEach(function (key) {
      if (!hasKey(obj, key.split('.'))) {
        setKey(obj, key.split('.'), defaults[key])

        ;(aliases[key] || []).forEach(function (x) {
          if (hasKey(obj, x.split('.'))) return
          setKey(obj, x.split('.'), defaults[key])
        })
      }
    })
  }

  function hasKey (obj, keys) {
    var o = obj
    keys.slice(0, -1).forEach(function (key) {
      o = (o[key] || {})
    })

    var key = keys[keys.length - 1]

    if (typeof o !== 'object') return false
    else return key in o
  }

  function setKey (obj, keys, value) {
    var o = obj
    keys.slice(0, -1).forEach(function (key) {
      if (o[key] === undefined) o[key] = {}
      o = o[key]
    })

    var key = keys[keys.length - 1]
    if (value === increment) {
      o[key] = increment(o[key])
    } else if (o[key] === undefined && checkAllAliases(key, flags.arrays)) {
      o[key] = Array.isArray(value) ? value : [value]
    } else if (o[key] === undefined || typeof o[key] === 'boolean') {
      o[key] = value
    } else if (Array.isArray(o[key])) {
      o[key].push(value)
    } else {
      o[key] = [ o[key], value ]
    }
  }

  // extend the aliases list with inferred aliases.
  function extendAliases (obj) {
    Object.keys(obj || {}).forEach(function (key) {
      // short-circuit if we've already added a key
      // to the aliases array, for example it might
      // exist in both 'opts.default' and 'opts.key'.
      if (aliases[key]) return

      aliases[key] = [].concat(opts.alias[key] || [])
      // For "--option-name", also set argv.optionName
      aliases[key].concat(key).forEach(function (x) {
        if (/-/.test(x)) {
          var c = camelCase(x)
          aliases[key].push(c)
          newAliases[c] = true
        }
      })
      aliases[key].forEach(function (x) {
        aliases[x] = [key].concat(aliases[key].filter(function (y) {
          return x !== y
        }))
      })
    })
  }

  // check if a flag is set for any of a key's aliases.
  function checkAllAliases (key, flag) {
    var isSet = false
    var toCheck = [].concat(aliases[key] || [], key)

    toCheck.forEach(function (key) {
      if (flag[key]) isSet = flag[key]
    })

    return isSet
  }

  function setDefaulted (key) {
    [].concat(aliases[key] || [], key).forEach(function (k) {
      flags.defaulted[k] = true
    })
  }

  function unsetDefaulted (key) {
    [].concat(aliases[key] || [], key).forEach(function (k) {
      delete flags.defaulted[k]
    })
  }

  // return a default value, given the type of a flag.,
  // e.g., key of type 'string' will default to '', rather than 'true'.
  function defaultForType (type) {
    var def = {
      boolean: true,
      string: '',
      array: []
    }

    return def[type]
  }

  // given a flag, enforce a default type.
  function guessType (key, flags) {
    var type = 'boolean'

    if (flags.strings && flags.strings[key]) type = 'string'
    else if (flags.arrays && flags.arrays[key]) type = 'array'

    return type
  }

  function isNumber (x) {
    if (typeof x === 'number') return true
    if (/^0x[0-9a-f]+$/i.test(x)) return true
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x)
  }

  return {
    argv: argv,
    aliases: aliases,
    error: error,
    newAliases: newAliases
  }
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function preserveCamelCase(str) {
	var isLastCharLower = false;

	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);

		if (isLastCharLower && (/[a-zA-Z]/).test(c) && c.toUpperCase() === c) {
			str = str.substr(0, i) + '-' + str.substr(i);
			isLastCharLower = false;
			i++;
		} else {
			isLastCharLower = (c.toLowerCase() === c);
		}
	}

	return str;
}

module.exports = function () {
	var str = [].map.call(arguments, function (str) {
		return str.trim();
	}).filter(function (str) {
		return str.length;
	}).join('-');

	if (!str.length) {
		return '';
	}

	if (str.length === 1) {
		return str;
	}

	if (!(/[_.\- ]+/).test(str)) {
		if (str === str.toUpperCase()) {
			return str.toLowerCase();
		}

		if (str[0] !== str[0].toLowerCase()) {
			return str[0].toLowerCase() + str.slice(1);
		}

		return str;
	}

	str = preserveCamelCase(str);

	return str
	.replace(/^[_.\- ]+/, '')
	.toLowerCase()
	.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
		return p1.toUpperCase();
	});
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 68;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

// take an un-split argv string and tokenize it.
module.exports = function (argString) {
  var i = 0
  var c = null
  var opening = null
  var args = []

  for (var ii = 0; ii < argString.length; ii++) {
    c = argString.charAt(ii)

    // split on spaces unless we're in quotes.
    if (c === ' ' && !opening) {
      i++
      continue
    }

    // don't split the string if we're in matching
    // opening or closing single and double quotes.
    if (c === opening) {
      opening = null
      continue
    } else if ((c === "'" || c === '"') && !opening) {
      opening = c
      continue
    }

    if (!args[i]) args[i] = ''
    args[i] += c
  }

  return args
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// this file handles outputting usage instructions,
// failures, etc. keeps logging in one place.
var cliui = __webpack_require__(71)
var decamelize = __webpack_require__(79)
var stringWidth = __webpack_require__(72)
var wsize = __webpack_require__(80)

module.exports = function (yargs, y18n) {
  var __ = y18n.__
  var self = {}

  // methods for ouputting/building failure message.
  var fails = []
  self.failFn = function (f) {
    fails.push(f)
  }

  var failMessage = null
  var showHelpOnFail = true
  self.showHelpOnFail = function (enabled, message) {
    if (typeof enabled === 'string') {
      message = enabled
      enabled = true
    } else if (typeof enabled === 'undefined') {
      enabled = true
    }
    failMessage = message
    showHelpOnFail = enabled
    return self
  }

  var failureOutput = false
  self.fail = function (msg) {
    if (fails.length) {
      fails.forEach(function (f) {
        f(msg)
      })
    } else {
      // don't output failure message more than once
      if (!failureOutput) {
        failureOutput = true
        if (showHelpOnFail) yargs.showHelp('error')
        if (msg) console.error(msg)
        if (failMessage) {
          if (msg) console.error('')
          console.error(failMessage)
        }
      }
      if (yargs.getExitProcess()) {
        process.exit(1)
      } else {
        throw new Error(msg)
      }
    }
  }

  // methods for ouputting/building help (usage) message.
  var usage
  self.usage = function (msg) {
    usage = msg
  }

  var examples = []
  self.example = function (cmd, description) {
    examples.push([cmd, description || ''])
  }

  var commands = []
  self.command = function (cmd, description) {
    commands.push([cmd, description || ''])
  }
  self.getCommands = function () {
    return commands
  }

  var descriptions = {}
  self.describe = function (key, desc) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function (k) {
        self.describe(k, key[k])
      })
    } else {
      descriptions[key] = desc
    }
  }
  self.getDescriptions = function () {
    return descriptions
  }

  var epilog
  self.epilog = function (msg) {
    epilog = msg
  }

  var wrap = windowWidth()
  self.wrap = function (cols) {
    wrap = cols
  }

  var deferY18nLookupPrefix = '__yargsString__:'
  self.deferY18nLookup = function (str) {
    return deferY18nLookupPrefix + str
  }

  var defaultGroup = 'Options:'
  self.help = function () {
    normalizeAliases()

    var demanded = yargs.getDemanded()
    var groups = yargs.getGroups()
    var options = yargs.getOptions()
    var keys = Object.keys(
      Object.keys(descriptions)
      .concat(Object.keys(demanded))
      .concat(Object.keys(options.default))
      .reduce(function (acc, key) {
        if (key !== '_') acc[key] = true
        return acc
      }, {})
    )
    var ui = cliui({
      width: wrap,
      wrap: !!wrap
    })

    // the usage string.
    if (usage) {
      var u = usage.replace(/\$0/g, yargs.$0)
      ui.div(u + '\n')
    }

    // your application's commands, i.e., non-option
    // arguments populated in '_'.
    if (commands.length) {
      ui.div(__('Commands:'))

      commands.forEach(function (command) {
        ui.div(
          {text: command[0], padding: [0, 2, 0, 2], width: maxWidth(commands) + 4},
          {text: command[1]}
        )
      })

      ui.div()
    }

    // perform some cleanup on the keys array, making it
    // only include top-level keys not their aliases.
    var aliasKeys = (Object.keys(options.alias) || [])
      .concat(Object.keys(yargs.parsed.newAliases) || [])

    keys = keys.filter(function (key) {
      return !yargs.parsed.newAliases[key] && aliasKeys.every(function (alias) {
        return (options.alias[alias] || []).indexOf(key) === -1
      })
    })

    // populate 'Options:' group with any keys that have not
    // explicitly had a group set.
    if (!groups[defaultGroup]) groups[defaultGroup] = []
    addUngroupedKeys(keys, options.alias, groups)

    // display 'Options:' table along with any custom tables:
    Object.keys(groups).forEach(function (groupName) {
      if (!groups[groupName].length) return

      ui.div(__(groupName))

      // if we've grouped the key 'f', but 'f' aliases 'foobar',
      // normalizedKeys should contain only 'foobar'.
      var normalizedKeys = groups[groupName].map(function (key) {
        if (~aliasKeys.indexOf(key)) return key
        for (var i = 0, aliasKey; (aliasKey = aliasKeys[i]) !== undefined; i++) {
          if (~(options.alias[aliasKey] || []).indexOf(key)) return aliasKey
        }
        return key
      })

      // actually generate the switches string --foo, -f, --bar.
      var switches = normalizedKeys.reduce(function (acc, key) {
        acc[key] = [ key ].concat(options.alias[key] || [])
          .map(function (sw) {
            return (sw.length > 1 ? '--' : '-') + sw
          })
          .join(', ')

        return acc
      }, {})

      normalizedKeys.forEach(function (key) {
        var kswitch = switches[key]
        var desc = descriptions[key] || ''
        var type = null

        if (~desc.lastIndexOf(deferY18nLookupPrefix)) desc = __(desc.substring(deferY18nLookupPrefix.length))

        if (~options.boolean.indexOf(key)) type = '[' + __('boolean') + ']'
        if (~options.count.indexOf(key)) type = '[' + __('count') + ']'
        if (~options.string.indexOf(key)) type = '[' + __('string') + ']'
        if (~options.normalize.indexOf(key)) type = '[' + __('string') + ']'
        if (~options.array.indexOf(key)) type = '[' + __('array') + ']'

        var extra = [
          type,
          demanded[key] ? '[' + __('required') + ']' : null,
          options.choices && options.choices[key] ? '[' + __('choices:') + ' ' +
            self.stringifiedValues(options.choices[key]) + ']' : null,
          defaultString(options.default[key], options.defaultDescription[key])
        ].filter(Boolean).join(' ')

        ui.span(
          {text: kswitch, padding: [0, 2, 0, 2], width: maxWidth(switches) + 4},
          desc
        )

        if (extra) ui.div({text: extra, padding: [0, 0, 0, 2], align: 'right'})
        else ui.div()
      })

      ui.div()
    })

    // describe some common use-cases for your application.
    if (examples.length) {
      ui.div(__('Examples:'))

      examples.forEach(function (example) {
        example[0] = example[0].replace(/\$0/g, yargs.$0)
      })

      examples.forEach(function (example) {
        ui.div(
          {text: example[0], padding: [0, 2, 0, 2], width: maxWidth(examples) + 4},
          example[1]
        )
      })

      ui.div()
    }

    // the usage string.
    if (epilog) {
      var e = epilog.replace(/\$0/g, yargs.$0)
      ui.div(e + '\n')
    }

    return ui.toString()
  }

  // return the maximum width of a string
  // in the left-hand column of a table.
  function maxWidth (table) {
    var width = 0

    // table might be of the form [leftColumn],
    // or {key: leftColumn}}
    if (!Array.isArray(table)) {
      table = Object.keys(table).map(function (key) {
        return [table[key]]
      })
    }

    table.forEach(function (v) {
      width = Math.max(stringWidth(v[0]), width)
    })

    // if we've enabled 'wrap' we should limit
    // the max-width of the left-column.
    if (wrap) width = Math.min(width, parseInt(wrap * 0.5, 10))

    return width
  }

  // make sure any options set for aliases,
  // are copied to the keys being aliased.
  function normalizeAliases () {
    var demanded = yargs.getDemanded()
    var options = yargs.getOptions()

    ;(Object.keys(options.alias) || []).forEach(function (key) {
      options.alias[key].forEach(function (alias) {
        // copy descriptions.
        if (descriptions[alias]) self.describe(key, descriptions[alias])
        // copy demanded.
        if (demanded[alias]) yargs.demand(key, demanded[alias].msg)
        // type messages.
        if (~options.boolean.indexOf(alias)) yargs.boolean(key)
        if (~options.count.indexOf(alias)) yargs.count(key)
        if (~options.string.indexOf(alias)) yargs.string(key)
        if (~options.normalize.indexOf(alias)) yargs.normalize(key)
        if (~options.array.indexOf(alias)) yargs.array(key)
      })
    })
  }

  // given a set of keys, place any keys that are
  // ungrouped under the 'Options:' grouping.
  function addUngroupedKeys (keys, aliases, groups) {
    var groupedKeys = []
    var toCheck = null
    Object.keys(groups).forEach(function (group) {
      groupedKeys = groupedKeys.concat(groups[group])
    })

    keys.forEach(function (key) {
      toCheck = [key].concat(aliases[key])
      if (!toCheck.some(function (k) {
        return groupedKeys.indexOf(k) !== -1
      })) {
        groups[defaultGroup].push(key)
      }
    })
    return groupedKeys
  }

  self.showHelp = function (level) {
    level = level || 'error'
    console[level](self.help())
  }

  self.functionDescription = function (fn) {
    var description = fn.name ? decamelize(fn.name, '-') : __('generated-value')
    return ['(', description, ')'].join('')
  }

  self.stringifiedValues = function (values, separator) {
    var string = ''
    var sep = separator || ', '
    var array = [].concat(values)

    if (!values || !array.length) return string

    array.forEach(function (value) {
      if (string.length) string += sep
      string += JSON.stringify(value)
    })

    return string
  }

  // format the default-value-string displayed in
  // the right-hand column.
  function defaultString (value, defaultDescription) {
    var string = '[' + __('default:') + ' '

    if (value === undefined && !defaultDescription) return null

    if (defaultDescription) {
      string += defaultDescription
    } else {
      switch (typeof value) {
        case 'string':
          string += JSON.stringify(value)
          break
        case 'object':
          string += JSON.stringify(value)
          break
        default:
          string += value
      }
    }

    return string + ']'
  }

  // guess the width of the console window, max-width 80.
  function windowWidth () {
    return wsize.width ? Math.min(80, wsize.width) : null
  }

  // logic for displaying application version.
  var version = null
  self.version = function (ver, opt, msg) {
    version = ver
  }

  self.showVersion = function () {
    if (typeof version === 'function') console.log(version())
    else console.log(version)
  }

  return self
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var stringWidth = __webpack_require__(72)
var stripAnsi = __webpack_require__(73)
var wrap = __webpack_require__(78)
var align = {
  right: alignRight,
  center: alignCenter
}
var top = 0
var right = 1
var bottom = 2
var left = 3

function UI (opts) {
  this.width = opts.width
  this.wrap = opts.wrap
  this.rows = []
}

UI.prototype.span = function () {
  var cols = this.div.apply(this, arguments)
  cols.span = true
}

UI.prototype.div = function () {
  if (arguments.length === 0) this.div('')
  if (this.wrap && this._shouldApplyLayoutDSL.apply(this, arguments)) {
    return this._applyLayoutDSL(arguments[0])
  }

  var cols = []

  for (var i = 0, arg; (arg = arguments[i]) !== undefined; i++) {
    if (typeof arg === 'string') cols.push(this._colFromString(arg))
    else cols.push(arg)
  }

  this.rows.push(cols)
  return cols
}

UI.prototype._shouldApplyLayoutDSL = function () {
  return arguments.length === 1 && typeof arguments[0] === 'string' &&
    /[\t\n]/.test(arguments[0])
}

UI.prototype._applyLayoutDSL = function (str) {
  var _this = this
  var rows = str.split('\n')
  var leftColumnWidth = 0

  // simple heuristic for layout, make sure the
  // second column lines up along the left-hand.
  // don't allow the first column to take up more
  // than 50% of the screen.
  rows.forEach(function (row) {
    var columns = row.split('\t')
    if (columns.length > 1 && stringWidth(columns[0]) > leftColumnWidth) {
      leftColumnWidth = Math.min(
        Math.floor(_this.width * 0.5),
        stringWidth(columns[0])
      )
    }
  })

  // generate a table:
  //  replacing ' ' with padding calculations.
  //  using the algorithmically generated width.
  rows.forEach(function (row) {
    var columns = row.split('\t')
    _this.div.apply(_this, columns.map(function (r, i) {
      return {
        text: r.trim(),
        padding: _this._measurePadding(r),
        width: (i === 0 && columns.length > 1) ? leftColumnWidth : undefined
      }
    }))
  })

  return this.rows[this.rows.length - 1]
}

UI.prototype._colFromString = function (str) {
  return {
    text: str,
    padding: this._measurePadding(str)
  }
}

UI.prototype._measurePadding = function (str) {
  // measure padding without ansi escape codes
  var noAnsi = stripAnsi(str)
  return [0, noAnsi.match(/\s*$/)[0].length, 0, noAnsi.match(/^\s*/)[0].length]
}

UI.prototype.toString = function () {
  var _this = this
  var lines = []

  _this.rows.forEach(function (row, i) {
    _this.rowToString(row, lines)
  })

  // don't display any lines with the
  // hidden flag set.
  lines = lines.filter(function (line) {
    return !line.hidden
  })

  return lines.map(function (line) {
    return line.text
  }).join('\n')
}

UI.prototype.rowToString = function (row, lines) {
  var _this = this
  var padding
  var rrows = this._rasterize(row)
  var str = ''
  var ts
  var width
  var wrapWidth

  rrows.forEach(function (rrow, r) {
    str = ''
    rrow.forEach(function (col, c) {
      ts = '' // temporary string used during alignment/padding.
      width = row[c].width // the width with padding.
      wrapWidth = _this._negatePadding(row[c]) // the width without padding.

      ts += col

      for (var i = 0; i < wrapWidth - stringWidth(col); i++) {
        ts += ' '
      }

      // align the string within its column.
      if (row[c].align && row[c].align !== 'left' && _this.wrap) {
        ts = align[row[c].align](ts, wrapWidth)
        if (stringWidth(ts) < wrapWidth) ts += new Array(width - stringWidth(ts)).join(' ')
      }

      // apply border and padding to string.
      padding = row[c].padding || [0, 0, 0, 0]
      if (padding[left]) str += new Array(padding[left] + 1).join(' ')
      str += addBorder(row[c], ts, '| ')
      str += ts
      str += addBorder(row[c], ts, ' |')
      if (padding[right]) str += new Array(padding[right] + 1).join(' ')

      // if prior row is span, try to render the
      // current row on the prior line.
      if (r === 0 && lines.length > 0) {
        str = _this._renderInline(str, lines[lines.length - 1])
      }
    })

    // remove trailing whitespace.
    lines.push({
      text: str.replace(/ +$/, ''),
      span: row.span
    })
  })

  return lines
}

function addBorder (col, ts, style) {
  if (col.border) {
    if (/[.']-+[.']/.test(ts)) return ''
    else if (ts.trim().length) return style
    else return '  '
  }
  return ''
}

// if the full 'source' can render in
// the target line, do so.
UI.prototype._renderInline = function (source, previousLine) {
  var leadingWhitespace = source.match(/^ */)[0].length
  var target = previousLine.text
  var targetTextWidth = stringWidth(target.trimRight())

  if (!previousLine.span) return source

  // if we're not applying wrapping logic,
  // just always append to the span.
  if (!this.wrap) {
    previousLine.hidden = true
    return target + source
  }

  if (leadingWhitespace < targetTextWidth) return source

  previousLine.hidden = true

  return target.trimRight() + new Array(leadingWhitespace - targetTextWidth + 1).join(' ') + source.trimLeft()
}

UI.prototype._rasterize = function (row) {
  var _this = this
  var i
  var rrow
  var rrows = []
  var widths = this._columnWidths(row)
  var wrapped

  // word wrap all columns, and create
  // a data-structure that is easy to rasterize.
  row.forEach(function (col, c) {
    // leave room for left and right padding.
    col.width = widths[c]
    if (_this.wrap) wrapped = wrap(col.text, _this._negatePadding(col), {hard: true}).split('\n')
    else wrapped = col.text.split('\n')

    if (col.border) {
      wrapped.unshift('.' + new Array(_this._negatePadding(col) + 3).join('-') + '.')
      wrapped.push("'" + new Array(_this._negatePadding(col) + 3).join('-') + "'")
    }

    // add top and bottom padding.
    if (col.padding) {
      for (i = 0; i < (col.padding[top] || 0); i++) wrapped.unshift('')
      for (i = 0; i < (col.padding[bottom] || 0); i++) wrapped.push('')
    }

    wrapped.forEach(function (str, r) {
      if (!rrows[r]) rrows.push([])

      rrow = rrows[r]

      for (var i = 0; i < c; i++) {
        if (rrow[i] === undefined) rrow.push('')
      }
      rrow.push(str)
    })
  })

  return rrows
}

UI.prototype._negatePadding = function (col) {
  var wrapWidth = col.width
  if (col.padding) wrapWidth -= (col.padding[left] || 0) + (col.padding[right] || 0)
  if (col.border) wrapWidth -= 4
  return wrapWidth
}

UI.prototype._columnWidths = function (row) {
  var _this = this
  var widths = []
  var unset = row.length
  var unsetWidth
  var remainingWidth = this.width

  // column widths can be set in config.
  row.forEach(function (col, i) {
    if (col.width) {
      unset--
      widths[i] = col.width
      remainingWidth -= col.width
    } else {
      widths[i] = undefined
    }
  })

  // any unset widths should be calculated.
  if (unset) unsetWidth = Math.floor(remainingWidth / unset)
  widths.forEach(function (w, i) {
    if (!_this.wrap) widths[i] = row[i].width || stringWidth(row[i].text)
    else if (w === undefined) widths[i] = Math.max(unsetWidth, _minWidth(row[i]))
  })

  return widths
}

// calculates the minimum width of
// a column, based on padding preferences.
function _minWidth (col) {
  var padding = col.padding || []
  var minWidth = 1 + (padding[left] || 0) + (padding[right] || 0)
  if (col.border) minWidth += 4
  return minWidth
}

function alignRight (str, width) {
  str = str.trim()
  var padding = ''
  var strWidth = stringWidth(str)

  if (strWidth < width) {
    padding = new Array(width - strWidth + 1).join(' ')
  }

  return padding + str
}

function alignCenter (str, width) {
  str = str.trim()
  var padding = ''
  var strWidth = stringWidth(str.trim())

  if (strWidth < width) {
    padding = new Array(parseInt((width - strWidth) / 2, 10) + 1).join(' ')
  }

  return padding + str
}

module.exports = function (opts) {
  opts = opts || {}

  return new UI({
    width: (opts || {}).width || 80,
    wrap: typeof opts.wrap === 'boolean' ? opts.wrap : true
  })
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stripAnsi = __webpack_require__(73);
var codePointAt = __webpack_require__(75);
var isFullwidthCodePoint = __webpack_require__(76);

// https://github.com/nodejs/io.js/blob/cff7300a578be1b10001f2d967aaedc88aee6402/lib/readline.js#L1345
module.exports = function (str) {
	if (typeof str !== 'string' || str.length === 0) {
		return 0;
	}

	var width = 0;

	str = stripAnsi(str);

	for (var i = 0; i < str.length; i++) {
		var code = codePointAt(str, i);

		// ignore control characters
		if (code <= 0x1f || (code >= 0x7f && code <= 0x9f)) {
			continue;
		}

		// surrogates
		if (code >= 0x10000) {
			i++;
		}

		if (isFullwidthCodePoint(code)) {
			width += 2;
		} else {
			width++;
		}
	}

	return width;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(74)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable babel/new-cap, xo/throw-new-error */

module.exports = function (str, pos) {
	if (str === null || str === undefined) {
		throw TypeError();
	}

	str = String(str);

	var size = str.length;
	var i = pos ? Number(pos) : 0;

	if (Number.isNaN(i)) {
		i = 0;
	}

	if (i < 0 || i >= size) {
		return undefined;
	}

	var first = str.charCodeAt(i);

	if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {
		var second = str.charCodeAt(i + 1);

		if (second >= 0xDC00 && second <= 0xDFFF) {
			return ((first - 0xD800) * 0x400) + second - 0xDC00 + 0x10000;
		}
	}

	return first;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var numberIsNan = __webpack_require__(77);

module.exports = function (x) {
	if (numberIsNan(x)) {
		return false;
	}

	// https://github.com/nodejs/io.js/blob/cff7300a578be1b10001f2d967aaedc88aee6402/lib/readline.js#L1369

	// code points are derived from:
	// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
	if (x >= 0x1100 && (
		x <= 0x115f ||  // Hangul Jamo
		0x2329 === x || // LEFT-POINTING ANGLE BRACKET
		0x232a === x || // RIGHT-POINTING ANGLE BRACKET
		// CJK Radicals Supplement .. Enclosed CJK Letters and Months
		(0x2e80 <= x && x <= 0x3247 && x !== 0x303f) ||
		// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
		0x3250 <= x && x <= 0x4dbf ||
		// CJK Unified Ideographs .. Yi Radicals
		0x4e00 <= x && x <= 0xa4c6 ||
		// Hangul Jamo Extended-A
		0xa960 <= x && x <= 0xa97c ||
		// Hangul Syllables
		0xac00 <= x && x <= 0xd7a3 ||
		// CJK Compatibility Ideographs
		0xf900 <= x && x <= 0xfaff ||
		// Vertical Forms
		0xfe10 <= x && x <= 0xfe19 ||
		// CJK Compatibility Forms .. Small Form Variants
		0xfe30 <= x && x <= 0xfe6b ||
		// Halfwidth and Fullwidth Forms
		0xff01 <= x && x <= 0xff60 ||
		0xffe0 <= x && x <= 0xffe6 ||
		// Kana Supplement
		0x1b000 <= x && x <= 0x1b001 ||
		// Enclosed Ideographic Supplement
		0x1f200 <= x && x <= 0x1f251 ||
		// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
		0x20000 <= x && x <= 0x3fffd)) {
		return true;
	}

	return false;
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Number.isNaN || function (x) {
	return x !== x;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stringWidth = __webpack_require__(72);
var stripAnsi = __webpack_require__(73);

var ESCAPES = [
	'\u001b',
	'\u009b'
];

var END_CODE = 39;

var ESCAPE_CODES = {
	0: 0,
	1: 22,
	2: 22,
	3: 23,
	4: 24,
	7: 27,
	8: 28,
	9: 29,
	30: 39,
	31: 39,
	32: 39,
	33: 39,
	34: 39,
	35: 39,
	36: 39,
	37: 39,
	90: 39,
	40: 49,
	41: 49,
	42: 49,
	43: 49,
	44: 49,
	45: 49,
	46: 49,
	47: 49
};

function wrapAnsi(code) {
	return ESCAPES[0] + '[' + code + 'm';
}

// calculate the length of words split on ' ', ignoring
// the extra characters added by ansi escape codes.
function wordLengths(str) {
	return str.split(' ').map(function (s) {
		return stringWidth(s);
	});
}

// wrap a long word across multiple rows.
// ansi escape codes do not count towards length.
function wrapWord(rows, word, cols) {
	var insideEscape = false;
	var visible = stripAnsi(rows[rows.length - 1]).length;

	for (var i = 0; i < word.length; i++) {
		var x = word[i];

		rows[rows.length - 1] += x;

		if (ESCAPES.indexOf(x) !== -1) {
			insideEscape = true;
		} else if (insideEscape && x === 'm') {
			insideEscape = false;
			continue;
		}

		if (insideEscape) {
			continue;
		}

		visible++;

		if (visible >= cols && i < word.length - 1) {
			rows.push('');
			visible = 0;
		}
	}

	// it's possible that the last row we copy over is only
	// ansi escape characters, handle this edge-case.
	if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
		rows[rows.length - 2] += rows.pop();
	}
}

// the wrap-ansi module can be invoked
// in either 'hard' or 'soft' wrap mode.
//
// 'hard' will never allow a string to take up more
// than cols characters.
//
// 'soft' allows long words to expand past the column length.
function exec(str, cols, opts) {
	var options = opts || {};

	var pre = '';
	var ret = '';
	var escapeCode;

	var lengths = wordLengths(str);
	var words = str.split(' ');
	var rows = [''];

	for (var i = 0, word; (word = words[i]) !== undefined; i++) {
		var rowLength = stringWidth(rows[rows.length - 1]);

		if (rowLength) {
			rows[rows.length - 1] += ' ';
			rowLength++;
		}

		// in 'hard' wrap mode, the length of a line is
		// never allowed to extend past 'cols'.
		if (lengths[i] > cols && options.hard) {
			if (rowLength) {
				rows.push('');
			}
			wrapWord(rows, word, cols);
			continue;
		}

		if (rowLength + lengths[i] > cols && rowLength > 0) {
			if (options.wordWrap === false && rowLength < cols) {
				wrapWord(rows, word, cols);
				continue;
			}

			rows.push('');
		}

		rows[rows.length - 1] += word;
	}

	pre = rows.map(function (r) {
		return r.trim();
	}).join('\n');

	for (var j = 0; j < pre.length; j++) {
		var y = pre[j];

		ret += y;

		if (ESCAPES.indexOf(y) !== -1) {
			var code = parseFloat(/[0-9][^m]*/.exec(pre.slice(j, j + 4)));
			escapeCode = code === END_CODE ? null : code;
		}

		if (escapeCode && ESCAPE_CODES[escapeCode]) {
			if (pre[j + 1] === '\n') {
				ret += wrapAnsi(ESCAPE_CODES[escapeCode]);
			} else if (y === '\n') {
				ret += wrapAnsi(escapeCode);
			}
		}
	}

	return ret;
}

// for each line break, invoke the method separately.
module.exports = function (str, cols, opts) {
	return String(str).split('\n').map(function (substr) {
		return exec(substr, cols, opts);
	}).join('\n');
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str, sep) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	sep = typeof sep === 'undefined' ? '_' : sep;

	return str
		.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
		.toLowerCase();
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * window-size <https://github.com/jonschlinkert/window-size>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert
 * Licensed under the MIT license.
 */

var tty = __webpack_require__(81);

module.exports = (function () {
  var width;
  var height;

  if (tty.isatty(1) && tty.isatty(2)) {
    if (process.stdout.getWindowSize) {
      width = process.stdout.getWindowSize(1)[0];
      height = process.stdout.getWindowSize(1)[1];
    } else if (tty.getWindowSize) {
      width = tty.getWindowSize()[1];
      height = tty.getWindowSize()[0];
    } else if (process.stdout.columns && process.stdout.rows) {
      height = process.stdout.columns;
      width = process.stdout.rows;
    }
  } else {
    Error('window-size could not get size with tty or process.stdout.');
  }

  return {height: height, width: width};
})();


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

// validation-type-stuff, missing params,
// bad implications, custom checks.
module.exports = function (yargs, usage, y18n) {
  var __ = y18n.__
  var __n = y18n.__n
  var self = {}

  // validate appropriate # of non-option
  // arguments were provided, i.e., '_'.
  self.nonOptionCount = function (argv) {
    var demanded = yargs.getDemanded()
    var _s = argv._.length

    if (demanded._ && (_s < demanded._.count || _s > demanded._.max)) {
      if (demanded._.msg !== undefined) {
        usage.fail(demanded._.msg)
      } else if (_s < demanded._.count) {
        usage.fail(
          __('Not enough non-option arguments: got %s, need at least %s', argv._.length, demanded._.count)
        )
      } else {
        usage.fail(
          __('Too many non-option arguments: got %s, maximum of %s', argv._.length, demanded._.max)
        )
      }
    }
  }

  // make sure that any args that require an
  // value (--foo=bar), have a value.
  self.missingArgumentValue = function (argv) {
    var defaultValues = [true, false, '']
    var options = yargs.getOptions()

    if (options.requiresArg.length > 0) {
      var missingRequiredArgs = []

      options.requiresArg.forEach(function (key) {
        var value = argv[key]

        // if a value is explicitly requested,
        // flag argument as missing if it does not
        // look like foo=bar was entered.
        if (~defaultValues.indexOf(value) ||
          (Array.isArray(value) && !value.length)) {
          missingRequiredArgs.push(key)
        }
      })

      if (missingRequiredArgs.length > 0) {
        usage.fail(__n(
          'Missing argument value: %s',
          'Missing argument values: %s',
          missingRequiredArgs.length,
          missingRequiredArgs.join(', ')
        ))
      }
    }
  }

  // make sure all the required arguments are present.
  self.requiredArguments = function (argv) {
    var demanded = yargs.getDemanded()
    var missing = null

    Object.keys(demanded).forEach(function (key) {
      if (!argv.hasOwnProperty(key)) {
        missing = missing || {}
        missing[key] = demanded[key]
      }
    })

    if (missing) {
      var customMsgs = []
      Object.keys(missing).forEach(function (key) {
        var msg = missing[key].msg
        if (msg && customMsgs.indexOf(msg) < 0) {
          customMsgs.push(msg)
        }
      })

      var customMsg = customMsgs.length ? '\n' + customMsgs.join('\n') : ''

      usage.fail(__n(
        'Missing required argument: %s',
        'Missing required arguments: %s',
        Object.keys(missing).length,
        Object.keys(missing).join(', ') + customMsg
      ))
    }
  }

  // check for unknown arguments (strict-mode).
  self.unknownArguments = function (argv, aliases) {
    var aliasLookup = {}
    var descriptions = usage.getDescriptions()
    var demanded = yargs.getDemanded()
    var unknown = []

    Object.keys(aliases).forEach(function (key) {
      aliases[key].forEach(function (alias) {
        aliasLookup[alias] = key
      })
    })

    Object.keys(argv).forEach(function (key) {
      if (key !== '$0' && key !== '_' &&
        !descriptions.hasOwnProperty(key) &&
        !demanded.hasOwnProperty(key) &&
        !aliasLookup.hasOwnProperty(key)) {
        unknown.push(key)
      }
    })

    if (unknown.length > 0) {
      usage.fail(__n(
        'Unknown argument: %s',
        'Unknown arguments: %s',
        unknown.length,
        unknown.join(', ')
      ))
    }
  }

  // validate arguments limited to enumerated choices
  self.limitedChoices = function (argv) {
    var options = yargs.getOptions()
    var invalid = {}

    if (!Object.keys(options.choices).length) return

    Object.keys(argv).forEach(function (key) {
      if (key !== '$0' && key !== '_' &&
        options.choices.hasOwnProperty(key)) {
        [].concat(argv[key]).forEach(function (value) {
          // TODO case-insensitive configurability
          if (options.choices[key].indexOf(value) === -1) {
            invalid[key] = (invalid[key] || []).concat(value)
          }
        })
      }
    })

    var invalidKeys = Object.keys(invalid)

    if (!invalidKeys.length) return

    var msg = __('Invalid values:')
    invalidKeys.forEach(function (key) {
      msg += '\n  ' + __(
        'Argument: %s, Given: %s, Choices: %s',
        key,
        usage.stringifiedValues(invalid[key]),
        usage.stringifiedValues(options.choices[key])
      )
    })
    usage.fail(msg)
  }

  // custom checks, added using the `check` option on yargs.
  var checks = []
  self.check = function (f) {
    checks.push(f)
  }

  self.customChecks = function (argv, aliases) {
    checks.forEach(function (f) {
      try {
        var result = f(argv, aliases)
        if (!result) {
          usage.fail(__('Argument check failed: %s', f.toString()))
        } else if (typeof result === 'string') {
          usage.fail(result)
        }
      } catch (err) {
        usage.fail(err.message ? err.message : err)
      }
    })
  }

  // check implications, argument foo implies => argument bar.
  var implied = {}
  self.implies = function (key, value) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function (k) {
        self.implies(k, key[k])
      })
    } else {
      implied[key] = value
    }
  }
  self.getImplied = function () {
    return implied
  }

  self.implications = function (argv) {
    var implyFail = []

    Object.keys(implied).forEach(function (key) {
      var num
      var origKey = key
      var value = implied[key]

      // convert string '1' to number 1
      num = Number(key)
      key = isNaN(num) ? key : num

      if (typeof key === 'number') {
        // check length of argv._
        key = argv._.length >= key
      } else if (key.match(/^--no-.+/)) {
        // check if key doesn't exist
        key = key.match(/^--no-(.+)/)[1]
        key = !argv[key]
      } else {
        // check if key exists
        key = argv[key]
      }

      num = Number(value)
      value = isNaN(num) ? value : num

      if (typeof value === 'number') {
        value = argv._.length >= value
      } else if (value.match(/^--no-.+/)) {
        value = value.match(/^--no-(.+)/)[1]
        value = !argv[value]
      } else {
        value = argv[value]
      }

      if (key && !value) {
        implyFail.push(origKey)
      }
    })

    if (implyFail.length) {
      var msg = __('Implications failed:') + '\n'

      implyFail.forEach(function (key) {
        msg += ('  ' + key + ' -> ' + implied[key])
      })

      usage.fail(msg)
    }
  }

  return self
}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(44)
var path = __webpack_require__(16)
var util = __webpack_require__(62)

function Y18N (opts) {
  // configurable options.
  opts = opts || {}
  this.directory = opts.directory || './locales'
  this.updateFiles = typeof opts.updateFiles === 'boolean' ? opts.updateFiles : true
  this.locale = opts.locale || 'en'
  this.fallbackToLanguage = typeof opts.fallbackToLanguage === 'boolean' ? opts.fallbackToLanguage : true

  // internal stuff.
  this.cache = {}
  this.writeQueue = []
}

Y18N.prototype.__ = function () {
  var args = Array.prototype.slice.call(arguments)
  var str = args.shift()
  var cb = function () {} // start with noop.

  if (typeof args[args.length - 1] === 'function') cb = args.pop()
  cb = cb || function () {} // noop.

  if (!this.cache[this.locale]) this._readLocaleFile()

  // we've observed a new string, update the language file.
  if (!this.cache[this.locale][str] && this.updateFiles) {
    this.cache[this.locale][str] = str

    // include the current directory and locale,
    // since these values could change before the
    // write is performed.
    this._enqueueWrite([this.directory, this.locale, cb])
  } else {
    cb()
  }

  return util.format.apply(util, [this.cache[this.locale][str] || str].concat(args))
}

Y18N.prototype._enqueueWrite = function (work) {
  this.writeQueue.push(work)
  if (this.writeQueue.length === 1) this._processWriteQueue()
}

Y18N.prototype._processWriteQueue = function () {
  var _this = this
  var work = this.writeQueue[0]

  // destructure the enqueued work.
  var directory = work[0]
  var locale = work[1]
  var cb = work[2]

  var languageFile = this._resolveLocaleFile(directory, locale)
  var serializedLocale = JSON.stringify(this.cache[locale], null, 2)

  fs.writeFile(languageFile, serializedLocale, 'utf-8', function (err) {
    _this.writeQueue.shift()
    if (_this.writeQueue.length > 0) _this._processWriteQueue()
    cb(err)
  })
}

Y18N.prototype._readLocaleFile = function () {
  var localeLookup = {}
  var languageFile = this._resolveLocaleFile(this.directory, this.locale)

  try {
    localeLookup = JSON.parse(fs.readFileSync(languageFile, 'utf-8'))
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.message = 'syntax error in ' + languageFile
    }

    if (err.code === 'ENOENT') localeLookup = {}
    else throw err
  }

  this.cache[this.locale] = localeLookup
}

Y18N.prototype._resolveLocaleFile = function (directory, locale) {
  var file = path.resolve(directory, './', locale + '.json')
  if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf('_')) {
    // attempt fallback to language only
    var languageFile = path.resolve(directory, './', locale.split('_')[0] + '.json')
    if (this._fileExistsSync(languageFile)) file = languageFile
  }
  return file
}

// this only exists because fs.existsSync() "will be deprecated"
// see https://nodejs.org/api/fs.html#fs_fs_existssync_path
Y18N.prototype._fileExistsSync = function (file) {
  try {
    return fs.statSync(file).isFile()
  } catch (err) {
    return false
  }
}

Y18N.prototype.__n = function () {
  var args = Array.prototype.slice.call(arguments)
  var singular = args.shift()
  var plural = args.shift()
  var quantity = args.shift()

  var cb = function () {} // start with noop.
  if (typeof args[args.length - 1] === 'function') cb = args.pop()

  if (!this.cache[this.locale]) this._readLocaleFile()

  var str = quantity === 1 ? singular : plural
  if (this.cache[this.locale][singular]) {
    str = this.cache[this.locale][singular][quantity === 1 ? 'one' : 'other']
  }

  // we've observed a new string, update the language file.
  if (!this.cache[this.locale][singular] && this.updateFiles) {
    this.cache[this.locale][singular] = {
      one: singular,
      other: plural
    }

    // include the current directory and locale,
    // since these values could change before the
    // write is performed.
    this._enqueueWrite([this.directory, this.locale, cb])
  } else {
    cb()
  }

  // if a %d placeholder is provided, add quantity
  // to the arguments expanded by util.format.
  var values = [str]
  if (~str.indexOf('%d')) values.push(quantity)

  return util.format.apply(util, values.concat(args))
}

Y18N.prototype.setLocale = function (locale) {
  this.locale = locale
}

Y18N.prototype.getLocale = function () {
  return this.locale
}

Y18N.prototype.updateLocale = function (obj) {
  if (!this.cache[this.locale]) this._readLocaleFile()

  for (var key in obj) {
    this.cache[this.locale][key] = obj[key]
  }
}

module.exports = function (opts) {
  var y18n = new Y18N(opts)

  // bind all functions to y18n, so that
  // they can be used in isolation.
  for (var key in y18n) {
    if (typeof y18n[key] === 'function') {
      y18n[key] = y18n[key].bind(y18n)
    }
  }

  return y18n
}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var childProcess = __webpack_require__(85);
var execFileSync = childProcess.execFileSync;
var lcid = __webpack_require__(86);
var defaultOpts = {spawn: true};
var cache;

function fallback() {
	cache = 'en_US';
	return cache;
}

function getEnvLocale(env) {
	env = env || Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"});
	var ret = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
	cache = getLocale(ret);
	return ret;
}

function parseLocale(x) {
	var env = x.split('\n').reduce(function (env, def) {
		def = def.split('=');
		env[def[0]] = def[1];
		return env;
	}, {});
	return getEnvLocale(env);
}

function getLocale(str) {
	return (str && str.replace(/[.:].*/, '')) || fallback();
}

module.exports = function (opts, cb) {
	if (typeof opts === 'function') {
		cb = opts;
		opts = defaultOpts;
	} else {
		opts = opts || defaultOpts;
	}

	if (cache || getEnvLocale() || opts.spawn === false) {
		setImmediate(cb, null, cache);
		return;
	}

	var getAppleLocale = function () {
		childProcess.execFile('defaults', ['read', '-g', 'AppleLocale'], function (err, stdout) {
			if (err) {
				fallback();
				return;
			}

			cache = stdout.trim() || fallback();
			cb(null, cache);
		});
	};

	if (process.platform === 'win32') {
		childProcess.execFile('wmic', ['os', 'get', 'locale'], function (err, stdout) {
			if (err) {
				fallback();
				return;
			}

			var lcidCode = parseInt(stdout.replace('Locale', ''), 16);
			cache = lcid.from(lcidCode) || fallback();
			cb(null, cache);
		});
	} else {
		childProcess.execFile('locale', function (err, stdout) {
			if (err) {
				fallback();
				return;
			}

			var res = parseLocale(stdout);

			if (!res && process.platform === 'darwin') {
				getAppleLocale();
				return;
			}

			cache = getLocale(res);
			cb(null, cache);
		});
	}
};

module.exports.sync = function (opts) {
	opts = opts || defaultOpts;

	if (cache || getEnvLocale() || !execFileSync || opts.spawn === false) {
		return cache;
	}

	if (process.platform === 'win32') {
		var stdout;

		try {
			stdout = execFileSync('wmic', ['os', 'get', 'locale'], {encoding: 'utf8'});
		} catch (err) {
			return fallback();
		}

		var lcidCode = parseInt(stdout.replace('Locale', ''), 16);
		cache = lcid.from(lcidCode) || fallback();
		return cache;
	}

	var res;

	try {
		res = parseLocale(execFileSync('locale', {encoding: 'utf8'}));
	} catch (err) {}

	if (!res && process.platform === 'darwin') {
		try {
			cache = execFileSync('defaults', ['read', '-g', 'AppleLocale'], {encoding: 'utf8'}).trim() || fallback();
			return cache;
		} catch (err) {
			return fallback();
		}
	}

	cache = getLocale(res);
	return cache;
};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var invertKv = __webpack_require__(87);
var all = __webpack_require__(88);
var inverted = invertKv(all);

exports.from = function (lcidCode) {
	if (typeof lcidCode !== 'number') {
		throw new TypeError('Expected a number');
	}

	return inverted[lcidCode];
};

exports.to = function (localeId) {
	if (typeof localeId !== 'string') {
		throw new TypeError('Expected a string');
	}

	return all[localeId];
};

exports.all = all;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (obj) {
	if (typeof obj !== 'object') {
		throw new TypeError('Expected an object');
	}

	var ret = {};

	for (var key in obj) {
		var val = obj[key];
		ret[val] = key;
	}

	return ret;
};


/***/ }),
/* 88 */
/***/ (function(module) {

module.exports = JSON.parse("{\"af_ZA\":1078,\"am_ET\":1118,\"ar_AE\":14337,\"ar_BH\":15361,\"ar_DZ\":5121,\"ar_EG\":3073,\"ar_IQ\":2049,\"ar_JO\":11265,\"ar_KW\":13313,\"ar_LB\":12289,\"ar_LY\":4097,\"ar_MA\":6145,\"ar_OM\":8193,\"ar_QA\":16385,\"ar_SA\":1025,\"ar_SY\":10241,\"ar_TN\":7169,\"ar_YE\":9217,\"arn_CL\":1146,\"as_IN\":1101,\"az_AZ\":2092,\"ba_RU\":1133,\"be_BY\":1059,\"bg_BG\":1026,\"bn_IN\":1093,\"bo_BT\":2129,\"bo_CN\":1105,\"br_FR\":1150,\"bs_BA\":8218,\"ca_ES\":1027,\"co_FR\":1155,\"cs_CZ\":1029,\"cy_GB\":1106,\"da_DK\":1030,\"de_AT\":3079,\"de_CH\":2055,\"de_DE\":1031,\"de_LI\":5127,\"de_LU\":4103,\"div_MV\":1125,\"dsb_DE\":2094,\"el_GR\":1032,\"en_AU\":3081,\"en_BZ\":10249,\"en_CA\":4105,\"en_CB\":9225,\"en_GB\":2057,\"en_IE\":6153,\"en_IN\":18441,\"en_JA\":8201,\"en_MY\":17417,\"en_NZ\":5129,\"en_PH\":13321,\"en_TT\":11273,\"en_US\":1033,\"en_ZA\":7177,\"en_ZW\":12297,\"es_AR\":11274,\"es_BO\":16394,\"es_CL\":13322,\"es_CO\":9226,\"es_CR\":5130,\"es_DO\":7178,\"es_EC\":12298,\"es_ES\":3082,\"es_GT\":4106,\"es_HN\":18442,\"es_MX\":2058,\"es_NI\":19466,\"es_PA\":6154,\"es_PE\":10250,\"es_PR\":20490,\"es_PY\":15370,\"es_SV\":17418,\"es_UR\":14346,\"es_US\":21514,\"es_VE\":8202,\"et_EE\":1061,\"eu_ES\":1069,\"fa_IR\":1065,\"fi_FI\":1035,\"fil_PH\":1124,\"fo_FO\":1080,\"fr_BE\":2060,\"fr_CA\":3084,\"fr_CH\":4108,\"fr_FR\":1036,\"fr_LU\":5132,\"fr_MC\":6156,\"fy_NL\":1122,\"ga_IE\":2108,\"gbz_AF\":1164,\"gl_ES\":1110,\"gsw_FR\":1156,\"gu_IN\":1095,\"ha_NG\":1128,\"he_IL\":1037,\"hi_IN\":1081,\"hr_BA\":4122,\"hr_HR\":1050,\"hu_HU\":1038,\"hy_AM\":1067,\"id_ID\":1057,\"ii_CN\":1144,\"is_IS\":1039,\"it_CH\":2064,\"it_IT\":1040,\"iu_CA\":2141,\"ja_JP\":1041,\"ka_GE\":1079,\"kh_KH\":1107,\"kk_KZ\":1087,\"kl_GL\":1135,\"kn_IN\":1099,\"ko_KR\":1042,\"kok_IN\":1111,\"ky_KG\":1088,\"lb_LU\":1134,\"lo_LA\":1108,\"lt_LT\":1063,\"lv_LV\":1062,\"mi_NZ\":1153,\"mk_MK\":1071,\"ml_IN\":1100,\"mn_CN\":2128,\"mn_MN\":1104,\"moh_CA\":1148,\"mr_IN\":1102,\"ms_BN\":2110,\"ms_MY\":1086,\"mt_MT\":1082,\"my_MM\":1109,\"nb_NO\":1044,\"ne_NP\":1121,\"nl_BE\":2067,\"nl_NL\":1043,\"nn_NO\":2068,\"ns_ZA\":1132,\"oc_FR\":1154,\"or_IN\":1096,\"pa_IN\":1094,\"pl_PL\":1045,\"ps_AF\":1123,\"pt_BR\":1046,\"pt_PT\":2070,\"qut_GT\":1158,\"quz_BO\":1131,\"quz_EC\":2155,\"quz_PE\":3179,\"rm_CH\":1047,\"ro_RO\":1048,\"ru_RU\":1049,\"rw_RW\":1159,\"sa_IN\":1103,\"sah_RU\":1157,\"se_FI\":3131,\"se_NO\":1083,\"se_SE\":2107,\"si_LK\":1115,\"sk_SK\":1051,\"sl_SI\":1060,\"sma_NO\":6203,\"sma_SE\":7227,\"smj_NO\":4155,\"smj_SE\":5179,\"smn_FI\":9275,\"sms_FI\":8251,\"sq_AL\":1052,\"sr_BA\":7194,\"sr_SP\":3098,\"sv_FI\":2077,\"sv_SE\":1053,\"sw_KE\":1089,\"syr_SY\":1114,\"ta_IN\":1097,\"te_IN\":1098,\"tg_TJ\":1064,\"th_TH\":1054,\"tk_TM\":1090,\"tmz_DZ\":2143,\"tn_ZA\":1074,\"tr_TR\":1055,\"tt_RU\":1092,\"ug_CN\":1152,\"uk_UA\":1058,\"ur_IN\":2080,\"ur_PK\":1056,\"uz_UZ\":2115,\"vi_VN\":1066,\"wen_DE\":1070,\"wo_SN\":1160,\"xh_ZA\":1076,\"yo_NG\":1130,\"zh_CHS\":4,\"zh_CHT\":31748,\"zh_CN\":2052,\"zh_HK\":3076,\"zh_MO\":5124,\"zh_SG\":4100,\"zh_TW\":1028,\"zu_ZA\":1077}");

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * env.js: Simple memory-based store for environment variables
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var util = __webpack_require__(62),
    common = __webpack_require__(54),
    Memory = __webpack_require__(57).Memory;

//
// ### function Env (options)
// #### @options {Object} Options for this instance.
// Constructor function for the Env nconf store, a simple abstraction
// around the Memory store that can read process environment variables.
//
var Env = exports.Env = function (options) {
  Memory.call(this, options);

  options        = options || {};
  this.type      = 'env';
  this.readOnly  = true;
  this.whitelist = options.whitelist || [];
  this.separator = options.separator || '';
  this.lowerCase = options.lowerCase || false;

  if (({}).toString.call(options.match) === '[object RegExp]'
      && typeof options !== 'string') {
    this.match = options.match;
  }

  if (options instanceof Array) {
    this.whitelist = options;
  }
  if (typeof(options) === 'string') {
    this.separator = options;
  }
};

// Inherit from the Memory store
util.inherits(Env, Memory);

//
// ### function loadSync ()
// Loads the data passed in from `process.env` into this instance.
//
Env.prototype.loadSync = function () {
  this.loadEnv();
  return this.store;
};

//
// ### function loadEnv ()
// Loads the data passed in from `process.env` into this instance.
//
Env.prototype.loadEnv = function () {
  var self = this;

  var env = Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"});

  if (this.lowerCase) {
    env = {};
    Object.keys(Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"})).forEach(function (key) {
      env[key.toLowerCase()] = Object({"WARN_DB_SIZE":409600,"MAX_MULTISELECT_USERS":5,"MULTISELECT_DEBOUNCE_MS":250,"PER_PAGE":10,"NODE_ENV":"production","CLIENT_VERSION":"2.9.0"})[key];
    });
  }

  this.readOnly = false;
  Object.keys(env).filter(function (key) {
    if (self.match && self.whitelist.length) {
      return key.match(self.match) || self.whitelist.indexOf(key) !== -1
    }
    else if (self.match) {
      return key.match(self.match);
    }
    else {
      return !self.whitelist.length || self.whitelist.indexOf(key) !== -1
    }
  }).forEach(function (key) {
    if (self.separator) {
      self.set(common.key.apply(common, key.split(self.separator)), env[key]);
    }
    else {
      self.set(key, env[key]);
    }
  });

  this.readOnly = true;
  return this.store;
};



/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * file.js: Simple file storage engine for nconf files
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var crypto = __webpack_require__(36),
    fs = __webpack_require__(44),
    path = __webpack_require__(16),
    util = __webpack_require__(62),
    Secure = __webpack_require__(91),
    formats = __webpack_require__(55),
    Memory = __webpack_require__(57).Memory,
    exists = fs.exists || path.exists,
    existsSync = fs.existsSync || path.existsSync;

//
// ### function File (options)
// #### @options {Object} Options for this instance
// Constructor function for the File nconf store, a simple abstraction
// around the Memory store that can persist configuration to disk.
//
var File = exports.File = function (options) {
  if (!options || !options.file) {
    throw new Error ('Missing required option `file`');
  }

  Memory.call(this, options);

  this.type    = 'file';
  this.file    = options.file;
  this.dir     = options.dir    || process.cwd();
  this.format  = options.format || formats.json;
  this.secure  = options.secure;
  this.spacing = options.json_spacing
    || options.spacing
    || 2;

  if (this.secure) {
    this.secure = Buffer.isBuffer(this.secure) || typeof this.secure === 'string'
      ? { secret: this.secure.toString() }
      : this.secure;

    this.secure.alg = this.secure.alg || 'aes-256-ctr';
    if (this.secure.secretPath) {
      this.secure.secret = fs.readFileSync(this.secure.secretPath, 'utf8');
    }

    if (!this.secure.secret) {
      throw new Error('secure.secret option is required');
    }

    this.keys = new Secure({
      secret: this.secure.secret,
      alg: this.secure.alg,
      format: this.format
    });
  }

  if (options.search) {
    this.search(this.dir);
  }
};

// Inherit from the Memory store
util.inherits(File, Memory);

//
// ### function save (value, callback)
// #### @value {Object} _Ignored_ Left here for consistency
// #### @callback {function} Continuation to respond to when complete.
// Saves the current configuration object to disk at `this.file`
// using the format specified by `this.format`.
//
File.prototype.save = function (value, callback) {
  if (!callback) {
    callback = value;
    value = null;
  }

  fs.writeFile(this.file, this.stringify(), callback);
};

//
// ### function saveSync (value, callback)
// #### @value {Object} _Ignored_ Left here for consistency
// #### @callback {function} **Optional** Continuation to respond to when complete.
// Saves the current configuration object to disk at `this.file`
// using the format specified by `this.format` synchronously.
//
File.prototype.saveSync = function (value) {
  fs.writeFileSync(this.file, this.stringify());
  return this.store;
};

//
// ### function load (callback)
// #### @callback {function} Continuation to respond to when complete.
// Responds with an Object representing all keys associated in this instance.
//
File.prototype.load = function (callback) {
  var self = this;

  exists(self.file, function (exists) {
    if (!exists) {
      return callback(null, {});
    }

    //
    // Else, the path exists, read it from disk
    //
    fs.readFile(self.file, function (err, data) {
      if (err) {
        return callback(err);
      }

      try {
        // Deals with string that include BOM
        var stringData = data.toString();
        if (stringData.charAt(0) === '\uFEFF') {
          stringData = stringData.substr(1);
        }

        self.store = self.parse(stringData);
      }
      catch (ex) {
        return callback(new Error("Error parsing your configuration file: [" + self.file + ']: ' + ex.message));
      }

      callback(null, self.store);
    });
  });
};

//
// ### function loadSync (callback)
// Attempts to load the data stored in `this.file` synchronously
// and responds appropriately.
//
File.prototype.loadSync = function () {
  if (!existsSync(this.file)) {
    this.store = {};
    return this.store;
  }

  //
  // Else, the path exists, read it from disk
  //
  try {
    // Deals with file that include BOM
    var fileData = fs.readFileSync(this.file, 'utf8');
    if (fileData.charAt(0) === '\uFEFF') {
      fileData = fileData.substr(1);
    }

    this.store = this.parse(fileData);
  }
  catch (ex) {
    throw new Error("Error parsing your configuration file: [" + this.file + ']: ' + ex.message);
  }

  return this.store;
};

//
// ### function stringify ()
// Returns an encrypted version of the contents IIF
// `this.secure` is enabled
//
File.prototype.stringify = function () {
  var data = this.store,
      self = this;

  if (this.secure) {
    data = this.keys.encrypt(data);
  }

  return this.format.stringify(data, null, this.spacing);
};

//
// ### function parse (contents)
// Returns a decrypted version of the contents IFF
// `this.secure` is enabled.
//
File.prototype.parse = function (contents) {
  var parsed = this.format.parse(contents),
      self = this;

  if (!this.secure) {
    return parsed;
  }

  return this.keys.decrypt(parsed);

};


//
// ### function search (base)
// #### @base {string} Base directory (or file) to begin searching for the target file.
// Attempts to find `this.file` by iteratively searching up the
// directory structure
//
File.prototype.search = function (base) {
  var looking = true,
      fullpath,
      previous,
      stats;

  base = base || process.cwd();

  if (this.file[0] === '/') {
    //
    // If filename for this instance is a fully qualified path
    // (i.e. it starts with a `'/'`) then check if it exists
    //
    try {
      stats = fs.statSync(fs.realpathSync(this.file));
      if (stats.isFile()) {
        fullpath = this.file;
        looking = false;
      }
    }
    catch (ex) {
      //
      // Ignore errors
      //
    }
  }

  if (looking && base) {
    //
    // Attempt to stat the realpath located at `base`
    // if the directory does not exist then return false.
    //
    try {
      var stat = fs.statSync(fs.realpathSync(base));
      looking = stat.isDirectory();
    }
    catch (ex) {
      return false;
    }
  }

  while (looking) {
    //
    // Iteratively look up the directory structure from `base`
    //
    try {
      stats = fs.statSync(fs.realpathSync(fullpath = path.join(base, this.file)));
      looking = stats.isDirectory();
    }
    catch (ex) {
      previous = base;
      base = path.dirname(base);

      if (previous === base) {
        //
        // If we've reached the top of the directory structure then simply use
        // the default file path.
        //
        try {
          stats = fs.statSync(fs.realpathSync(fullpath = path.join(this.dir, this.file)));
          if (stats.isDirectory()) {
            fullpath = undefined;
          }
        }
        catch (ex) {
          //
          // Ignore errors
          //
        }

        looking = false;
      }
    }
  }

  //
  // Set the file for this instance to the fullpath
  // that we have found during the search. In the event that
  // the search was unsuccessful use the original value for `this.file`.
  //
  this.file = fullpath || this.file;

  return fullpath;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = __webpack_require__(36);

var json = {
  stringify: function (obj, replacer, spacing) {
    return JSON.stringify(obj, replacer || null, spacing || 2)
  },
  parse: JSON.parse
};

module.exports = Secure;
/**
 * @constructor
 * Simple Object used to serialize and deserialize
 */
function Secure(opts) {
  opts = opts || {};
  this.secret = typeof opts !== 'string'
    ? opts.secret
    : opts;

  this.format = opts.format || json;
  this.alg = opts.alg || 'aes-256-ctr';

  if (!this.secret) throw new Error('Secret is a required option');
}

Secure.prototype.encrypt = function encrypt(data, callback) {
  var self = this;

  return Object.keys(data).reduce(function (acc, key) {
    var value = self.format.stringify(data[key]);
    acc[key] = {
      alg: self.alg,
      value: cipherConvert(value, {
        alg: self.alg,
        secret: self.secret,
        encs: { input: 'utf8', output: 'hex' }
      })
    };

    return acc;
  }, {});

 };

Secure.prototype.decrypt = function decrypt(data, callback) {
  var self = this;

  return Object.keys(data).reduce(function (acc, key) {
    var decrypted = cipherConvert(data[key].value, {
      alg: data[key].alg || self.alg,
      secret: self.secret,
      encs: { input: 'hex', output: 'utf8' }
    });

    acc[key] = self.format.parse(decrypted);
    return acc;
  }, {});

 };

//
// ### function cipherConvert (contents, opts)
// Returns the result of the cipher operation
// on the contents contents.
//
function cipherConvert(contents, opts) {
  var encs = opts.encs;
  var cipher = crypto.createCipher(opts.alg, opts.secret);
  return cipher.update(contents, encs.input, encs.output)
    + cipher.final(encs.output);
}


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * literal.js: Simple literal Object store for nconf.
 *
 * (C) 2011, Charlie Robbins and the Contributors.
 *
 */

var util = __webpack_require__(62),
    Memory = __webpack_require__(57).Memory

var Literal = exports.Literal = function Literal (options) {
  Memory.call(this, options);

  options       = options || {}
  this.type     = 'literal';
  this.readOnly = true;
  this.store    = options.store || options;
};

// Inherit from Memory store.
util.inherits(Literal, Memory);

//
// ### function loadSync (callback)
// Returns the data stored in `this.store` synchronously.
//
Literal.prototype.loadSync = function () {
  return this.store;
};

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = require("lru-memoizer@1.10.0");

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var auth0_extension_tools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(auth0_extension_tools__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apiCall__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95);



/* harmony default export */ __webpack_exports__["default"] = (function (client, entity) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var perPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
  var concurrency = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;

  if (client === null || client === undefined) {
    throw new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_1__["ArgumentError"]('Must provide a auth0 client object.');
  }

  if (!entity && !client[entity]) {
    throw new auth0_extension_tools__WEBPACK_IMPORTED_MODULE_1__["ArgumentError"]('Must provide a valid entity for auth0 client.');
  }

  var getter = client[entity].getAll;
  var options = Object.assign({}, opts, {
    per_page: perPage
  });
  var result = [];
  var total = 0;
  var pageCount = 0;

  var getTotals = function getTotals() {
    return Object(_apiCall__WEBPACK_IMPORTED_MODULE_2__["default"])(client, getter, [Object.assign({}, options, {
      include_totals: true,
      page: 0
    })]).then(function (response) {
      total = response.total || 0;
      pageCount = Math.ceil(total / perPage);
      var data = response[entity] || response || [];
      data.forEach(function (item) {
        return result.push(item);
      });
      return null;
    });
  };

  var getPage = function getPage(page) {
    return Object(_apiCall__WEBPACK_IMPORTED_MODULE_2__["default"])(client, getter, [Object.assign({}, options, {
      page: page
    })]).then(function (data) {
      data.forEach(function (item) {
        return result.push(item);
      });
      return null;
    });
  };

  var getAll = function getAll() {
    return getTotals().then(function () {
      if (total === 0 || result.length >= total) {
        return result;
      }

      var pages = [];

      for (var i = 1; i <= pageCount; i++) {
        pages.push(i);
      }

      return bluebird__WEBPACK_IMPORTED_MODULE_0___default.a.map(pages, getPage, {
        concurrency
      });
    });
  };

  return getAll().then(function () {
    return result;
  });
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_0__);


var idle = function idle(timeout) {
  return new bluebird__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve) {
    return setTimeout(function () {
      return resolve();
    }, timeout * 1000);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (function (context, promise, args) {
  var retry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
  var retriesLeft = retry;

  var tryRequest = function tryRequest() {
    return promise.apply(context, args).then(function (data) {
      return bluebird__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(data);
    }).catch(function (err) {
      var originalError = err.originalError || {};
      var ratelimitReset = originalError.response && originalError.response.header && originalError.response.header['x-ratelimit-reset'] || 0;
      var currentTime = Math.round(new Date().getTime() / 1000);
      var maxTimeout = 10; // wait for 10 seconds max

      var timeout = parseInt(ratelimitReset, 10) - currentTime;

      if (originalError.status === 429 && retriesLeft > 0 && ratelimitReset && timeout <= maxTimeout) {
        retriesLeft--;

        if (timeout <= 0) {
          timeout = 1;
        }

        return idle(timeout).then(tryRequest);
      }

      return bluebird__WEBPACK_IMPORTED_MODULE_0___default.a.reject(err);
    });
  };

  return tryRequest();
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/applications/{clientId}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:applications']
      },
      description: 'Get a single application based on its Client ID.',
      validate: {
        params: {
          clientId: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required()
        }
      },
      pre: [server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      return req.pre.auth0.clients.get({
        client_id: req.params.clientId
      }).then(function (client) {
        return reply(client);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_multipartRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(94);



module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/applications',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:applications']
      },
      pre: [server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      return Object(_lib_multipartRequest__WEBPACK_IMPORTED_MODULE_1__["default"])(req.pre.auth0, 'clients', {
        is_global: false,
        fields: 'client_id,name,callbacks,app_type'
      }).then(function (clients) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(clients).filter(function (client) {
          return client.app_type === 'spa' || client.app_type === 'native' || client.app_type === 'regular_web';
        }).sortBy(function (client) {
          return client.name.toLowerCase();
        }).value();
      }).then(function (applications) {
        return reply(applications);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_multipartRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(94);



module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/configuration/status',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:configuration']
      },
      pre: [server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      return Object(_lib_multipartRequest__WEBPACK_IMPORTED_MODULE_1__["default"])(req.pre.auth0, 'rules', {
        fields: 'name,enabled'
      }).then(function (rules) {
        var rule = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(rules, {
          name: 'auth0-authorization-extension'
        });

        return {
          exists: !!rule,
          enabled: rule ? rule.enabled : false
        };
      }).then(function (rule) {
        req.storage.getStatus().then(function (database) {
          return reply({
            rule,
            database
          });
        }).catch(function () {
          return reply({
            rule,
            database: {
              size: 0,
              type: 'unknown'
            }
          });
        });
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = function () {
  return {
    method: 'GET',
    path: '/api/configuration',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:configuration']
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getConfiguration().then(function (config) {
        return reply(config);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = function () {
  return {
    method: 'GET',
    path: '/api/configuration/export',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:configuration']
      }
    },
    handler: function handler(req, reply) {
      if (!req.storage.provider || !req.storage.provider.storageContext || typeof req.storage.provider.storageContext.read !== 'function') {
        return reply.error(new Error('Unable to use "export" without proper storage'));
      }

      return req.storage.provider.storageContext.read().then(function (result) {
        return reply(result);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _schemas_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(102);


module.exports = function () {
  return {
    method: 'POST',
    path: '/api/configuration/import',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:configuration']
      },
      validate: {
        payload: _schemas_storage__WEBPACK_IMPORTED_MODULE_0__["default"]
      }
    },
    handler: function handler(req, reply) {
      if (!req.storage.provider || !req.storage.provider.storageContext || typeof req.storage.provider.storageContext.write !== 'function') {
        return reply.error(new Error('Unable to use "import" without proper storage'));
      }

      if (req.storage.provider.storageContext.storage && req.storage.provider.storageContext.storage.set) {
        return req.storage.provider.storageContext.storage.set(req.payload, {
          force: true
        }, function (err) {
          if (err) {
            return reply.error(err);
          }

          return reply().code(204);
        });
      }

      return req.storage.provider.storageContext.write(req.payload).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(103);



var extend = function extend(schema) {
  return schema.keys({
    _id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required()
  });
};

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  configuration: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(extend(_configuration__WEBPACK_IMPORTED_MODULE_1__["default"])),
  groups: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.object()),
  roles: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.object()),
  permissions: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.object()),
  applications: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.object()),
  rules: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.object())
}));

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  groupsInToken: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean(),
  rolesInToken: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean(),
  permissionsInToken: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean(),
  persistGroups: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean(),
  persistRoles: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean(),
  persistPermissions: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean(),
  groupsPassthrough: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean(),
  rolesPassthrough: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean(),
  permissionsPassthrough: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean()
}));

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _schemas_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(103);
/* harmony import */ var _lib_compileRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(105);
/* harmony import */ var _lib_multipartRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






module.exports = function (server) {
  return {
    method: 'PATCH',
    path: '/api/configuration',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:configuration']
      },
      pre: [server.handlers.managementClient],
      validate: {
        options: {
          allowUnknown: false
        },
        payload: _schemas_configuration__WEBPACK_IMPORTED_MODULE_2__["default"]
      }
    },
    handler: function handler(req, reply) {
      var config = req.payload;
      Object(_lib_compileRule__WEBPACK_IMPORTED_MODULE_3__["default"])(req.storage, req.pre.auth0, config, req.auth.credentials.email || 'unknown').then(function (script) {
        Object(_lib_multipartRequest__WEBPACK_IMPORTED_MODULE_4__["default"])(req.pre.auth0, 'rules', {
          fields: 'name,id'
        }).then(function (rules) {
          var payload = {
            name: 'auth0-authorization-extension',
            enabled: true,
            script
          };

          var rule = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(rules, {
            name: payload.name
          });

          if (!rule) {
            return req.pre.auth0.rules.create(_objectSpread({
              stage: 'login_success'
            }, payload));
          }

          return req.pre.auth0.rules.update({
            id: rule.id
          }, payload);
        });
      }).then(function () {
        return req.storage.updateConfiguration(config);
      }).then(function (updated) {
        return reply(updated);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _generateApiKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(106);
/* harmony import */ var _rules_authorize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(107);
/* harmony import */ var _rules_authorize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_rules_authorize__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = (function (storage, auth0) {
  var configuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var userName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return storage.getApiKey().then(function (key) {
    if (!key) {
      return Object(_generateApiKey__WEBPACK_IMPORTED_MODULE_2__["default"])(storage, auth0);
    }

    return null;
  }).then(function () {
    return ejs__WEBPACK_IMPORTED_MODULE_0___default.a.render(_rules_authorize__WEBPACK_IMPORTED_MODULE_3___default.a, {
      extensionUrl: Object(_config__WEBPACK_IMPORTED_MODULE_1__["default"])('PUBLIC_WT_URL').replace(/\/$/g, ''),
      updateTime: function updateTime() {
        return new Date().toISOString();
      },
      config: configuration,
      userName
    });
  });
});

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



var hashApiKey = function hashApiKey(key) {
  return crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHmac('sha256', `${key} + ${Object(_config__WEBPACK_IMPORTED_MODULE_1__["default"])('AUTH0_CLIENT_SECRET')}`).update(Object(_config__WEBPACK_IMPORTED_MODULE_1__["default"])('EXTENSION_SECRET')).digest('hex');
};

/* harmony default export */ __webpack_exports__["default"] = (function (storage, auth0) {
  var key = crypto__WEBPACK_IMPORTED_MODULE_0___default.a.randomBytes(32).toString('hex');
  var hash = hashApiKey(key);
  return auth0.rulesConfigs.set({
    key: 'AUTHZ_EXT_API_KEY'
  }, {
    value: hash
  }).then(function () {
    return storage.updateApiKey(key);
  }).then(function () {
    return hash;
  });
});

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = `/*
*  This rule been automatically generated by auth0-authz-extension
*  Updated by <%= userName %>, <%= updateTime() %>
 */
function (user, context, callback) {
  var _ = require('lodash');
  var EXTENSION_URL = "<%= extensionUrl %>";

  var audience = '';
  audience = audience || (context.request && context.request.query && context.request.query.audience);
  if (audience === 'urn:auth0-authz-api') {
    return callback(new UnauthorizedError('no_end_users'));
  }

  audience = audience || (context.request && context.request.body && context.request.body.audience);
  if (audience === 'urn:auth0-authz-api') {
    return callback(new UnauthorizedError('no_end_users'));
  }

  getPolicy(user, context, function(err, res, data) {
    if (err) {
      console.log('Error from Authorization Extension:', err);
      return callback(new UnauthorizedError('Authorization Extension: ' + err.message));
    }

    if (res.statusCode !== 200) {
      console.log('Error from Authorization Extension:', res.body || res.statusCode);
      return callback(
        new UnauthorizedError('Authorization Extension: ' + ((res.body && (res.body.message || res.body) || res.statusCode)))
      );
    }

    // Update the user object.<% if (config.groupsInToken && !config.groupsPassthrough) { %>
    user.groups = data.groups;<% } %><% if (config.groupsInToken && config.groupsPassthrough) { %>
    user.groups = mergeRecords(user.groups, data.groups);<% } %><% if (config.rolesInToken && !config.rolesPassthrough) { %>
    user.roles = data.roles;<% } %><% if (config.rolesInToken && config.rolesPassthrough) { %>
    user.roles = mergeRecords(user.roles, data.roles);<% } %><% if (config.permissionsInToken && !config.permissionsPassthrough) { %>
    user.permissions = data.permissions;<% } %><% if (config.permissionsInToken && config.permissionsPassthrough) { %>
    user.permissions = mergeRecords(user.permissions, data.permissions);<% } %>
<% if (config.persistGroups || config.persistRoles || config.persistPermissions) { %>
    // Store this in the user profile (app_metadata).
    saveToMetadata(user, data.groups, data.roles, data.permissions, function(err) {
      return callback(err, user, context);
    });
<% } else { %>
    return callback(null, user, context);
<% } %>  });
  
  // Convert groups to array
  function parseGroups(data) {
    if (typeof data === 'string') {
      // split groups represented as string by spaces and/or comma
      return data.replace(/,/g, ' ').replace(/\\s+/g, ' ').split(' ');
    }
    return data;
  }

  // Get the policy for the user.
  function getPolicy(user, context, cb) {
    request.post({
      url: EXTENSION_URL + "/api/users/" + user.user_id + "/policy/" + context.clientID,
      headers: {
        "x-api-key": configuration.AUTHZ_EXT_API_KEY
      },
      json: {
        connectionName: context.connection || user.identities[0].connection,
        groups: parseGroups(user.groups)
      },
      timeout: 5000
    }, cb);
  }<% if (config.persistGroups || config.persistRoles || config.persistPermissions) { %>

  // Store authorization data in the user profile so we can query it later.
  function saveToMetadata(user, groups, roles, permissions, cb) {
    user.app_metadata = user.app_metadata || {};
    user.app_metadata.authorization = {<% if (config.persistGroups && !config.groupsPassthrough) { %>
      groups: groups,<% } %><% if (config.persistGroups && config.groupsPassthrough) { %>
      groups: mergeRecords(user.groups, groups),<% } %><% if (config.persistRoles && !config.rolesPassthrough) { %>
      roles: roles,<% } %><% if (config.persistRoles && config.rolesPassthrough) { %>
      roles: mergeRecords(user.roles, roles),<% } %><% if (config.persistPermissions && !config.permissionsPassthrough) { %>
      permissions: permissions<% } %><% if (config.persistPermissions && config.permissionsPassthrough) { %>
      permissions: mergeRecords(user.permissions, permissions)<% } %>
    };

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function() {
      cb();
    })
    .catch(function(err){
      cb(err);
    });
  }<% } %><% if (config.groupsPassthrough || config.rolesPassthrough || config.permissionsPassthrough) { %>

  // Merge the IdP records with the records of the extension.
  function mergeRecords(idpRecords, extensionRecords) {
    idpRecords = idpRecords || [ ];
    extensionRecords = extensionRecords || [ ];

    if (!Array.isArray(idpRecords)) {
      idpRecords = idpRecords.replace(/,/g, ' ').replace(/\\s+/g, ' ').split(' ');
    }

    return _.uniq(_.union(idpRecords, extensionRecords));
  }<% } %>
}`;

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _lib_generateApiKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(106);


module.exports = function (server) {
  return {
    method: 'PATCH',
    path: '/api/configuration/rotate-apikey',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:configuration']
      },
      pre: [server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      return Object(_lib_generateApiKey__WEBPACK_IMPORTED_MODULE_0__["default"])(req.storage, req.pre.auth0).then(function (hash) {
        return reply({
          hash
        });
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _lib_apiaccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);


module.exports = function () {
  return {
    method: 'GET',
    path: '/api/configuration/resource-server',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:resource-server']
      }
    },
    handler: function handler(req, reply) {
      return Object(_lib_apiaccess__WEBPACK_IMPORTED_MODULE_0__["getApi"])(req).then(function (api) {
        return reply({
          apiAccess: !!api.identifier,
          token_lifetime: api.token_lifetime
        });
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_apiaccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);



module.exports = function () {
  return {
    method: 'PATCH',
    path: '/api/configuration/resource-server',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:resource-server']
      },
      validate: {
        payload: {
          apiAccess: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean().required(),
          token_lifetime: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer()
        }
      }
    },
    handler: function handler(req, reply) {
      if (!req.payload.apiAccess) {
        return Object(_lib_apiaccess__WEBPACK_IMPORTED_MODULE_1__["deleteApi"])(req).then(function () {
          return reply().code(204);
        }).catch(function (err) {
          return reply.error(err);
        });
      }

      return Object(_lib_apiaccess__WEBPACK_IMPORTED_MODULE_1__["getApi"])(req).then(function (resourceServer) {
        if (resourceServer) {
          return Object(_lib_apiaccess__WEBPACK_IMPORTED_MODULE_1__["updateApi"])(req, req.payload.token_lifetime);
        }

        return Object(_lib_apiaccess__WEBPACK_IMPORTED_MODULE_1__["createApi"])(req, req.payload.token_lifetime);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _lib_apiaccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);


module.exports = function () {
  return {
    method: 'POST',
    path: '/api/configuration/resource-server',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['create:resource-server']
      }
    },
    handler: function handler(req, reply) {
      return Object(_lib_apiaccess__WEBPACK_IMPORTED_MODULE_0__["createApi"])(req).then(function (api) {
        return reply(api);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _lib_apiaccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);


module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/configuration/resource-server',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['delete:resource-server']
      }
    },
    handler: function handler(req, reply) {
      return Object(_lib_apiaccess__WEBPACK_IMPORTED_MODULE_0__["deleteApi"])(req).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_multipartRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(94);



module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/connections',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:connections']
      },
      pre: [server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      return Object(_lib_multipartRequest__WEBPACK_IMPORTED_MODULE_1__["default"])(req.pre.auth0, 'connections', {
        fields: 'id,name,strategy'
      }).then(function (connections) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(connections).sortBy(function (conn) {
          return conn.name.toLowerCase();
        }).value();
      }).then(function (connections) {
        return reply(connections);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _lib_apiaccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var _lib_multipartRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94);





module.exports = function (server) {
  return {
    method: 'DELETE',
    path: '/.extensions/on-uninstall',
    config: {
      auth: false,
      pre: [server.handlers.validateHookToken('/.extensions/on-uninstall'), server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      Object(_lib_multipartRequest__WEBPACK_IMPORTED_MODULE_3__["default"])(req.pre.auth0, 'rules', {
        fields: 'name,id'
      }).then(function (rules) {
        var rule = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(rules, {
          name: 'auth0-authorization-extension'
        });

        if (rule) {
          return req.pre.auth0.rules.delete({
            id: rule.id
          });
        }

        return Promise.resolve();
      }).then(function () {
        return Object(_lib_apiaccess__WEBPACK_IMPORTED_MODULE_2__["deleteApi"])(req, true);
      }).then(function () {
        return req.pre.auth0.clients.delete({
          client_id: Object(_lib_config__WEBPACK_IMPORTED_MODULE_1__["default"])('AUTH0_CLIENT_ID')
        });
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function (server) {
  return {
    method: 'PUT',
    path: '/.extensions/on-update',
    config: {
      auth: false,
      pre: [server.handlers.validateHookToken('/.extensions/on-update'), server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      reply().code(204);
    }
  };
};

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/permissions/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['delete:permissions']
      },
      description: 'Delete a permission.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      req.storage.deletePermission(req.params.id).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function () {
  return {
    method: 'GET',
    path: '/api/permissions/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:permissions']
      },
      description: 'Get a single permission based on its unique identifier.',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getPermission(req.params.id).then(function (permission) {
        return reply({
          _id: permission._id,
          name: permission.name,
          description: permission.description
        });
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);



module.exports = function () {
  return {
    method: 'GET',
    path: '/api/permissions',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:permissions']
      },
      description: 'Get all permissions in the system.',
      tags: ['api'],
      validate: {
        query: {
          q: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().max(1000).allow('').default(''),
          field: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().max(1000).allow('').default('')
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getPermissions().then(function (permissions) {
        return {
          permissions: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(permissions, function (item) {
            // if exists, filter by search value
            var searchQuery = req.query.q;
            if (!searchQuery) return true;
            var field = req.query.field;
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(item[field].toLowerCase(), searchQuery.toLowerCase());
          }),
          total: permissions.length
        };
      }).then(function (permissions) {
        return reply(permissions);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _schemas_permission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(120);


module.exports = function () {
  return {
    method: 'POST',
    path: '/api/permissions',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['create:permissions']
      },
      description: 'Create a new permission.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        payload: _schemas_permission__WEBPACK_IMPORTED_MODULE_0__["default"]
      }
    },
    handler: function handler(req, reply) {
      var permission = req.payload;
      return req.storage.createPermission(permission).then(function (created) {
        return reply(created);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(100).required(),
  description: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(500).required(),
  applicationType: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().valid('client', 'resource_server').required(),
  applicationId: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(500).required()
}));

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_permission__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(120);



module.exports = function () {
  return {
    method: 'PUT',
    path: '/api/permissions/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:permissions']
      },
      description: 'Update a permission.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        payload: _schemas_permission__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var permission = req.payload;
      return req.storage.updatePermission(req.params.id, permission).then(function (updated) {
        return reply(updated);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/roles/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['delete:roles']
      },
      description: 'Delete a role.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      req.storage.deleteRole(req.params.id).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function () {
  return {
    method: 'GET',
    path: '/api/roles/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:roles']
      },
      description: 'Get a single role based on its unique identifier.',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getRole(req.params.id).then(function (role) {
        return reply({
          _id: role._id,
          name: role.name,
          description: role.description
        });
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);



module.exports = function () {
  return {
    method: 'GET',
    path: '/api/roles',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:roles']
      },
      description: 'Get all roles in the system.',
      tags: ['api'],
      validate: {
        query: {
          q: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().max(1000).allow('').default(''),
          field: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().max(1000).allow('').default('')
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getRoles().then(function (roles) {
        return {
          roles: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(roles, function (item) {
            // if exists, filter by search value
            var searchQuery = req.query.q;
            if (!searchQuery) return true;
            var field = req.query.field;
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(item[field].toLowerCase(), searchQuery.toLowerCase());
          }),
          total: roles.length
        };
      }).then(function (roles) {
        return reply(roles);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_role__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(126);



module.exports = function () {
  return {
    method: 'POST',
    path: '/api/roles',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['create:roles']
      },
      description: 'Create a new role.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        payload: _schemas_role__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var role = req.payload;
      return req.storage.getPermissions().then(function (permissions) {
        role.permissions.forEach(function (permissionId) {
          var permission = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(permissions, {
            _id: permissionId
          });

          if (permission && permission.applicationId !== role.applicationId) {
            throw new Error(`The permission '${permission.name}' is linked to a different application.`);
          }
        });
        return req.storage.createRole(role).then(function (created) {
          return reply(created);
        });
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(50).required(),
  description: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(500).required(),
  applicationType: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().valid('client', 'resource_server').required(),
  applicationId: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(500).required(),
  permissions: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid()).default([])
}));

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _schemas_role__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(126);




module.exports = function () {
  return {
    method: 'PUT',
    path: '/api/roles/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:roles']
      },
      description: 'Update a role.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().guid().required()
        },
        payload: _schemas_role__WEBPACK_IMPORTED_MODULE_2__["default"]
      }
    },
    handler: function handler(req, reply) {
      var role = req.payload;
      return req.storage.getPermissions().then(function (permissions) {
        role.permissions.forEach(function (permissionId) {
          var permission = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(permissions, {
            _id: permissionId
          });

          if (permission && permission.applicationId !== role.applicationId) {
            throw new Error(`The permission '${permission.name}' is linked to a different application.`);
          }
        });
      }).then(function () {
        return req.storage.getRole(req.params.id);
      }).then(function (existingRole) {
        if (existingRole.applicationId !== role.applicationId) {
          throw new Error('The \'applicationId\' of a role cannot be changed.');
        }

        return req.storage.updateRole(req.params.id, role).then(function (created) {
          return reply(created);
        });
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/groups/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['delete:groups']
      },
      description: 'Delete a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      req.storage.deleteGroup(req.params.id).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(51);



module.exports = function () {
  return {
    method: 'GET',
    path: '/api/groups/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get a single group based on its unique identifier. Add "?expand" to also load all roles and permissions for this group.',
      tags: ['api'],
      validate: {
        query: {
          expand: joi__WEBPACK_IMPORTED_MODULE_0___default.a.boolean()
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      if (req.query.expand) {
        return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_1__["getGroupExpanded"])(req.storage, req.params.id).then(function (group) {
          return reply(group);
        }).catch(function (err) {
          return reply.error(err);
        });
      }

      return req.storage.getGroup(req.params.id).then(function (group) {
        return reply({
          _id: group._id,
          name: group.name,
          description: group.description
        });
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);



module.exports = function () {
  return {
    method: 'GET',
    path: '/api/groups',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get all groups in the system.',
      tags: ['api'],
      validate: {
        query: {
          q: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().max(1000).allow('').default(''),
          field: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().max(1000).allow('').default('')
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getGroups().then(function (groups) {
        return groups.map(function (group) {
          var currentGroup = group;
          currentGroup.mappings = currentGroup.mappings || [];
          currentGroup.members = currentGroup.members || [];
          return currentGroup;
        });
      }).then(function (groups) {
        return {
          groups: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(groups, function (item) {
            // if exists, filter by search value
            var searchQuery = req.query.q;
            if (!searchQuery) return true;
            var field = req.query.field;
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(item[field].toLowerCase(), searchQuery.toLowerCase());
          }),
          total: groups.length
        };
      }).then(function (groups) {
        return reply(groups);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _schemas_group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(132);


module.exports = function () {
  return {
    method: 'POST',
    path: '/api/groups',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['create:groups']
      },
      description: 'Create a new group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        payload: _schemas_group__WEBPACK_IMPORTED_MODULE_0__["default"]
      }
    },
    handler: function handler(req, reply) {
      var group = req.payload;
      return req.storage.createGroup(group).then(function (created) {
        return reply(created);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(50).required(),
  description: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(500).required()
}));

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(132);



module.exports = function () {
  return {
    method: 'PUT',
    path: '/api/groups/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Update a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        payload: _schemas_group__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var group = req.payload;
      return req.storage.updateGroup(req.params.id, group).then(function (updated) {
        return reply(updated);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/groups/{id}/roles',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Delete one or more roles from a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        payload: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid()).required().min(1)
      }
    },
    handler: function handler(req, reply) {
      var members = req.payload;
      req.storage.getGroup(req.params.id).then(function (group) {
        members.forEach(function (userId) {
          var index = group.roles.indexOf(userId);

          if (index > -1) {
            group.roles.splice(index, 1);
          }
        });
        return req.storage.updateGroup(req.params.id, group);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/groups/{id}/roles',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get the roles for a group.',
      tags: ['api'],
      pre: [server.handlers.managementClient],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getGroup(req.params.id).then(function (group) {
        return group.roles || [];
      }).then(function (roleIds) {
        return req.storage.getRoles().then(function (roles) {
          return roles.filter(function (role) {
            return roleIds.indexOf(role._id) > -1;
          });
        });
      } // eslint-disable-line no-underscore-dangle
      ).then(function (roles) {
        return reply(roles);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_queries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);




module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/groups/{id}/roles/nested',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get the nested roles for a group.',
      tags: ['api'],
      pre: [server.handlers.managementClient],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getGroups().then(function (groups) {
        var group = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(groups, {
          _id: req.params.id
        });

        return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_2__["getParentGroups"])(groups, [group]);
      }).then(function (groups) {
        return req.storage.getRoles().then(function (roles) {
          return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_2__["getRolesForGroups"])(groups, roles);
        });
      }).then(function (roles) {
        return reply(roles);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function () {
  return {
    method: 'PATCH',
    path: '/api/groups/{id}/roles',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Add one or more roles to a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        payload: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid()).required().min(1)
      }
    },
    handler: function handler(req, reply) {
      var roles = req.payload;
      req.storage.getGroup(req.params.id).then(function (group) {
        if (!group.roles) {
          group.roles = [];
        }

        roles.forEach(function (roleId) {
          if (group.roles.indexOf(roleId) === -1) {
            group.roles.push(roleId);
          }
        });
        return req.storage.updateGroup(req.params.id, group);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_group_ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(139);



module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/groups/{id}/nested',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Delete one or more nested groups from a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        payload: _schemas_group_ids__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var nested = req.payload;
      req.storage.getGroup(req.params.id).then(function (group) {
        nested.forEach(function (nestedGroupId) {
          var index = group.nested.indexOf(nestedGroupId);

          if (index > -1) {
            group.nested.splice(index, 1);
          }
        });
        return req.storage.updateGroup(req.params.id, group);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid()).required().min(1));

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);



module.exports = function () {
  return {
    method: 'GET',
    path: '/api/groups/{id}/nested',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get the nested groups for a group.',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getGroups().then(function (groups) {
        var group = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(groups, {
          _id: req.params.id
        });

        if (!group.nested) {
          group.nested = [];
        }

        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(groups, function (g) {
          return group.nested.indexOf(g._id) > -1;
        });
      }).then(function (nested) {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.sortByOrder(nested, ['name'], [true]);
      }).then(function (nested) {
        return reply(nested);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_group_ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(139);



module.exports = function () {
  return {
    method: 'PATCH',
    path: '/api/groups/{id}/nested',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Add one or more nested groups in a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        payload: _schemas_group_ids__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var nested = req.payload;
      req.storage.getGroup(req.params.id).then(function (group) {
        if (!group.nested) {
          group.nested = [];
        }

        nested.forEach(function (nestedGroupId) {
          if (group.nested.indexOf(nestedGroupId) === -1 && nestedGroupId !== req.params.id) {
            group.nested.push(nestedGroupId);
          }
        });
        return req.storage.updateGroup(req.params.id, group);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(51);



module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/groups/{id}/mappings',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get the mappings for a group.',
      tags: ['api'],
      pre: [server.handlers.managementClient],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getGroup(req.params.id).then(function (group) {
        return group.mappings || [];
      }).then(function (mappings) {
        return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_1__["getMappingsWithNames"])(req.pre.auth0, mappings);
      }).then(function (mappings) {
        return reply(mappings);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _schemas_mapping_ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(144);




module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/groups/{id}/mappings',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Delete one or more group mappings from a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().guid().required()
        },
        payload: _schemas_mapping_ids__WEBPACK_IMPORTED_MODULE_2__["default"]
      }
    },
    handler: function handler(req, reply) {
      var mappings = req.payload;
      req.storage.getGroup(req.params.id).then(function (group) {
        mappings.forEach(function (mappingId) {
          var groupMapping = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(group.mappings, {
            _id: mappingId
          });

          if (groupMapping) {
            group.mappings.splice(group.mappings.indexOf(groupMapping), 1);
          }
        });
        return req.storage.updateGroup(req.params.id, group);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid()).required().min(1));

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var node_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(146);
/* harmony import */ var node_uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_mappings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(147);



module.exports = function () {
  return {
    method: 'PATCH',
    path: '/api/groups/{id}/mappings',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Create one or more mappings in a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        payload: _schemas_mappings__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var mappings = req.payload;
      req.storage.getGroup(req.params.id).then(function (group) {
        if (!group.mappings) {
          group.mappings = [];
        }

        mappings.forEach(function (mapping) {
          group.mappings.push({
            _id: node_uuid__WEBPACK_IMPORTED_MODULE_0___default.a.v4(),
            groupName: mapping.groupName,
            connectionName: mapping.connectionName
          });
        });
        return req.storage.updateGroup(req.params.id, group);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = require("node-uuid@1.4.3");

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mapping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(148);


/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(_mapping__WEBPACK_IMPORTED_MODULE_1__["default"]).required().min(1));

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  groupName: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(50).required(),
  connectionName: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(1).max(50).required()
}));

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_user_ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(150);



module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/groups/{id}/members',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Delete one or more members from a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        payload: _schemas_user_ids__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var members = req.payload;
      req.storage.getGroup(req.params.id).then(function (group) {
        members.forEach(function (userId) {
          var index = group.members.indexOf(userId);

          if (index > -1) {
            group.members.splice(index, 1);
          }
        });
        return req.storage.updateGroup(req.params.id, group);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string()).required().min(1));

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(152);



module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/groups/{id}/members',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get the members for a group.',
      tags: ['api'],
      pre: [server.handlers.managementClient],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        query: {
          per_page: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer().min(1).max(25).default(25),
          // eslint-disable-line newline-per-chained-call
          page: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer().min(0).default(0)
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getGroup(req.params.id).then(function (group) {
        return Object(_lib_users__WEBPACK_IMPORTED_MODULE_1__["getUsersById"])(req.pre.auth0, group.members || [], req.query.page, req.query.per_page);
      }).then(function (users) {
        return reply(users);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsersById", function() { return getUsersById; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53);
/* harmony import */ var async__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(async__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _apiCall__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95);




function getUsersById(client, ids, page, limit) {
  return new bluebird__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
    var users = [];
    var total = ids.length;
    page = page - 1 < 0 ? 0 : page - 1; // eslint-disable-line no-param-reassign

    ids = ids.splice(page * limit, limit); // eslint-disable-line no-param-reassign

    async__WEBPACK_IMPORTED_MODULE_1___default.a.eachLimit(ids, 10, function (userId, cb) {
      Object(_apiCall__WEBPACK_IMPORTED_MODULE_3__["default"])(client, client.users.get, [{
        id: userId
      }]).then(function (user) {
        users.push(user);
        cb();
      }).catch(function (err) {
        var errDescription = err && (err.name || err.statusCode);
        users.push({
          user_id: userId,
          name: `<Error: ${errDescription}>`,
          email: userId,
          identities: [{
            connection: 'N/A'
          }]
        });
        return cb();
      });
    }, function (err) {
      if (err) {
        return reject(err);
      }

      var sorted = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortByOrder(users, 'user_id');

      return resolve({
        total,
        users: sorted
      });
    });
  });
}

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(152);
/* harmony import */ var _lib_queries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51);





module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/groups/{id}/members/nested',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get the nested members for a group.',
      tags: ['api'],
      pre: [server.handlers.managementClient],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().guid().required()
        },
        query: {
          per_page: joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(1).max(25).default(25),
          // eslint-disable-line newline-per-chained-call
          page: joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().min(0).default(0)
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getGroups().then(function (groups) {
        var group = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(groups, {
          _id: req.params.id
        });

        var currentAndChildGroups = Object(_lib_queries__WEBPACK_IMPORTED_MODULE_3__["getChildGroups"])(groups, [group]);
        return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_3__["getMembers"])(currentAndChildGroups);
      }).then(function (members) {
        var userIds = members ? members.map(function (member) {
          return member.userId;
        }) : [];
        return Object(_lib_users__WEBPACK_IMPORTED_MODULE_2__["getUsersById"])(req.pre.auth0, userIds, req.query.page, req.query.per_page).then(function (data) {
          var total = members.length;
          var users = data.users.map(function (u) {
            var userGroup = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(members, {
              userId: u.user_id
            });

            if (userGroup) {
              userGroup = {
                _id: userGroup.group._id,
                name: userGroup.group.name,
                description: userGroup.group.description
              };
            }

            return {
              user: {
                user_id: u.user_id,
                name: u.name,
                nickname: u.nickname,
                email: u.email
              },
              group: userGroup
            };
          });
          return {
            total,
            nested: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortByOrder(users, ['user.name'], [true])
          };
        });
      }).then(function (users) {
        return reply(users);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_user_ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(150);



module.exports = function () {
  return {
    method: 'PATCH',
    path: '/api/groups/{id}/members',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Add one or more members in a group.',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: false
        },
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid().required()
        },
        payload: _schemas_user_ids__WEBPACK_IMPORTED_MODULE_1__["default"]
      }
    },
    handler: function handler(req, reply) {
      var members = req.payload;
      req.storage.getGroup(req.params.id).then(function (group) {
        if (!group.members) {
          group.members = [];
        }

        members.forEach(function (userId) {
          if (group.members.indexOf(userId) === -1) {
            group.members.push(userId);
          }
        });
        return req.storage.updateGroup(req.params.id, group);
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _webtask_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(156);
var _webtask_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(156, 1);


module.exports = function () {
  return {
    method: 'GET',
    path: '/meta',
    config: {
      auth: false
    },
    handler: function handler(request, reply) {
      return reply(_webtask_json__WEBPACK_IMPORTED_MODULE_0__);
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 156 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"Auth0 Authorization\",\"name\":\"auth0-authz-extension-mc\",\"version\":\"2.9.0\",\"author\":\"auth0\",\"description\":\"This extension gives Auth0 customers the possibility to manage group memberships for their users.\",\"type\":\"application\",\"logoUrl\":\"https://cdn.auth0.com/extensions/auth0-authz/assets/logo.svg\",\"initialUrlPath\":\"/admins/login\",\"updateConfirmMessage\":\"Warning! Read the documentation about breaking changes (https://auth0.com/docs/extensions/authorization-extension) before updating the extension. If you are upgrading from 2.5 or older, you have to rotate your Api Key and republish the rule upon upgrade.\",\"uninstallConfirmMessage\":\"You are about to uninstall the \\\"Authorization Extension\\\". If you proceed all your data in this extension will be lost. Do you want to continue?\",\"repository\":\"https://github.com/auth0/auth0-authorization-extension\",\"keywords\":[\"auth0\",\"extension\"],\"auth0\":{\"createClient\":true,\"onUninstallPath\":\"/.extensions/on-uninstall\",\"onUpdatePath\":\"/.extensions/on-update\",\"scopes\":\"read:connections read:resource_servers update:resource_servers delete:resource_servers read:clients delete:clients read:users read:rules create:rules update:rules_configs update:rules delete:rules\"},\"secrets\":{\"STORAGE_TYPE\":{\"description\":\"Choose the storage type for the database\",\"type\":\"select\",\"required\":true,\"default\":\"webtask\",\"allowMultiple\":false,\"options\":[{\"value\":\"webtask\",\"text\":\"Webtask Storage\"},{\"value\":\"s3\",\"text\":\"Amazon S3\"}]},\"S3_BUCKET\":{\"description\":\"Your S3 Bucket\",\"example\":\"my-bucket\",\"required\":true,\"visibleIf\":{\"STORAGE_TYPE\":\"s3\"}},\"S3_PATH\":{\"description\":\"Path to the JSON file\",\"required\":true,\"example\":\"/auth0-authz.json\",\"default\":\"/auth0-authz.json\",\"visibleIf\":{\"STORAGE_TYPE\":\"s3\"}},\"S3_KEY\":{\"description\":\"Your S3 Key ID\",\"required\":true,\"example\":\"AKIAJL.........\",\"visibleIf\":{\"STORAGE_TYPE\":\"s3\"}},\"S3_SECRET\":{\"description\":\"Your S3 Key Secret\",\"required\":true,\"example\":\"r3UOMBA......................\",\"visibleIf\":{\"STORAGE_TYPE\":\"s3\"}}}}");

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);


module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/users/{id}',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:users']
      },
      description: 'Get a single user based on its unique identifier.',
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required()
        }
      },
      pre: [server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      return req.pre.auth0.users.get({
        id: req.params.id
      }).then(function (user) {
        return reply(user);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



module.exports = function (server) {
  return {
    method: 'GET',
    path: '/api/users',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:users']
      },
      description: 'Get all users.',
      validate: {
        query: {
          q: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().max(1000).allow('').default(''),
          field: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().max(1000).allow('').default(''),
          per_page: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer().min(1).max(100).default(100),
          // eslint-disable-line newline-per-chained-call
          page: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer().min(0).default(0)
        }
      },
      pre: [server.handlers.managementClient]
    },
    handler: function handler(req, reply) {
      var page = req.query.page - 1 < 0 ? 0 : req.query.page - 1;
      var options = {
        sort: 'last_login:-1',
        q: req.query.field ? `${req.query.field}:${req.query.q}` : req.query.q,
        per_page: req.query.per_page || 100,
        page: page || 0,
        include_totals: true,
        fields: 'user_id,name,email,identities,picture,last_login,logins_count,multifactor,blocked',
        search_engine: Object(_lib_config__WEBPACK_IMPORTED_MODULE_1__["default"])('AUTH0_RTA').replace('https://', '') !== 'auth0.auth0.com' ? 'v2' : 'v3'
      };
      req.pre.auth0.users.getAll(options).then(function (users) {
        return reply(users);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_queries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);




module.exports = function () {
  return {
    method: 'GET',
    path: '/api/users/{id}/groups',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Get the groups for a user. Add "?expand" to also load all roles and permissions for these groups.',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required()
        }
      }
    },
    handler: function handler(req, reply) {
      if (req.query.expand) {
        return req.storage.getGroups().then(function (groups) {
          return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(groups, function (group) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(group.members, req.params.id);
          });
        }).then(function (groups) {
          return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_2__["getGroupsExpanded"])(req.storage, groups);
        }).then(function (groups) {
          return reply(groups);
        }).catch(function (err) {
          return reply.error(err);
        });
      }

      return req.storage.getGroups().then(function (groups) {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(groups, function (group) {
          return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(group.members, req.params.id);
        });
      }).then(function (groups) {
        return groups.map(function (group) {
          return {
            _id: group._id,
            name: group.name,
            description: group.description
          };
        });
      }).then(function (groups) {
        return reply(groups);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_queries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);




module.exports = function () {
  return {
    method: 'GET',
    path: '/api/users/{id}/groups/calculate',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:groups']
      },
      description: 'Calculate the group memberships for a user (including nested groups).',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getGroups().then(function (groups) {
        return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_2__["getParentGroups"])(groups, lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(groups, function (group) {
          return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(group.members, req.params.id);
        }));
      }).then(function (groups) {
        return groups.map(function (group) {
          return {
            _id: group._id,
            name: group.name,
            description: group.description
          };
        });
      }).then(function (groups) {
        return reply(groups);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);




module.exports = function () {
  return {
    method: 'PATCH',
    path: '/api/users/{id}/groups',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:groups']
      },
      description: 'Add a single user to groups.',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required()
        },
        payload: joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_1___default.a.string()).required().min(1)
      }
    },
    handler: function handler(req, reply) {
      var groupIds = req.payload;
      var pattern = /^(\{{0,1}([0-9a-fA-F]){8}-?([0-9a-fA-F]){4}-?([0-9a-fA-F]){4}-?([0-9a-fA-F]){4}-?([0-9a-fA-F]){12}\}{0,1})$/;
      var searchBy = pattern.test(groupIds[0]) ? '_id' : 'name';
      req.storage.getGroups().then(function (groups) {
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(groups, function (group) {
          return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(groupIds, group[searchBy]);
        });
      }).then(function (filtered) {
        return bluebird__WEBPACK_IMPORTED_MODULE_0___default.a.each(filtered, function (group) {
          if (!group.members) {
            group.members = []; // eslint-disable-line no-param-reassign
          }

          if (group.members.indexOf(req.params.id) === -1) {
            group.members.push(req.params.id);
          }

          return req.storage.updateGroup(group._id, group);
        });
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);



module.exports = function () {
  return {
    method: 'GET',
    path: '/api/users/{id}/roles',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:roles']
      },
      description: 'Get the roles for a user.',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return req.storage.getRoles().then(function (roles) {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(roles, function (role) {
          return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(role.users, req.params.id);
        });
      }).then(function (roles) {
        return roles.map(function (role) {
          return {
            _id: role._id,
            name: role.name,
            applicationId: role.applicationId,
            description: role.description
          };
        });
      }).then(function (roles) {
        return reply(roles);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(51);



module.exports = function () {
  return {
    method: 'GET',
    path: '/api/users/{id}/roles/calculate',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['read:roles']
      },
      description: 'Calculate the roles assigned to the user (including through group memberships).',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required()
        }
      }
    },
    handler: function handler(req, reply) {
      return Object(_lib_queries__WEBPACK_IMPORTED_MODULE_1__["getRolesForUser"])(req.storage, req.params.id).then(function (roles) {
        return roles.map(function (role) {
          return {
            _id: role._id,
            name: role.name,
            applicationId: role.applicationId,
            description: role.description
          };
        });
      }).then(function (roles) {
        return reply(roles);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);



module.exports = function () {
  return {
    method: 'DELETE',
    path: '/api/users/{id}/roles',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:roles']
      },
      description: 'Remove a single user from roles.',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required()
        },
        payload: joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().guid()).required().min(1)
      }
    },
    handler: function handler(req, reply) {
      var roleIds = req.payload;
      return bluebird__WEBPACK_IMPORTED_MODULE_0___default.a.each(roleIds, function (id) {
        return req.storage.getRole(id).then(function (role) {
          if (!role.users) {
            role.users = []; // eslint-disable-line no-param-reassign
          }

          var index = role.users.indexOf(req.params.id);

          if (index > -1) {
            role.users.splice(index, 1);
          }

          return req.storage.updateRole(id, role);
        });
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_2__);




module.exports = function () {
  return {
    method: 'PATCH',
    path: '/api/users/{id}/roles',
    config: {
      auth: {
        strategies: ['jwt'],
        scope: ['update:roles']
      },
      description: 'Add a single user to roles.',
      tags: ['api'],
      validate: {
        params: {
          id: joi__WEBPACK_IMPORTED_MODULE_2___default.a.string().required()
        },
        payload: joi__WEBPACK_IMPORTED_MODULE_2___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_2___default.a.string()).required().min(1)
      }
    },
    handler: function handler(req, reply) {
      var roleIds = req.payload;
      var pattern = /^(\{{0,1}([0-9a-fA-F]){8}-?([0-9a-fA-F]){4}-?([0-9a-fA-F]){4}-?([0-9a-fA-F]){4}-?([0-9a-fA-F]){12}\}{0,1})$/;
      var searchBy = pattern.test(roleIds[0]) ? '_id' : 'name';
      req.storage.getRoles().then(function (roles) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(roles, function (role) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(roleIds, role[searchBy]);
        });
      }).then(function (filtered) {
        return bluebird__WEBPACK_IMPORTED_MODULE_1___default.a.each(filtered, function (role) {
          if (!role.users) {
            role.users = []; // eslint-disable-line no-param-reassign
          }

          if (role.users.indexOf(req.params.id) === -1) {
            role.users.push(req.params.id);
          }

          return req.storage.updateRole(role._id, role);
        });
      }).then(function () {
        return reply().code(204);
      }).catch(function (err) {
        return reply.error(err);
      });
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var boom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var boom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(boom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_logger__WEBPACK_IMPORTED_MODULE_1__);



function notFound(message) {
  return this.response(boom__WEBPACK_IMPORTED_MODULE_0___default.a.notFound(message));
}

function error(err) {
  _lib_logger__WEBPACK_IMPORTED_MODULE_1___default.a.error(err);
  var errorMessage = err.message && err.message.error || err.message || err.code || err.name || err.text || err.description || err;

  if (err.message && err.message.statusCode === 429) {
    return this.response(boom__WEBPACK_IMPORTED_MODULE_0___default.a.tooManyRequests(errorMessage));
  }

  return this.response(boom__WEBPACK_IMPORTED_MODULE_0___default.a.badRequest(errorMessage));
}

function unauthorized(message) {
  return this.response(boom__WEBPACK_IMPORTED_MODULE_0___default.a.unauthorized(message));
}

module.exports.register = function (server, options, next) {
  server.decorate('reply', 'notFound', notFound);
  server.decorate('reply', 'error', error);
  server.decorate('reply', 'unauthorized', unauthorized);
  next();
};

module.exports.register.attributes = {
  name: 'reply-decorators'
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _lib_storage_getdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _lib_storage_getdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_storage_getdb__WEBPACK_IMPORTED_MODULE_0__);


module.exports.register = function (server, options, next) {
  var db = Object(_lib_storage_getdb__WEBPACK_IMPORTED_MODULE_0__["getDb"])();
  server.decorate('server', 'storage', db);
  server.decorate('request', 'storage', db);
  next();
};

module.exports.register.attributes = {
  name: 'storage'
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ })
/******/ ]);