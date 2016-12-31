import { fromJS } from 'immutable'
import FormNames from '../../../constants/FormNames'
import validate from './createSiteValidate'

export default {
  form: FormNames.TRIP_CREATE_SITE,
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
  initialValues: fromJS({
    name: '',
    tags: [],
    introduction: '<p><br></p>',
    mainSite: {
      remind: '',
      fee: '',
      introduction: '<p><br></p>',
      name: '',
      googleInfo: {
        name: '',
        address: '',
        website: '',
        phone: '',
        placeId: '',
        position: null,
        openPeriod: [],
      },
    },
    subSites: [],
  }),
}
