import React, { Component } from "react";
import Header from "./Header";
import Textarea from "./Textarea";
import {Notes} from "../interfaces/AppState";

interface Props {
  isNoteSelected: boolean;
  activeTab: string;
  activeAreaNoteId: number;
  notes: Notes
}

class Main extends Component<Props> {
  render() {
    const { notes, activeTab, activeAreaNoteId, isNoteSelected } = this.props;
    return (
      <div className="main-component">
        <Header
          isNoteSelected={isNoteSelected}
          notes={notes}
          activeTab={activeTab}
          activeAreaNoteId={activeAreaNoteId}
        />
        <Textarea />
      </div>
    );
  }
}

export default Main;
