import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import IconRectBtn from '../../utils/IconRectBtn'
import styles from './styles.scss'

class PhaseVideo extends React.Component {
  constructor(props) {
    super(props)
    // local state right now, but can change to redux easily
    // todo
    this.state = {
      activeArr: Array(...{ length: this.props.ableTime.length })
        .map(() => false),
    }
  }

  clickItem(index) {
    this.setState({
      activeArr: this.state.activeArr
        .map((value, arrIndex) =>
          (arrIndex === index ? !this.state.activeArr[index] : false)),
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <Text className={styles.title} id="order.video.ableTime"/>
        {
          this.props.ableTime.map(({ date, from, to }, index) => (
            <Item
              key={index}
              date={date}
              from={from}
              to={to}
              active={this.state.activeArr[index]}
              index={index}
              onClick={::this.clickItem}
            />
          ))
        }
        <div className={styles.footer}>
          <IconRectBtn
            name="times"
            textId="order.outline.disagree"
            className={styles.footerBtn}
          />
          <IconRectBtn
            name="send-o"
            textId="order.outline.agree"
            className={styles.footerBtn}
          />
        </div>
      </div>
    )
  }
}

PhaseVideo.propTypes = {
  ableTime: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const Item = ({ active, index, date, from, to, onClick }) => (
  active ?
    <button
      className={styles.itemActive}
      onClick={onClick.bind(this, index)}
    >
      <p className={styles.itemDate}>{date}</p>
      <p><span>{from}</span> ~ <span>{to}</span></p>
    </button> :
    <button
      className={styles.itemInactive}
      onClick={onClick.bind(this, index)}
    >
      <p className={styles.itemDate}>{date}</p>
      <p><span>{from}</span> ~ <span>{to}</span></p>
    </button>
)

Item.propTypes = {
  active: PropTypes.bool,
  index: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

Item.defaultProps = {
  active: false,
}

export default PhaseVideo
