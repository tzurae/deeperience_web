import React from 'react'
import { connect } from 'react-redux'
import FormNames from '../../../constants/FormNames'
import CreateTripFormPage1 from './CreateTripFormPage1'
import CreateTripFormPage2 from './CreateTripFormPage2'
import { setPage, nextPage, previousPage } from '../../../actions/createTripActions'

// import {
//   BsInput as Input,
//   BsSelect as Select,
//   BsCheckboxList as CheckboxList,
// } from '../../fields/adapters'
// import {
//   BsForm as Form,
//   BsFormFooter as FormFooter,
//   BsField as FormField,
// } from '../../fields/widgets'

// http://redux-form.com/6.2.0/examples/wizard/
class CreateTripForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this._handleSubmit.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(setPage(0))
  }

  _handleSubmit(formData) {
    console.log('formData', formData)
    // let { dispatch, apiEngine } = this.props;
    //
    // return someAPI(apiEngine)
    //   .doSomething(formData)
    //   .catch((err) => {
    //     dispatch(pushErrors(err));
    //     throw err;
    //   })
    //   .then((json) => {
    //     console.log('json', json);
    //   });
  }

  nextPage() {
    const { dispatch } = this.props
    dispatch(nextPage())
  }

  previousPage() {
    const { dispatch } = this.props
    dispatch(previousPage())
  }

  render() {
    const {
      page,
    } = this.props

    let values

    // debug usage
    if (this.props.createTripForm) {
      values = this.props.createTripForm.values
    }

    return (
      <div>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        {page === 0 &&
        <CreateTripFormPage1
          onSubmit={this.nextPage}
          {...this.props}/>
        }
        {page === 1 &&
        <CreateTripFormPage2
          onSubmit={this.nextPage}
          previousPage={this.previousPage}
          {...this.props}/>
        }
      </div>
    )
  }
}

export default connect(state => ({
  apiEngine: state.apiEngine,
  page: state.createTrip.page,
  createTripForm: state.form[FormNames.TRIP_CREATE_TRIP],
}))(CreateTripForm)
