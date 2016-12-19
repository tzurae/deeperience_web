import React, { PropTypes } from 'react'
import ImPropTypes from 'react-immutable-proptypes'
import { List } from 'immutable'
import FontAwesome from 'react-fontawesome'
import Text from '../Text'
import styles from './styles.scss'

const PhaseBranch = ({ nodes, active, done, cb }) => {
  return (
    <div className={styles.nodeWrapper}>
      <div className={styles.nodeLabelDiv}>
        {nodes.map((node, index) => (
          <Text
            key={index}
            style={{ height: index === nodes.length - 1 ? 20 : 50 }}
            className={
            active === index ?
              styles.nodeLabelActive : styles.nodeLabelInactive}
            id={node}
            />
        ))}
      </div>
      <div className={styles.btnDiv}>
        <div
          className={styles.stick}
          style={{ height: `${nodes.length * 50 - 50}px` }}
        />
        <div style={{ position: 'absolute' }}>
          {nodes.map((node, index) => (
            <div
              key={index}
              style={{ height: index === nodes.length - 1 ? 20 : 50 }}>
              <button
                onClick={cb && cb[index]}
                className={active === index ? styles.btnActive : styles.btnInactive}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.btnDiv}>
        <div style={{ position: 'absolute' }}>
          {nodes.map((node, index) => (
            <div
              key={index}
              style={{ height: index === nodes.length - 1 ? 20 : 50 }}>
              <FontAwesome
                name="check"
                className={done.get(index) ? styles.checkActive : styles.checkInactive}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

PhaseBranch.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.string),
  active: PropTypes.number,
  done: ImPropTypes.listOf(PropTypes.bool),
  cb: PropTypes.arrayOf(PropTypes.func),
}

PhaseBranch.defaultProps = {
  nodes: [],
  active: 0,
  done: List([]),
  cb: [],
}

export default PhaseBranch
