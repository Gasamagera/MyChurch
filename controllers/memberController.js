const catchAsync = require("../utils/catchAsync");
const Member = require("./../models/memberModel");
const factory = require("./handlerFactory");

exports.createMember = factory.createOne(Member);
exports.updateMember = factory.updateOne(Member);
exports.getAllMembers = factory.getAll(Member);
exports.deleteMember = factory.deleteOne(Member);
