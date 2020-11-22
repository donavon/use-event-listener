import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useEventListener from '../src';

const useMouseMove = () => {
  const [coords, setCoords] = React.useState([0, 0]);
  useEventListener(
    'mousemove',
    ({ clientX, clientY }: MouseEvent) => {
      setCoords([clientX, clientY]);
    },
    { passive: true }
  );
  return coords;
};

const App = () => {
  const [x, y] = useMouseMove();
  return (
    <h1>
      The mouse position is ({x}, {y})
    </h1>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
