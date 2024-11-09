const Country = require("./../models/countryModel");
const factory = require("./handlerFactory");

exports.createCountry = factory.createOne(Country);
exports.updateCountry = factory.updateOne(Country);
exports.getAllCoutries = factory.getAll(Country);
exports.deleteCountry = factory.deleteOne(Country);
