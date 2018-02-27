/**
 * Purchase.js
 *
 * @description :: Purchase object
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user: {
      model: 'user'
    },

    products: {
      collection: 'product',
    },

    total_price: {
      type: 'float',
      min: 0,
    },

    status: {
      type: 'string',
      enum: [
        'PENDING',
        'ACCEPTED',
        'AWAITING_RESUPPLY',
        'SHIPPED',
      ],
      defaultsTo: 'PENDING',
    },

  }

};
