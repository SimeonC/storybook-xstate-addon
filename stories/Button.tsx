import "./button.css";

import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import * as React from "react";

export const confirmMachine = createMachine(
  {
    id: "confirm-delete-button",
    initial: "idle",
    states: {
      idle: {
        on: { CLICK: "confirming" },
      },
      confirming: {
        invoke: {
          src: "pageClickHandler",
        },
        on: {
          CLICK: "deleting",
          CANCEL: "idle",
        },
      },
      deleting: {
        invoke: {
          src: "onDelete",
          onDone: "idle",
          onError: "idle",
        },
      },
    },
  },
  {
    services: {
      pageClickHandler: () => (dispatch) => {
        function clickHandler() {
          dispatch({ type: "CANCEL" });
        }
        document.body.addEventListener("click", clickHandler);
        return () => {
          document.body.removeEventListener("click", clickHandler);
        };
      },
    },
  }
);

export function ConfirmDeleteButton({
  onDelete,
}: {
  onDelete(): Promise<unknown>;
}) {
  const [state, dispatch] = useMachine(confirmMachine, {
    services: {
      onDelete,
    },
  });
  const classes = ["storybook-button", "storybook-button--medium"];
  if (state.matches("idle")) {
    classes.push("storybook-button--primary");
  } else {
    classes.push("storybook-button--secondary");
    classes.push("storybook-button--test");
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: "CLICK" });
      }}
      className={classes.join(" ")}
    >
      {(() => {
        switch (true) {
          case state.matches("confirming"):
            return "Confirm";
          case state.matches("deleting"):
            return "Deleting...";
          default:
            return "Delete";
        }
      })()}
    </button>
  );
}
