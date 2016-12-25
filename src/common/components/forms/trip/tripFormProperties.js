import { fromJS } from 'immutable'
import FormNames from '../../../constants/FormNames'
import validate from './createTripValidate'

export default {
  form: FormNames.TRIP_CREATE_TRIP,
  destroyOnUnmount: false,
  validate,
  initialValues: fromJS({
    name: '',
    tags: [],
    dayInfo: 'HALF_DAY',
    dailyTrips: [{
      remind: '',
      period: {
        start: '08:00',
        end: '21:00',
      },
    }],
    uuid2data: {},
  }),
}
