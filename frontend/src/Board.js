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

      // Calculate new priority (1-indexed) based on its dropped position
      const targetNodes = Array.from(target.childNodes).filter(node => node.classList && node.classList.contains('Card'));
      let newPriority = targetNodes.length + 1;
      
      if (sibling) {
        newPriority = targetNodes.indexOf(sibling) + 1;
      }

      // Send to persistence layer
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
