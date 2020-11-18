import React, {Component} from "react";
import NoteList from "./NoteList";
import {connect, ConnectedProps} from "react-redux";
import {
  toggleLeftSidebar,
} from "../store/actions/actionCreators/leftSidebarCreators";
import {
  addNote,
  clearQuery,
  setActiveAreaNoteId,
  toggleHideLeftSidebar,
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";
import SearchResults from "./SearchResults";
import SearchField from "./SearchField";

const mapState = (state: RootState) => ({
  activeTab: state.app.activeTab,
  notes: state.app.notes,
  isNoteSelected: state.app.isNoteSelected,
  activeAreaNoteId: state.app.activeAreaNoteId,
  searchQuery: state.leftSidebar.searchQuery,
  isVisibleLeftSidebar: state.leftSidebar.isVisibleLeftSidebar,
});
const mapDispatch = {
  setActiveAreaNoteId,
  addNote,
  toggleLeftSidebar,
  toggleHideLeftSidebar,
  clearQuery,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class LeftSidebar extends Component<Props> {
  render() {
    const {
      activeTab,
      toggleHideLeftSidebar,
      addNote,
      isVisibleLeftSidebar,
      searchQuery,
    } = this.props;
    let addNoteHandler =
      activeTab === "Notes"
        ? addNote
        : () => {
          return false;
        };

    let isAddNoteDisabled = activeTab === "Trash"
    let noteListComponent = !searchQuery ? <NoteList/> : <SearchResults/>
    return (
      <div className={`left-sidebar ${!isVisibleLeftSidebar ? "closed" : ""}`}>
        <div className="controls-wrap">
          <button
            onClick={toggleHideLeftSidebar}
            className="toggle-icon icon-button">
            <svg
              className="icon-menu"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <rect x="0" fill="none" width="24" height="24"/>
              <g>
                <path d="M21,11H3v2H21Zm0-5H3V8H21Zm0,10H3v2H21Z"/>
              </g>
            </svg>
          </button>
          <SearchField />
          <button
            disabled={isAddNoteDisabled}
            onClick={addNoteHandler}
            className="add-note-sign icon-button"
          >
            <svg
              className="icon-new-note"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path d="M19 10v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7v2H5v12h12v-7h2zm3-7h-3V0h-2v3h-3v2h3v3h2V5h3V3zm-7 5H7v2h8V8zm0 4H7v2h8v-2z"/>
            </svg>
          </button>
        </div>
        <div className="notes-list">
          {noteListComponent}
        </div>
      </div>
    );
  }
}

export default connector(LeftSidebar);
