import "./button.css";

import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import * as React from "react";

export const confirmMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2A7AZgSwE4FsBaCMAGzABcxCAjAVwoowDpsJyBiAYQBkBJLgGlEoAA6pY2CtgwiQAD0QAGZgE5VAJgDMARgAsADiUGTAdlMBWC3oA0IAJ6IdFg8w1KlpvVtVaNOnQMANiCAX1C7NCw8IhJyKloGJnRmKJwCbHQobn4hOXFJaVkkBUR3FSVVJUM9IO09PQDTO0cEQi0tZm93HSClHSUOzXDIjHTYskpqekYWNJjM7K4AQQA5LgBRHnyJKRl0OUUEHVUdZiC9C17VINMgi1VLFrLLZi0LPqULDSMdDUaRiB5gRiJMEjNksw4pRFhwIBgwKx0AA3VAAa0RGAAImCwDtCvtDoh2npVMwDBYtJ5tBSrhogs9jto3N1VAZVN9LPpAcCJvFpkkWNDpFkOGBcLhULhmKJSABDCiYKX4ZjY3H4vbFUBHQiU0znYLuOkaUzsxl-Tr-Pxsjkmq5aUzhCIgdCoEjwEq80H8xKzFJscgaooHEo6vRfZimZzfTwBDmGRn01y09RVE2eYbOr3CgV+1JjBZZIOE0NOXrMfr1Uy+DQ3Fy2BxOeluDyWbR9HTvSw8gsgnO+yHCxbFrWlNo1ZguE1Un4mVSXButQj3Lp+JQaE1eB7aR1Z3t8qYD0cFTUh7XEj5nIKGr5-E1mxttTuuboea2mTxaWpO0JAA */
  createMachine(
    {
      id: "confirm-delete-button",
      initial: "idle",
      states: {
        idle: {
          on: {
            CLICK: {
              target: "confirming",
            },
          },
        },
        confirming: {
          invoke: {
            src: "pageClickHandler",
          },
          on: {
            CLICK: {
              target: "deleting",
            },
            CANCEL: {
              target: "idle",
            },
          },
        },
        deleting: {
          invoke: {
            src: "onDelete",
            id: "onDelete",
            onDone: [
              {
                target: "idle",
              },
            ],
            onError: [
              {
                target: "idle",
              },
            ],
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
