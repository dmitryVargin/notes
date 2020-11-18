import React, {Component} from "react";
import Tag from "./Tag";
import {connect, ConnectedProps} from "react-redux";
import {DragDropContext, Droppable, DropResult, ResponderProvided} from "react-beautiful-dnd";
import {RootState} from "../interfaces/rootState";
import {
  changeTagOrder,
  deleteTag,
  setActiveAreaNoteId,
  toggleTagsEditability
} from "../store/actions/actionCreators/appCreators";

const mapState = (state: RootState) => ({
  notes: state.app.notes,
  activeTab: state.app.activeTab,
  isNoteSelected: state.app.isNoteSelected,
  activeAreaNoteId: state.app.activeAreaNoteId,
  searchQuery: state.leftSidebar.searchQuery,
  isTagsEditable: state.app.isTagsEditable,
  tags: state.app.tags
});
const mapDispatch = {
  setActiveAreaNoteId,
  deleteTag,
  toggleTagsEditability,
  changeTagOrder
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Tags extends Component<Props> {

  isDropped = (result: DropResult, provided: ResponderProvided): void => {
    let currentOrder = result.source.index
    let newOrder = result.destination?.index!
    this.props.changeTagOrder(currentOrder, newOrder)
  };

  render() {
    const {
      isTagsEditable,
      toggleTagsEditability,
      tags
    } = this.props;
    const editText = isTagsEditable ? "Done" : "Edit";
    let sortedTags = tags.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
    let tagsComponents = sortedTags.map((tag, index) => {
      return (
        <Tag index={index} key={tag.name} order={tag.order} name={tag.name}/>
      );
    })


    return (
      <div className="tags">
        <div className="tags-header-wrap">
          <p className="tags-header">TAGS</p>
          <button
            onClick={toggleTagsEditability}
            className="tag-list-edit-toggle button"
          >
            {editText}
          </button>
        </div>
        <ul className="tag-list">
          <DragDropContext onDragEnd={this.isDropped}>
            <Droppable
              // isDropDisabled={true}
              droppableId={`101`}
            >
              {(provided) => {
                return (
                  <ul
                    className="tag-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tagsComponents}
                    {provided.placeholder}
                  </ul>
                );
              }}
            </Droppable>
          </DragDropContext>
        </ul>
      </div>
    );
  }
}

export default connector(Tags);
