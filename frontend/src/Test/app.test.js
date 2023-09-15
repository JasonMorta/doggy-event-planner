import React from 'react';
import App from '../App.jsx'

import {create} from 'react-test-renderer';

// use 'npm test' for frontend testing
it('App renders correctly', () => {
   const tree = create(<App/>)
   expect(tree.toJSON).toMatchSnapshot();
   });

   
   ///npm i react-test-renderer --save-dev