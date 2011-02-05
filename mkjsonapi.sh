#!/bin/bash
cat \
  vendor/require-kiss/lib/require-kiss.js \
  vendor/global-es5.js \
  vendor/futures/lib/future.js \
  vendor/url.js \
  vendor/ahr/lib/ahr.js \
  lib/jsonapi.js \
    > lib/jsonapi.all.js
