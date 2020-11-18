import React, {Component} from "react";

import {connect, ConnectedProps} from "react-redux";
import {
  deleteNote,
  toggleHideRightSidebar
} from "../store/actions/actionCreators/appCreators";
import {toggleLeftSidebar} from "../store/actions/actionCreators/leftSidebarCreators";
import {RootState} from "../interfaces/rootState";

const mapState = (state: RootState) => ({
  activeAreaNoteId: state.app.activeAreaNoteId,
  notes: state.app.notes
});
const mapDispatch = {
  deleteNote,
  toggleLeftSidebar,
  toggleHideRightSidebar,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class HeaderNotes extends Component<Props> {
  render() {
    let {
      deleteNote,
      activeAreaNoteId,
      toggleLeftSidebar,
      toggleHideRightSidebar,
      notes,
    } = this.props;
    let noteName = notes.filter(note => note.id === activeAreaNoteId)[0].name
    return (
      <div className="header-notes d-flex">
        <div onClick={toggleLeftSidebar} className="icon-sidebar-wrap">
          <svg
            className="icon-sidebar"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
          >
            <path
              d="M19,3H3C1.895,3,1,3.895,1,5v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M3,5h3v12H3V5z M19,17H8V5h11V17z"/>
          </svg>
        </div>

        <div className="control-icons-wrap">
          <div className="control-icon">
            <svg
              className="icon-revisions"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                d="M8.7,14.7l3.3-3.3V6h-2v4.6l-2.7,2.7L8.7,14.7z M11,2c5,0,9,4,9,9h-2c0-3.9-3.1-7-7-7s-7,3.1-7,7s3.1,7,7,7c2.4,0,4.5-1.2,5.7-3H13v-2h7v7h-2v-3.3c-1.6,2-4.2,3.3-7,3.3c-5,0-9-4-9-9S6,2,11,2z"/>
            </svg>
          </div>
          <div className="control-icon">
            <svg
              className="icon-share"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                d="M7.707 7.707L6.293 6.293 11 1.586l4.707 4.707-1.414 1.414L12 5.414V13h-2V5.414L7.707 7.707zM17 9v9H5V9H3v11h16V9h-2z"/>
            </svg>
          </div>
          <div
            onClick={() => deleteNote(activeAreaNoteId, noteName)}
            className="control-icon"
          >
            <svg
              className="icon-trash"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                d="M18 8.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8.5h2V18h10V8.5h2zM15 5V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H3v2h16V5h-4zM9 4h4v1H9V4zm1 12V8.5H8V16h2zm4 0V8.5h-2V16h2z"/>
            </svg>
          </div>
          <div onClick={toggleHideRightSidebar} className="control-icon">
            <svg
              className="icon-info"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                d="M11 4c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7m0-2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm1 8h-2v6h2v-6zm-1-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(HeaderNotes);
