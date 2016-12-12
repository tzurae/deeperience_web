import React, { PropTypes } from 'react'
import classname from 'classnames'
import Panel from './DefaultPanel'
import styles from './styles.scss'

const PanelWithWord = ({ children, className, contentDivClass, titleClass, ...props }) => (
  <Panel
    className={classname(styles.panelWithWord, className)}
    underlineClass={styles.underlineWithWord}
    titleClass={classname(styles.titleWithWord, titleClass)}
    contentDivClass={classname(styles.contentDivWithWord, contentDivClass)}
    commentClass={styles.commentWithWord}
    {...props}
  >
    {children}
  </Panel>
)

PanelWithWord.PropTypes = {
  contentDivClass: PropTypes.string,
  titleClass: PropTypes.string,
}

PanelWithWord.defaultProps = {
  contentDivClass: '',
  titleClass: '',
}

export default PanelWithWord
