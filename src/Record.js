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
    this.onPredictionClick = this.onPredictionClick.bind(this);

    this.state = {
      expand: false,
      prediction: this.props.event.prediction
    };
  }

  onClick() {
    this.setState({expand: !this.state.expand});
  }

  onPredictionClick(evt) {
    this.setState({
      expand: !this.state.expand,
      prediction: evt.target.textContent
    });
    this.props.onRead(this.props.event.event_id, this.props.index);
  }

  renderExpansion() {
    const { event } = this.props;
    const predictions = ['people', 'car', 'animal', 'other'].map(p => {
      const active = p === this.state.prediction ? 'active' : '';
      const className = `btn btn-primary ${active}`;
      return (
        <button
          key={p}
          type="button"
          className={className}
          onClick={this.onPredictionClick}
        >
          {p}
        </button>
      );
    });

    return (
      <div className="expansion">
        <div className="event-id">Event ID: {event.event_id}</div>
        <div className="camera-id">Camera ID: {event.camera_id}</div>
        <div className="btn-group" role="group" aria-label="predictions">
          {predictions}
        </div>
      </div>
    );
  }

  renderSelectedPrediction() {
    return (
      <div className="prediction">
        <button type="button" className="btn btn-outline-primary">
          {this.state.prediction}
        </button>
      </div>
    );
  }

  renderRecordBody(event) {
    const dateString = formatDate(event.starting_timestamp);
    const content = this.state.expand ? this.renderExpansion() : this.renderSelectedPrediction();

    return (
      <div className="record-body row">
        <div className="col-sm-2">
          <img src={event.thumbnail} alt="Thumbnail" />
        </div>
        <div className="col-sm-10">
          <div>Date: {dateString}</div>
          {content}
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
  index: PropTypes.number.isRequired,
}

export default Record;
