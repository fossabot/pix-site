'use strict';

const path = require('path');

module.exports = function() {
  return {
    clientAllowedKeys: ['PRISMIC_API_TOKEN'],
    failOnMissingKey: false,
  }
};
