import React from "react";
import { shallow,configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AQIPollution from './AQIPollution';

configure({adapter:new Adapter()});

describe('<AQIPollution/>', () => {

    it('should find <p/> tag',()=>{

        const wrapper=shallow(<AQIPollution/>);
        expect(wrapper.contains(<h4 className="aqi-text">Air Quality: </h4>)).toEqual(true);
   
    }

    
    );

});

