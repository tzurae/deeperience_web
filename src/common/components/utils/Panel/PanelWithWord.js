import React, { PropTypes } from 'react'
import cx from 'classnames'
import Panel from './DefaultPanel'
import styles from './styles.scss'

const PanelWithWord = ({
  className,
  children,
  contentDivClass,
  titleClass,
  underlineClass,
  ...props
}) => (
  <Panel
    className={cx(styles.panelWithWord, className)}
    underlineClass={cx(styles.underlineWithWord, underlineClass)}
    titleClass={cx(styles.titleWithWord, titleClass)}
    contentDivClass={cx(styles.contentDivWithWord, contentDivClass)}
    commentClass={styles.commentWithWord}
    {...props}
  >
    {children}
  </Panel>
)

PanelWithWord.PropTypes = {
  className: PropTypes.string,
  contentDivClass: PropTypes.string,
  titleClass: PropTypes.string,
  underlineClass: PropTypes.string,
}

PanelWithWord.defaultProps = {
  className: '',
  contentDivClass: '',
  titleClass: '',
  underlineClass: '',
}

export default PanelWithWord
