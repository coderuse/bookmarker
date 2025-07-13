export interface Bookmark {
  id: string
  name: string
  url: string
}

export interface BookmarkTab {
  id: string
  name: string
  bookmarks: Bookmark[]
}

export interface BookmarkData {
  tabs: BookmarkTab[]
  activeTabId?: string
}