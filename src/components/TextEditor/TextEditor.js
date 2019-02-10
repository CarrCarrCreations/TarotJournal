import React, { Component } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

import styles from "./TextEditor.module.css";
import { BoldMark, ItalicMark, FormatToolbar } from "./index";
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "My first paragraph!"
              }
            ]
          }
        ]
      }
    ]
  }
});

class TextEditor extends Component {
  state = {
    value: initialValue,
    editor: null
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (e, editor, change) => {
    this.setState({ editor: editor });
    console.log(editor);

    if (e.ctrlKey) {
      e.preventDefault();

      switch (e.key) {
        case "b": {
          change.toggleMark("bold");
          return true;
        }
        case "i": {
          change.toggleMark("italic");
          return true;
        }
        case "delete": {
          return true;
        }
      }
    } else {
      switch (e.key) {
        case "Backspace": {
          change.deleteBackward();
          return true;
        }
      }
    }
  };

  onMarkClick = (e, type) => {
    e.preventDefault();
    const { editor } = this.state;
    const change = editor.toggleMark(type);
    this.onChange(change);
  };

  renderMark = props => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;
      case "italic":
        return <ItalicMark {...props} />;
    }
  };

  ref = editor => (this.editor = editor);

  render() {
    return (
      <div>
        <FormatToolbar>
          <button
            onPointerDown={e => this.onMarkClick(e, "bold")}
            className={styles.tooltipIconButton}
          >
            <Icon icon={bold} />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, "italic")}
            className={styles.tooltipIconButton}
          >
            <Icon icon={italic} />
          </button>
        </FormatToolbar>
        <Editor
          ref={this.ref}
          className={styles.App}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}

export default TextEditor;
