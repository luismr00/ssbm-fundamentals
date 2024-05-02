const moongose = require('mongoose');

const newsletterSchema = new moongose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = moongose.model('Newsletter', newsletterSchema);