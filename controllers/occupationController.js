const Occupation = require("./../models/occupationModel");
const factory = require("./handlerFactory");

exports.createOccupation = factory.createOne(Occupation);
exports.updateOccupation = factory.updateOne(Occupation);
exports.getAllOccupation = factory.getAll(Occupation);
exports.deleteOccupation = factory.deleteOne(Occupation);
