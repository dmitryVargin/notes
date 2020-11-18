import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {
  clearQuery,
} from "../store/actions/actionCreators/appCreators";
import {RootState} from "../interfaces/rootState";
import {searchNotes} from "../store/actions/actionCreators/appCreators";

const mapState = (state: RootState) => ({
  searchQuery: state.app.searchQuery,
  activeAreaNoteId: state.app.activeAreaNoteId
});
const mapDispatch = {
  clearQuery,
  searchNotes,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;


class SearchField extends Component<Props> {
  private searchField: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.searchField = React.createRef();
  }

  render() {
    const {
      searchQuery,
      clearQuery,
      searchNotes,
      activeAreaNoteId
    } = this.props;
    return (
      <span className="find-input-wrap">
            <input
              ref={this.searchField}
              value={searchQuery}
              onChange={(e) => {
                searchNotes(e.target.value, activeAreaNoteId);
              }}
              placeholder="All Notes"
              type="text"
              className="find-input"
            />
            <button onClick={(event) => {
              clearQuery()
              this.searchField.current!.focus()
            }} aria-label="Clear search">
              <svg className="icon-cross-small"
                   xmlns="http://www.w3.org/2000/svg"
                   width="22"
                   height="22"
                   viewBox="0 0 22 22">
                <path
                  d="M16.707 6.707l-1.414-1.414L11 9.586 6.707 5.293 5.293 6.707 9.586 11l-4.293 4.293 1.414 1.414L11 12.414l4.293 4.293 1.414-1.414L12.414 11z">

                </path>
              </svg>
            </button>
          </span>

    );
  }
}

export default connector(SearchField);
