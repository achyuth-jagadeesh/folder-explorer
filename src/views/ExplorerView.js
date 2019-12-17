import React from "react";
import FolderView from "./FolderView";
import axios from "axios";

class ExplorerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      folders: [],
      fileDetl: {
        totalFileSize: 0,
        totalFiles: 0
      },
      dataLoaded: false
    };
  }

  componentWillMount() {
    axios.get("https://chal-locdrmwqia.now.sh").then(response => {
      var rootData=response.data.data;
      var fileDetl = {
        totalFileSize: 0,
        totalFiles: 0
      };
      this.calcFilesSizeAndCount(rootData, fileDetl);
      this.setState({ folders: rootData, fileDetl, dataLoaded: true });
    });
  }

  calcFilesSizeAndCount(children, fileDetl) {
    for (var i = 0; i < children.length; i++) {
      if (children[i].type == "folder") {
        this.calcFilesSizeAndCount(children[i].children, fileDetl);
      } else {
        fileDetl.totalFileSize += children[i].size;
        fileDetl.totalFiles++;
      }
    }
  }

  render() {
    return (
      <div>
        {!this.state.dataLoaded ? (
          <div>
            <strong>Please wait content loading...</strong>
          </div>
        ) : this.state.folders.length > 0 ? (
          <div>
            <FolderView children={this.state.folders} />
            <div className="files-detl">
              <div>Total Files : {this.state.fileDetl.totalFiles}</div>
              <div>
                Total file size :{" "}
                {Math.round(this.state.fileDetl.totalFileSize / 1024)} MB
              </div>
            </div>
          </div>
        ) : (
          <div>
            <strong>Folders list is empty</strong>
          </div>
        )}
      </div>
    );
  }
}

export default ExplorerComponent;
