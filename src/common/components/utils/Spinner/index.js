import React, { PropTypes } from 'react'
import cx from 'classnames'
import styles from './styles.scss'

const Spinner = ({ className, dotClass, display, size }) => (
  display ?
    <div
      className={cx(styles.div, className)}
      style={{ width: `${size * 4}px` }}
    >
      <div
        className={cx(styles.one, dotClass)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <div
        className={cx(styles.two, dotClass)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <div
        className={cx(styles.three, dotClass)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div> :
    <div/>
)

Spinner.propTypes = {
  className: PropTypes.string,
  dotClass: PropTypes.string,
  color: PropTypes.string,
  display: PropTypes.bool,
  size: PropTypes.number,
}

Spinner.defaultProps = {
  className: '',
  dotClass: '',
  color: 'white',
  display: false,
  size: 12,
}

export default Spinner
