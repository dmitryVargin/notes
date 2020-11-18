export type Tag = {
  name: string;
  order: number;
  noteIds: number[];
}
export type Tags = Tag[]


export type Note = {
  id: number;
  name: string;
  excerpt: string;
  isPinned: boolean;
  content: string;
  isDelete: boolean;
  isEdited: boolean;
  creationDate: string,
  lastModified: string,
}
export type Notes = Note[]


export default interface IAppState {
  activeTab: string,
  activeAreaNoteId: number,
  isNoteSelected: boolean,
  isVisibleHideLeftSidebar: boolean,
  isVisibleHideRightSidebar: boolean,
  isTagsEditable: boolean,
  maxTagOrder: number,
  noteDisplay: string,
  notesSortType: string,
  tagsSortType: string,
  isDisplaySetting: boolean,
  searchQuery: string,
  settingTab: string,
  theme: string,
  notesSortOrder: string,
  lineLength: string,
  wordsQuantity : number,
  charactersQuantity: number,
  tags: Tags,
  notes: Notes
}
