'use strict';

/**
 * rich-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::rich-test.rich-test');
