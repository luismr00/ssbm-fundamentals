const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        firstName: {
            type: String,
            required: [true, 'Please add a first name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please add a last name'],
        },
        profilePicture: {
            type: String,
            default: 'https://via.placeholder.com/150', // Placeholder image that is optional but will have a default value
        },
        plan: {
            type: String,
            enum: ['basic', 'premium', 'none'],
            required: [true, 'Please add a plan'],
        },
        subscription: {
            start_date: {
                type: Date,
                required: true
            },
            end_date: {
                type: Date,
                required: true
            },
            status: {
                type: String,
                enum: ['active', 'canceled', 'expired', 'none'],
                required: true
            },
            payment_gateway: {
                type: String,
                enum: ['stripe', 'paypal', 'none'],
                required: true
            },
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        deviceIdentifiers: [String], // Array of device unique identifiers
        accountActivated: {
            type: Boolean,
            default: false,
        },
        accountLocked: {
            type: Boolean,
            default: false,
        },
        securityQuestions: [{
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            }
        }],
        promotion: {
            type: {
                type: String,
                enum: ['discount', 'none'],
            },
            duration: {
                type: Number, // Duration in days, months, etc.
            },
            expirationDate: {
                type: Date, // Expiration date of the promotion
            },
            promoCode: {
              type: String, // Optional: Promo code associated with the promotion
            },
            discountPercentage: {
                type: Number, // Optional: Discount percentage for the promotion
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
