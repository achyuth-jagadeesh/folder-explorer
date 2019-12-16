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
                  <i
                    className="fa fa-chevron-right btn-expand"
                    onClick={this.toggleExpandCollapse}
                    data-index={i}
                  ></i>
                )}
              {!this.state.expandCollapseState[i].expand && (
                <i className="fa fa-folder"></i>
              )}
              {this.props.children[i].children.length > 0 &&
                this.state.expandCollapseState[i].expand && (
                  <span>
                    <i
                      className="fa fa-chevron-down btn-expand"
                      onClick={this.toggleExpandCollapse}
                      data-index={i}
                    ></i>
                    <i class="fa fa-folder-open"></i>
                  </span>
                )}
              <strong> {this.props.children[i].name}</strong>
              {this.state.expandCollapseState[i].expand && (
                <FolderView children={this.props.children[i].children} />
              )}
              {this.props.children[i].children.length == 0 && (
                <span className="txt-empty-folder"> (Empty folder)</span>
              )}
            </div>
          ) : (
            <span>
              <i className="fa fa-file-text-o"></i> {this.props.children[i].name} {"   "+ Math.round(this.props.children[i].size / 1024)} MB 
            </span>
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
