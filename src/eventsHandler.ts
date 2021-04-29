import {
  EventObject,
  Interpreter,
  InterpreterStatus,
  State,
  Typestate,
} from "xstate";

export type EventParam<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
> =
  | TEvent["type"]
  | TEvent
  | (TEvent["type"] | TEvent)[]
  | ((
      state: State<TContext, TEvent, any, TTypestate>
    ) =>
      | undefined
      | TEvent
      | TEvent["type"]
      | Promise<undefined | TEvent | TEvent["type"]>);

export function eventsHandler<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  service: Interpreter<TContext, any, TEvent, TTypestate>,
  events?: EventParam<TContext, TEvent, TTypestate>,
  delay: number = 0,
  shouldRepeat?: boolean
) {
  function safeSend(
    event: TEvent["type"] | TEvent | (TEvent["type"] | TEvent)[] | undefined
  ) {
    if (event && service.status === InterpreterStatus.Running) {
      service.send(event);
    }
  }
  if (!events) return;
  switch (typeof events) {
    case "function":
      // this should trigger on the `xstate.init` event
      service.onTransition((state) => {
        setTimeout(() => {
          Promise.resolve(events(state)).then(safeSend);
        }, delay);
      });
      return;
    case "object":
      if (delay && Array.isArray(events)) {
        const popStack = [...events];
        service.onTransition(() => {
          if (service.status !== InterpreterStatus.Running) return;
          setTimeout(() => {
            const event = popStack.shift();
            safeSend(event);
            if (!popStack.length && shouldRepeat) {
              popStack.push(...events);
            }
          }, delay);
        });
        return;
      }
    default:
      safeSend(events);
  }
}
