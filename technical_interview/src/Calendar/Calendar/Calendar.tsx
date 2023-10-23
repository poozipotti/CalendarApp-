import React, { useState } from "react";
import {
  event,
  useCalendarDispatch,
  useGetEvents,
} from "../CalendarContext/CalendarContext";

const HOURS_IN_A_DAY = Array.from(Array(24).keys());

console.log(HOURS_IN_A_DAY);

export const Calendar: React.FC<{}> = () => {
  const events = useGetEvents();
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTIme] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(0);

  const dispatch = useCalendarDispatch();
  return (
    <>
      <div style={{ display: "flex" }}>
        <input
          name="eventName"
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          name="startTime"
          type="number"
          onChange={(e) => setStartTime(e.target.value as unknown as number)}
        />
        <input
          name="endTime"
          type="number"
          onChange={(e) => setEndTIme(e.target.value as unknown as number)}
        />
        <button
          onClick={() => {

            dispatch({
              type: "ADD",
              payload: {
                name: eventName,
                id: eventName,
                startTime: startTime,
                endTime: endTime,
              },
            });
          }}
        >
          add event
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplate: "1fr repeat(24)",
        }}
      >
        {HOURS_IN_A_DAY.map((hour) => (
          <Hour hour={hour} />
        ))}
        {events.map((event) => (
          <Event event={event} /*onClick={()=>{populates event date}}*//>
        ))}
      </div>
    </>
  );
};

export const Hour: React.FC<{ hour: number }> = ({ hour }) => {
  return (
    <div
      style={{
        padding: "40px",
        borderBottom: "1px solid black",
        gridRow: `${hour}`,
        gridRowEnd: "span 1",
      }}
    >
      {hour}:00
    </div>
  );
};
export const Event: React.FC<{ event: event }> = ({ event }) => {
  const dispatch = useCalendarDispatch();
  return (
    <div
      style={{
        backgroundColor: "tomato",
        color: "black",
        gridRowStart: `${event.startTime}`,
        gridRowEnd: `${event.endTime}`,
      }}
      onClick={() => dispatch({ type: "DELETE", payload: event.id })}
    >
      {event.name}
    </div>
  );
};
