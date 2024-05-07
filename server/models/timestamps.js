const mongoose = require('mongoose');

const timestampSchema = new mongoose.Schema(
    {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        videoId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Video',
        },
        timestamp: {
          type: Number,
          required: true,
          default: 0,
        },
        watched: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      {
        timestamps: true,
      }
);

module.exports = mongoose.model('Timestamp', timestampSchema);