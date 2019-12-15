import React from "react";

class FolderView extends React.Component {
  constructor() {
    super();
  }

  render() {
    var folders = this.props.children.map((child, index) => {
      return (
        <li key={index}>
          {child.type == "folder" ? (
            <div>
              <strong>{child.name}</strong>
              <FolderView children={child.children} />
            </div>
          ) : (
            <span>{child.name}</span>
          )}
        </li>
      );
    });
    return (
      <div>
        <ul>{folders}</ul>
      </div>
    );
  }
}

export default FolderView;
