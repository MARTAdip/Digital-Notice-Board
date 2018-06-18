import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import ModulesSideBar from './ModulesSideBar';

const testItem = `
  "type": "event",
  "iconUrl": "https://png.icons8.com/ios-glyphs/50/000000/megaphone.png",
  "title": "19th of March to 22nd march",
  "subtitle": "Devugees Project Week",
  "description": "Team work video",
  "expiryDate": "01.07.2018",
  "displayDate": "01.07.2018",
  "content": {
          "street": "Vulkanstr. 1",
          "postal": "11000",
          "city": "Berlin"
      }
  `

it('renders without crashing', () => {
  const app = shallow(<ModulesSideBar data={testItem}/>);
});



it('testing the text', () => {
  const app = shallow(<ModulesSideBar data={testItem} />);
  const p = app.find('.date-container')
  const text = p.find('p').at(0)
  expect(text.text()).toBe('start at:  ');
});


it('testing the text', () => {
  const app = shallow(<ModulesSideBar data={testItem} />);
  const p = app.find('.date-container')
  const text = p.find('p').at(1)
  expect(text.text()).toBe('start at:  ');
});
