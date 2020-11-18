import React, {Component} from "react";
import HideLeftSidebar from "./HideLeftSidebar";
import Main from "./Main";
import LeftSidebar from "./LeftSidebar";
import HideRightSidebar from "./HideRightSidebar";

import {connect, ConnectedProps} from "react-redux";
import {
  addNote,
  closeHideLeftSidebar,
  deleteTag, setActiveAreaNoteId,
  setDataFromApi,
  setMaxTagOrder,
  toggleHideLeftSidebar,
  toggleHideRightSidebar,
  toggleTab
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";
import store from "../store/store";


const mapState = (state: RootState) => ({
  activeTab: state.app.activeTab,
  isVisibleHideLeftSidebar: state.app.isVisibleHideLeftSidebar,
  activeAreaNoteId: state.app.activeAreaNoteId,
  isVisibleHideRightSidebar: state.app.isVisibleHideRightSidebar,
  isNoteSelected: state.app.isNoteSelected,
  notes: state.app.notes,
  maxTagOrder: state.app.maxTagOrder,
  tags: state.app.tags,
});
const mapDispatch = {
  toggleTab,
  toggleHideLeftSidebar,
  deleteTag,
  setActiveAreaNoteId,
  addNote,
  toggleHideRightSidebar,
  closeHideLeftSidebar,
  setDataFromApi,
  setMaxTagOrder,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;


class App extends Component<Props> {
  state = {};

  componentDidMount() {
    store.dispatch(setMaxTagOrder())
  }

  render() {
    const {
      toggleHideLeftSidebar,
      closeHideLeftSidebar,
      isVisibleHideLeftSidebar,
      activeTab,
      notes,
      activeAreaNoteId,
      isNoteSelected,
      isVisibleHideRightSidebar,
      toggleHideRightSidebar,
    } = this.props;

    let closeHideLeftSidebarClick = isVisibleHideLeftSidebar
      ? toggleHideLeftSidebar
      : () => {
        return false;
      };
    let closeHideRightSidebarClick = isVisibleHideRightSidebar
      ? toggleHideRightSidebar
      : () => {
        return false;
      };
    let inactiveClass = isVisibleHideLeftSidebar ? "inactive" : "";
    return (
      <div
        onClick={(e) => {
          closeHideLeftSidebar((e.target as HTMLTextAreaElement).className);
        }}
        className="App"
      >
        <HideLeftSidebar/>
        <div
          onClick={closeHideLeftSidebarClick}
          className={`App ${inactiveClass}`}
        >
          <div
            onClick={closeHideRightSidebarClick}
            className={`visible-default main-display ${
              isVisibleHideLeftSidebar ? "translated" : ""
            } ${isVisibleHideRightSidebar ? "info-open" : ""}`}
          >

            <LeftSidebar/>
            <Main
              isNoteSelected={isNoteSelected}
              notes={notes}
              activeTab={activeTab}
              activeAreaNoteId={activeAreaNoteId}
            />
          </div>
        </div>
        <HideRightSidebar/>
      </div>
    );
  }
}

export default connector(App);
