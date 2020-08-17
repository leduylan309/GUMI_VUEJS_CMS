/**
 * Set Number of Display
 * @type {({name: string, id: number}|{name: string, id: number}|{name: string, id: number}|{name: string, id: number}|{name: string, id: number})[]}
 */
export const DISPLAY_NUMBER = [
  {
    id: 1,
    name: '1'
  },
  {
    id: 2,
    name: '2'
  },
  {
    id: 3,
    name: '3'
  },
  {
    id: 4,
    name: '4'
  },
  {
    id: 5,
    name: '5'
  },
  {
    id: 6,
    name: '6'
  },
  {
    id: 7,
    name: '7'
  },
  {
    id: 8,
    name: '8'
  },
  {
    id: 9,
    name: '9'
  },
  {
    id: 10,
    name: '10'
  }
]

/**
 * Set Display Column for Content
 * @type {({name: string, id: number}|{name: string, id: number}|{name: string, id: number})[]}
 */
export const DISPLAY_COLUMN = [
  {
    id: 1,
    name: '1: リスト'
  },
  {
    id: 2,
    name: '2: カラム'
  },
  {
    id: 3,
    name: '3: タイル'
  }
]

/**
 * Set Type For Video Display
 * @type {({name: string, id: number}|{name: string, id: number})[]}
 */
export const DISPLAY_VIDEO_TYPE = [
  {
    id: 1,
    name: '1: ファイル'
  },
  {
    id: 2,
    name: '2: リンク'
  }
]

export const DISPLAY_SECTION_NEWS = {
  type: 'News',
  data: {
    news_display_count: ''
  }
}

export const DISPLAY_SECTION_CONTENT = {
  type: 'Content',
  data: {
    content_title: '',
    content_limit: '',
    content_column: '',
    contents: []
  }
}

export const DISPLAY_SECTION_MOVIE = {
  type: 'Movie',
  data: {
    video_type: ''
  }
}

export const DISPLAY_SECTION_MEMBER_BARCODE = {
  type: 'Member'
}

export const FOOTER_POSITION = [
  {
    key: 1,
    name: 'ヘッダー'
  },
  {
    key: 2,
    name: 'フッター'
  }
]

export const FOOTER_NAVIGATE = [
  {
    key: 'home',
    name: 'ホーム'
  },
  {
    key: 'pointcard',
    name: 'ポイント'
  },
  {
    key: 'news',
    name: 'お知らせ'
  },
  {
    key: 'banner',
    name: 'バナー'
  },
  {
    key: 'coupon',
    name: 'クーポン'
  }
]
