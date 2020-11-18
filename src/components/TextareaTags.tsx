import React, {Component} from "react";

import {connect, ConnectedProps} from "react-redux";
import {
  addTag, removeTagFromNote,
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";
import classNames from "classnames";

const mapState = (state: RootState) => ({
  notes: state.app.notes,
  activeAreaNoteId: state.app.activeAreaNoteId,
  tags: state.app.tags,
});
const mapDispatch = {
  addTag,
  removeTagFromNote,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;


class TextareaTags extends Component<Props> {

  state = {
    tag: "",
    tagSuggestion: "",
    isReadyForDeleting: false,
    lastTagOrder: 0,
  }

  componentDidMount() {
    let lastTagOrder = Math.max(
      ...this.props.tags
        .filter((tag) => tag.noteIds.includes(this.props.activeAreaNoteId))
        .map(tag => tag.order)
    )
    this.setState({
      lastTagOrder
    })

  }


  onKeyHandle = (keyCode: number) => {

    // Enter
    if (keyCode === 13) {
      if (this.state.tag !== "") {
        this.props.addTag(this.props.activeAreaNoteId, this.state.tag)
        let lastTagOrder = Math.max(
          ...this.props.tags
            .filter((tag) => tag.noteIds.includes(this.props.activeAreaNoteId))
            .map(tag => tag.order))
        this.setState({
          tag: "",
          tagSuggestion: "",
          lastTagOrder,
          isReadyForDeleting: false,
        })
        this.forceUpdate()
      }
      //   Right arrow
    } else if (keyCode === 39) {
      this.setState({
        tag: this.state.tagSuggestion,
        tagSuggestion: "",
        isReadyForDeleting: false,
      })
      //  Backspace
    } else if (keyCode === 8) {
      if (this.state.tag) {
        return
      }
      if (this.state.isReadyForDeleting) {
        this.props.removeTagFromNote(this.props.activeAreaNoteId,
          this.state.lastTagOrder)
        let lastTagOrder = Math.max(
          ...this.props.tags
            .filter((tag) => tag.noteIds.includes(this.props.activeAreaNoteId))
            .map(tag => tag.order))
        this.setState({
          lastTagOrder,
          isReadyForDeleting: false,
        })
        this.forceUpdate()
      } else {
        let lastTagOrder = Math.max(
          ...this.props.tags
            .filter((tag) => tag.noteIds.includes(this.props.activeAreaNoteId))
            .map(tag => tag.order))
        this.setState({
          isReadyForDeleting: true,
          lastTagOrder,
        })
      }
    }


  }
  onChangeHandle = (tag: string) => {
    let tagNames = this.props.tags
      .filter((tag) => !tag.noteIds.includes(this.props.activeAreaNoteId))
      .map(tag => tag.name)
    let tagSuggestion = ""

    for (let tagName of tagNames) {
      let escapedRegExp = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      if (tag.length !== 0) {
        if (tag.length < tagName.length) {
          if (tagName.match(new RegExp(`^${escapedRegExp}`))) {
            tagSuggestion = tagName
            break
          }
        } else {
          if (tagName.match(new RegExp(`^${escapedRegExp}.`))) {
            tagSuggestion = tagName
            break
          }
        }
      }
    }
    this.setState({
      tag,
      tagSuggestion
    })
  }
  removeTag = (order: number) => {
    this.props.removeTagFromNote(this.props.activeAreaNoteId,
      order)
    let lastTagOrder = Math.max(
      ...this.props.tags
        .filter((tag) => tag.noteIds.includes(this.props.activeAreaNoteId))
        .map(tag => tag.order))
    this.setState({
      lastTagOrder,
      isReadyForDeleting: false,
    })
    this.forceUpdate()
  }

  render() {
    const {
      activeAreaNoteId,
      tags,
    } = this.props;


    let existingTagsOnCurrentNote = tags
      .filter((tag) => tag.noteIds.includes(activeAreaNoteId))
      .map((tag) => {
        let tagForDeletingActive = classNames({
          selected: tag.order === this.state.lastTagOrder && this.state.isReadyForDeleting
        })
        return (
          <div onClick={(e) => {
            this.removeTag(tag.order)
          }} key={tag.name}
               className={`tag-chip ${tagForDeletingActive}`}>{tag.name}</div>
        )

      })

    return (
      <div className="tag-field">
        <div className="tag-editor">
          {existingTagsOnCurrentNote}
          <div className="tag-input">
            <input onKeyDown={(e) => {
              this.onKeyHandle(e.keyCode)
            }} onChange={(e) => {
              this.onChangeHandle(e.target.value)
            }} value={this.state.tag} className="tag-input__entry" type="text"
                   placeholder="Add a tag…"/>
            <div
              className="tag-input__suggestion">{this.state.tagSuggestion}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(TextareaTags);
