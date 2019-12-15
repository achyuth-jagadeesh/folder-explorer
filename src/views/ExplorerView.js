import React from "react";
import FolderView from "./FolderView";

class ExplorerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      folders: [],
      fileDetl: {
        totalFileSize: 0,
        totalFiles: 0
      }
    };
  }

  componentWillMount() {
    var data = [
      {
        type: "folder",
        name: "haptic",
        children: [{ type: "file", name: "ram.mpeg", size: 45523 }]
      },
      {
        type: "folder",
        name: "bluetooth",
        children: [
          {
            type: "folder",
            name: "online",
            children: [
              { type: "folder", name: "online", children: [] },
              {
                type: "file",
                name: "savings_account_applications_olive.png",
                size: 37864
              },
              {
                type: "folder",
                name: "virtual",
                children: [
                  { type: "folder", name: "cross-platform", children: [] },
                  { type: "file", name: "eyeballs.png", size: 75269 },
                  {
                    type: "file",
                    name: "money_market_account.mp4v",
                    size: 30246
                  },
                  { type: "folder", name: "mobile", children: [] }
                ]
              },
              { type: "folder", name: "redundant", children: [] },
              {
                type: "file",
                name: "east_caribbean_dollar_solution.m2v",
                size: 41558
              }
            ]
          },
          {
            type: "file",
            name: "e_markets_web_services_best_of_breed.htm",
            size: 64257
          }
        ]
      }
    ];
    var fileDetl = {
      totalFileSize: 0,
      totalFiles: 0
    };

    this.addExpandFlag(data, fileDetl);
    this.setState({ folders: data, fileDetl });
  }

  addExpandFlag(children, fileDetl) {
    for (var i = 0; i < children.length; i++) {
      if (children[i].type == "folder") {
        this.addExpandFlag(children[i].children, fileDetl);
      } else {
        fileDetl.totalFileSize += children[i].size;
        fileDetl.totalFiles++;
      }
    }
  }

  render() {
    return (
      <div>
        <FolderView children={this.state.folders} />
        <div className="files-detl" >
          <div>Total Files : {this.state.fileDetl.totalFiles}</div>
          <div>
            Total file size :{" "}
            {Math.round(this.state.fileDetl.totalFileSize / 1024)} MB
          </div>
        </div>
      </div>
    );
  }
}

export default ExplorerComponent;
