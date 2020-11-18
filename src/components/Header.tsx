import React, {Component} from "react";
import HeaderNotes from "./HeaderNotes";
import HeaderTrash from "./HeaderTrash";
import {Notes} from "../interfaces/AppState";

interface Props {
  isNoteSelected: boolean;
  activeTab: string;
  activeAreaNoteId: number;
  notes: Notes
}

class Header extends Component<Props> {
  render() {
    let {activeTab, isNoteSelected} = this.props;
    let activeHeader;
    if (isNoteSelected) {
      activeHeader = activeTab === "Notes" ? <HeaderNotes/> : <HeaderTrash/>;
    } else {
      activeHeader = "";
    }

    return <div className="header-section">{activeHeader}</div>;
  }
}

export default Header;
