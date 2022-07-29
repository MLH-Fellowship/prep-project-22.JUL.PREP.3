import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Footer from "./Footer";

configure({ adapter: new Adapter() });

describe('<Footer/>', () => {

    it('should render <h3>', () => {

        const wrapper = shallow(<Footer />);
        expect(wrapper.contains(<h3>Weather<span>App</span></h3>)).toEqual(true);
    }


    );

});

describe('<Footer/>', () => {

    it('should render one <p>', () => {

        const wrapper = shallow(<Footer />);
        expect(wrapper.contains(<p>
            <a href="https://github.com/MLH-Fellowship/prep-project-22.JUL.PREP.3">
              Github Link
            </a>
          </p>)).toEqual(true);
    }

    );

});

describe('<Footer/>', () => {

    it('should render ', () => {

        const wrapper = shallow(<Footer />);
        expect(wrapper.contains(<p class="footer-company-name">MLH Pod.js © 2022</p>)).toEqual(true);
    }

    );

});


describe('<Footer/>', () => {

    it('should render ', () => {

        const wrapper = shallow(<Footer />);
        expect(wrapper.contains(<p class="footer-company-about">
        <span>Team Members</span>
        Sanjay Singh Rajpoot, Liuba, Himanshu Thakur, Chidera Innocent,
        Shehab Adel, A.S.L.Manasa, Somaditya Singh, Saswat Samal, Indira,
        Julian Willis,Sadiq Babalola, Elmar, Vy Nguyen, Di Wu
      </p>)).toEqual(true);
    }

    );

});



