import express from 'express'
import FormNames from '../../../common/constants/FormNames'
import bodyParser from '../../middlewares/bodyParser'
import formValidationController from '../../controllers/formValidation'

const forms = express.Router()

forms.post(`/${FormNames.USER_REGISTER}/fields/email/validation`,
    bodyParser.json,
    formValidationController[FormNames.USER_REGISTER].email
)
forms.post(
    `/${FormNames.USER_VERIFY_EMAIL}/fields/email/validation`,
    bodyParser.json,
    formValidationController[FormNames.USER_VERIFY_EMAIL].email
)
forms.post(
    `/${FormNames.USER_FORGET_PASSWORD}/fields/email/validation`,
    bodyParser.json,
    formValidationController[FormNames.USER_FORGET_PASSWORD].email
)

export default forms
