import React from 'react'
import PageLayout from '../../layouts/PageLayout'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button'
import Text from '../../widgets/Text'
import s from './styles.scss'

const HomePage = (props) => (
  <PageLayout hasGrid={null}>
    <Row>
        <Jumbotron className={s.jumbotron}>
          <Text id="company.name" />
          <Text id="company.slogan"/>
          <Button bsStyle="warning">
            <Text id="produce.trip"/>
          </Button>
        </Jumbotron>
    </Row>
  </PageLayout>
)

export default HomePage
