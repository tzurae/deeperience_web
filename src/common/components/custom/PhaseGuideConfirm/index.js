import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import styles from './styles.scss'
import Col from 'react-bootstrap/lib/Col'

const PhaseGuideConfirm = ({ guideData, country, area, rank }) => (
    <div className={styles.container}>
      <div className={styles.waitingImg}/>
      <Text className={styles.comment} id="customize.guideConfirm.comment1"/>
      <Text className={styles.comment} id="customize.guideConfirm.comment2"/>
      <Text className={styles.comment} id="customize.guideConfirm.comment3"/>
      <div className={styles.guideInfo}>
        <p className={styles.rank}>{`第 ${rank} 順位`}</p>
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
            <Text className={styles.smallInfoTitle} id="customize.guideConfirm.location"/>
            <p className={styles.smallInfoContent}>{`${country}, ${area}`}</p>
          </Col>
          <Col md={4} className={styles.smallInfo}>
            <Text className={styles.smallInfoTitle} id="customize.guideConfirm.hobby"/>
            <p className={styles.smallInfoContent}>{guideData.hobby.join(' / ')}</p>
          </Col>
          <Col md={4} className={styles.smallInfo}>
            <Text className={styles.smallInfoTitle} id="customize.guideConfirm.language"/>
            <p className={styles.smallInfoContent}>{guideData.language.join(', ')}</p>
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
  rank: PropTypes.number,
}

PhaseGuideConfirm.defaultProps = {
  guideData: {},
  country: '',
  area: '',
  rank: 1,
}

export default PhaseGuideConfirm
