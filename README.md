JSON-API
====

Easily create server-side REST interfaces and client-side API libraries with a single JSON document.

Currently, only the creation of client-side libraries is supported.

Usage
====

You'll need to see the examples, but essentialy you define 

  * each HTTP resource - "http://domain.tld/action"
  * a description of the purpose of the resource
  * the parameters accepted by each http resource
  * validation logic

    (function () {
      var jsonapi = require('jsonapi'),
        documentation;

      documentation = {
        requests: [
          {
            name: "prices",
            parameters: {
              "enum": ["isbn", "buyback"],
              "required": ["isbn"],
              "validation": function (parameters) {
                var msg = true;
                if (0 === parameters.length) {
                    msg = "you must specify at least one search parameter";
                }
                return msg;
              }
            },
            "description": "The prices call requires a single valid ISBN to be passed in via a 'isbn' parameter:<br/>" +
              "<pre>http://api.campusbooks.com/10/rest/prices?key=YOUR_API_KEY_HERE&isbn=ISBN_HERE</pre><br/>" +
              "It returns groupings for each condition where each group contains multiple offers." +
              "Each offer contains the following fields:",
            "response":[
              {
                "name": "name",
                "description": "The name of the merchant",
                "values": [
                  {
                    "name": "days",
                    "description": "The exact number of days that this book may be rented for"
                  }
                ]
              }
            ],
            example: "<pre><code>&lt;merchant&gt;    &lt;merchant_id&gt;108&lt;/merchant_id&gt;    &lt;merchant_image&gt;http://www.campusbooks.com/images/markets/firstclassbooks.gif&lt;/merchant_iamge&gt;    &lt;name&gt;First Class Books&lt;/name&gt;    &lt;notes&gt;Free shipping via USPS or FedEx. Books must be ....&lt;/notes&gt;    &lt;prices&gt;        &lt;price condition=\"new\"&gt;13.55&lt;/price&gt;        &lt;price condition=\"used\"&gt;13.55&lt;/price&gt;        &lt;/prices&gt;    &lt;link&gt; http://partners.campusbooks.com/link.php?params=b3...&lt;/link&gt;&lt;/merchant&gt;</code></pre>"
          }
        ],
        "version": "10",
        "compatible": ["10", "9"],
        "jsonp_callback": "callback",
        "api_url": "http://api.campusbooks.com/10/rest/",
        "api_params": {
          "format":"json"
        },
        "required_keys": ["api"],
        "key":{
          "name":"key"
        }
      };

      CampusBooks = jsonapi.createRestClient(documentation);
      CampusBooks.documentation = documentation;
      module.exports = CampusBooks;
      if ('undefined' === typeof provide) { provide = function () {} };
      provide('campusbooks');
    }());

Examples
====

  * [CampusBooksJS](http://github.com/coolaj86/campusbooks)
    * look in `./lib/campusbooks.js` for the document
