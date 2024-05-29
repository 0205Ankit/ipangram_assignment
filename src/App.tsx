import { useState } from "react";
import Header from "./components/header";
import Timezone from "./components/timezone";
import WeeklyTimes from "./components/weeklyTimes";

function App() {
  const [date, setDate] = useState(new Date());
  const [timezone, setTimezone] = useState("Etc/UTC");

  return (
    <div className="w-10/12 mx-auto my-20">
      <Header date={date} setDate={setDate} />
      <Timezone setTimezone={setTimezone} />
      <WeeklyTimes date={date} timezone={timezone} />
    </div>
  );
}

export default App;
