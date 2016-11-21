import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../layouts/PageLayout'
import styles from '../../../../styles'
import Text from '../../../widgets/Text'

const style = {
    title: {
        marginTop: '20px',
        fontSize: styles.font.large,
    },
    subTitle: {
        marginTop: '10px',
        fontSize: styles.font.tiny,
    },
    line: {
        height: '2px',
        width: '50px',
        backgroundColor: styles.color.lightOrange,
        margin: '10px auto',
    },
    slogan: {
        fontSize: styles.font.medium,
    },
    tripBlock: {
        flexGrow: '1',
        textAlign: 'center',
    },
    divide: {
        width: '2px',
        height: '200px',
        backgroundColor: styles.color.borderGrey,
    },
    button: {
        marginTop: '15px',
        backgroundColor: styles.color.lightOrange,
        color: 'white',
        width: '120px',
        height: '30px',
        borderRadius: '20px',
    }
}

const TripArea = () => {
    const imgSize = 120;
    return (
        <div style={{display: 'flex', marginTop: '120px'}}>
            <div style={style.tripBlock}>
                <img src="/img/icon01.png" width={imgSize} />
                <p><Text id="presentTrip.addSite.explain" /></p>
                <button style={style.button}>
                    <Text id="presentTrip.addSite" />
                </button>
            </div>

            <div style={style.divide} />

            <div style={style.tripBlock}>
                <img src="/img/icon02.png" width={imgSize} />
                <p><Text id="presentTrip.addTrip.explain" /></p>
                <button style={style.button}>
                    <Text id="presentTrip.addTrip" />
                </button>
            </div>

            <div style={style.divide} />

            <div style={style.tripBlock}>
                <img src="/img/icon03.png" width={imgSize} />
                <p><Text id="presentTrip.manageTrip.explain" /></p>
                <button style={style.button}>
                    <Text id="presentTrip.manageTrip" />
                </button>
            </div>
        </div>
    )
}

const Title = () => {
  return (
      <div style={{textAlign: 'center'}}>
        <h1><Text id="presentTrip" style={style.title} /></h1>
        <p style={style.subTitle}> Present Your Trip Plan </p>
        <div style={style.line} />
        <Text id="presentTrip.slogan" style={style.slogan} />
      </div>
  )
}

const TripIntroPage = () => {

  return (
    <PageLayout>
      <Title />
      <Grid>
        <Row>
            <Col md={2} />
            <Col md={8} style={{textAlign: 'center'}}>
                <TripArea />
            </Col>
            <Col md={2} />
        </Row>
      </Grid>
    </PageLayout>
  )
}

export default TripIntroPage
