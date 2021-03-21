import React, { ComponentProps } from "react";
import { ConfirmDeleteButton, confirmMachine } from "./Button";
import { Story } from "@storybook/react";

export default {
  title: "Example/ConfirmDeleteButton",
  component: ConfirmDeleteButton,
};

const Template: Story<ComponentProps<typeof ConfirmDeleteButton>> = (args) => (
  <ConfirmDeleteButton {...args} />
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
ButtonWithEvents.args = {
  onDelete: () => new Promise<void>(() => {}),
};
ButtonWithEvents.parameters = {
  xstate: {
    [confirmMachine.id]: [{ type: "CLICK" }],
  },
};

export const AutomaticButton = Template.bind({});
AutomaticButton.args = {
  onDelete: () => new Promise<void>(() => {}),
};
AutomaticButton.parameters = {
  xstate: {
    [confirmMachine.id]: (state) =>
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
};
