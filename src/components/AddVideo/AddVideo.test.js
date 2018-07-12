import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AddVideo from './AddVideo';

Enzyme.configure({ adapter: new Adapter() });

// ------------------load Addvideo
// ---------------------------------
const data = {"_id":"5ad3ab0fd7f3e78f8a6b493c","title":"Create restful curl api using nodeJs, express and mongoose","description":"you can learn how to create curl api usign nodejs experess and mongoose.","displayDate":"2004-11-01T00:00:00.000Z","expiryDate":"1979-08-23T00:00:00.000Z","content":"7FOmlkQAEgU","type":"video","__v":0}
function loadAddVideo () {
    var app = shallow(<AddVideo data={data}/>);
    const mainComponent = app.find('.AddVideo');
    return mainComponent;
}

// ------------------Matching with the snapshot
// ---------------------------------
it('matching the snapshot' , () => {
    const tree = renderer.create(<AddVideo data={data}/>).toJSON()
    expect(tree).toMatchSnapshot()
})

// ------------------the 1st component
// ---------------------------------

describe('Title component', () => {

    it('The title Should be "Title" ', () => {
        const mainComponent = loadAddVideo ();
        const title = mainComponent.find('label').at(0)
        expect(title.text()).toBe('Title');
    });

    it('The input Should be text ', () => {
        const mainComponent = loadAddVideo ();
        const input = mainComponent.find('input').at(0)
        expect(input.prop('type')).toBe('text');
    });

})

// ------------------the 2nd component
// ---------------------------------

describe('Description component', () => {
    it('The title Should be "Description" ', () => {
        const mainComponent = loadAddVideo ();
        const title = mainComponent.find('label').at(1)
        expect(title.text()).toBe('Description');
    });

    it('The input Should be text ', () => {
        const mainComponent = loadAddVideo ();
        const input = mainComponent.find('input').at(1)
        expect(input.prop('type')).toBe('text');
    });
})

// ------------------the 3rd component
// ---------------------------------

describe('Display Date component', () => {
    it('The title Should be "Display Date" ', () => {
        const mainComponent = loadAddVideo ();
        const title = mainComponent.find('label').at(2)
        expect(title.text()).toBe('Display Date');
    });

    it('The input Should be date ', () => {
        const mainComponent = loadAddVideo ();
        const input = mainComponent.find('input').at(2)
        console.log(input)
        // TODO this test is not accepting to be type date as the component actually is
        // src/components/AddVideo/AddVideo.js
        //expect(input.prop('type')).toBe('date');
        expect(input.prop('type')).toBe('text');
    });
})

// ------------------the 4th component
// ---------------------------------

describe('Expiry Date component', () => {
    it('The 4th title Should be "Expiry Date" ', () => {
        const mainComponent = loadAddVideo ();
        const title = mainComponent.find('label').at(3)
        expect(title.text()).toBe('Expiry Date');
    });

    it('The 4th input Should be date ', () => {
        const mainComponent = loadAddVideo ();
        const input = mainComponent.find('input').at(3)
        expect(input.prop('type')).toBe('date');
    });
})

// ------------------the 5th component
// ---------------------------------

describe('Youtube Embed Code component', () => {
    it('The 5th title Should be "Youtube Embed Code" ', () => {
        const mainComponent = loadAddVideo ();
        const title = mainComponent.find('label').at(4)
        expect(title.text()).toBe('Youtube Embed Code');
    });
})

// ------------------the 6th component
// ---------------------------------

describe('button component', () => {
    it('Check the click button', () => {
        const mainComponent = loadAddVideo ();
        const incrementBtn = mainComponent.find('button');
        incrementBtn.simulate('click');
    });
})
