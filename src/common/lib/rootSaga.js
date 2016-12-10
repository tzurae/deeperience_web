/*
 * ## Edit by: Rae
 * ## Time: 2016/12/08
 */
import authSaga from '../reducers/auth/authSaga'

export default function* saga() {
  console.log('sdfafkfaskfjlsa');
  yield [
    ...authSaga,
  ]
}
