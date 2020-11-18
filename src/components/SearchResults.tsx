import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {
  toggleLeftSidebar,
} from "../store/actions/actionCreators/leftSidebarCreators";
import {
  addNote, searchNotes,
  setActiveAreaNoteId,
  toggleHideLeftSidebar,
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";
import SearchTagResults from "./TagSuggestions";
import NoteList from "./NoteList";


const mapState = (state: RootState) => ({
  notes: state.app.notes,
  isNoteSelected: state.app.isNoteSelected,
  activeAreaNoteId: state.app.activeAreaNoteId,
  searchQuery: state.leftSidebar.searchQuery,
  tags: state.app.tags
});
const mapDispatch = {
  setActiveAreaNoteId,
  addNote,
  toggleLeftSidebar,
  toggleHideLeftSidebar,
  searchNotes,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;


class SearchResults extends Component<Props> {
  render() {
    const {
      notes,
      searchQuery,
      tags,
    } = this.props;
    let searchQueryReg = new RegExp(`${searchQuery}`, "gi")

    let foundTags = tags.filter(tagObj => tagObj.name.match(searchQueryReg))
    let foundNotes = notes.filter(note => note.name.match(searchQueryReg))
    let isFoundNote = foundNotes.length !== 0
    let isFoundTag = foundTags.length !== 0
    return (
      <div>
        {
          isFoundTag ?
            <React.Fragment>
              <SearchTagResults foundTags={foundTags}/>
              <h2 className="search-results-title">Notes</h2>
              <NoteList/>
            </React.Fragment>
            :
            isFoundNote ?
              <React.Fragment>
                <SearchTagResults foundTags={foundTags}/>
                <h2 className="search-results-title">Notes</h2>
                <NoteList/>
              </React.Fragment>
              : null
        }
      </div>
    );
  }
}

export default connector(SearchResults);
