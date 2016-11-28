import React from 'react'
import PageLayout from '../../layouts/PageLayout'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Text from '../../widgets/Text'
import { FBEmbedPost } from 'facebook-plugins'
import Footer from '../../utils/Footer'
import styles from './styles.scss'

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
  <Jumbotron className={styles.jumbotron}>
    <p className={styles.companyName}>
      <Text id="company.name" />
    </p>
    <p className={styles.companySlogan}>
      <Text id="company.slogan"/>
    </p>
    <Button bsClass={styles.produceTripButton}>
      <p className={styles.produceTrip}>
        <Text id="produce.trip"/>
      </p>
    </Button>
  </Jumbotron>
)

const Feature = () => (
  <section className={styles.productFeature}>
    <Row>
      <p className={styles.productFeatureHeadline}>
        <Text id="product.feature.headline"/>
      </p>
      <hr className={styles.hr}/>
    </Row>
    <Row>
      <div className={styles.features}>
        <div className={styles.feature}>
          <img src={require('../../../../public/img/homepage/icon01.png')} className={styles.img}/>
          <h2 className={styles.featureHeadline}>
            <Text id="features.trip.planning.slogan"/>
          </h2>
          <p className={styles.featureIntro}>
            <Text id="features.trip.planning.introduction"/>
          </p>
        </div>
        <div className={styles.feature}>
          <img src={require('../../../../public/img/homepage/icon02.png')} className={styles.img}/>
          <h2 className={styles.featureHeadline}>
            <Text id="features.video.planning.slogan"/>
          </h2>
          <p className={styles.featureIntro}>
            <Text id="features.video.planning.introduction"/>
          </p>
        </div>
        <div className={styles.feature}>
          <img src={require('../../../../public/img/homepage/icon03.png')} className={styles.img}/>
          <h2 className={styles.featureHeadline}>
            <Text id="features.trip.customized.slogan"/>
          </h2>
          <p className={styles.featureIntro}>
            <Text id="features.trip.customized.introduction"/>
          </p>
        </div>
      </div>
    </Row>
  </section>
)

const UserReviews = () => (
  <section className={styles.userReviews}>
    <Row>
      <p className={styles.productFeatureHeadline}>
        <Text id="userReviews.headline"/>
      </p>
      <hr className={styles.hr}/>
    </Row>
    <Row>
      <div className={styles.posts}>
        {FBposts.map((post, index) =>
          <div key={index} className={styles.post}>
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
