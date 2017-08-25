import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Record.css';

function formatDate(timestamp) {
  const d = new Date(timestamp);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ` +
         `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

class Record extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.state = {
      expand: false
    };
  }

  onClick() {
    this.setState({expand: !this.state.expand});

    if (this.props.event.unread) {
      this.props.onRead(this.props.event.event_id, this.props.index);
    }
  }

  renderExpansion() {
    const { event } = this.props;

    return (
      <div className="expansion">
        <div className="event-id">Event ID: {event.event_id}</div>
        <div className="camera-id">Camera ID: {event.camera_id}</div>
      </div>
    );
  }

  renderRecordBody(event) {
    const dateString = formatDate(event.starting_timestamp);
    const expansion = this.state.expand ? this.renderExpansion() : null;

    return (
      <div className="record-body row">
        <div className="col-sm-2">
          <img src={event.thumbnail} alt="Thumbnail" />
        </div>
        <div className="col-sm-10">
          <h5 className="prediction">
            Prediction: <span>{event.prediction}</span>
          </h5>
          <div>Date: {dateString}</div>
          {expansion}
        </div>
      </div>
    );
  }

  render() {
    const { event } = this.props;
    const unread = event.unread ? '●' : '';

    return (
      <div className="record row align-items-center" onClick={this.onClick}>
        <div className="unread col-sm-1 text-right">
          {unread}
        </div>
        <div className="col-sm-11">
          {this.renderRecordBody(event)}
        </div>
      </div>
    );
  }
}

Record.propTypes = {
  event: PropTypes.object.isRequired,
  onRead: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default Record;
