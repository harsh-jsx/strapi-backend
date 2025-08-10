'use strict';

/**
 * gender service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gender.gender');
