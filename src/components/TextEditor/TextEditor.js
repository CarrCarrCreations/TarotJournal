import React, { Component, useState } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

import styles from "./TextEditor.module.css";
import { BoldMark, ItalicMark, FormatToolbar } from "./index";
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import { code } from "react-icons-kit/feather/code";
import { list } from "react-icons-kit/feather/list";
import { underline } from "react-icons-kit/feather/underline";

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
                text: ""
              }
            ]
          }
        ]
      }
    ]
  }
});

const TextEditor = props => {
  const [value, setValue] = useState(initialValue);
  const [editor, setEditor] = useState(null);

  const ref = editor => setEditor(editor);

  const onChange = ({ value }) => {
    setValue(value);
    props.onChange(value);
  };

  const onKeyDown = (e, editor) => {
    if (e.ctrlKey) {
      e.preventDefault();

      switch (e.key) {
        case "b": {
          editor.toggleMark("bold");
          return true;
        }
        case "i": {
          editor.toggleMark("italic");
          return true;
        }
        case "c": {
          editor.toggleMark("code");
          return true;
        }

        case "l": {
          editor.toggleMark("list");
          return true;
        }

        case "u": {
          editor.toggleMark("underline");
          return true;
        }
        case "delete": {
          return true;
        }
        default: {
          return;
        }
      }
    } else {
      switch (e.key) {
        case "Backspace": {
          editor.deleteBackward();
          return true;
        }
        case "Enter": {
          editor.insertBlock("paragraph");
          return true;
        }
        default: {
          return;
        }
      }
    }
  };

  const onMarkClick = (e, type) => {
    e.preventDefault();
    const change = editor.toggleMark(type);
    onChange(change);
  };

  const renderMark = props => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;
      case "italic":
        return <ItalicMark {...props} />;
      case "code":
        return <code {...props.attributes}>{props.children}</code>;
      case "list":
        return (
          <ul {...props.attributes}>
            <li>{props.children}</li>
          </ul>
        );
      case "underline":
        return <u {...props.attributes}>{props.children}</u>;
      default: {
        return;
      }
    }
  };

  return (
    <div>
      <FormatToolbar>
        <button
          type="button"
          onPointerDown={e => onMarkClick(e, "bold")}
          className={styles.tooltipIconButton}
        >
          <Icon icon={bold} />
        </button>
        <button
          type="button"
          onPointerDown={e => onMarkClick(e, "italic")}
          className={styles.tooltipIconButton}
        >
          <Icon icon={italic} />
        </button>
        <button
          type="button"
          onPointerDown={e => onMarkClick(e, "code")}
          className={styles.tooltipIconButton}
        >
          <Icon icon={code} />
        </button>
        <button
          type="button"
          onPointerDown={e => onMarkClick(e, "list")}
          className={styles.tooltipIconButton}
        >
          <Icon icon={list} />
        </button>
        <button
          type="button"
          onPointerDown={e => onMarkClick(e, "underline")}
          className={styles.tooltipIconButton}
        >
          <Icon icon={underline} />
        </button>
      </FormatToolbar>
      <Editor
        ref={ref}
        className={styles.App}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        renderMark={renderMark}
      />
    </div>
  );
};

export default TextEditor;
