import { ComponentProps } from "react";
import { ConfirmDeleteButton, confirmMachine } from "./Button";
import { Story } from "@storybook/react";
import { StateFrom } from "xstate";

export default {
  title: "Example/ConfirmDeleteButton",
  component: ConfirmDeleteButton,
};

const Template: Story<ComponentProps<typeof ConfirmDeleteButton>> = ({
  onDelete,
  ...args
}) => (
  <ConfirmDeleteButton onDelete={() => new Promise<void>(() => {})} {...args} />
);

export const Button = Template.bind({});
Button.args = {
  onDelete: () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2e3);
    }),
};

export const ButtonWithEvents = Template.bind({});
ButtonWithEvents.parameters = {
  xstate: {
    [confirmMachine.id]: { events: [{ type: "CLICK" }] },
  },
};

export const ButtonWithRepeatEvents = Template.bind({});
ButtonWithRepeatEvents.parameters = {
  xstate: {
    [confirmMachine.id]: {
      events: ["CLICK", "CLICK", "done.invoke.onDelete"],
      delay: 2.5e3,
      shouldRepeatEvents: true,
    },
  },
};

export const AutomaticButton = Template.bind({});
AutomaticButton.parameters = {
  xstate: {
    [confirmMachine.id]: {
      events: (state: StateFrom<typeof confirmMachine>) =>
        new Promise((resolve) =>
          setTimeout(() => {
            switch (true) {
              case state.matches("idle"):
                return resolve("CLICK");
              case state.matches("confirming"):
                return resolve("CLICK");
              case state.matches("deleting"):
                return resolve("done.invoke.onDelete");
            }
          }, 2.5e3)
        ),
    },
  },
};
