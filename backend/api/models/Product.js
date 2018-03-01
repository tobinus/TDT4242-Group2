/**
 * Product.js
 *
 * @description :: Product object
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // Product name
    name: {
      type: 'string',
      required: true,
      unique: true,
      notNull: true,
    },

    // A textual detail description of the product
    description: {
      type: 'text',
      required: true,
    },

    // Whoever made this thing
    manufacturer: {
      type: 'string',
    },

    // Whether this product is for sale anymore.
    // Should be set to false instead of deleting product.
    listed: {
      type: 'boolean',
      defaultsTo: true,
    },

    // The regular price
    price: {
      type: 'float',
      required: true,
      min: 0,
    },

    // Price modifier for a percent sale (e.g. 0.7 is 30% sale)
    price_mod: {
      type: 'float',
      min: 0,
      max: 1,
      defaultsTo: 1,
    },

    // How many you get in a package deal
    package_get_count: {
      type: 'integer',
      defaultsTo: 1,
      min: 1,
    },

    // How many you pay for in a package deal
    package_pay_count: {
      type: 'integer',
      defaultsTo: 1,
      min: 0,
    },

    // Whether this product is on sale and type of sale (percent sale or package deal)
    on_sale: {
      type: 'string',
      enum: [
        'NO_SALE',
        'PRICE_MOD',
        'PACKAGE',
      ],
      defaultsTo: 'NO_SALE',
    },

    // An image of the product, maybe?
    image: {
      type: 'binary',
    },

    // The quantity in stock fro this product
    stock_count: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
    },

    // When this product will be back in stock
    stock_resupply_date: {
      type: 'date',
    },

  }

};
