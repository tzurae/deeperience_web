import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {Link} from 'react-router'
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
    explain: {
        height: '45px',
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
        border: '0',
    }
}

const TripArea = () => {
    const imgSize = 120;
    return (
        <Row style={{marginTop: '120px'}}>
            <Col md={4}>
                <div style={style.tripBlock}>
                    <img src="/img/icon01.png" width={imgSize} />
                    <p style={style.explain}><Text id="presentTrip.addSite.explain" /></p>
                    <button style={style.button}>
                        <Text id="presentTrip.addSite" />
                    </button>
                </div>
            </Col>

            <Col 
                md={4} 
                style={{borderRight: '2px solid #D4D4D4', borderLeft: '2px solid #D4D4D4'}}
            >
                <div style={style.tripBlock}>
                    <img src="/img/icon02.png" width={imgSize} />
                    <p style={style.explain}><Text id="presentTrip.addTrip.explain" /></p>
                    <Link to="/trip/createTrip">
                        <button style={style.button}>
                            <Text id="presentTrip.addTrip" />
                        </button>
                    </Link>
                </div>
            </Col>


            <Col md={4}>
                <div style={style.tripBlock}>
                    <img src="/img/icon03.png" width={imgSize} />
                    <p style={style.explain}><Text id="presentTrip.manageTrip.explain" /></p>
                    <button style={style.button}>
                        <Text id="presentTrip.manageTrip" />
                    </button>
                </div>
            </Col>
        </Row>
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
