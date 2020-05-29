const express = require('express')
const Joi = require('@hapi/joi')

const { getAll } = require('../services/records')
const { wrapJoiSchema, regex, successfullResponse } = require('../utils')
const { RequestValidationError } = require('../lib/errors')

const router = express.Router()

const validations = {
  '/': wrapJoiSchema(
    Joi.object({
      startDate: Joi.string().regex(regex.date).required(),
      endDate: Joi.string().regex(regex.date).required(),
      minCount: Joi.number().required(),
      maxCount: Joi.number().required()
    })
  )
}

router.post(
  '/',
  // maybe moved to more centralized location
  function validate(req, res, next) {
    const { isValidated, errors } = validations[req.route.path](req.body)
    if (!isValidated) {
      throw new RequestValidationError(errors)
    }
    next()
  },
  async function process(req, res) {
    const result = await getAll(req.body)
    res.status(200).json(successfullResponse({ records: result }))
  }
)

module.exports = router
