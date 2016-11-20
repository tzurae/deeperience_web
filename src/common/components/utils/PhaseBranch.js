import React from 'react'
import Text from '../widgets/Text'
import styles from '../../styles'

const style = {
  container: {
    borderRadius: '5px',
    backgroundColor: 'white',
  },
  nodeDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    padding: '10px 0px 10px 10px',
  },
  nodeLabel: {
    textAlign: 'right',
    fontSize: styles.font.medium,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
  },
  stick: {
    width: '3px',
    backgroundColor: styles.color.borderGrey,
    position: 'absolute',
    top: '5px',
    left: '5px',
  },
}

const PhaseBranch = ({ nodes, active }) => {
  return (
    <div style={style.nodeDiv}>
      <div style={{ flex: 3, paddingRight: '15px' }}>
        {nodes.map((node, index) => (
          <div
            key={index}
            style={{ height: index === nodes.length - 1 ? 20 : 50 }}>
            <Text
              style={{
                ...style.nodeLabel,
                color: active === index ?
                  styles.color.orange :
                  styles.color.borderGrey,
              }}
              id={node}
            />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, position: 'relative', top: '5px' }}>
        <div style={{ height: `${nodes.length * 50 - 50}px`, ...style.stick }}/>
        <div style={{ position: 'absolute' }}>
          {nodes.map((node, index) => (
              <div
                key={index}
                style={{ height: index === nodes.length - 1 ? 20 : 50 }}>
                <div
                  style={{
                    ...style.dot,
                    backgroundColor: active === index ?
                      styles.color.orange :
                      styles.color.borderGrey,
                  }}
                />
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhaseBranch
