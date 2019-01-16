import React from 'react';
import { configure, shallow } from 'enzyme';
import HomePageComponent from '../src/components/HomePageComponent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<HomePageComponent>', () => {
    it('has route to listURL', () => {
        const wrapper = shallow(<HomePageComponent />);
        expect(wrapper.contains(
            <Link to={`/listUrl`} className="lnk">
                <Typography variant="h6" color="inherit" className="grow">
                    App
                </Typography>
            </Link>
        )).toEqual(true);
    });


    it('has route to newApp', () => {
        const wrapper = shallow(<HomePageComponent />);
        expect(wrapper.contains(
            <Link to={`/newApp`} className="lnk">
                <Typography variant="h6" color="inherit" className="grow">
                    NewApp  
                </Typography>
            </Link>
        )).toEqual(true);
    });
})

