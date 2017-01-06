import React, { PropTypes } from 'react'
import Text from '../../utils/Text'
import styles from './styles.scss'
import Col from 'react-bootstrap/lib/Col'
import IconRectBtn from '../../utils/IconRectBtn'

// self intro 的部分，可以考慮和trip/phaseguideconfirm
// 的合成一個 component ，目前暫時不合，因為將來可能會改

const PhaseOutline = ({ travelerData, customData, country, area, languages, rank }) => (
  <div className={styles.outerContainer}>
    <Block title="order.outline.travelerData">
      <div className={styles.info}>
        <div className={styles.guideInfo1}>
          <div className={styles.guideInfo1Left}>
            <div className={styles.avatar}/>
          </div>
          <div className={styles.guideInfo1Right}>
            <div>
              <p className={styles.guideName}>{travelerData.name}</p>
              <p className={styles.profession}>{travelerData.profession}</p>
            </div>
          </div>
        </div>
        <div className={styles.guideInfo2}>
          <Col md={4} className={styles.smallInfo}>
            <Text className={styles.smallInfoTitle} id="customize.guideConfirm.location"/>
            <p className={styles.smallInfoContent}>{`${country}, ${area}`}</p>
          </Col>
          <Col md={4} className={styles.smallInfo}>
            <Text className={styles.smallInfoTitle} id="customize.guideConfirm.hobby"/>
            <p className={styles.smallInfoContent}>{travelerData.hobby.join(' / ')}</p>
          </Col>
          <Col md={4} className={styles.smallInfo}>
            <Text className={styles.smallInfoTitle} id="customize.guideConfirm.language"/>
            <p className={styles.smallInfoContent}>{languages.join(', ')}</p>
          </Col>
        </div>
        <p className={styles.selfIntro}>{travelerData.selfIntro}</p>
      </div>
    </Block>
    <Block title="order.outline.demand">
      <div className={styles.info}>
        <Option label="order.outline.people">
            <span>{`${customData.people} 人`}</span>
        </Option>
        <Option label="order.outline.location" isElement={true}>
          {customData.locations.map(({ area }, index) => <Element key={index} text={area}/>)}
        </Option>
        <div className={styles.option}>
          <Text className={styles.optionLabel1} id="order.outline.time"/>
          <div className={styles.optionValue}>
            {`${customData.date.from} ~ ${customData.date.to}`}
          </div>
          <div className={styles.optionValueElement}>
            <Element text={customData.dayInfo}/>
          </div>
        </div>

        <div className={styles.blackline}/>

        <Option label="order.outline.tripElement" isElement={true}>
          {customData.tripElements.map((value, index) => <Element key={index} text={value}/>)}
        </Option>
        <Option label="order.outline.foodElement" isElement={true}>
          {customData.foodElements.map((value, index) => <Element key={index} text={value}/>)}
        </Option>
        <Option label="order.outline.hotelType" isElement={true}>
          {customData.hotelTypes.map((value, index) => <Element key={index} text={value}/>)}
        </Option>

        <div className={styles.blackline}/>

        <Option label="order.outline.residentFee" labelType={2}>
          <span>{`$${customData.residentFee.min} ~ $${customData.residentFee.max}`}</span>
        </Option>
        <Option label="order.outline.foodFee" labelType={2}>
          <span>{`$${customData.foodFee.min} ~ $${customData.foodFee.max}`}</span>
        </Option>
        <Option label="order.outline.residentFee" labelType={2}>
          <span>{`$${customData.tripFee.min} ~ $${customData.tripFee.max}`}</span>
        </Option>
        <Option label="order.outline.isHotel" labelType={2}>
          <span>{customData.isHotel ? '是' : '否'}</span>
        </Option>
        <Option label="order.outline.isAirplane" labelType={2}>
          <span>{customData.isAirplane ? '是' : '否'}</span>
        </Option>

        <div className={styles.blackline}/>

        <Option label="order.outline.otherDemand" labelType={1}>
          <p>{customData.otherDemand}</p>
        </Option>
      </div>
    </Block>
    <div className={styles.footer}>
      <IconRectBtn
        name="times"
        textId="order.outline.disagree"
        className={styles.footerBtn}
      />
      <IconRectBtn
        name="send-o"
        textId="order.outline.agree"
        className={styles.footerBtn}
      />
    </div>
  </div>
)

PhaseOutline.propTypes = {
  travelerData: PropTypes.object.isRequired,
  customData: PropTypes.object.isRequired,
  country: PropTypes.string,
  area: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  rank: PropTypes.number,
}

PhaseOutline.defaultProps = {
  country: '',
  area: '',
  languages: [],
  rank: 1,
}

const Block = ({ children, title }) => (
  <div className={styles.block}>
    <Text
      id={title}
      className={styles.title}
    />
    <div className={styles.container}>
      {children}
    </div>
  </div>
)

Block.propTypes = {
  title: PropTypes.string,
}

const Element = ({ text }) => <Text className={styles.element} id={text}/>

Element.propTypes = {
  text: PropTypes.string,
}

const Option = ({ children, label, labelType, isElement }) => {
  let labelClass
  switch (labelType) {
    case 1:
      labelClass = styles.optionLabel1
      break
    case 2:
      labelClass = styles.optionLabel2
      break
    default:
      labelClass = styles.optionLabel1
  }
  return (
    <div className={styles.option}>
      <Text className={labelClass} id={label}/>
      {
        isElement ?
          <div className={styles.optionValueElement}>{children}</div> :
          <div className={styles.optionValue}>{children}</div>
      }
    </div>
  )
}

Option.propTypes = {
  label: PropTypes.string,
  labelType: PropTypes.number,
  isElement: PropTypes.bool,
}

Option.defaultProps = {
  label: '',
  labelType: 1,
  isElement: false,
}

export default PhaseOutline
