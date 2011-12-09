/*jslint es5: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */
(function () {
  "use strict";

  var request = require('ahr2'),
    Future = require('future'),
    querystring = require('querystring'),
    createRestClient;
  /**
   * Scaffold
   *
   * This produces an API skeleton based on the JSON-API doc.
   * When printed as a string this provides a nice starting point for your API
   */
  createRestClient = function (doc) {
    var factory = {};
    // TODO allow for multiple versions
    // TODO move creation params to doc
    factory.create = function (api_key) {
    
      var api = {}, api_req;
      // Base API / REST request
      api_req = function(action, params, options) {
        var promise = Future()
          , result
          ;

        // Uses abstractHttpRequest
        params[doc.key.name] = api_key;
        Object.keys(doc.api_params).forEach(function (key) {
          if ('undefined' === typeof params[key]) {
            params[key] = doc.api_params[key];
          }
        });

        result = request.jsonp(doc.api_url + action + '?' + querystring.stringify(params), doc.jsonp_callback, params, options);
        result.when(function (err, xhr, data) {
          if (data && data.response && data.response.errors) {
            err = data.response.errors;
          }
          promise.fulfill(err, xhr, data);
        });
        return promise;
      };
      doc.requests.forEach(function (module) {
        // example: CampusBooks.search(params, options);
        api[module.name] = function (params, options) {
          var pdoc = module.parameters,
            promise = Future(),
            validates = true,
            undocumented = [],
            msg = "",
            result;

          if (pdoc) {
            // TODO move to validations model
            if (pdoc.required) {
              pdoc.required.forEach(function (pname) {
                if ('undefined' === typeof params[pname] || !params[pname].toString()) {
                  validates = false;
                  msg += "All of the params '" + pdoc.required.toString() + "' must be specified for the '" + module.name  + "' call.";
                }
              });
            }
            if ('undefined' !== typeof pdoc.oneOf) {
              Object.keys(params).forEach(function (pname) {
                var exists = false;
                pdoc.oneOf.forEach(function (ename) {
                  if (pname === ename) {
                    exists = true;
                  }
                });
                if (true !== exists) {
                  undocumented.push(pname);
                }
              });
              if (0 !== undocumented.length) {
                validates = false;
                msg += "The params '" + undocumented.toString() + "' are useless for this call.";
              }
            }
            // TODO end move to validations model block
            
            if (pdoc.validation) {
              validates = pdoc.validation(params);
              msg = validates;
            }
            if (true !== validates) {
              promise.fulfill(msg);
              return promise;
            }
          }

          result = api_req(module.name, params, options);
          return result;
        };
      });
      return api;
    };
    return factory;
  };

  module.exports = {
    createRestClient: createRestClient
  };

}());
