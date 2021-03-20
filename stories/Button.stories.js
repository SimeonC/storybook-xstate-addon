import React from "react";
import { ConfirmDeleteButton, confirmMachine } from "./Button";
import { useMachine } from "@xstate/react";
import { RenderMachine } from "../src/RenderMachine";

export default {
  title: "Example/ConfirmDeleteButton",
  component: ConfirmDeleteButton,
};

const Template = (args) => <ConfirmDeleteButton {...args} />;

export const Button = Template.bind({});
Button.args = {
  onDelete: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2e3);
    }),
};

export const MachineOnly = () => {
  useMachine(confirmMachine);
  return null;
};

export const MachinePreview = () => <RenderMachine machine={confirmMachine} />;
