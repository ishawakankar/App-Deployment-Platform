import React from 'react';
import { configure, shallow } from 'enzyme';
import AddGitURL from '../src/components/AddGitURL';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core/Button';

configure({adapter: new Adapter()});

describe('<AddGitURL>', () => {

    it('interaction', () => {
        let wrapper,props;
        props = {onClick: jest.fn()};
        wrapper = shallow(<AddGitURL {...props} />)
        wrapper.find('#outlined-email-input').prop('onPress')()
        expect(props.onClick).toHaveBeenCalledTimes(1) 
    });

    it('setState is defined for loading image', () => {
        const wrapper = shallow(<AddGitURL />);
        wrapper.setState({context: ''})
        expect(wrapper.find(Button)).toBeDefined();
    });

    it('handleClickButton function has not been called', () => {
        const spy = jest.spyOn(AddGitURL.prototype, "handleClickButton");
        expect(spy).not.toHaveBeenCalled();
    });

    it('Changes compared to old state', () => {
        const wrapper = shallow(<AddGitURL />);
        expect(wrapper.find('.main')).toBeDefined();
    });
    
})

