import React, { memo, useState, useCallback } from 'react';

const PLAY = 'PLAY';
const STOP = 'STOP';

const Controls = () => {
  const [state, setState] = useState(PLAY);

  const onPlay = useCallback(() => {
    setState(PLAY);
    setState(STOP);
  }, []);

  const onStop = useCallback(() => {
    setState(STOP);
  }, []);

  return (<div>
    {state}
    <button onClick={onPlay}>Play</button>
    <button onClick={onStop}>Stop</button>
    <button>Volume</button>
  </div>);
};

export { Controls };