import { Interpreter } from "xstate";
import { inspect } from "@xstate/inspect";
import * as React from "react";
import { useMachine } from "@xstate/react";

export function RenderMachine({ machine, options }) {
  const iframeRef = React.useRef();
  useMachine(machine, { ...options, devTools: true });
  return (
    <iframe
      style={{ width: "100%", height: "100vh", border: 0 }}
      ref={(iframe) => {
        if (iframeRef.current || iframeRef.current === iframe) return;
        iframeRef.current = iframe;
        iframe.parentElement.childNodes.forEach((node) => {
          if (node !== iframe) {
            node.remove();
          }
        });
        Interpreter.defaultOptions.devTools = false;
        inspect({
          iframe,
        });
        Interpreter.defaultOptions.devTools = true;
      }}
    />
  );
}
