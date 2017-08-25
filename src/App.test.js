import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders alert box if events does not exist', () => {
  const app = shallow(<App />);
  expect(app.find('div.alert')).to.have.length(1);
});

it('renders event list if events exists', () => {
  const app = shallow(<App />);
  app.instance().onNewAlarm([{event_id: 1}, {event_id: 2}]);
  expect(app.find('Record')).to.have.length(2);
});

it('set unread for certain event to false if onRead() is executed', () => {
  global.fetch = function() {
    return new Promise((resolve) => resolve());
  }

  const app = shallow(<App />);
  app.instance().onNewAlarm([{ event_id: 1, unread: true }]);
  app.instance().onRead(null, 0);
})
