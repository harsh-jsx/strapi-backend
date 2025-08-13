'use strict';

/**
 * menservice service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::menservice.menservice');
