import React, { Component } from 'react';
import io from 'socket.io-client';

import Record from './Record';
import { SERVER_URL } from './constants';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io(SERVER_URL);

    this.onNewAlarm = this.onNewAlarm.bind(this);
    this.onRead = this.onRead.bind(this);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    this.socket.on('new-alarm-events', this.onNewAlarm.bind(this));
  }

  onNewAlarm(events) {
    const newEvents = events.map(evt => {
      evt.unread = true;
      return evt;
    });
    this.setState({ events: newEvents.concat(this.state.events)});
  }

  onRead(eventId, index) {
    const url = `${SERVER_URL}/event-viewed/${eventId}`;
    fetch(url, {method: 'POST'}).then(() => {
      const {events} = this.state;
      events[index].unread = false;
      this.setState({events});
    });
  }

  render() {
    let body;
    if (this.state.events.length === 0) {
      body = (
        <div className="alert alert-primary" role="alert">
          Hold on, alarm event is on the way!
        </div>
      )
    } else {
      body = this.state.events.map((event, i) => {
        return (
          <Record
            index={i}
            key={event.event_id}
            event={event}
            onRead={this.onRead}
          />
        );
      })
    }
    return (
      <div className="App container">
        {body}
      </div>
    );
  }
}

export default App;
