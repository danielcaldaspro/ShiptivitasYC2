import React from 'react';
import Card from './Card';
import './Swimlane.css';

export default class Swimlane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  handleSortClick = (mode) => {
    this.props.onSort(mode);
    this.setState({ isMenuOpen: false });
  }

  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
          priority={client.priority}
          onPriorityChange={this.props.onPriorityChange}
        />
      );
    })

    return (
      <div className="Swimlane-column">
        <div className="Swimlane-header">
          <div className="Swimlane-title">{this.props.name}</div>
          <div className="Sort-container">
            <button className="Sort-trigger" onClick={this.toggleMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
            {this.state.isMenuOpen && (
              <div className="Sort-menu">
                <button onClick={() => this.handleSortClick('AZ')}>A-Z</button>
                <button onClick={() => this.handleSortClick('ZA')}>Z-A</button>
                <button onClick={() => this.handleSortClick('High')}>Highest Priority</button>
                <button onClick={() => this.handleSortClick('Low')}>Lowest Priority</button>
              </div>
            )}
          </div>
        </div>
        <div className="Swimlane-dragColumn" ref={this.props.dragulaRef}>
          {cards}
        </div>
      </div>);
  }
}
