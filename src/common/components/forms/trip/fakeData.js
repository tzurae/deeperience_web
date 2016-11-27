import uuid from 'uuid'

const uuid1 = uuid()
const uuid2 = uuid()
const uuid3 = uuid()
const uuid4 = uuid()
export const startSites = [
  uuid1,
]

export const routes = [
  [
    {
      from: uuid1,
      to: uuid2,
    },
    {
      from: uuid1,
      to: uuid3,
    },
    {
      from: uuid2,
      to: uuid4,
    },
    {
      from: uuid3,
      to: uuid4,
    },
  ],
]

export const uuid2data = {
  [uuid1]: {
    gid: '582e68a14fc07cada5235edc',
  },
  [uuid2]: {
    gid: '5832939fdb52b9081000c26b',
  },
  [uuid3]: {
    gid: '58329706db52b9081000c272',
  },
  [uuid4]: {
    gid: '583297c8db52b9081000c275',
  },
}

