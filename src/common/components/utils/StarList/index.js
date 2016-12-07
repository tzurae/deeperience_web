import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import styles from './styles.scss'
import classname from 'classnames'

const StarList = ({ star, totalStar, starClass }) => (
  <div className={styles.starList}>
    {
      Array(...{ length: star })
        .map(Number.call, Number)
        .map(value => (
          <FontAwesome
            key={value}
            name="star"
            className={classname(styles.star, starClass)}
          />
        ))
    }
    {
      Array(...{ length: totalStar - star })
        .map(Number.call, Number)
        .map(value => (
          <FontAwesome
            key={value + star}
            name="star-o"
            className={classname(styles.star, starClass)}
          />
        ))
    }
  </div>
)

StarList.propTypes = {
  star: PropTypes.number,
  totalStar: PropTypes.number,
  starClass: PropTypes.string,
}

StarList.defaultProps = {
  star: 0,
  totalStar: 0,
  starClass: '',
}

export default StarList
