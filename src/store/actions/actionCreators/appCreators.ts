import {
  CHANGE_TAG_NAME,
  SET_DATA_FROM_API,
  ADD_NOTE,
  TOGGLE_TAB,
  TOGGLE_HIDE_RIGHT_SIDEBAR,
  TOGGLE_HIDE_LEFT_SIDEBAR,
  DELETE_TAG,
  SET_ACTIVE_AREA_NOTE_ID,
  DELETE_NOTE,
  DELETE_NOTE_FOREVER,
  RESTORE_NOTE,
  SAVE_NOTE,
  CLOSE_HIDE_LEFT_SIDEBAR,
  PIN_NOTE,
  TOGGLE_TAGS_EDITABILITY,
  CHANGE_TAG_ORDER,
  ADD_TAG,
  SET_MAX_TAG_ORDER,
  REMOVE_TAG_FROM_NOTE, SEARCH_NOTES, CLEAR_QUERY,
} from "../actionTypes/constants";
import {Notes} from "../../../interfaces/AppState";





export const changeTagName = (order: number, tagName: string) =>
  ({
    type: CHANGE_TAG_NAME,
    order,
    tagName,
  } as const);
export const toggleTagsEditability = () =>
  ({
    type: TOGGLE_TAGS_EDITABILITY,
  } as const);

export const pinNote = (id: number) =>
  ({
    type: PIN_NOTE,
    id,
  } as const);

export const saveNote = (id: number, content: string) =>
  ({
    type: SAVE_NOTE,
    id,
    content,
  } as const);

export const closeHideLeftSidebar = (eventTargetClass: string) =>
  ({
    type: CLOSE_HIDE_LEFT_SIDEBAR,
    eventTargetClass,
  } as const);

export const deleteNoteForever = (id: number) =>
  ({
    type: DELETE_NOTE_FOREVER,
    id,
  } as const);
export const setDataFromApi = (payload: Notes) =>
  ({
    type: SET_DATA_FROM_API,
    payload,
  } as const);
export const addNote = () =>
  ({
    type: ADD_NOTE,
  } as const);

export const toggleTab = (activeTab: string) =>
  ({
    type: TOGGLE_TAB,
    activeTab,
  } as const);

export const toggleHideLeftSidebar = () =>
  ({
    type: TOGGLE_HIDE_LEFT_SIDEBAR,
  } as const);

export const toggleHideRightSidebar = () =>
  ({
    type: TOGGLE_HIDE_RIGHT_SIDEBAR,
  } as const);

export const deleteTag = (order: number) =>
  ({
    type: DELETE_TAG,
    order,
  } as const);
export const deleteNote = (id: number, name:string) =>
  ({
    type: DELETE_NOTE,
    id,
    name,
  } as const);

export const setActiveAreaNoteId = (id: number) =>
  ({
    type: SET_ACTIVE_AREA_NOTE_ID,
    id,
  } as const);

export const restoreNote = (id: number) =>
  ({
    type: RESTORE_NOTE,
    id,
  } as const);
export const changeTagOrder = (currentOrder: number, newOrder: number) =>
  ({
    type: CHANGE_TAG_ORDER,
    currentOrder,
    newOrder,
  } as const);
export const setMaxTagOrder = () =>
  ({
    type: SET_MAX_TAG_ORDER,
  } as const);

export const addTag = (activeAreaNoteId: number, tag: string) =>
  ({
    type: ADD_TAG,
    activeAreaNoteId,
    tag,
  } as const);
export const removeTagFromNote = (activeAreaNoteId: number, tagOrder: number) =>
  ({
    type: REMOVE_TAG_FROM_NOTE,
    activeAreaNoteId,
    tagOrder,
  } as const);

export const searchNotes = (searchQuery: string, activeAreaNoteId: number) =>
  ({
    type: SEARCH_NOTES,
    searchQuery,
    activeAreaNoteId,

  } as const);
export const clearQuery = () =>
  ({
    type: CLEAR_QUERY,
  } as const);
