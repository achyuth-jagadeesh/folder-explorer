import React from "react";

class FolderView extends React.Component {
  constructor() {
    super();

    this.state = {
      expandCollapseState: []
    };

    this.toggleExpandCollapse = this.toggleExpandCollapse.bind(this);
  }
  toggleExpandCollapse(evt) {
    let index = evt.target.getAttribute("data-index");
    var expandCollapseState = [...this.state.expandCollapseState];
    expandCollapseState[index].expand = !expandCollapseState[index].expand;
    this.setState({ expandCollapseState });
  }

  componentDidMount() {
    var expandCollapseState = [];
    for (var i = 0; i < this.props.children.length; i++) {
      expandCollapseState.push({ expand: false });
    }
    this.setState({ expandCollapseState });
  }

  render() {
    var folders = [];
    for (let i = 0; i < this.state.expandCollapseState.length; i++) {
      var li = (
        <li key={i}>
          {this.props.children[i].type == "folder" ? (
            <div>
              {this.props.children[i].children.length > 0 &&
                !this.state.expandCollapseState[i].expand && (
                  <span>
                    Test <i className="fa fa-globe"></i>
                    <input
                      type="button"
                      value=">"
                      onClick={this.toggleExpandCollapse}
                      data-index={i}
                    />
                  </span>
                )}
              {this.props.children[i].children.length > 0 &&
                this.state.expandCollapseState[i].expand && (
                  <input
                    type="button"
                    value="V"
                    onClick={this.toggleExpandCollapse}
                    data-index={i}
                  />
                )}

              <strong>{this.props.children[i].name}</strong>
              {this.state.expandCollapseState[i].expand && (
                <FolderView children={this.props.children[i].children} />
              )}
            </div>
          ) : (
            <span>{this.props.children[i].name}</span>
          )}
        </li>
      );
      folders.push(li);
    }

    return (
      <div>
        <ul>{folders}</ul>
      </div>
    );
  }
}

export default FolderView;
