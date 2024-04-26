const mongoose = require('mongoose');

const commonCountries = [
    // North America
    { name: 'USA', languages: ['English'] },
    { name: 'Canada', languages: ['English', 'French'] },
    { name: 'Mexico', languages: ['Spanish'] },
    // Central America
    { name: 'Nicaragua', languages: ['Spanish'] },
    { name: 'Panama', languages: ['Spanish'] },
    // South America (excluding Guyana, Suriname, and French Guiana)
    { name: 'Brazil', languages: ['Portuguese'] },
    { name: 'Chile', languages: ['Spanish'] },
    // Europe
    { name: 'Germany', languages: ['German'] },
    { name: 'United Kingdom', languages: ['English'] },
    { name: 'France', languages: ['French'] },
    { name: 'Italy', languages: ['Italian'] },
    { name: 'Spain', languages: ['Spanish'] },
    { name: 'Netherlands', languages: ['Dutch'] },
    { name: 'Belgium', languages: ['Dutch', 'French', 'German'] },
    { name: 'Switzerland', languages: ['German', 'French', 'Italian'] },
    { name: 'Sweden', languages: ['Swedish'] },
    { name: 'Norway', languages: ['Norwegian'] },
    { name: 'Denmark', languages: ['Danish'] },
    { name: 'Finland', languages: ['Finnish', 'Swedish'] },
    { name: 'Poland', languages: ['Polish'] },
    { name: 'Greece', languages: ['Greek'] },
    { name: 'Portugal', languages: ['Portuguese'] },
    { name: 'Russia', languages: ['Russian'] },
    // Asia
    { name: 'South Korea', languages: ['Korean'] },
    { name: 'Japan', languages: ['Japanese'] },
    { name: 'Philippines', languages: ['Filipino'] },
    // Australia and Oceania
    { name: 'Australia', languages: ['English'] },
];
  

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
        country: {
            type: String,
            enum: commonCountries.map(country => country.name), // Predefined list of common countries
            required: [true, 'Please add a country'],
          },
        customCountry: {
            type: String // Optional field for custom country input
        },
        language: {
            type: String,
            enum: ['English', 'Spanish'], // This will be updated later on depending who wants to participate in the project to add subtitles in other languages
            required: [true, 'Please add a language'],
        },
        plan: {
            type: String,
            enum: ['basic', 'premium'],
            required: [true, 'Please add a plan'],
        },
      },
      {
        timestamps: true,
      }
);

module.exports = mongoose.model('User', userSchema);