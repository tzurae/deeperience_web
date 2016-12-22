import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form/immutable'
import FormProperties from '../tripFormProperties'
import FormButton from '../../../utils/FormButton'
import Text from '../../../utils/Text'
import uploadAPI from '../../../../api/upload'
import {
  BsForm as Form,
  BsFormFooter as FormFooter,
} from '../../../fields/widgets'
import styles from './styles.scss'

const PhasePic = props => {
  const {
    updateForm,
    formValue,
    apiEngine,
    pristine,
    submitting,
    invalid,
    handleSubmit,
  } = props

  // upload image to server
  const uploadImage = (file, name) => {
    uploadAPI(apiEngine)
      .uploadImage(file)
      .then(json => {
        const url = json.downloadURL
        updateForm(name, url)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={handleSubmit}
      preventEnter={true}
    >
      <div>
        <Text className={styles.title} id="trip.createTrip.image.cover"/>
        <RenderGallery
          inputId="img-input-cover"
          uploadCB={file => uploadImage(file, 'coverPic')}
          url={formValue.get('coverPic')}
        />
      </div>
      {
        formValue.get('dailyTrips') != null &&
        new Array(...{ length: formValue.get('dailyTrips').size })
          .map((value, index) => (
          <div key={index}>
            <p className={styles.title}>
              <Text isSpan={true} id="trip.createTrip.image.treePic"/>
              {' '}
              <Text isSpan={true} id="common.which"/>
              {`${index + 1}`}
              <Text isSpan={true} id="common.day"/>
            </p>
            <RenderGallery
              inputId={`img-input-cover${index}`}
              uploadCB={file => uploadImage(file, `dailyTrips[${index}].treePic`)}
              url={formValue.getIn(['dailyTrips', index, 'treePic'])}
            />
          </div>
          ))
      }
      <FormFooter
        labelDimensions={{ sm: 0 }}
        fieldDimensions={{ sm: 12 }}
        style={{ textAlign: 'center' }}
      >
        <FormButton
          type="submit"
          disabled={pristine || submitting || invalid}
          textId="common.nextStep"
        />
      </FormFooter>
    </Form>
  )
}

const RenderGallery = ({ inputId, uploadCB, url }) => (
  <div className={styles.gallery}>
    {
      url !== '' &&
      <div className={styles.addCoverPic}>
        <img src={url} className={styles.pic}/>
      </div>
    }
    <label htmlFor={inputId} className={styles.addCoverPicBtn}>
      <Text id={url ? 'trip.createTrip.image.changePic' : 'trip.createTrip.image.addPic'}/>
    </label>
    <input
      id={inputId}
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={e => {
        uploadCB(e.target.files[0])
        e.target.value = ''
      }}
    />
  </div>
)

RenderGallery.propTypes = {
  inputId: PropTypes.string.isRequired,
  uploadCB: PropTypes.func.isRequired,
  url: PropTypes.string,
}

RenderGallery.defaultProps = {
  url: '',
}

export default reduxForm(FormProperties)(PhasePic)
