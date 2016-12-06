# Comment 寫法

## 前言

為了之後的人維護 code 的容易，請一定要寫註解，而註解的部分統一格式如下。

## Component

1. component 通常為 stateless component，沒有 class function，所以寫法如下。

```
/**
 * ## Edit by: noootown <- 最後是由誰編輯，只要有更改 props，使得這份註解得要做更改，就一定要改名字
 *
 * ## SubNavigation
 * @usage <- 簡單說明(必要)
 *    Just a sub navbar, under the main navbar。
 *
 * @props
 * activeTab: 第幾個 tab 是亮的 <- props 名稱和解釋，如果顯然易懂，可忽略。
 *    0  <- 輸入範例，如果顯然易懂，亦可忽略。
 * tabText:
 *    ['nav.customize.customize', 'nav.customize.myCustomTrip']
 * tabLink: link of each tab
 *    ['#', '/trip/myCustomTrip']
 *
 * ## SubNavigation1
 * @usage
 * ......
 *
 * 
 */

import ......
import ......

const SubNavigation = ({ activeTab, tabText, tabLink }) => (
  ......
)
```
2. 拜託請一定要寫 ```proptypes``` 和 ```defaultProps```，如果很複雜，無法shape的，請也加上```PropTypes.any```。這個部分，統一加在 component class後面。若有看到以前的 code 沒有寫的，也請幫忙補上。

## Container 或 任何有訂閱 store 的 component 或 form

1. 檔案開頭寫法如```component```。所以如果要找 props 的定義，請到開頭註解找，或者到 各個 ```reducer``` 的 ```initialstate``` 去找。

2. ```class function```，請在各個 function 上方，加入：
```
/**
 * ## function name
 * @usage
 *    ......
 * @param
 *  	a: int, param usage
 * @return
 * 		type: int
 * 		meaning .. . . . . . .
 */
```
目前先暫時使用 comment 的方式註解 type。之後應該會加上 flow，不過現在加上這個，會影響開發速度，而且也不太好設定，所以留在之後的版本加。

## Initial state

在reducers資料夾底下，會有很多的initialstate 檔案。因為註reducer，個人認為沒有多大意義，而且也很難有一個標準的註法，不如直接註 initialstate。

直接註在state後面，註解法如下：

```
import { Record } from 'immutable'
const InitialState = Record({
  apiEngine: null,
  locale: '', // intl locale
  messages: {}, // intl messages
})

export default InitialState
```
## action creator

目前使用 flow 來標註 ```action creator``` 的 ```arguments```。不過因為我們沒有直接呼叫 action creator，而是把它 bind 在 dispatch 上呼叫，所以 ```flow``` 不會檢查到。因此，在我們這邊只是用一個標註的功能。

寫法如下，參考 [文章](https://flowtype.org/docs/builtins.html#_)：

```
// @flow <- 一定要標註

export const createTripError = (error: string) => {
  return {
    type: CREATE_TRIP_ERROR,
    payload: {
      error,
    },
  }
}

```

如果傳進的參數很多，且可有可無，寫成一個一個參數不方便，非得要傳一個物件，請照以下方式寫。注意！因為不這樣寫，eslint 會跳錯，所以一定要用這種方式寫。參考 [flow Objects](https://flowtype.org/docs/objects.html) 。

```
type tripType = {
  tripInfo: any,
  routes: any,
  startSites: Array<string>,
  uuid2data: any,
};

// see components/forms/trip/fakeData
export const setCreateTripData = (data: tripType) => {
  return {
    type: SET_CREATE_TRIP_DATA,
    payload: data,
  }
}
```













