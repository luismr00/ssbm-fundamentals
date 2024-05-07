const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
        },
        image: {
            type: String,
            required: true, // Write the local path of the image for now but eventually this string will be an AWS S3 URL
        },
        description: {
          type: String,
          required: true,
        },
        summary: {
          type: String,
          required: true,
        },
        views: {
          type: Number,
          required: true,
          default: 0,
        },
        likes: {
          type: Number,
          required: true,
          default: 0,
        },
        dislikes: {
          type: Number,
          required: true,
          default: 0,
        },
        url: {
          type: String,
          required: true,
        },
        totalDuration: {
          type: Number,
          required: true,
        },
      },
      {
        timestamps: true,
      }
);

module.exports = mongoose.model('Video', videoSchema);