import React from 'react'

const style = {
  width: '100%',
  position: 'absolute',
  top: '0px',
  left: '0px',
}

const BackGround = ({ src, color }) => {
  if(src){
    return <img src={src} style={style} />
  } else {
    color = color || 'white'
    const extraStyle = {
      backgroundColor: color,
      height: '100%',
    }
    return <div style={{...style, ...extraStyle}}></div>
  }
}

export default BackGround