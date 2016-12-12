import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import styles from './styles.scss'
import IconRectBtn from '../../utils/IconRectBtn'

const PhaseFinishConfirm = ({ againFunc, finishFunc, amount }) => (
    <div className={styles.container}>
      <div className={styles.chooseDiv}>
        <div className={styles.imgAgain}/>
        <div className={styles.comment}>
          <Text
            className={styles.pComment}
            id="customize.finishConfirm.again.comment"
          />
        </div>
        <IconRectBtn
          name="video-camera"
          textId="customize.chooseDate"
          className={styles.btnAgain}
          onClick={againFunc}
        />
      </div>
      <div className={styles.chooseDiv}>
        <div className={styles.imgOk}/>
        <div className={styles.comment}>
          <Text
            className={styles.pComment}
            id="customize.finishConfirm.ok.comment"
          />
          <p className={styles.pComment}>
            <Text id="customize.finishConfirm.videoTime" isSpan={true}/>
            <span> 10 分 30 秒, </span>
            <Text id="common.amountAll" isSpan={true}/>
            <span>{` ${amount} `}</span>
            <Text id="common.dollar" isSpan={true}/>
          </p>
        </div>
        <IconRectBtn
          name="check"
          textId="customize.balance"
          onClick={finishFunc}
        />
      </div>
    </div>
  )

PhaseFinishConfirm.propTypes = {
  againFunc: PropTypes.func.isRequired,
  finishFunc: PropTypes.func.isRequired,
  amount: PropTypes.number,
}

PhaseFinishConfirm.defaultProps = {
}

export default PhaseFinishConfirm
