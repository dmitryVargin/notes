import React, {Component} from "react";
import  {Note} from "../interfaces/AppState";
import {connect, ConnectedProps} from "react-redux";
import {pinNote, setActiveAreaNoteId} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";
import ReactHtmlParser from "react-html-parser";

const mapState = (state: RootState) => ({
  activeTab: state.app.activeTab,
  notes: state.app.notes,
  isNoteSelected: state.app.isNoteSelected,
  activeAreaNoteId: state.app.activeAreaNoteId,
  searchQuery: state.leftSidebar.searchQuery,
  noteDisplay: state.app.noteDisplay
});
const mapDispatch = {
  setActiveAreaNoteId,
  pinNote,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  id: number;
  isPinned: boolean;
  note: Note
};

class NoteItem extends Component<Props> {
  render() {
    let {
      note,
      id,
      setActiveAreaNoteId,
      activeAreaNoteId,
      isNoteSelected,
      pinNote,
      isPinned,
      searchQuery,
      noteDisplay,
    } = this.props;
    let isSelected =
      activeAreaNoteId === id && isNoteSelected ? "selected" : "";
    let noteName = note.name;
    if (searchQuery) {
      let searchQueryReg = new RegExp(`${searchQuery}`, "gi")
      noteName = noteName.replace(searchQueryReg, `<span class="search-match">$&</span>`)
    }
    let noteExcerptLineQuantity
    let noteExcerpt = null

    if (noteDisplay === "Condensed") {
      noteExcerptLineQuantity = 0
    } else if (noteDisplay === "Comfy") {
      noteExcerptLineQuantity = 1
    } else if (noteDisplay === "Expanded") {
      noteExcerptLineQuantity = 5
    }
    if(noteExcerptLineQuantity) {
    }
    let isPinnedClass = isPinned ? "note-list-item-pinned" : "";
    return (
      <div className={`note-list-item ${isSelected} ${isPinnedClass}`}>

        <div
          className={`note-list-item-wrap `}
          onClick={() => setActiveAreaNoteId(id)}
        >
          <div onClick={(e) => {
            pinNote(id);
          }}
               className={`note-list-item-pinner `}>
          </div>
          <div className="note-list-item-name">
            <div className="note-list-item-title">
              <span>{ReactHtmlParser(noteName)}</span>
            </div>
            <div className="note-list-item-excerpt">{noteExcerpt}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(NoteItem);
