# xState Storybook Addon

![](./preview.png)

To use this in storybook simply add `addons: ["storybook-xstate-addon/preset"]` to your storybook config.

If you wish to use the Inspector as the main story itself, simply use the following snippet.

```jsx
import { MachinePreview } from 'storybook-xstate-addon';

export const MachinePreview = () => <RenderMachine machine={confirmMachine} options={...optionsToUseMachine} events={[...events]} />;
```

### Development scripts

- `npm run start` runs babel in watch mode and starts Storybook
- `npm run build` build and package your addon code

## Release Management

### Setup

This project is configured to use [auto](https://github.com/intuit/auto) for release management. It generates a changelog and pushes it to both GitHub and npm. Therefore, you need to configure access to both:
