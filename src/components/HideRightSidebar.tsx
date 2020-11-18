import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {
  addNote,
  deleteTag,
  setActiveAreaNoteId,
  toggleHideLeftSidebar, toggleHideRightSidebar,
  toggleTab
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";

const mapState = (state: RootState) => ({
  activeTab: state.app.activeTab,
  activeAreaNoteId: state.app.activeAreaNoteId,
  isVisibleHideRightSidebar: state.app.isVisibleHideRightSidebar,
  isNoteSelected: state.app.isNoteSelected,
  notes: state.app.notes,
});
const mapDispatch = {
  toggleTab,
  toggleHideLeftSidebar,
  deleteTag,
  setActiveAreaNoteId,
  addNote,
  toggleHideRightSidebar,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class HideRightSidebar extends Component<Props> {
  render() {
    const wordsQuantity = 1110;
    const charactersQuantity = 101242;
    const {isVisibleHideRightSidebar, toggleHideRightSidebar} = this.props;
    return (
      <div
        className={`hide-right-sidebar note-info ${
          isVisibleHideRightSidebar ? "inviz" : ""
        }`}
      >
        <div className="note-info-panel">
          <div className="info-head">
            <p className="info-title">INFO</p>
            <div onClick={toggleHideRightSidebar} className="info-cross-wrap">
              <svg
                className="icon-cross"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
              >
                <path
                  d="M18.707 4.707l-1.414-1.414L11 9.586 4.707 3.293 3.293 4.707 9.586 11l-6.293 6.293 1.414 1.414L11 12.414l6.293 6.293 1.414-1.414L12.414 11z"/>
              </svg>
            </div>
          </div>
          <p className="note-info-item">Modified</p>
          <p className="modified-time note-info-item">Lorem ipsum dolor.</p>
          <p className="words-quantity note-info-item">{wordsQuantity} words</p>
          <p className="characterQuantity note-info-item">
            {charactersQuantity} characters
          </p>
        </div>
        <div className="note-info-panel">
          <div className="pin-to-top-wrap">
            <label className="note-info-item" htmlFor="note-info-pin-checkbox">
              <span className="note-info-item-text">
                <span className="note-info-name">Pin to top</span>
              </span>
              <span className="note-info-item-control">
                <span className="toggle-control">
                  <input type="checkbox" id="note-info-pin-checkbox"/>
                  <span className="toggle-control-layers">
                    <span className="toggle-control-unchecked-color"></span>
                    <span className="toggle-control-checked-color"></span>
                    <span className="toggle-control-knob"></span>
                  </span>
                </span>
              </span>
            </label>
          </div>
        </div>
        <div className="note-info-panel note-info-markdown theme-color-border">
          <label
            className="note-info-item"
            htmlFor="note-info-markdown-checkbox"
          >
            <span className="note-info-item-text">
              <span className="note-info-name">Markdown</span>
              <br/>
              <span className="note-info-detail">
                Enable markdown formatting on this note.{" "}
                <a
                  target="_blank"
                  href="http://simplenote.com/help/#markdown"
                  rel="noopener noreferrer"
                >
                  Learn more…
                </a>
              </span>
            </span>
            <span className="note-info-item-control">
              <span className="toggle-control">
                <input type="checkbox" id="note-info-markdown-checkbox"/>
                <span className="toggle-control-layers">
                  <span className="toggle-control-unchecked-color"></span>
                  <span className="toggle-control-checked-color"></span>
                  <span className="toggle-control-knob"></span>
                </span>
              </span>
            </span>
          </label>
        </div>
      </div>
    );
  }
}

export default connector(HideRightSidebar);
