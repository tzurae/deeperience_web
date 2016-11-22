import uuid from 'uuid'

const uuid1 = uuid()
const uuid2 = uuid()
const uuid3 = uuid()
const uuid4 = uuid()
export const startSites = [
  {
    uuid: uuid1,
    guideSiteId: '582e68a14fc07cada5235edc',
  },
]

export const routes = [
  [
    {
      from: {
        uuid: uuid1,
        guideSiteId: '582e68a14fc07cada5235edc',
      },
      to: {
        uuid: uuid2,
        guideSiteId: '5832939fdb52b9081000c26b',
      },
    },
    {
      from: {
        uuid: uuid1,
        guideSiteId: '582e68a14fc07cada5235edc',
      },
      to: {
        uuid: uuid3,
        guideSiteId: '58329706db52b9081000c272',
      },
    },
    {
      from: {
        uuid: uuid2,
        guideSiteId: '5832939fdb52b9081000c26b',
      },
      to: {
        uuid: uuid4,
        guideSiteId: '583297c8db52b9081000c275',
      },
    },
    {
      from: {
        uuid: uuid3,
        guideSiteId: '58329706db52b9081000c272',
      },
      to: {
        uuid: uuid4,
        guideSiteId: '583297c8db52b9081000c275',
      },
    },
  ],
]
