import React from "react";
import FolderView from "./FolderView";

class ExplorerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      folders: []
    };
  }

  componentWillMount() {
    var data = [{"type":"folder","name":"haptic","children":[{"type":"file","name":"ram.mpeg","size":45523}]},{"type":"folder","name":"bluetooth","children":[{"type":"folder","name":"online","children":[{"type":"folder","name":"online","children":[]},{"type":"file","name":"savings_account_applications_olive.png","size":37864},{"type":"folder","name":"virtual","children":[{"type":"folder","name":"cross-platform","children":[]},{"type":"file","name":"eyeballs.png","size":75269},{"type":"file","name":"money_market_account.mp4v","size":30246},{"type":"folder","name":"mobile","children":[]}]},{"type":"folder","name":"redundant","children":[]},{"type":"file","name":"east_caribbean_dollar_solution.m2v","size":41558}]},{"type":"file","name":"e_markets_web_services_best_of_breed.htm","size":64257}]}];
    this.addExpandFlag(data);
    this.setState({folders:data});
 }

  addExpandFlag(children) {
    for (var i = 0; i < children.length; i++) {
      if (children[i].type == "folder") {
        children[i].expand = false;
        this.addExpandFlag(children[i].children);
      }
    }
  }

  render() {
    return (
      <div>
        <FolderView children={this.state.folders} />
      </div>
    );
  }
}

export default ExplorerComponent;
