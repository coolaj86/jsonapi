#!/bin/bash

mkdir -p release

cat \
  vendor/require-kiss/lib/require-kiss.js \
  vendor/global-es5.js \
  vendor/futures/futures/future.js \
  vendor/ahr/lib/ahr.js \
  lib/jsonapi.js \
    > release/jsonapi.all.js
