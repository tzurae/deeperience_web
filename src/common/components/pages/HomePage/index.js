import React from 'react'
import PageLayout from '../../layouts/PageLayout'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Text from '../../widgets/Text'
import { FBEmbedPost } from 'facebook-plugins'
import Footer from '../../utils/Footer'
import s from './styles.scss'

const FBposts = [
  'https://www.facebook.com/allrover/posts/1344736492224624',
  'https://www.facebook.com/allrover/posts/1342211365810470',
  'https://www.facebook.com/allrover/posts/1328055330559407',
  'https://www.facebook.com/allrover/posts/1327319867299620',
  'https://www.facebook.com/allrover/posts/1324081940956746',
  'https://www.facebook.com/allrover/posts/1344736492224624',
  'https://www.facebook.com/allrover/posts/1342211365810470',
  'https://www.facebook.com/allrover/posts/1328055330559407',
  'https://www.facebook.com/allrover/posts/1327319867299620',
  'https://www.facebook.com/allrover/posts/1324081940956746',
  'https://www.facebook.com/allrover/posts/1322478231117117',
  'https://www.facebook.com/allrover/posts/1313889161976024',
  'https://www.facebook.com/allrover/posts/1309918639039743',
]

const HomePage = () => (
  <PageLayout hasGrid={null}>
    <Jum/>
    <Feature />
    <UserReviews/>
    <Footer/>
  </PageLayout>
)

const Jum = () => (
  <Jumbotron className={s.jumbotron}>
    <p className={s.companyName}>
      <Text id="company.name" />
    </p>
    <p className={s.companySlogan}>
      <Text id="company.slogan"/>
    </p>
    <Button bsClass={s.produceTripButton}>
      <p className={s.produceTrip}>
        <Text id="produce.trip"/>
      </p>
    </Button>
  </Jumbotron>
)

const Feature = () => (
  <section className={s.productFeature}>
    <Row>
      <p className={s.productFeatureHeadline}>
        <Text id="product.feature.headline"/>
      </p>
      <hr className={s.hr}/>
    </Row>
    <Row>
      <div className={s.features}>
        <div className={s.feature}>
          <img src={require('../../../../public/img/HomePage/icon01.png')} className={s.img}/>
          <h2 className={s.featureHeadline}>
            <Text id="features.trip.planning.slogan"/>
          </h2>
          <p className={s.featureIntro}>
            <Text id="features.trip.planning.introduction"/>
          </p>
        </div>
        <div className={s.feature}>
          <img src={require('../../../../public/img/HomePage/icon02.png')} className={s.img}/>
          <h2 className={s.featureHeadline}>
            <Text id="features.video.planning.slogan"/>
          </h2>
          <p className={s.featureIntro}>
            <Text id="features.video.planning.introduction"/>
          </p>
        </div>
        <div className={s.feature}>
          <img src={require('../../../../public/img/HomePage/icon03.png')} className={s.img}/>
          <h2 className={s.featureHeadline}>
            <Text id="features.trip.customized.slogan"/>
          </h2>
          <p className={s.featureIntro}>
            <Text id="features.trip.customized.introduction"/>
          </p>
        </div>
      </div>
    </Row>
  </section>
)

const UserReviews = () => (
  <section className={s.userReviews}>
    <Row>
      <p className={s.productFeatureHeadline}>
        <Text id="userReviews.headline"/>
      </p>
      <hr className={s.hr}/>
    </Row>
    <Row>
      <div className={s.posts}>
        {FBposts.map(post =>
          <div className={s.post}>
            <FBEmbedPost appId="1752027395060427"
                         href={post}
                         width={350}
            />
          </div>
        )}
      </div>
    </Row>
  </section>
)

export default HomePage
