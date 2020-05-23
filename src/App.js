import React, { memo, useState } from 'react';
import { hot } from 'react-hot-loader/root';

import { Background } from './Background';
import { Controls } from './Controls';

const App = memo(() => <Background>
  <Controls />
</Background>);

export default hot(App);
