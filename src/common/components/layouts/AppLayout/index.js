import React from 'react'
import Head from '../../utils/Head'
import styles from './styles.scss'

const AppLayout = ({ children }) => (
  <div className={styles.root}>
    <Head
      title="Deeperience"
      metas={[
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ]}
      links={[
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        '/css/main.css',
        '/css/base.css',
      ]}
      scripts={[
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',
      ]}
    />
    {children}
  </div>
)

export default AppLayout
