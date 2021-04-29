import { assign, createMachine } from "xstate";
import { useChannel } from "@storybook/api";
import { EVENTS, INSPECT_ID } from "./constants";
import StorybookEvents from "@storybook/core-events";
import { useMachine } from "@xstate/react";
import * as React from "react";

interface Context {
  height: string;
}

type Events =
  | {
      type:
        | "STORY_CHANGE"
        | "IFRAME"
        | "DEV_TOOLS"
        | "READY"
        | "ERROR"
        | "DISABLE"
        | "RESET";
    }
  | { type: "SET_HEIGHT"; height: string };

const inspectorMachine = createMachine<Context, Events>(
  {
    id: "Storybook Inspector Tab",
    initial: "init",
    on: {
      RESET: "init",
      ERROR: "error",
      DISABLE: "disabled",
      SET_HEIGHT: { actions: ["setHeight"] },
    },
    states: {
      init: {
        entry: "setHeight",
        on: {
          READY: "blank",
        },
      },
      blank: {
        on: {
          IFRAME: "hasIframe",
          DEV_TOOLS: "hasDevTools",
        },
      },
      hasDevTools: {
        entry: "setDevTools",
        on: {
          IFRAME: "running",
        },
      },
      hasIframe: {
        on: {
          DEV_TOOLS: "running",
        },
      },
      running: {
        entry: "startInspector",
        on: {
          STORY_CHANGE: "init",
        },
      },
      error: {
        on: {
          STORY_CHANGE: "init",
        },
      },
      disabled: {},
    },
  },
  {
    actions: {
      setHeight: assign({
        height: (_, event) =>
          event.type === "SET_HEIGHT" && event.height ? event.height : "100%",
      }),
    },
  }
);

const messageStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const XStateInspectorPanel = () => {
  const emit = useChannel({
    [EVENTS.DEV_TOOLS]: () => {
      send({ type: "DEV_TOOLS" });
    },
    [EVENTS.ERROR]: () => {
      send({ type: "ERROR" });
    },
    [EVENTS.DISABLE]: () => {
      send({ type: "DISABLE" });
    },
    [EVENTS.RESET]: () => {
      send({ type: "RESET" });
    },
    [EVENTS.SET_HEIGHT]: ({ height }) => {
      send({ type: "SET_HEIGHT", height });
    },
    [StorybookEvents.STORY_RENDERED]: () => {
      send({ type: "STORY_CHANGE" });
    },
  });

  const [state, send] = useMachine(inspectorMachine, {
    devTools: false,
    actions: {
      startInspector: () => {
        emit(EVENTS.START_INSPECT);
      },
    },
  });

  let node = null;
  if (state.matches("disabled")) {
    node = (
      <p style={messageStyle}>Disabled, change story parameters to enable.</p>
    );
  } else if (state.matches("error")) {
    node = (
      <p style={messageStyle}>
        An Error Occurred! Could not start inspector 😞
      </p>
    );
  } else if (!state.matches("init")) {
    node = (
      <iframe
        id={INSPECT_ID}
        style={{
          width: "100%",
          height: "calc(100% - 4px)",
          border: 0,
        }}
        ref={(iframe) => {
          if (!iframe) return;
          send({ type: "IFRAME" });
        }}
      />
    );
  }

  React.useLayoutEffect(() => {
    if (state.matches("init")) {
      send({ type: "READY" });
    }
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `calc(${state.context.height} - 4px)`,
      }}
    >
      {node}
    </div>
  );
};
