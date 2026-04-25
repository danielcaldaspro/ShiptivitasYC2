import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
  }

  handleSort = (lane, mode) => {
    const updatedClients = { ...this.props.clients };
    updatedClients[lane] = this.sortClients(updatedClients[lane], mode);
    this.props.onStateChange(updatedClients);
  }

  sortClients = (clients, mode) => {
    const sorted = [...clients];
    switch (mode) {
      case 'AZ':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'ZA':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'High':
        return sorted.sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name));
      case 'Low':
        return sorted.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  updatePriority = (clientID, newPriority) => {
    // Persistent update via API
    this.props.onClientUpdate(clientID, null, newPriority);
  }

  componentDidMount() {
    this.drake = Dragula([
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current,
    ]);

    this.drake.on('drop', (el, target, source, sibling) => {
      this.drake.cancel(true);

      const clientID = el.dataset.id;
      const targetLaneTitle = target.parentElement.querySelector('.Swimlane-title').innerText.toLowerCase();
      
      let newStatus = 'backlog';
      if (targetLaneTitle.includes('in progress')) { newStatus = 'in-progress'; }
      else if (targetLaneTitle.includes('complete')) { newStatus = 'complete'; }

      // Calculate new priority based on position in the DOM (sibling)
      const targetNodes = Array.from(target.childNodes);
      let newPriority = targetNodes.length + 1;
      
      if (sibling) {
        // Find index of sibling to determine the new priority (1-indexed)
        const siblingIndex = targetNodes.indexOf(sibling);
        newPriority = siblingIndex + 1;
      }

      // Notify App to update the backend
      this.props.onClientUpdate(clientID, newStatus, newPriority);
    });
  }

  componentWillUnmount() {
    if (this.drake) this.drake.destroy();
  }

  renderSwimlane(name, clients, ref, laneKey) {
    return (
      <Swimlane 
        name={name} 
        clients={clients} 
        dragulaRef={ref}
        onPriorityChange={this.updatePriority}
        onSort={(mode) => this.handleSort(laneKey, mode)}
      />
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', this.props.clients.backlog, this.swimlanes.backlog, 'backlog')}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', this.props.clients.inProgress, this.swimlanes.inProgress, 'inProgress')}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', this.props.clients.complete, this.swimlanes.complete, 'complete')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
