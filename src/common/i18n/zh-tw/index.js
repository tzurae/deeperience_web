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
  'login.email': '信箱',
  'login.password': '密碼',
  'login.rememberMe': '記住我',
  'login.ensurePassword': '確認密碼',
  'login.title': '完美客製化旅程，旅程規劃零負擔',
  'register.mailHasSent': '確認信已送出！',
  'register.pleaseReceive': '請至信箱收取會員確認信',
  'register.sure': '確認',
  'register.hasRead': '已詳細閱讀',
  'register.memberShip': '會員條款',
  'register.register': '註冊',
  'user.name': '暱稱',
  'memberCenter.personalPage': '個人頁面',
  'memberCenter.personalData': '個人資料',
  'memberCenter.edit': '編輯',
  'memberCenter.piece': '份',
  'memberCenter.buyTrip': '已購買旅程',
  'memberCenter.addTrip': '已新增旅程',
  'memberCenter.addSite': '已新增景點',
  'memberCenter.avatar': '大頭貼',
  'memberCenter.editPassword': '修改密碼',
  'memberCenter.oldPassword': '舊密碼',
  'memberCenter.newPassword': '新密碼',
  'memberCenter.ensurePassword': '確認密碼',
  'memberCenter.look': '查看',
  'memberCenter.editPersonalProfile': '編輯個人頁面',
  ...flattenMessages(HotelTypes, 'HotelTypes'),
  ...flattenMessages(TripElements, 'TripElements'),
  ...flattenMessages(FoodElements, 'FoodElements'),
  ...flattenMessages(TravelWays, 'TravelWays'),
  ...flattenMessages(TripDayInfos, 'TripDayInfos'),
  ...flattenMessages(TripLocations, 'TripLocations'),
  ...flattenMessages(Languages, 'Languages'),
  ...flattenMessages(Levels, 'Levels'),
}

