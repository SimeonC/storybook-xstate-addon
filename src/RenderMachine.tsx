import {
  EventObject,
  Interpreter,
  InterpreterOptions,
  MachineOptions,
  StateMachine,
  Typestate,
} from "xstate";
import { inspect } from "@xstate/inspect";
import * as React from "react";
import { useMachine } from "@xstate/react";
import { UseMachineOptions } from "@xstate/react/lib/useMachine";
import { EventParam, eventsHandler } from "./eventsHandler";

interface Props<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
> {
  machine: StateMachine<TContext, any, TEvent, TTypestate>;
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>>;
  events?: EventParam<TContext, TEvent, TTypestate>;
}

export function RenderMachine<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>({ machine, options, events }: Props<TContext, TEvent, TTypestate>) {
  const iframeRef = React.useRef<HTMLIFrameElement | null>();
  const [, , service] = useMachine(machine, { ...options, devTools: true });
  React.useEffect(() => {
    if (events) {
      eventsHandler(service, events);
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
