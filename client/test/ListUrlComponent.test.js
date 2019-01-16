import React from 'react';
import { configure, shallow, mount} from 'enzyme';
import ListUrlComponent from '../src/components/AddGitURL';
import HomePageComponent from '../src/components/HomePageComponent';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({adapter: new Adapter()});

describe('<ListUrlComponent>', () => {
    
    it('should contain HomePageComponent', () => {
        const wrapper = shallow(<ListUrlComponent />);
        expect(wrapper.find(HomePageComponent)).toHaveLength(1);
    });
    
    it('drop down button is rendered', () => {
        const wrapper = shallow(<HomePageComponent />);
        expect(wrapper.text()).toBeDefined();
    });
    
    it('check if Card component is defined', () => {
        const wrapper = shallow(<ListUrlComponent />);
        expect(wrapper.find('.card')).toBeDefined();
    });
    
})


