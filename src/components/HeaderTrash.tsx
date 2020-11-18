import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import {deleteNoteForever, restoreNote} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";

const mapState = (state: RootState) => ({
  isNoteSelected: state.app.isNoteSelected,
  activeAreaNoteId: state.app.activeAreaNoteId,
});
const mapDispatch = {
  deleteNoteForever,
  restoreNote,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class HeaderTrash extends Component<Props> {
  render() {
    let { deleteNoteForever, restoreNote, activeAreaNoteId } = this.props;
    return (
      <div className="header-trash">
        <div className="header-trash-wrap">
          <div className="header-btn-restore-wrap">
            <button
              onClick={(e) => {
                deleteNoteForever(activeAreaNoteId);
              }}
              className="button header-btn-delete"
            >
              Delete Forever
            </button>
          </div>
          <div className="header-btn-delete-wrap">
            <button
              onClick={(e) => {
                restoreNote(activeAreaNoteId);
              }}
              className="button header-btn-restore"
            >
              Restore Note
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(HeaderTrash);
