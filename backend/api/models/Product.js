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
      unique: true,
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

    package_get_count: {
      type: 'integer',
      defaultsTo: 1,
      min: 1,
    },

    package_pay_count: {
      type: 'integer',
      defaultsTo: 1,
      min: 0,
    },

    on_sale: {
      type: 'string',
      enum: [
        'NO_SALE',
        'PRICE_MOD',
        'PACKAGE',
      ],
      defaultsTo: 'NO_SALE',
    },

    image: {
      type: 'binary',
    },

    stock_count: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
    },

    stock_resupply_date: {
      type: 'date',
    },

  }

};
