import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import Board from './Board';
import MagneticBall from './MagneticBall';
import './App.css';

const API_BASE = 'http://localhost:3001/api/v1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      clients: {
        backlog: [],
        inProgress: [],
        complete: [],
      }
    };
  }

  componentDidMount() {
    this.fetchClients();
  }

  fetchClients = async () => {
    try {
      const response = await fetch(`${API_BASE}/clients`);
      const data = await response.json();
      this.processClients(data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  }

  processClients = (allClients) => {
    const clients = {
      backlog: allClients.filter(c => c.status === 'backlog').sort((a, b) => a.priority - b.priority),
      inProgress: allClients.filter(c => c.status === 'in-progress').sort((a, b) => a.priority - b.priority),
      complete: allClients.filter(c => c.status === 'complete').sort((a, b) => a.priority - b.priority),
    };
    this.setState({ clients });
  }

  handleClientUpdate = async (id, status, priority) => {
    try {
      const response = await fetch(`${API_BASE}/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, priority })
      });
      const data = await response.json();
      this.processClients(data);
    } catch (err) {
      console.error('Failed to update client:', err);
      // Optional: rollback or show error
    }
  }

  // Fallback for sorting and priority clicks (local only for now, or could be mapped to API)
  handleLocalStateChange = (newClients) => {
    this.setState({ clients: newClients });
  }

  changeTab(tabName) {
    this.setState({ selectedTab: tabName });
  }

  render() {
    const { clients } = this.state;
    const total = clients.backlog.length + clients.inProgress.length + clients.complete.length;
    const completed = clients.complete.length;

    return (
      <div className="App">
        <Navigation
          onClick={(tabName) => this.changeTab(tabName)}
          selectedTab={this.state.selectedTab}
          completed={completed}
          total={total}
        />

        <div className="App-body">
          {this.state.selectedTab === 'home' ? (
            <HomeTab />
          ) : (
            <Board 
              clients={this.state.clients} 
              onStateChange={this.handleLocalStateChange} 
              onClientUpdate={this.handleClientUpdate}
            />
          )}
        </div>
        <MagneticBall />
      </div>
    );
  }
}

export default App;
