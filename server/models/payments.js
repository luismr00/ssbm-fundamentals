const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        payment_gateway: {
            type: String,
            enum: ['Stripe', 'PayPal'],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['success', 'pending', 'failed'],
            required: true,
        },
        payment_date: {
            type: Date,
            default: Date.now,
        },
        promotion: {
            type: {
                type: String,
                enum: ['discount', 'free_trial'],
            },
            discountAmount: Number, // Optional: Amount discounted from the payment
            promoCode: String, // Optional: Promo code associated with the payment
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Payment', paymentSchema);
