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

const inspectorMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7ATgTwEbvQGsACASQDtYAHMAYw02IBUBDXAOhfoEsA3Mdt3LdUAYgBKAUQCCAEQCaiUFXSwR3dOSUgAHogBMATgAs7QwFYAzIcMBGS5fN3j+gDQhsiAOzmAbO1tDAAZ9IN8jW1sjcwBfGPc0LDwCEgpqOgZmNk4efnZcABsWckJRUgAxcWkAWUltFTVUDS0kXURfLy92fV9fY19rS31LL2Mvd08EX0NLdgdRofMIvts4hIZkojJKGnosLI4uJrzC4tLZSQA1AH0mAHk7gBlketV1TW09KYHu8yCADmMQSclkCSwm3n+-zmIyBQUMXkcXiMaxAiRw+C2aV2mVYh1yAgAFixYLIwLwmAQCrAypUanVWg13i1QF9bEFLEF2PDjOYfH1zP92W4PJCuv9YUF4Yi+ZZUejNqkdhl9nicsciSTSAAzTAsAC2YFEFxu9yeL0ZbyaH1abI5XJ5fL8vKFIQhUxmMIW+iWdhW8o2mKV6T2jDVRz4AkwAFdyMJyFBRMh7uJ5NcAMIACWkADkAOIM5RW5qfRBRBzdULGWyIwz6YwIkWTQWmGtBLwI6v-AESgNJIPbEO47IR-gSSTISRMV6NEu2gwWdj-Gz6KFr31BYzu4xjdjI-o+WzdsZA4x9jEpQc41UjgnG0jIaQAIUehZATOtLLaCH+fTM-UiYxl2MIZAm3Xd9w6cwj03UZVniNFA0vbEVTDNgkyna5M0kUg80zadLVnG1WW8XxoScdlpj+KFDF6d1fHMSsHDsf5zCcDtq3PRUr1Qg5REkcRxDucQZ2ZUsEEA2ZBTBQE-B8IZ3X0UYl3+IwvHCQJV0iWJUXIdAIDgbQFQHFDQwOdVI0EYRUFEz9xPrUxQmsVilk5Fwm0QNj9ACLwAXLBixkcLiTOVMzwwJfIihKWy5xIhB+kMJcbHhQxl1YqVzHdUZEumEIhg5SxAUBYLkNC4d8Q1dhiVJclKXQakYuI78hUY9tgMRetbDIwwsr8L1qycUILFUkqsTKm8Kss6qdT1Q1Gq-L5AVsPdIk6MYvFsNjq3o-4unmMZglAoF9FG4NrzQya8hjOMhCgebxKiEJK1U9jdp6Tosv0ZaqwGYZhiiZdTp4sLb0qiBuFgNgCkge75x-fpuV-TowjBEJxlFBBoP8J0+n0L6OwBHT1n7Uqhwmiz+FhuK8a5JzUq8ty8fdSxwj3esOl8IJ2ShECgdM8r2DATBMCwKnvyicxTGRVSUvCBi3QxnpoUKoxrDIqJVyJxCSbGsmLrFtlaO6Dl6dczcmYxo9ZhVkxgUiAYoTiOIgA */
  createMachine<Context, Events>(
    {
      on: {
        SET_HEIGHT: {
          actions: "setHeight",
          internal: false,
        },
        ERROR: {
          target: ".error",
          internal: false,
        },
      },
      id: "Storybook Inspector Tab",
      initial: "active",
      states: {
        active: {
          initial: "init",
          states: {
            init: {
              entry: "setHeight",
              on: {
                READY: {
                  target: "blank",
                },
              },
            },
            blank: {
              on: {
                IFRAME: {
                  target: "hasIframe",
                },
                DEV_TOOLS: {
                  target: "hasDevTools",
                },
              },
            },
            hasDevTools: {
              entry: "setDevTools",
              on: {
                IFRAME: {
                  target: "running",
                },
              },
            },
            hasIframe: {
              on: {
                DEV_TOOLS: {
                  target: "running",
                },
              },
            },
            running: {
              entry: "startInspector",
              on: {
                STORY_CHANGE: {
                  target: "init",
                },
              },
            },
            disabled: {},
          },
          on: {
            RESET: {
              target: ".init",
            },
            DISABLE: {
              target: ".disabled",
            },
          },
        },
        error: {},
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
  if (state.matches({ active: "disabled" })) {
    node = (
      <p style={messageStyle}>Disabled, change story parameters to enable.</p>
    );
  } else if (state.matches("error")) {
    node = (
      <p style={messageStyle}>
        An Error Occurred! Could not start inspector 😞
      </p>
    );
  } else if (!state.matches({ active: "init" })) {
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
    if (state.matches({ active: "init" })) {
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
