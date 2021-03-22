/* eslint-env browser */
import { createPortal } from "react-dom";
import { INSPECT_ID } from "./constants";
import * as React from "react";
import { inspect, createDevTools } from "@xstate/inspect";
import { Interpreter } from "xstate";
import { eventsHandler } from "../eventsHandler";
import { getGlobal } from "xstate/lib/devTools";

interface HandlerEvent extends Event {
  data?: any;
}

export function withXstateInspector(StoryFn: (arg0: any) => any, context: any) {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  Interpreter.defaultOptions.devTools = true;

  React.useEffect(() => {
    function handler(event: HandlerEvent) {
      if (typeof event.data !== "object" || !("type" in event.data)) return;
      window.postMessage(event.data, "*");
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
            if (
              !iframe ||
              !iframe.parentElement ||
              iframeRef.current ||
              iframeRef.current === iframe
            )
              return;
            iframeRef.current = iframe;
            iframe.parentElement.childNodes.forEach((node) => {
              if (node !== iframe) {
                node.remove();
              }
            });
            Interpreter.defaultOptions.devTools = false;
            const devTools = createDevTools();
            devTools.onRegister((newService) => {
              if (context.parameters?.xstate) {
                const { events, delay, shouldRepeatEvents } =
                  context.parameters.xstate[newService.id] || {};
                if (events) {
                  setTimeout(() => {
                    eventsHandler(
                      newService,
                      events,
                      delay,
                      shouldRepeatEvents
                    );
                  });
                }
              }
            });
            const global = getGlobal();
            if (global) {
              // @ts-ignore
              global.__xstate__ = devTools;
            }
            inspect({
              iframe,
              devTools,
            });
            Interpreter.defaultOptions.devTools = true;
          }}
        />,
        window.parent.document.querySelector(`#${INSPECT_ID}`)!
      )}
      {StoryFn(context)}
    </>
  );
}

export const decorators = [withXstateInspector];
