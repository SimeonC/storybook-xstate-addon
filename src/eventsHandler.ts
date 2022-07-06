import {
  EventObject,
  InterpreterFrom,
  InterpreterStatus,
  State,
  StateMachine,
} from "xstate";

export type EventParam<
  TMachine extends StateMachine<any, any, any, any, any, any, any>,
  TEvent extends EventObject = TMachine["__TEvent"],
  TContext = TMachine["__TContext"]
> =
  | TEvent["type"]
  | TEvent
  | (TEvent["type"] | TEvent)[]
  | ((
      state: State<TContext, TEvent, any, TMachine["__TTypestate"]>
    ) =>
      | undefined
      | TEvent
      | TEvent["type"]
      | Promise<undefined | TEvent | TEvent["type"]>);

export function eventsHandler<
  TMachine extends StateMachine<any, any, any, any, any, any, any>,
  TEvent extends EventObject = TMachine["__TEvent"]
>(
  service: InterpreterFrom<TMachine>,
  events?: EventParam<TMachine>,
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
  let timeout: any;
  switch (typeof events) {
    case "function":
      // this should trigger on the `xstate.init` event
      service.onTransition((state) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          Promise.resolve((events as Function)(state)).then(safeSend);
        }, delay);
      });
      return;
    case "object":
      if (delay && Array.isArray(events)) {
        const popStack = [...events];
        service.onTransition(() => {
          if (service.status !== InterpreterStatus.Running) return;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
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
