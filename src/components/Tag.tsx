import React, {PureComponent} from "react";
import {Draggable} from "react-beautiful-dnd";
import {connect, ConnectedProps} from "react-redux";
import {
  changeTagName,
  deleteTag,
  setActiveAreaNoteId
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";

const mapState = (state: RootState) => ({
  notes: state.app.notes,
  activeTab: state.app.activeTab,
  isNoteSelected: state.app.isNoteSelected,
  activeAreaNoteId: state.app.activeAreaNoteId,
  searchQuery: state.leftSidebar.searchQuery,
  isTagsEditable: state.app.isTagsEditable,
});
const mapDispatch = {
  setActiveAreaNoteId,
  deleteTag,
  changeTagName,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  name: string;
  index: number;
  order: number;
};

class Tag extends PureComponent<Props> {
  state = {
    name: "",
  }

  changeLocalTagName = (name: string) => {
    this.setState({name})
  }

  componentDidMount() {
    this.setState({name: this.props.name})
  }

  render() {
    const {
      name,
      isTagsEditable,
      deleteTag,
      order,
      changeTagName,
    } = this.props;
    const isEditClass = isTagsEditable ? "editable" : "";
    return (
      <Draggable key={name} draggableId={`${name}`} index={order}>
        {(provided) => {
          return (
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <li className="tag-item">
                <div className={`tag-wrap ${isEditClass}`}>
                  <div
                    onClick={() => {
                      deleteTag(order);
                    }}
                    className={`tag-trash ${isEditClass}`}
                  >
                    <svg
                      className="trash-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                    >
                      <path
                        d="M12.414 11l2.074 2.074-1.414 1.414L11 12.414l-2.074 2.074-1.414-1.414L9.586 11 7.512 8.926l1.414-1.414L11 9.586l2.074-2.074 1.414 1.414L12.414 11zM11 5c-3.308 0-6 2.692-6 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6m0-2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z"/>
                    </svg>
                  </div>
                  <input
                    onBlur={(e) => {
                      changeTagName(order, this.state.name)
                    }}
                    onChange={(e) => this.changeLocalTagName(e.target.value)}
                    type="text"
                    value={this.state.name}
                  />
                </div>
                <div
                  {...provided.dragHandleProps}
                  className={`tag-reorder ${isEditClass}`}
                >
                  <svg
                    className="icon-reorder"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                  >
                    <path d="M18 7H4V5h14v2zm2 3H2v2h18v-2zm-2 5H4v2h14v-2z"/>
                  </svg>
                </div>
              </li>
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default connector(Tag);
