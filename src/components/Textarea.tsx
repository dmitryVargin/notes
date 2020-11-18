import React, {Component} from "react";
import TextareaTags from "./TextareaTags";
import {connect, ConnectedProps} from "react-redux";

import {
  saveNote,
  setActiveAreaNoteId
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";


const mapState = (state: RootState) => ({
  activeTab: state.app.activeTab,
  notes: state.app.notes,
  isNoteSelected: state.app.isNoteSelected,
  activeAreaNoteId: state.app.activeAreaNoteId,
  searchQuery: state.app.searchQuery
});
const mapDispatch = {
  setActiveAreaNoteId,
  saveNote,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;


class Textarea extends Component<Props> {

  render() {
    let {
      notes,
      activeAreaNoteId,
      searchQuery,
      isNoteSelected,
      saveNote,
    } = this.props;
    let textareaComponent;
    let content: string
    if (isNoteSelected) {
      textareaComponent = notes.filter((note) => note.id === activeAreaNoteId)
      textareaComponent = textareaComponent[0]
      content = textareaComponent.content
      let lineArr
      if (searchQuery) {
        lineArr = content.trim().split("</div>").filter(line=> line).map(line => {
          let searchQueryReg = new RegExp(`${searchQuery}`, "gi")
          return "<div>" + line.substr(5)
            .replace(searchQueryReg, `<span class="search-match">$&</span>`) + "</div>"
        })
        lineArr = lineArr.join("")
      } else {
        lineArr = content
      }
      textareaComponent = (
        <ContentEditable
          html={lineArr}
          disabled={false}
          onChange={(event: ContentEditableEvent) => {
            let value = event.target.value.replace(/<span class="search-match">/gi, "")
              .replace(/<\/span>/gi, "")
            saveNote(activeAreaNoteId, value)
          }}
        />
      );
    } else {
      textareaComponent = "";
    }
    return (
      <div className="textarea-section">
        <div className="textarea-wrap">
          {textareaComponent}
        </div>
        {
          isNoteSelected ?
            <TextareaTags/>
            :
            null
        }
      </div>
    );
  }
}

export default connector(Textarea);
