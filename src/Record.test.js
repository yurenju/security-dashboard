import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Record from './Record';

it('properties of event should be rendered correctly', () => {
  const event = { prediction: 'car' };
  const onRead = function() {};
  const record = shallow(<Record index={0} event={event} onRead={onRead} />);
  expect(record.find('.prediction span').text()).to.equal('car');
});

it('event_id and camera_id should only appear when record is expanded', () => {
  const event = { prediction: 'car' };
  const onRead = function () { };
  const record = shallow(<Record index={0} event={event} onRead={onRead} />);
  expect(record.find('.event-id')).to.have.length(0);
  expect(record.find('.camera-id')).to.have.length(0);
  record.instance().onClick();
  expect(record.find('.event-id')).to.have.length(1);
  expect(record.find('.camera-id')).to.have.length(1);
});

it('onRead should only be call when event is unread', () => {
  const event = { unread: false };
  const onRead = sinon.spy();
  const record = shallow(<Record index={0} event={event} onRead={onRead} />);
  record.instance().onClick();
  expect(onRead).to.have.property('callCount', 0);
  event.unread = true;
  record.instance().onClick();
  expect(onRead).to.have.property('callCount', 1);
});
