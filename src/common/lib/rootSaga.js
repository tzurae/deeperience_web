/*
 * ## Edit by: Rae
 * ## Time: 2016/12/08
 */
import authSaga from '../reducers/auth/authSaga'
import cookieSaga from '../reducers/cookie/cookieSaga'
import tripSaga from '../reducers/trip/tripSaga'

export default function* saga() {
  yield [
    ...authSaga,
    ...cookieSaga,
    ...tripSaga,
  ]
}
