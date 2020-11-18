import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {
  toggleLeftSidebar
} from "../store/actions/actionCreators/leftSidebarCreators";
import {
  addNote,
  setActiveAreaNoteId,
  toggleHideLeftSidebar,
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";

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
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  foundTags: {name: string, order: number}[]
}

class TagSuggestions extends Component<Props> {
  render() {
    let tagsComponents = this.props.foundTags.map(tag=>{
      return (
        <li className="tag-suggestion-row" key={tag.name}>
          <div className="tag-suggestion">
            tag: {tag.name}
          </div>
        </li>
      )
    })
    return (
      <div className="search-tag-results">
        <p className="search-results-title">
          Search By Tag
        </p>
        <ul className="tag-suggestions-list">
          {tagsComponents}
        </ul>

      </div>
    );
  }
}

export default connector(TagSuggestions);
