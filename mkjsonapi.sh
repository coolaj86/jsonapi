#!/bin/bash
cat \
  vendor/require-kiss.js \
  vendor/global-es5.js \
  vendor/futures.private.js \
  vendor/futures.promise.js \
  vendor/url.js \
  vendor/ahr.js \
  lib/jsonapi.js \
    > lib/jsonapi.all.js
