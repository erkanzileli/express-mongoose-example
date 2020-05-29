const Records = require('../db/models/records')

function getAll({ startDate, endDate, minCount, maxCount }) {
  return Records.aggregate([
    {
      // Sum all count values of counts field at attach it to totalCount field
      $addFields: {
        totalCount: {
          $reduce: {
            input: '$counts',
            initialValue: 0,
            in: { $add: ['$$value', '$$this'] }
          }
        }
      }
    },
    {
      // Filters
      $match: {
        totalCount: {
          $gte: minCount,
          $lt: maxCount
        },
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }
      }
    },
    {
      // Field selection
      $project: {
        _id: 0,
        totalCount: 1,
        key: 1,
        createdAt: 1
      }
    }
  ])
}

module.exports = { getAll }
