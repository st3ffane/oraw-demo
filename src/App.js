import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux';
import * as ACTIONS from './actions';
import { fibonacci } from './long.op';
import { useSpring, animated } from 'react-spring'
function App() {
  const dispatch = useDispatch();
  const [img, setImg] = React.useState('');
  return (
    <div className="App">
      <h3>of-redux-and-worker demo</h3>
      <p>This demo is an illustration for <a href="">of-redux-and-worker</a> library use case, ie, doing heavy calculus or work in the main UI thread
      and UI responsivness.<br />For the heavy work, I use the mighty fibonnaci suite calculus in the most uneffective way (the recursive one) with a seed of 45.<br />
        This app call the fibonacci calculus in 2 way: once with redux-thunk, once with a worker.
        The animation is a <a href="https://www.react-spring.io/docs/hooks/examples">react-spring demo</a> taken from their site.</p>
      <div className="actions">
        <p>Click "Go with thunk" or "Go with worker" and move your pointer hover the picture to see the difference on how the animation responde while processing the calculus.</p>
        <div className="buttons">
          <button onClick={() => {
            setImg('start working');
            dispatch(() => {
              return Promise.resolve(fibonacci(45));
            }).then((i) => {
              setImg(i)
            })
          }}>Go with thunks</button>
          <button onClick={() => {
            setImg('start working');
            dispatch({
              type: ACTIONS.HELLO,
              payload: 45,
              resolvers: {}
            }).then((res) => {
              setImg(res.payload)
            })
          }}>Go with Worker</button>
        </div>
        <span>Result: {img}</span>
      </div>
      <div className="animation"><Card /></div>
    </div>
  );
}
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`

function Card() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  return (
    <div class="container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <animated.div class="card1" style={{ transform: props.xy.interpolate(trans1) }} />
      <animated.div class="card2" style={{ transform: props.xy.interpolate(trans2) }} />
      <animated.div class="card3" style={{ transform: props.xy.interpolate(trans3) }} />
      <animated.div class="card4" style={{ transform: props.xy.interpolate(trans4) }} />
    </div>
  )
}
export default App;
