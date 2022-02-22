# xState Storybook Addon

![](./preview.png)

### Installation

`npm install -D @storybook/addons storybook-xstate-addon @xstate/inspect @xstate/react`

### Usage

To use this in storybook simply add `addons: ["storybook-xstate-addon/preset"]` to your storybook config.

If you want to enable the inspector in all stories, set the following in your `/.storybook/preview.js` file. With this setting on you can disable the inspector in certain stories

```js
export const parameters = {
  xstate: true,
};
```

To enable the inspector in a single story/stories file, set the xstate parameter to true or an options object.

```jsx
// this will turn on the inspector for all stories in the current file
export default {
  title: "Example",
  parameters: {
    xstate: true,
    // this option is passed to the inspect function
    xstateInspectOptions: {
      url: 'https://stately.ai/viz?inspect',
      serialize: null
    }
  },
};

// this turns the inspector on for only a single story
StoryComponent.parameters = {
  xstate: true,
};
```

To assist with viewing larger state charts, you can pass the `height` option in the xstate parameter to force the height of the inspector.

```js
StoryComponent.parameters = {
  xstate: {
    height: "1000px",
  },
};
```

Additionally, you can send events to a machine by id when it is registered by adding the `xstate` parameter.

For more example usages see [./stories/Button.stories.tsx] and [./stories/Machines.stories.tsx].

```jsx
StoryComponent.parameters = {
  xstate: {
    machine_id1: {
      events: "event",
    },
    machine_id2: {
      events: { type: "event" },
    },
    machine_id3: {
      events: [{ type: "event1" }, { type: "event2" }],
    },
    machine_id4: {
      events: (state) => "event",
    },
    machine_id5: {
      events: ["event1", "event2"],
      delay: 2.5e3, // milliseconds to delay before sending the next event
      shouldRepeatEvents: true, // for looping event sequences
    },
  },
};
```

If you wish to use the Inspector as the main story itself, simply use the following snippet (uses react).

```jsx
import { RenderMachine } from 'storybook-xstate-addon/RenderMachine';

export const MachinePreview = () => <RenderMachine machine={confirmMachine.withConfig({ ... })} events={[...events]} />;
```
