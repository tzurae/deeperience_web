import React, { PropTypes } from 'react'
import { Field } from 'redux-form/immutable'
import FontAwesome from 'react-fontawesome'
import { Textarea } from '../../fields/bases'
import cx from 'classnames'
import uploadAPI from '../../../api/upload'
import APIEngine from '../../../utils/ApiEngine'
import styles from './styles.scss'

class GalleryPic extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      textarea: false,
    }

    this.uploadImage = ::this.uploadImage
    this.switchTextArea = ::this.switchTextArea
  }

  uploadImage(file) {
    uploadAPI(new APIEngine())
      .uploadImage(file)
      .then(json => this.props.uploadCB(json.downloadURL))
      .catch(err => console.log(err))
  }

  switchTextArea() {
    this.setState({
      textarea: !this.state.textarea,
    })
  }

  render() {
    const {
      className,
      imgInputId,
      textInputId,
      removeCB,
      url,
    } = this.props

    if (url === '') return null

    return (
      <div>
        <div className={cx(styles.picDiv, className)}>
          {
            this.state.textarea ?
              <div className={styles.textareaDiv}>
                <FontAwesome
                  name="times"
                  className={styles.iconbtnCloseTextarea}
                  onClick={this.switchTextArea}
                />
                <Field
                  className={styles.textarea}
                  name={textInputId}
                  component={Textarea}
                  rows="3"
                />
              </div> :
              <div>
                <img src={url} className={styles.pic}/>
                <div className={styles.filter}>
                  <FontAwesome
                    name="times"
                    className={styles.iconbtnRemove}
                    onClick={removeCB}
                  />
                  <div className={styles.iconbtnDiv}>
                    <label htmlFor={imgInputId} className={styles.addCoverPicBtn}>
                      <FontAwesome
                        name="camera"
                        className={styles.iconbtnCamera}
                      />
                    </label>
                    <FontAwesome
                      name="pencil"
                      className={styles.iconbtnPencil}
                      onClick={this.switchTextArea}
                    />
                  </div>
                </div>
              </div>
          }
        </div>
        <input
          id={imgInputId}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => {
            this.uploadImage(e.target.files[0])
            e.target.value = ''
          }}
        />
      </div>
    )
  }
}

GalleryPic.propTypes = {
  imgInputId: PropTypes.string.isRequired,
  textInputId: PropTypes.string,
  uploadCB: PropTypes.func,
  removeCB: PropTypes.func.isRequired,
  url: PropTypes.string,
}

GalleryPic.defaultProps = {
  textInput: '',
  uploadCB: () => {},
  url: '',
}

export default GalleryPic
