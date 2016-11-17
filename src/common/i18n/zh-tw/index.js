import HotelTypes from './HotelTypes'
import TripElements from './TripElements'
import FoodElements from './FoodElements'
import TravelWays from './TravelWays'
import TripLocations from './TripLocations'
import TripDayInfos from './TripDayInfos'
import { Languages, Levels } from './Languages'
import flattenMessages from '../utils/flattenMessages'

export default{
  parentLocale: 'zh',
  'nav.home': '首頁',
  'nav.todo': '待辦',
  'nav.language': '語言',
  'nav.feature': '產品特色',
  'nav.wonderful': '精采案例',
  'nav.customize': '客製行程',
  'nav.user': '會員',
  'nav.user.login': '登入',
  'nav.user.register': '註冊',
  'nav.user.profile': '會員中心',
  'nav.user.logout': '登出',
  'page.first': '第一頁',
  'page.prev': '上一頁',
  'page.next': '下一頁',
  'page.last': '最後一頁',
  ...flattenMessages(HotelTypes, 'HotelTypes'),
  ...flattenMessages(TripElements, 'TripElements'),
  ...flattenMessages(FoodElements, 'FoodElements'),
  ...flattenMessages(TravelWays, 'TravelWays'),
  ...flattenMessages(TripDayInfos, 'TripDayInfos'),
  ...flattenMessages(TripLocations, 'TripLocations'),
  ...flattenMessages(Languages, 'Languages'),
  ...flattenMessages(Levels, 'Levels'),
}

