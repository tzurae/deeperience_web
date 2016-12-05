# Comment 寫法

## 前言

為了之後的人維護 code 的容易，請一定要寫註解，而註解的部分統一格式如下。

## Component

component 通常為 stateless component，沒有 class function，所以寫法如下。

```
/**
 * ## Edit by: noootown <- 最後是由誰編輯，只要有更改 props，使得這份註解得要做更改，就一定要改名字
 *
 * ## SubNavigation
 *
 * @props
 * activeTab: <- props 名稱
 *    0  <- 輸入格式
 * tabText:
 *    ['nav.customize.customize', 'nav.customize.myCustomTrip']
 * tabLink: link of each tab
 *    ['#', '/trip/myCustomTrip']
 *
 * ## SubNavigation1
 *
 * ......
 *
 * @export
 *    default: Just a subnavbar <- export的這個東西是做什麼用的，簡單說明
 *	   subnavigation1: another type of subnavbar <- 如果有其它非 default export，請加在下面。
 */

import ......
import ......

const SubNavigation = ({ activeTab, tabText, tabLink }) => (
 ......
)
```

