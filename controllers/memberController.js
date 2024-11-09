const catchAsync = require("../utils/catchAsync");
const Member = require("./../models/memberModel");
const factory = require("./handlerFactory");

exports.createMember = factory.createOne(Member);
exports.updateMember = factory.updateOne(Member);
exports.getAllMembers = factory.getAll(Member);
exports.deleteMember = factory.deleteOne(Member);

exports.getMembersByFilters = catchAsync(async (req, res, next) => {
  const member = await Member.aggregate([
    {
      $match: {
        age: { $gte: 30 },
        maritalStatus: { $regex: /^widowed$/, $options: "i" },
      },
    },
  ]);

  res.status(200).json({
    status: "Success",
    results: member.length,
    data: {
      member,
    },
  });
});
