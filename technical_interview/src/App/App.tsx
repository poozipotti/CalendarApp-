import React from "react";
import "./App.css";
import { Calendar } from "../Calendar/Calendar";
import { CalendarProvider } from "../Calendar/CalendarContext/CalendarContext";

function App() {
  return (
    <div className="App">
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

export default App;
