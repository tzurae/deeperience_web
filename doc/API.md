# Backend API

## User

#### 列出所有 User

```
GET /api/users
```

Permission: AUTH + ADMIN

| Name | Type | Description | Required |
|------|------|------|------|
| page | integer | 頁數 | True |

<br>

#### 註冊

```
POST /api/users
```

Permission: PUBLIC

| Name | Type | Description | Required |
|------|------|------|------|
| name | string | 暱稱 | True |
| email | string | Email | True |
| password | string | 密碼 | True |
| ensurePassword | string | 確認密碼 | True |

<br>

#### 確認 Email 可用

```
POST /api/forms/USER_REGISTER/fields/email/validation
```

Permission: PUBLIC

| Name | Type | Description | Required |
|------|------|------|------|
| value | string | 信箱 | True |

<br>

#### 登入

```
POST /api/users/login
```

Permission: PUBLIC

| Name | Type | Description | Required |
|------|------|------|------|
| email | string | 信箱 | True |
| password | string | 密碼 | True |

<br>

#### 取得個人資訊

```
GET /api/users/me
```

Permission: AUTH

<br>

#### 登出

```
GET /api/users/logout
```

Permission: AUTH

---

## Trip

#### 購買的 Trip

```
GET /api/trips/buy
```

Permission: AUTH

<br>

#### 自己發佈的 Trip

```
GET /api/trips/own
```

Permission: AUTH

<br>

#### 新增 Trip

```
POST /api/trips
```

Permission: AUTH

<br>

#### 修改 Trip

```
PUT /api/trips/:tripId
```

Permission: AUTH

| Name | Type | Description | Required |
|------|------|------|------|
| tripId | Integer | trip 的 id | True |

<br>

#### 刪除 Trip

```
DELETE /api/trips/:tripId
```

Permission: AUTH

| Name | Type | Description | Required |
|------|------|------|------|
| tripId | Integer | trip 的 id | True |

---

## Site

#### 列出所有 Site

```
GET /api/guideSites
```

Permission: AUTH

<br>

#### 新增 Site

```
POST /api/guideSites
```

Permission: AUTH

<br>

#### 修改 Site

```
PUT /api/guideSites/:guideSiteId
```

Permission: AUTH

| Name | Type | Description | Required |
|------|------|------|------|
| guideSiteId | Integer | site 的 id | True |

<br>

#### 刪除 Site

```
DELETE /api/guideSites/:guideSiteId
```

Permission: AUTH

| Name | Type | Description | Required |
|------|------|------|------|
| guideSiteId | Integer | site 的 id | True |

---

## Post

#### 列出所有 Post

```
GET /api/posts
```

Permission: AUTH

<br>

#### 新增 Post

```
POST /api/posts
```

Permission: AUTH

<br>

#### 修改 Post

```
PUT /api/posts/:postId
```

Permission: AUTH

| Name | Type | Description | Required |
|------|------|------|------|
| postId | Integer | post 的 id | True |

<br>

#### 刪除 Post

```
DELETE /api/posts/:postId
```

Permission: AUTH

| Name | Type | Description | Required |
|------|------|------|------|
| postId | Integer | post 的 id | True |

