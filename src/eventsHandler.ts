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
  if (!events) return;
  switch (typeof events) {
    case "function":
      // this should trigger on the `xstate.init` event
      service.onTransition((state) => {
        setTimeout(() => {
          Promise.resolve(events(state)).then((event) => {
            if (event) service.send(event);
          });
        }, delay);
      });
      return;
    case "object":
      if (delay && Array.isArray(events)) {
        const popStack = [...events];
        service.onTransition(() => {
          setTimeout(() => {
            const event = popStack.shift();
            if (event) service.send(event);
            if (!popStack.length && shouldRepeat) {
              popStack.push(...events);
            }
          }, delay);
        });
        return;
      }
    default:
      service.send(events);
  }
}
