import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  render() {
    let className = ['Card'];
    if (this.props.status === 'backlog') {
      className.push('Card-grey');
    } else if (this.props.status === 'in-progress') {
      className.push('Card-blue');
    } else if (this.props.status === 'complete') {
      className.push('Card-green');
    }
    return (
      <div className={className.join(' ')} data-id={this.props.id} data-status={this.props.status}>
        <div className="Card-title">{this.props.name}</div>
        <div className="Card-priority">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`Star ${star <= this.props.priority ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                this.props.onPriorityChange(this.props.id, star);
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  }
}