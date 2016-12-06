import React from 'react'
import PageLayout from '../../components/layouts/PageLayout'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Text from '../../components/utils/Text'
import { FBEmbedPost } from 'facebook-plugins'
import Footer from '../../components/utils/Footer'
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
    <Features />
    <UserReviews/>
    <Footer/>
  </PageLayout>
)

const Jum = () => (
  <Jumbotron className={styles.jumbotron}>
    <Text id="company.name" className={styles.companyName}/>
    <Text id="company.slogan" className={styles.companySlogan}/>
    <Button bsClass={styles.produceTripButton}>
      <Text id="produce.trip" className={styles.produceTrip}/>
    </Button>
  </Jumbotron>
)

const Features = () => (
  <section className={styles.productFeature}>
    <Row>
      <Text id="product.feature.headline" className={styles.productFeatureHeadline}/>
      <hr className={styles.hr}/>
    </Row>
    <Row>
      <div className={styles.features}>
        <Feature
          href={require('../../../public/img/homepage/icon01.png')}
          slogan="features.trip.planning.slogan"
          intro="features.trip.planning.introduction"
        />
        <Feature
          href={require('../../../public/img/homepage/icon02.png')}
          slogan="features.video.planning.slogan"
          intro="features.video.planning.introduction"
        />
        <Feature
          href={require('../../../public/img/homepage/icon03.png')}
          slogan="features.trip.customized.slogan"
          intro="features.trip.customized.introduction"
        />
      </div>
    </Row>
  </section>
)

const Feature = ({ href, slogan, intro }) => (
  <div className={styles.feature}>
    <img src={href} className={styles.img}/>
    <h2>
      <Text id={slogan} className={styles.featureHeadline}/>
    </h2>
    <Text id={intro} className={styles.featureIntro}/>
  </div>
)

const UserReviews = () => (
  <section className={styles.userReviews}>
    <Row>
      <Text id="userReviews.headline" className={styles.productFeatureHeadline}/>
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
