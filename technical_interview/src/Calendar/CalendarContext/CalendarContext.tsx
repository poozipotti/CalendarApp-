import React from "react";

type INITIAL_STATE_T = {events: event[]};
const INITIAL_STATE: INITIAL_STATE_T = { events: [
  {name:'test_event',startTime:2,endTime:4, id: 'test-event'}
] };

const CalendarContext = React.createContext<
  [INITIAL_STATE_T, (action: allActions) => void]
>([INITIAL_STATE, () => {}]);

export interface event {
  startTime: number;
  endTime: number;
  name: string;
  id: string;
}

type action<type, payload> = { type: type; payload: payload };
type addNewEventAction = action<"ADD", event>;
type deleteEventAction = action<"DELETE", string>;
type edit = action<"EDIT", { id: string } & Partial<event>>;

type allActions = addNewEventAction | deleteEventAction | edit;

function simpleReducer(
  state: {
    events: event[];
  },
  action: allActions
) {
  switch (action.type) {
    case "ADD":
      return { ...state, events: [...state.events, action.payload] };
    case "DELETE":
      return {
        ...state,
        events: state.events.filter(({ id }) => id !== action.payload),
      };
    case "EDIT":
      return {
        ...state,
        events: state.events.map((oldEvent) =>
          oldEvent.id === action.payload.id
            ? { ...oldEvent, ...action.payload }
            : oldEvent
        ),
      };
    default:
      throw new Error(`unknown action received`);
  }
}

export const CalendarProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(simpleReducer, INITIAL_STATE);
  return (
    <CalendarContext.Provider value={[state, dispatch]}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarState = () => {
  const context = React.useContext(CalendarContext);

  if (context === undefined) {
    throw new Error("useCalendarState must be used within a SimpleProvider");
  }

  return context[0];
};

export const useCalendarDispatch = () => {
  const context = React.useContext(CalendarContext);

  if (context === undefined) {
    throw new Error("useCalendarDispatch must be used within a SimpleProvider");
  }

  return context[1];
};

export const useGetEvents = () => {
 const {events} = useCalendarState();
 return events
}




