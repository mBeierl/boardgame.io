/*
 * Copyright 2017 Google Inc.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Singleplayer as App } from './qwixx';

Enzyme.configure({ adapter: new Adapter() });

test('sanity', () => {
  Enzyme.mount(<App/>);
});