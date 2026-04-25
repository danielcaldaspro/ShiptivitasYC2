import React from 'react';
import './Navigation.css';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="Navbar-brand">Shiptivitas</div>
        
        <div className="Navbar-counter">
          <span className="Count-value">{this.props.completed} / {this.props.total}</span>
        </div>

        <div className="Navbar-links">
          <button 
            className={"Nav-button " + (this.props.selectedTab === 'home' ? 'active': '')} 
            onClick={() => this.props.onClick("home")}
          >
            Home
          </button>
          <button 
            className={"Nav-button " + (this.props.selectedTab === 'shipping-requests' ? 'active': '')} 
            onClick={() => this.props.onClick("shipping-requests")}
          >
            Shipping Requests
          </button>
        </div>
      </nav>
    );
  }
}