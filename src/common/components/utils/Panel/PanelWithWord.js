import React from 'react'
import classname from 'classnames'
import Panel from './defaultPanel'
import styles from './styles.scss'

const PanelWithWord = ({ children, className, ...props }) => (
  <Panel
    className={classname(styles.panelWithWord, className)}
    underlineClass={styles.underlineWithWord}
    titleClass={styles.titleWithWord}
    contentDivClass={styles.contentDivWithWord}
    commentClass={styles.commentWithWord}
    {...props}
  >
    {children}
  </Panel>
)

export default PanelWithWord
