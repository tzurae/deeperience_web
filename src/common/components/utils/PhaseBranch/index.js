import React from 'react'
import Text from '../../widgets/Text'
import styles from './styles.scss'

const PhaseBranch = ({ nodes, active, cb }) => {
  return (
    <div className={styles.nodeWrapper}>
      <div style={{ flex: 3, paddingRight: '15px' }}>
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
      <div style={{ flex: 1, position: 'relative' }}>
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
    </div>
  )
}

export default PhaseBranch
