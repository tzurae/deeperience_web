import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import styles from './styles.scss'
import Col from 'react-bootstrap/lib/Col'

const PhaseGuideConfirm = ({ guideData, country, area, languages }) => (
    <div className={styles.container}>
      <div className={styles.imgTitle}/>
      <Text className={styles.comment} id="trip.customize.guideConfirm.comment1"/>
      <Text className={styles.comment} id="trip.customize.guideConfirm.comment2"/>
      <div className={styles.guideInfo}>
        <div className={styles.guideInfo1}>
          <div className={styles.guideInfo1Left}>
            <div className={styles.avatar}/>
          </div>
          <div className={styles.guideInfo1Right}>
            <div>
              <p className={styles.guideName}>{guideData.guideName}</p>
              <p className={styles.profession}>{guideData.profession}</p>
            </div>
          </div>
        </div>
        <div className={styles.guideInfo2}>
          <Col md={4} className={styles.smallInfo}>
            <Text className={styles.smallInfoTitle} id="trip.customize.guideConfirm.location"/>
            <p className={styles.smallInfoContent}>{`${country}, ${area}`}</p>
          </Col>
          <Col md={4} className={styles.smallInfo}>
            <Text className={styles.smallInfoTitle} id="trip.customize.guideConfirm.hobby"/>
            <p className={styles.smallInfoContent}>{guideData.hobby.join(' / ')}</p>
          </Col>
          <Col md={4} className={styles.smallInfo}>
            <Text className={styles.smallInfoTitle} id="trip.customize.guideConfirm.language"/>
            <p className={styles.smallInfoContent}>{languages.join(', ')}</p>
          </Col>
        </div>
        <p className={styles.selfIntro}>{guideData.selfIntro}</p>
      </div>
    </div>
  )

PhaseGuideConfirm.propTypes = {
  guideData: PropTypes.object,
  country: PropTypes.string,
  area: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
}

PhaseGuideConfirm.defaultProps = {
  guideData: {},
  country: '',
  area: '',
  languages: [],
}

export default PhaseGuideConfirm
