# @use-it/event-listener

A custom React Hook that provides a declarative addEventListener.

[![npm version](https://badge.fury.io/js/%40use-it%2Fevent-listener.svg)](https://badge.fury.io/js/%40use-it%2Fevent-listener) [![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)

This hook was inspired by [Dan Abramov](https://github.com/gaearon)'s
blog post
["Making setInterval Declarative with React Hooks"](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

I needed a way to simplify the plumbing around adding and removing an event listener
in a custom hook.
That lead to a [chain of tweets](https://twitter.com/donavon/status/1093612936621379584)
between Dan and myself.

## New in version 1.0.0

- Version 1.x has been completely rewritten in TypeScript.
- See [Parameters](#parameters) below for an important breaking change to `element`. Spoiler alert: it's now in `options`.
- Now supports sending a ref as the element as well as a DOM element.

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
useEventListener(eventName, handler [, options]);
```

### Parameters <a name="parameters"></a>

Here are the parameters that you can use. (\* = optional).

> Note: in version 1.0, `element` is now a key in `options`. This represents a **breaking change** that _could_ effect your code. Be sure to test before updating to 1.x from version 0.x.

| Parameter   | Description                                                                                                                                                                                                                        |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventName` | The event name (string). Here is a list of [common events](https://developer.mozilla.org/en-US/docs/Web/Events).                                                                                                                   |
| `handler`   | A function that will be called whenever `eventName` fires on `element`. New in version 1.x: this can also be an object implementing the [EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) interface. |
| `options`\* | An optional `Options` object (see below).                                                                                                                                                                                          |

### Options <a name="parameters"></a>

Here is the Options object. All keys are optional.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) for details on `capture`, `passive`, and `once`.

| Key       | Description                                                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element` | An optional element to listen on. Defaults to `global` (i.e. `window`). In version 1.0.0 this can also be a `refElement` (i.e. the output from `useRef` that you pass to a React element or component) |
| `capture` | A Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any `EventTarget` beneath it in the DOM tree.                                   |
| `passive` | A Boolean indicating that the handler will never call `preventDefault()`.                                                                                                                              |
| `once`    | A Boolean indicating that the handler should be invoked at most once after being added. If true, the handler would be automatically removed when invoked.                                              |

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

### TypeScript example

In TypeScript you can specify the type of the `Event` to be more specific. Here we set the handler's event type to `MouseEvent`.

```ts
const useMouseMove = () => {
  const [coords, setCoords] = React.useState([0, 0]);
  useEventListener('mousemove', ({ clientX, clientY }: MouseEvent) => {
    setCoords([clientX, clientY]);
  });
  return coords;
};
```

### useRef exmple

You can optionally pass a reference instead of an actual element. You might use this when a custom component accapts a ref but doesn't expose a way to pass in specific handlers.

```js
const refElement = React.useRef < HTMLDivElement > null;
useEventListener(
  'click',
  () => {
    alert('You clicked me!');
  },
  { element: refElement }
);
return <div ref={refElement}>Click Me</div>;
```

## Live demo

You can view/edit the sample code above on CodeSandbox.

[![Edit demo app on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/k38lyx2q9o)

## License

**[MIT](LICENSE)** Licensed

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://donavon.com"><img src="https://avatars3.githubusercontent.com/u/887639?v=4" width="100px;" alt=""/><br /><sub><b>Donavon West</b></sub></a><br /><a href="#infra-donavon" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/donavon/use-event-listener/commits?author=donavon" title="Tests">⚠️</a> <a href="#example-donavon" title="Examples">💡</a> <a href="#ideas-donavon" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-donavon" title="Maintenance">🚧</a> <a href="https://github.com/donavon/use-event-listener/pulls?q=is%3Apr+reviewed-by%3Adonavon" title="Reviewed Pull Requests">👀</a> <a href="#tool-donavon" title="Tools">🔧</a> <a href="https://github.com/donavon/use-event-listener/commits?author=donavon" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/third774"><img src="https://avatars3.githubusercontent.com/u/8732191?v=4" width="100px;" alt=""/><br /><sub><b>Kevin Kipp</b></sub></a><br /><a href="https://github.com/donavon/use-event-listener/commits?author=third774" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/wKovacs64"><img src="https://avatars1.githubusercontent.com/u/1288694?v=4" width="100px;" alt=""/><br /><sub><b>Justin Hall</b></sub></a><br /><a href="https://github.com/donavon/use-event-listener/commits?author=wKovacs64" title="Code">💻</a> <a href="https://github.com/donavon/use-event-listener/commits?author=wKovacs64" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/huan086"><img src="https://avatars2.githubusercontent.com/u/1448788?v=4" width="100px;" alt=""/><br /><sub><b>Jeow Li Huan</b></sub></a><br /><a href="https://github.com/donavon/use-event-listener/pulls?q=is%3Apr+reviewed-by%3Ahuan086" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://normanrz.com/"><img src="https://avatars1.githubusercontent.com/u/335438?v=4" width="100px;" alt=""/><br /><sub><b>Norman Rzepka</b></sub></a><br /><a href="#ideas-normanrz" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/bvanderdrift"><img src="https://avatars1.githubusercontent.com/u/6398452?v=4" width="100px;" alt=""/><br /><sub><b>Beer van der Drift</b></sub></a><br /><a href="https://github.com/donavon/use-event-listener/commits?author=bvanderdrift" title="Tests">⚠️</a> <a href="https://github.com/donavon/use-event-listener/commits?author=bvanderdrift" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pruge"><img src="https://avatars1.githubusercontent.com/u/5827473?v=4" width="100px;" alt=""/><br /><sub><b>clingsoft</b></sub></a><br /><a href="https://github.com/donavon/use-event-listener/commits?author=pruge" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
