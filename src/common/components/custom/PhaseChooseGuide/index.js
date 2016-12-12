import React, { PropTypes } from 'react'
import styles from './styles.scss'
import Text from '../../utils/Text'
import StarList from '../../utils/StarList'
import IconRectBtn from '../../utils/IconRectBtn'

const PhaseChooseGuide = ({ guideData }) => {
  return (
    <div>
      {guideData.map((guide, index) => (
        <GuideItem
          key={index}
          guideName={guide.guideName}
          star={guide.star}
          profession={guide.profession}
          index={index}
        />
      ))}
    </div>
  )
}

PhaseChooseGuide.propTypes = {
  guideData: PropTypes.arrayOf(PropTypes.object),
}

PhaseChooseGuide.defaultProps = {
  guideData: [],
}

const GuideItem = ({ guideName, star, index, profession }) => (
  <div className={styles.container}>
    <div className={styles.avatar}/>
    <div className={styles.infoDiv}>
      <h4 className={styles.guideName}>
        {guideName}
        <span className={styles.profession}>{profession}</span>
      </h4>
      <div className={styles.starDiv}>
        <Text className={styles.starText} id={'customize.chooseGuide.star'}/>
        <StarList
          star={star}
          totalStar={5}
        />
      </div>
    </div>
    <div className={styles.otherDiv}>
      <h5 className={styles.rank}>{`第 ${index + 1} 志願`}</h5>
      <IconRectBtn
        name="bars"
        textId="customize.chooseGuide.detail"
      />
    </div>
  </div>
)

GuideItem.propTypes = {
  guideName: PropTypes.string,
  star: PropTypes.number,
  index: PropTypes.number,
  profession: PropTypes.string,
}

PhaseChooseGuide.defaultProps = {
  guideName: '',
  star: 0,
  index: 0,
  profession: '',
}

export default PhaseChooseGuide
