/**
 * Order.js
 *
 * @description :: Order object
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // The user that placed the order
    user: {
      model: 'user',
    },

    // Association to the products in this order
    products: {
      collection: 'product',
    },

    // Total calculated price for this order
    total_price: {
      type: 'float',
      min: 0,
    },

    // Order status
    status: {
      type: 'string',
      enum: [
        'PENDING',
        'ACCEPTED',
        'AWAITING_RESUPPLY',
        'SHIPPED',
        'CANCELLED',
      ],
      defaultsTo: 'PENDING',
    },

    // Whether the user has confirmed this order
    user_confirmed: {
      type: 'boolean',
      defaultsTo: false,
    },

    // Detailed content of this order: Products, quantity, total price etc.
    // This is what is sent to the user for confirmation.
    order_details: {
      type: 'json',
    },

  }

};
