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
export const RepeatedEventsArrayWithDelay = () => (
  <RenderMachine
    machine={confirmMachine}
    options={{ services: { onDelete: () => new Promise(() => {}) } }}
    events={["CLICK", "CLICK", "done.invoke.onDelete"]}
    delay={2.5e3}
    shouldRepeatEvents
  />
);
export const EventsFunction = () => (
  <RenderMachine
    machine={confirmMachine}
    options={{ services: { onDelete: () => new Promise(() => {}) } }}
    events={(state) =>
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
      )
    }
  />
);
export const EventsFunctionWithDelay = () => (
  <RenderMachine
    machine={confirmMachine}
    options={{ services: { onDelete: () => new Promise(() => {}) } }}
    events={(state) => {
      switch (true) {
        case state.matches("idle"):
          return "CLICK";
        case state.matches("confirming"):
          return "CLICK";
        case state.matches("deleting"):
          return "done.invoke.onDelete";
      }
    }}
    delay={2.5e3}
  />
);
