# Deeperience web 開發指南

## 前言

目前公司的架構還未定，也還存在一些以前的 code 尚未 migrate 過來，所以```一切的開發準則一這份為主，不要管內部程式碼怎麼寫```，因為有可能會照抄到舊版的 code。萬一發現開發指南沒有寫的話，請一定要提出來。大家共同討論如何修改。

## 版本控制

#### 前言

我們公司使用 git & gitflow 這一套系統來做開發。

#### 閱讀文章

- [文章](https://ihower.tw/blog/archives/5140)

#### 開發要點

- 寫 code 之前，請一定要先 ```git pull```。
- 切勿在 dev branch, master branch 做開發。
- feature、hotfix、release，指令```git branch```後，請命名成如下 feature/BranchFirst。不要使用camel，不要加 - 號，全部用大寫開頭
- 有 merge 權限的人，請直接 merge 回去，沒有權限的人，請發個 PR。
- commit 之前，請先跑一次 ```npm run pretest```
- commit message 最多一行，大寫開頭，一段話結尾。如果沒有辦法一句話解決，請 rebase 你的 code。```一次commit，一個feature！```
- 目前有加上 precommit ，在 commit 之前，會先做一次測試，如果沒問題的話，才會 commit。不過如果很確定自己的 code 會過，就測 ```eslint``` 和 ```stylelint``` 後，打 ```git commit -n```，即可不用跑 build 和 mocha。
## 安裝 package

請一定要加上 ```--save``` 或 ```-dev``` 。例如：```npm install --save-dev eslint``` 或者 ```npm install --save underscore```。

## JavaScript Coding Style

#### 設計風格

JacaScript coding style 原則上參照 [Airbnb JavaScript Style](https://github.com/airbnb/javascript)﹐小部分為了適應專案，有做修改。

#### Script

1. 測試：```npm run eslint```。

2. 修復：```npm run fix-eslint```。

## 檔案命名

由於各個資料夾的命名原則有一點不太一樣，所以請命名的時候，看周邊的檔案怎麼命，就跟著命。

如果是 js component，請用一個資料夾包起來，然後裡面放 index.js 和 styles.scss。這兩個檔案分別是 component 和 style。

## 檔案架構

#### 目錄和簡單介紹

```
/configs		<- config的地方，若非結構大改或加新的工具，請不要動
/doc			<- document 的地方
/src
	/clients 
	/common		<- 主要的程式碼都在這裡
	/native		<- 目前沒有使用，是 react native 的程式碼
	/public		<- 放 reset css, base css, img的地方
	/server		<- server code
```

#### /src/common

這部分放著大部分的code，因此拿出來慢慢講。common的檔案目錄如下：

```
/api		<- call後端api的
/components	<- 所有components 放在這裡
/constants	<- 所有 constant
/i18n		<- 多國語系
/reducers	<- action creator, reducer, initialstate
/routes		<- react router
/styles		<- 所有統一的 style，包括 mixin
/utils 		<- 可共用的 function
```

#### /src/common/components

因為 components 的架構特別複雜，所以再額外拿出來講。這部分的目錄架構如下：

```
/fields		<- 放所有 form 的一個個小 input
/forms		<- 放所有的 form
/layouts	<- 放一個 page 的基底，也就是整個版面的主要layout
/pages		<- 放一頁頁的畫面
/utils		<- 放一個個的小 components
/widgets	<- 放小插件
```
#### /src/common/components/forms

1. form name 記得登錄在 /constants/formNames。
2. 如果一個 form 有多個 page，請依照以下命名方法：

```
/CreateTripForm.js			<- form 主體
/CreateTripFormPage1.js	<- 第1頁
/CreateTripFormPage1.js	<- 第2頁
```

#### /src/common/reducers

目前處理 state 的部分，全部使用 immutableJS，但除了 global 和 trip 外，其它還沒改過來，所以在改過來之前，請先參考 ```/src/common/reducers/trip```

檔案結構如下，請遵照這個命名法則：

```
/tripActions.js
/tripInitialState.js
/tripReducer.js
```

## Coding style 

#### import module 

這部分，請把node module 寫在最前面。import 內部的檔案，請放在後面。最後再加上一些要預先設定的變數。大致如下：

```
import React from 'react'
import { connect } from 'react-redux'
import * as tripActions from '../../../../reducers/trip/tripActions'

const actions = [
	tripActions,
]

```

#### redux

1. 全部專案的 state，請用 redux 處理，不要使用 local state。
2. react-redux,  action creator, action, mapStateToProps, mapDispatchToProps 請照這樣寫在最前頭。

```
import * as tripActions from '../../../../reducers/trip/tripActions'
import * as reduxFormActions from '../../../../reducers/form/reduxFormActions'

const actions = [
  tripActions,
  reduxFormActions,
]

const mapStateToProps = state => {
  	return {
    	createTripForm: state.form[FormNames.TRIP_CREATE_TRIP],
    	apiEngine: state.global.apiEngine,
  	}
}

const mapDispatchToProps = dispatch => {
  	const creators = Map()
    	.merge(...actions)
    	.filter(value => typeof value === 'function')
    	.toObject()

  	return {
    	actions: bindActionCreators(creators, dispatch),
    	dispatch,
  	}
}

class CreateTripPage extends React.Component {

}

export connect(mapStateToProps, mapDispatchToProps)(CreateTripPage)
```
#### redux action

action 請統一寫成以下形式，一個type，搭配一個 payload 物件。 

```
export const setOwnSite = (sites) => {
  return {
    type: SET_OWN_SITE,
    payload: {
		sites,
	}
  }
}
```

#### redux form

請把 redux form 要傳進去的資料，寫在最前面，例如：

```
const formProperty = {
	form: FormNames.TRIP_CREATE_TRIP,
  	destroyOnUnmount: false,
  	validate,
  	initialValues: {
    	name: '',
    	tags: [],
  	},
}

class TripForm extends React.Component {
	// ...
}

export default reduxForm(formProperty)(connect(mapStateToProps, mapDispatchToProps)(TripForm)) 
```

#### react (eslint)
- [文章1](https://github.com/yannickcr/eslint-plugin-react)

以下是尚未整合進專案的 esLint 特性，之後開發 code 的時候，請在遵照目前 ESLint react 的同時，也符合這些原則。尚未整合的原因是錯誤太多，未來在刪減專案不要的code時，會一併加上這些 rule，目前為求產品上線，先不更動目前結構。有時間時再來修。

1. react/no-set-state
	
不要使用 setState()

2. react/prop-types

請一定要加上 proptypes

3. react/sort-comp

請一定要按照順序寫 lifecycle 的  function()

4. react/prefer-stateless-function

盡量使用 stateless function。

## I18n

當 code 確定是完整版，要 merge 回 dev 時，所有有中文的地方，全部都換成I18n。要注意的是 /stc/common/components/widgets/Text 的部分，回傳分成值兩種，一種是```<p><span>word</span></p>```的，一種是只單純傳回```<span>word</span>```

## Style

#### 檔案結構

設計原則採 [smacss](http://www.slideshare.net/kurotanshi/css-oocss-smacss-bem)。

各種類型的分別放置地：

```
/src/public/main.css	<- base 
/src/public/base.css	<- base
/src/common/components/layouts/XX/XX.scss <- layout
/src/common/styles/_mixin.scss <- module
/src/common/styles/themeX/ <- theme
```

#### 設計風格

大部分參照 [這篇文章](http://codeguide.bootcss.com/#css)。

#### Script

1. 測試： ```npm run stylelint```

2. 修復： ```npm run fix-stylelint```，基本上除了命名問題之外，其它問題都可以修復。記得在 ```commit``` 之前，一定要修復一下。

#### css 整體寫法

1. 暫定使用[這一套](http://codeguide.bootcss.com/#css)，等待之後把 postcss 的 linter 加上之後，再把這個章節補上。

2. 如果有發現什麼module是常常用到的，請將它們拿出來，寫到```/src/common/styles/_mixin.css```。

3. react component 的 style 設定，請一律使用 className，如果是```非常非常不適合（請多問自己幾次）```寫成單一個class的，例如<div style={{flex: 1}}></div>，再請直接寫在style。注意：inline style 的權重是1000，遠大於 className，所以非不得已，請不要使用inline style。

3. CSS使用color的時候，請先到 ```/src/common/styles/_color.scss```，新增一個顏色名字，名字的來源，請使用 [這個網站](http://chir.ag/projects/name-that-color/#333333)。

4. 如果這個顏色是很常用到的，或者是某一個特定區塊的顏色，請到 ```src/common/styles/theme0/_color.scss```，新增一個常數，之後 CSS 都請直接call這個部分。

5. 如果很不好的（盡量不要），非得在react component style 使用 fontSize 或者 color，請先 follow 第3點，然後再做同樣的事在 ```/src/common/styles/index.js```

6. 非不得已，請不要使用 !important，除非你很確定這個 component 不會在包任何的 child，或者覆蓋不掉 bootstrap style，才能使用。

7. fontSize 請使用在 ```/src/common/styles/theme0/_font.scss``` 設定好的變數。

8. 命名原則：在scss檔裡，請使用 ```-``` 區別各個字節。切勿使用camal。

9. 寫 font-size 或者任何語法之前，請先確定 ```/src/common/styles/_mixin.scss``` 有沒有這個用法，有的話，請使用。

10. 盡量使用縮寫 CSS attribute。

## 圖片

使用圖片時，請先確認圖片的大小小於500kb，並在 ```/src/public/img/``` 下，建一個對應的資料夾。















