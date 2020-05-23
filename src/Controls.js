import React, { memo, useState, useCallback, useEffect, useRef } from 'react';

import song from '../song/1.webm';

const PLAY = 'PLAY';
const PAUSE = 'PAUSE';

const Controls = memo(() => {
  const playBtnRef = useRef(null);
  const pauseBtnRef = useRef(null);

  console.log(`playBtnRef`, playBtnRef);

  const [state, setState] = useState(PLAY);
  const [player, setPlayer] = useState((propsPlayer = null) => {
    const newPlayer = propsPlayer ? propsPlayer : new Audio(song);
    return newPlayer;
  });
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    if (!player) {
      return;
    }

    player.loop = true;
    console.log(`player inited`, player, player.onEnded);

    player.oncanplaythrough = () => {
      console.log(`can play`);
      const interval = setInterval(() => {
        console.log(`click force`, playBtnRef);
        const promise = player.play();

        if (promise !== undefined) {
          promise.then(_ => {
            console.log(`// Autoplay started! clear interval!`);
            clearInterval(interval);
          }).catch(error => {
            console.log(`// Autoplay was prevented.`, error);
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
        }
      }, 2000);
    };

  }, [player]);

  const interactPlayer = useCallback((player, state) => {
    if (!player) {
      console.log(`player not inited!`, player);
    }
    console.log(`player inited`, player);
    let playedPromise;

    switch (state) {
      case PLAY:
        console.log(`play!`);
        playedPromise = player.play();
        break;

      case PAUSE:
        console.log(`stop!`);
        playedPromise = player.pause();
        break;

      default:
        console.warn(`WARN: unhandled player state action!`);
    }

    if (playedPromise) {
      playedPromise.catch((e) => {
        console.error('error:', e)
        if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
          console.error('error.name:', e.name);
        }
      }).then(() => {
        console.log(`all good =)`);
      });
    }
  }, []);

  useEffect(() => {
    console.log(`useEffect`, state, player);
    interactPlayer(player, state);
  }, [player, state]);

  const onPlay = useCallback(() => {
    setState(PLAY);
  }, [setState]);

  const onPause = useCallback(() => {
    setState(PAUSE);
  }, [setState]);

  const onChangeVolume = useCallback(() => {
    if (player.volume === 1) {
      player.volume = 0.25;
    } else {
      player.volume += 0.25;
    }
    setVolume(player.volume * 100);

  }, [player, setVolume]);

  return (<div>
    {state}
    <button ref={playBtnRef} onClick={onPlay}>Play</button>
    <button ref={pauseBtnRef} onClick={onPause}>Pause</button>
    <button onClick={onChangeVolume}>{`Volume: ${volume}%`}</button>
  </div>);
});

export { Controls };