import React from 'react'
import styles from './styles.scss'

const DField = ({ label, meta: { touched, error }, adapter, ...rest }) => {
  const Adapter = adapter
  return (
    <div className={styles.container}>
      <div className={styles.labelDiv}>
        <p className={styles.label}>{label}</p>
        {touched && (error && <span className={styles.error}>{error}</span>)}
      </div>
      <Adapter {...rest}/>
    </div>

  )
}

export default DField
