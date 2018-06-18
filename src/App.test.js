import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch'
Enzyme.configure({ adapter: new Adapter() });
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
fetch = jest.fn(() => new Promise(resolve => resolve()));
  var app = mount(<App />);
  const p = app.find('h1#title')
  expect(p.text()).toBe('Digital-notice-board');

  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('the state', ()=> {
  it('the state of data' , () => {
    const div = document.createElement('div');
    var app = mount(<App />);
    const youtubeCode = app.state().data;
    expect(youtubeCode).toEqual([]);
    ReactDOM.render(app, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('the state of youtube code' , () => {
    const div = document.createElement('div');
    var app = mount(<App />);
    const youtubeCode = app.state().youtubeCode;
    //expect(youtubeCode).toEqual(['HCnGKF_Ro2A']);
    ReactDOM.render(app, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('the state of current slide' , () => {
    const div = document.createElement('div');
    var app = mount(<App />);
    const currentSlide = app.state().currentSlide;
    expect(currentSlide).toEqual(0);
    ReactDOM.render(app, div);
    ReactDOM.unmountComponentAtNode(div);
  })

})

