# @use-it/event-listener

A custom React Hook thst provides a declarative useEventListener.

[![npm version](https://badge.fury.io/js/%40use-it%2Fevent-listener.svg)](https://badge.fury.io/js/%40use-it%2Fevent-listener)

This hook was inspired by [Dan Abramov](https://github.com/gaearon)'s
blog post
["Making setInterval Declarative with React Hooks"](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

I needed a way to simplify the plumbing around adding and removing an event listener
in a custom hook.
That lead to a [chain of tweets](https://twitter.com/donavon/status/1093612936621379584)
between Dan and myself.

## Installation

```bash
$ npm i @use-it/event-listener
```

or

```bash
$ yarn add @use-it/event-listener
```

## Usage

Here is a basic setup.

```js
useEventListener(eventName, handler, element);
```

### Parameters

Here are the parameters that you can use. (\* = optional)

| Parameter   | Description                                                                                                       |
| :---------- | :---------------------------------------------------------------------------------------------------------------- |
| `eventName` | The event name (string). Here is a list of [commoon events](https://developer.mozilla.org/en-US/docs/Web/Events). |
| `handler`   | A function that will be called whenever `eventName` fires on `element`.                                           |
| `element`\* | An optional element to listen on. Defaults to `global` (i.e., `window`).                                          |

### Return

This hook returns nothing.

## Example

Let's look at some sample code. Suppose you would like to track the mouse
position. You _could_ subscribe to mouse move events with like this.

```js
const useMouseMove = () => {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    const handler = ({ clientX, clientY }) => {
      setCoords([clientX, clientY]);
    };
    window.addEventListener('mousemove', handler);
    return () => {
      window.removeEventListener('mousemove', handler);
    };
  }, []);

  return coords;
};
```

Here we're using `useEffect` to roll our own handler add/remove event listener.

`useEventListener` abstracts this away. You only need to care about the event name
and the handler function.

```js
const useMouseMove = () => {
  const [coords, setCoords] = useState([0, 0]);

  useEventListener('mousemove', ({ clientX, clientY }) => {
    setCoords([clientX, clientY]);
  });

  return coords;
};
```

## License

**[MIT](LICENSE)** Licensed
