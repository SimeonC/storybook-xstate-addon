import React from "react";
import { confirmMachine } from "./Button";
import { useMachine } from "@xstate/react";
import { RenderMachine } from "../src/RenderMachine";

export default {
  title: "Example/MachinePreview",
};

export const DevToolsWithUseMachine = () => {
  useMachine(confirmMachine);
  return (
    <div>
      Open the addon to see the xstate inspector, normally it'd be better to use
      RenderMachine component
    </div>
  );
};

export const MachinePreview = () => <RenderMachine machine={confirmMachine} />;
export const StringEvent = () => (
  <RenderMachine machine={confirmMachine} events={"CLICK"} />
);
export const ObjectEvent = () => (
  <RenderMachine machine={confirmMachine} events={{ type: "CLICK" }} />
);
export const EventsObjectArray = () => (
  <RenderMachine
    machine={confirmMachine}
    options={{ services: { onDelete: () => new Promise(() => {}) } }}
    events={[{ type: "CLICK" }, { type: "CLICK" }]}
  />
);
export const EventsStringArray = () => (
  <RenderMachine
    machine={confirmMachine}
    options={{ services: { onDelete: () => new Promise(() => {}) } }}
    events={["CLICK", "CLICK"]}
  />
);
