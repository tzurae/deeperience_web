import React from 'react'

const style = {
  width: '100%',
  position: 'absolute',
  top: '0px',
  left: '0px',
  zIndex: '-1',
  height: '100%',
}

const BackGround = ({ src, color, children }) => {
  if(src){
    return <img src={src} style={style} />
  } else {
    color = color || 'white'
    const extraStyle = {
      backgroundColor: color,
    }
    return (
      <div style={{...style, ...extraStyle}}>
        {children ? children : null}
      </div>
    ) 
  }
}

export default BackGround