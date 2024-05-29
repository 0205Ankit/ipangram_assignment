import moment from "moment";
import timeIntervals from "../time_intervals.json";
import times from "../times.json";
import { useState } from "react";
import "moment-timezone";

const WeeklyTimes = ({ date, timezone }: { date: Date; timezone: string }) => {
  const [bookedTimes, setBookedTimes] = useState(times);

  const startOfWeek = moment(date).startOf("isoWeek"); // Start of the current week (Monday)
  const weekdays = [];

  for (let i = 0; i < 5; i++) {
    // Iterate from Monday to Friday
    weekdays.push(startOfWeek.clone().add(i, "days").toDate());
  }

  const isTimeAlreadyBooked = (time: string, day: Date) => {
    const timeArray = bookedTimes.filter((item) =>
      moment(item.date).isSame(day, "day")
    );

    if (!timeArray) return false;

    return timeArray.some((item) => {
      const time24HourMoment = moment(item.time, "HH:mm");
      const time12HourMoment = moment(time, "h:mmA");

      if (moment(time24HourMoment).isSame(moment(time12HourMoment), "minute")) {
        return true;
      }
    });
  };

  const checkHandler = (
    day: Date,
    time: string,
    e: React.MouseEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();
    if (
      bookedTimes.some(
        (item) =>
          moment(item.date).isSame(day, "day") &&
          moment(time, "h:mmA").isSame(moment(item.time, "HH:mm"), "minute")
      )
    ) {
      setBookedTimes((prev) =>
        prev.filter(
          (item) =>
            !(
              moment(item.date).isSame(day, "day") &&
              moment(time, "h:mmA").isSame(moment(item.time, "HH:mm"), "minute")
            )
        )
      );
      return;
    }

    setBookedTimes((prev) => {
      const newItem = {
        id: prev[prev.length - 1]?.id + 1,
        name: `Event ${prev[prev.length - 1]?.id + 1}`,
        date: moment(day).format("YYYY-MM-DD"),
        time: moment(time, "h:mmA").format("HH:mm"),
      };
      return [...prev, newItem];
    });
  };

  return (
    <>
      {weekdays.map((day, index) => (
        <div className="flex gap-5 border-b" key={index}>
          <div className="flex flex-col items-center py-5 min-w-[100px] bg-slate-300">
            <p className="font-semibold text-lg text-purple-800">
              {moment(day).format("dddd").slice(0, 3)}
            </p>
            <p>{moment(day).format("M/DD")}</p>
          </div>
          <div className="py-2">
            {moment(day).isBefore(new Date(), "day") ? (
              "Past"
            ) : (
              <div className="flex gap-5 flex-wrap">
                {timeIntervals.map((item) => (
                  <div key={item.id}>
                    <input
                      type="checkbox"
                      readOnly
                      checked={isTimeAlreadyBooked(item.time, day)}
                      onChange={(e) => e.preventDefault()}
                      className="cursor-pointer"
                      id={`${item.id}`}
                    />
                    <label
                      className="ml-2 cursor-pointer"
                      onClick={(e) => checkHandler(day, item.time, e)}
                      htmlFor={`${item.id}`}
                    >
                      {moment(item.time, "h:mmA")
                        .utc(true)
                        .tz(`${timezone}`)
                        .format("h:mmA")}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default WeeklyTimes;
