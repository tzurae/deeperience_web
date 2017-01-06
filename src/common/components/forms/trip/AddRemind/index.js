import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import { BsForm as Form } from '../../../fields/widgets'
import FormProperties from '../tripFormProperties'
import uploadAPI from '../../../../api/upload'
import GalleryPic from '../../../utils/GalleryPic'
import Text from '../../../utils/Text'
import APIEngine from '../../../../utils/ApiEngine'
import styles from './styles.scss'

const AddRemind = ({ updateRemind, reminds, uuid, addRemind, removeRemind }) => {
  const uploadImage = file =>
    uploadAPI(new APIEngine())
      .uploadImage(file)
      .then(json => json.downloadURL)
      .catch(err => {
        console.log(err)
      })

  const updatePic = (index, words) => url => updateRemind(index, words, url)
  const removePic = index => () => removeRemind(index)

  if (uuid === '') return <div/>

  // console.log(reminds)

  return (
    <div className={styles.container}>
      <Form>
        {
          reminds.map((remind, index) =>
            <GalleryPic
              key={index}
              url={remind.get('pic')}
              className={styles.gallery}
              imgInputId={`remind_${index}`}
              textInputId={`uuid2data.${uuid}.reminds.${index}.words`}
              uploadCB={updatePic(index, remind.get('words'))}
              removeCB={removePic(index)}
            />
          )
        }
        <label htmlFor="remind-addimg" className={styles.addBtn}>
          <Text id="trip.createTrip.branch.addRemind"/>
        </label>
        <input
          id="remind-addimg"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => {
            uploadImage(e.target.files[0]).then(url => addRemind(url))
            e.target.value = ''
          }}
        />
      </Form>
    </div>
  )
}

export default reduxForm(FormProperties)(AddRemind)
