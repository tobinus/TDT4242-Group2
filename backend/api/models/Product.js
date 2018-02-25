/**
 * Product.js
 *
 * @description :: Product object
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      notNull: true,
    },

    description: {
      type: 'text',
      required: true,
    },

    manufacturer: {
      type: 'string',
    },

    listed: {
      type: 'boolean',
      defaultsTo: true,
    },

    price: {
      type: 'float',
      required: true,
      min: 0,
    },

    price_mod: {
      type: 'float',
      min: 0,
      max: 1,
      defaultsTo: 1,
    },

    on_sale: {
      type: 'boolean',
      defaultsTo: false,
    },

    image: {
      type: 'binary',
    },

  }

};
