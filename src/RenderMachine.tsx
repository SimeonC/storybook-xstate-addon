import { Interpreter, StateMachine } from "xstate";
import { inspect, InspectorOptions } from "@xstate/inspect";
import * as React from "react";
import { unmountComponentAtNode } from "react-dom";
import { useMachine } from "@xstate/react";
import { EventParam, eventsHandler } from "./eventsHandler";

interface Props<
  TMachine extends StateMachine<any, any, any, any, any, any, any>,
  Events = EventParam<TMachine>
> {
  machine: TMachine;
  events?: Events;
  delay?: number;
  shouldRepeatEvents?: Events extends Array<unknown> ? boolean : never;
  inspectOptions?: Omit<InspectorOptions, "iframe" | "devTools">;
}

export function RenderMachine<
  TMachine extends StateMachine<any, any, any, any, any, any, any>
>({
  machine,
  events,
  delay,
  shouldRepeatEvents,
  inspectOptions,
}: Props<TMachine>) {
  const iframeRef = React.useRef<HTMLIFrameElement | null>();
  const [, , service] = useMachine(machine, { devTools: true });
  React.useEffect(() => {
    if (events) {
      eventsHandler(service, events, delay, shouldRepeatEvents);
    }
  }, []);
  return (
    <iframe
      style={{ width: "100%", height: "100vh", border: 0 }}
      ref={(iframe) => {
        if (!iframe || !iframe.parentElement || iframeRef.current) return;
        iframeRef.current = iframe;
        iframe.parentElement.childNodes.forEach((node) => {
          if (node !== iframe) {
            unmountComponentAtNode(node as Element);
          }
        });
        Interpreter.defaultOptions.devTools = false;
        inspect({
          ...(inspectOptions || {}),
          iframe,
        });
        Interpreter.defaultOptions.devTools = true;
      }}
    />
  );
}
