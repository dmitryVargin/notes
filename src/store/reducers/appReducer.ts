import {
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
  CHANGE_TAG_NAME,
  CHANGE_TAG_ORDER,
  ADD_TAG,
  SET_MAX_TAG_ORDER,
  REMOVE_TAG_FROM_NOTE, SEARCH_NOTES, CLEAR_QUERY,
} from "../actions/actionTypes/constants";

import IAppState from "../../interfaces/AppState";
import {AppActionTypes} from "../actions/actionTypes/ActionTypes";


const initialState: IAppState = {
  activeTab: "Notes",
  isNoteSelected: false,
  activeAreaNoteId: 0,
  isVisibleHideLeftSidebar: false,
  isVisibleHideRightSidebar: false,
  isTagsEditable: false,
  maxTagOrder: 0,
  noteDisplay: "Comfy",
  notesSortType: "",
  tagsSortType: "",
  isDisplaySetting: false,
  settingTab: "",
  searchQuery: "",
  theme: "",
  notesSortOrder: "",
  lineLength: "",
  wordsQuantity: 0,
  charactersQuantity: 0,
  tags: [
    {
      name: "tag_1",
      order: 1,
      noteIds: [0, 3]
    },
    {
      name: "tag_2",
      order: 2,
      noteIds: [1, 3]
    },
    {
      name: "tag_3",
      order: 3,
      noteIds: [0, 1]
    },
  ],
  notes: [
    {
      id: 0,
      name: "<div>Example Note Title</div>",
      excerpt: "",
      content: "<div>Example Note content</div>",
      isDelete: false,
      isPinned: true,
      isEdited: false,
      creationDate: "",
      lastModified: "",
    },
  ],
};


export default function appReducer(
  state = initialState,
  action: AppActionTypes
): IAppState {
  switch (action.type) {
    case SET_MAX_TAG_ORDER :
      return {
        ...state,
        maxTagOrder: Math.max(...state.tags.map(tag => tag.order))
      }
    case CHANGE_TAG_NAME:
      return {
        ...state,
        tags: state.tags.map(tag => {
          if (tag.order === action.order) {
            return {
              ...tag,
              name: action.tagName
            }
          } else {
            return tag
          }
        })
      }
    case CHANGE_TAG_ORDER:
      if (action.currentOrder !== action.newOrder && action.newOrder !== undefined) {
        return {
          ...state,
          tags: state.tags.map(tag => {
            if (tag.order === action.currentOrder) {
              return {
                ...tag,
                order: action.newOrder,
              }
            } else if (tag.order > action.currentOrder && tag.order <= action.newOrder) {
              return {
                ...tag,
                order: tag.order - 1,
              }
            } else if (tag.order < action.currentOrder && tag.order >= action.newOrder) {
              return {
                ...tag,
                order: tag.order + 1,
              }
            } else {
              return tag
            }
          })
        }
      } else {
        return state
      }
    case CLEAR_QUERY:
      return {
        ...state,
        searchQuery: "",
      };

    case TOGGLE_TAGS_EDITABILITY:
      return {
        ...state,
        isTagsEditable: !state.isTagsEditable,
      };

    case SET_DATA_FROM_API:
      return state
    case ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes.map(note => {
            if (note.isEdited) {
              return {
                ...note,
                isEdited: false,
              }
            } else {
              return note
            }
          }),
          {
            id: Math.max(...state.notes.map(note => note.id)) + 1,
            name: "New Note...",
            content: "",
            isDelete: false,
            excerpt: "",
            isPinned: false,
            isEdited: true,
            creationDate: new Date().toLocaleString("ru", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }),
            lastModified: new Date().toLocaleString("ru", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }),
          },
        ],
        isNoteSelected: true,
        activeAreaNoteId: Math.max(...state.notes.map(note => note.id)) + 1,
      };

    case TOGGLE_TAB:
      let firstTabItem: number = 0;
      if (state.activeTab === "Notes") {
        for (let note of state.notes) {
          if (!note.isDelete) {
            firstTabItem = note.id;
            break;
          }
        }
      } else {
        for (let note of state.notes) {
          if (note.isDelete) {
            firstTabItem = note.id;
            break;
          }
        }
      }
      return {
        ...state,
        isNoteSelected: false,
        activeTab: action.activeTab,
        activeAreaNoteId: firstTabItem,
        isVisibleHideLeftSidebar: false,
      };
    case TOGGLE_HIDE_LEFT_SIDEBAR:
      return {
        ...state,
        isVisibleHideLeftSidebar: !state.isVisibleHideLeftSidebar,
      };

    case CLOSE_HIDE_LEFT_SIDEBAR:
      if (action.eventTargetClass === "App") {
        return {
          ...state,
          isVisibleHideLeftSidebar: !state.isVisibleHideLeftSidebar,
        };
      }
      return state;

    case TOGGLE_HIDE_RIGHT_SIDEBAR:
      return {
        ...state,
        isVisibleHideRightSidebar: !state.isVisibleHideRightSidebar,
      };

    case ADD_TAG:
      if (state.tags.filter(tag => tag.name === action.tag).length) {
        return {
          ...state,
          tags: state.tags.map(tag => {
            if (tag.name === action.tag && !tag.noteIds.includes(action.activeAreaNoteId)) {
              return {
                ...tag,
                noteIds: [...tag.noteIds, action.activeAreaNoteId]
              }
            } else {
              return tag
            }
          })
        }
      } else {
        return {
          ...state,
          tags: [
            ...state.tags,
            {
              noteIds: [action.activeAreaNoteId],
              name: action.tag,
              order: state.maxTagOrder + 1
            }
          ],
          maxTagOrder: state.maxTagOrder + 1,
        }
      }

    case
    DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(tag => tag.order !== action.order)
      }


    case
    REMOVE_TAG_FROM_NOTE:
      return {
        ...state,
        tags: state.tags.map(tag => {
          if (tag.order === action.tagOrder) {
            if (tag.noteIds.length) {
              let noteIds = tag.noteIds
              noteIds.splice(tag.noteIds.indexOf(action.activeAreaNoteId), 1)
              return {
                ...tag,
                noteIds,
              }
            } else {
              return tag
            }

          } else {
            return tag
          }
        })
      }

    case
    DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.id) {
            return {
              ...note,
              isDelete: true,
              isEdited: false,
            };
          } else {
            return note;
          }
        }),
        activeAreaNoteId: Math.min(...state.notes.map(note => note.id)),
      };

    case
    DELETE_NOTE_FOREVER:
      return {
        ...state,
        isNoteSelected: false,
        notes: state.notes.filter(note => note.id !== action.id)
      };
    case
    RESTORE_NOTE:
      return {
        ...state,
        isNoteSelected: false,
        notes: state.notes.map((note) => {
          if (note.id === action.id) {
            return {
              ...note,
              isDelete: false,
            };
          } else {
            return note;
          }
        }),
      };
    case
    SET_ACTIVE_AREA_NOTE_ID:
      return {
        ...state,
        isNoteSelected: true,
        activeAreaNoteId: action.id,
      };

    case
    PIN_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.id) {
            return {
              ...note,
              isEdited: true,
              isPinned: !note.isPinned,
            };
          } else {
            return note;
          }
        })
      };
    case
    SAVE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => {
          if (note.id === action.id) {
            return {
              ...note,
              content: action.content
            }
          } else {
            return note
          }

        })
      }
    case SEARCH_NOTES:
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    default:
      return state;
  }
}
