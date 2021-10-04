/* eslint-env browser */
import { useEffect } from "@storybook/addons";
import { useChannel } from "@storybook/client-api";
import { createDevTools, inspect } from "@xstate/inspect";
import { Interpreter } from "xstate";
import { getGlobal } from "xstate/lib/devTools";
import { eventsHandler } from "../eventsHandler";
import { EVENTS, INSPECT_ID } from "./constants";

interface HandlerEvent extends Event {
  data?: any;
}

export function withXstateInspector(StoryFn: (arg0: any) => any, context: any) {
  if (context.viewMode === "docs") return StoryFn(context);
  if (context.parameters?.xstate) {
    Interpreter.defaultOptions.devTools = true;
  }
  const global = getGlobal();
  const emit = useChannel({
    [EVENTS.START_INSPECT]: () => {
      const { xstate, inspectUrl } = context.parameters || {};
      if (!xstate) return;
      Interpreter.defaultOptions.devTools = false;
      const iframe = window.parent.document.body.querySelector<HTMLIFrameElement>(
        `iframe#${INSPECT_ID}`
      );
      // @ts-ignore
      const devTools = global.__xstate__;
      if (!devTools || !iframe) {
        emit(EVENTS.ERROR);
        return;
      }
      inspect({
        ...(inspectUrl && { url: inspectUrl }),
        iframe,
        devTools,
      });
      Interpreter.defaultOptions.devTools = true;
      if (typeof xstate === "object" && xstate.height) {
        emit(EVENTS.SET_HEIGHT, { height: `${xstate.height}` });
      }
    },
  });
  if (context.parameters?.xstate) {
    Interpreter.defaultOptions.devTools = false;
    const devTools = createDevTools();

    if (global) {
      // @ts-ignore
      global.__xstate__ = devTools;
    }
    emit(EVENTS.DEV_TOOLS);
    Interpreter.defaultOptions.devTools = true;
  } else {
    emit(EVENTS.DISABLE);
  }

  useEffect(() => {
    function handler(event: HandlerEvent) {
      if (typeof event.data !== "object" || !("type" in event.data)) return;
      window.postMessage(event.data, "*");
    }
    window.parent.addEventListener("message", handler);


    const { xstate } = context.parameters || {};
    let unsubscribe = () => {};
    if (xstate && global) {
      // @ts-ignore
      ({ unsubscribe } = (global.__xstate__ as ReturnType<typeof createDevTools>).onRegister((newService) => {
        if (typeof xstate === "object") {
          const { events, delay, shouldRepeatEvents } =
          context.parameters.xstate[newService.id] || {};
          if (events) {
            console.log("[debug]", "register events");
            setTimeout(() => {
              eventsHandler(newService, events, delay, shouldRepeatEvents);
            });
          }
        }
      }));
    }

    // cleanup
    return () => {
      unsubscribe();
      emit(EVENTS.RESET);
      window.parent.removeEventListener("message", handler);
      Interpreter.defaultOptions.devTools = false;
    };
  }, []);
  return StoryFn(context);
}
