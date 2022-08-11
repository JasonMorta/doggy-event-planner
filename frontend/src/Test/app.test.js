import React from 'react';
import App from '../App.jsx'

import renderer from 'react-test-renderer';

// use 'npm test' for frontend testing
it('App renders correctly', () => {
   const tree = renderer
   .create(<App/>)
   expect(tree).toMatchSnapshot();
   });