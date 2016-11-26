import React from 'react'
import styles from '../../styles'
import FontAwesome from 'react-fontawesome'

const style = {
  iconBtn: {
    height: '26px',
    width: '26px',
    padding: 0,
    fontSize: '15px',
    backgroundColor: styles.color.orange,
    color: 'white',
    border: 0,
    borderRadius: '13px',
  },
}

const IconBtn = ({ name, btnStyle, onClick, bgColor }) => {
  return (
    <button style={{ ...style.iconBtn, ...btnStyle }} onClick={onClick}>
      <FontAwesome
        name={name}
        style={{ backgroundColor: bgColor || styles.color.orange }}
      />
    </button>
  )
}

export default IconBtn
