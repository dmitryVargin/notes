import React, {Component} from "react";
import Tags from "./Tags";
import {connect, ConnectedProps} from "react-redux";
import {
  deleteTag,
  setActiveAreaNoteId,
  toggleTab
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";

const mapState = (state: RootState) => ({
  isVisibleHideLeftSidebar: state.app.isVisibleHideLeftSidebar,
  activeTab: state.app.activeTab,
});
const mapDispatch = {
  deleteTag,
  toggleTab,
  setActiveAreaNoteId,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class HideLeftSidebar extends Component<Props> {
  render() {
    const {isVisibleHideLeftSidebar, activeTab, toggleTab} = this.props;
    return (
      <div
        className={`hide_left_sidebar ${
          isVisibleHideLeftSidebar ? "visible" : ""
        }`}
      >
        <div className="navbar-wrap">
          <div className="navbar-item">
            <svg
              className={`icon-notes tab-icon ${
                activeTab === "Notes" ? "active" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                d="M18 4v10H8V4h10m0-2H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM4 18V6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2H4zM16 6h-6v2h6V6zm0 4h-6v2h6v-2z"/>
            </svg>
            <span
              onClick={(e) => toggleTab("Notes")}
              className={`navbar-text tab-btn ${
                activeTab === "Notes" ? "active" : ""
              }`}
            >
              All Notes
            </span>
          </div>
          <div className="navbar-item">
            <svg
              className={`icon-trash tab-icon ${
                activeTab === "Trash" ? "active" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                d="M18 8.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8.5h2V18h10V8.5h2zM15 5V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H3v2h16V5h-4zM9 4h4v1H9V4zm1 12V8.5H8V16h2zm4 0V8.5h-2V16h2z"/>
            </svg>
            <span
              onClick={(e) => toggleTab("Trash")}
              className={`navbar-text tab-btn ${
                activeTab === "Trash" ? "active" : ""
              }`}
            >
              Trash
            </span>
          </div>
        </div>
        <Tags/>
        <div className="navbar-wrap">
          <div className="navbar-item navbar-setting">
            <svg
              className="icon-settings"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                d="M14 21H8v-2.587c-.684-.278-1.33-.652-1.917-1.11L3.84 18.6l-3-5.198 2.242-1.294C3.028 11.734 3 11.364 3 11s.027-.735.08-1.108L.84 8.598l3-5.196 2.244 1.295C6.67 4.24 7.317 3.865 8 3.587V1h6v2.587c.684.278 1.33.653 1.917 1.11l2.243-1.295 3 5.196-2.24 1.294c.053.374.08.744.08 1.108 0 .363-.027.734-.08 1.107l2.24 1.294-3 5.198-2.244-1.296c-.586.458-1.233.833-1.916 1.11V21zm-4-2h2v-2.04l.715-.212c.887-.265 1.718-.745 2.402-1.393l.542-.51 1.768 1.02 1-1.732-1.768-1.02.17-.726c.114-.47.17-.938.17-1.387 0-.45-.057-.916-.17-1.39l-.17-.723 1.768-1.02-1-1.733-1.77 1.022-.54-.512c-.686-.647-1.517-1.128-2.403-1.392L12 5.04V3h-2v2.04l-.715.212c-.887.265-1.718.746-2.4 1.392l-.543.512-1.77-1.022-1 1.73 1.77 1.022-.173.726c-.113.47-.17.94-.17 1.388s.057.916.17 1.39l.17.724-1.768 1.02 1 1.733 1.77-1.02.542.51c.685.647 1.515 1.128 2.402 1.393l.714.21V19zm1-4c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"/>
            </svg>
            <span className="navbar-text ">Setting</span>
          </div>
        </div>
        <p className="navbar-footer-item">Keyboard Shortcuts</p>
        <p className="navbar-footer-item">Help & Support About</p>
        <div className="sync-status-wrap">
          <img src="" alt="" className="sync-status-img"/>
          <span className="sync-status-text">All changes synced</span>
        </div>
      </div>
    );
  }
}

export default connector(HideLeftSidebar);
