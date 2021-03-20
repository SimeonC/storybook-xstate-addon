/* eslint-env browser */
import { createPortal } from "react-dom";
import { INSPECT_ID } from "./constants";
import * as React from "react";
import { inspect } from "@xstate/inspect";
import { Interpreter } from "xstate";

export const withGlobals = (StoryFn, context) => {
  const iframeRef = React.useRef();

  Interpreter.defaultOptions.devTools = true;

  React.useEffect(() => {
    function handler(event) {
      if (typeof event.data !== "object" || !"type" in event.data) return;
      window.postMessage(event.data);
    }
    window.parent.addEventListener("message", handler);
    return () => {
      window.parent.removeEventListener("message", handler);
    };
  }, []);

  return (
    <>
      {createPortal(
        <iframe
          style={{ width: "100%", height: "calc(100% - 4px)", border: 0 }}
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
        />,
        window.parent.document.querySelector(`#${INSPECT_ID}`)
      )}
      {StoryFn(context)}
    </>
  );
};

export const decorators = [withGlobals];
