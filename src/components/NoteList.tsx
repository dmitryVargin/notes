import React, {Component} from "react";
import NoteItem from "./NoteItem";
import {connect, ConnectedProps} from "react-redux";
import {setActiveAreaNoteId} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";

const mapState = (state: RootState) => ({
  activeTab: state.app.activeTab,
  notes: state.app.notes,
  isNoteSelected: state.app.isNoteSelected,
  activeAreaNoteId: state.app.activeAreaNoteId,
  searchQuery: state.leftSidebar.searchQuery,
});
const mapDispatch = {
  setActiveAreaNoteId,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class NoteList extends Component<Props> {
  render() {
    let {
      notes,
      activeTab,
      searchQuery,
    } = this.props;

    let isTrashTab = activeTab === "Trash";
    let currentNoteList;
    if (isTrashTab) {
      currentNoteList = notes.filter((note) => note.isDelete);
    } else {
      currentNoteList = notes.filter((note) => !note.isDelete);
    }
    if (searchQuery) {
      currentNoteList = currentNoteList.filter((note) => {
          return (
            note.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }
      );
    }

    currentNoteList.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
    currentNoteList.sort((a, b) => a.isEdited === b.isEdited ? 0 : a.isEdited ? -1 : 1);
    currentNoteList.sort((a, b) => a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1);


    let noteList = currentNoteList.map((note) => {
      return (
        <NoteItem
          note={note}
          isPinned={note.isPinned}
          key={note.id}
          id={note.id}
        />
      )
    });

    return (
      <div className="note-list">
        {noteList}
      </div>
    );
  }
}

export default connector(NoteList);
