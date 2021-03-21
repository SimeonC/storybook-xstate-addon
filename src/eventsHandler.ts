import { EventObject, Interpreter, State, Typestate } from "xstate";

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
    ) => TEvent | TEvent["type"] | Promise<TEvent | TEvent["type"]>);

export function eventsHandler<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  service: Interpreter<TContext, any, TEvent, TTypestate>,
  events?: EventParam<TContext, TEvent, TTypestate>
) {
  if (!events) return;
  switch (typeof events) {
    case "function":
      Promise.resolve(events(service.state)).then((event) => {
        if (event) service.send(event);
      });
      service.onTransition((state) => {
        setTimeout(() => {
          Promise.resolve(events(state)).then((event) => {
            if (event) service.send(event);
          });
        });
      });
      return;
    case "object":
      if (Array.isArray(events)) {
        const popStack = [...events];
        const event = popStack.shift();
        if (event) service.send(event);
        service.onTransition(() => {
          setTimeout(() => {
            const event = popStack.shift();
            if (event) service.send(event);
          });
        });
        return;
      }
    case "string":
    default:
      service.send(events);
  }
}
