import { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import moment from "moment";

type propTypes = {
  date: Date;
  setDate: (date: Date) => void;
};

const Header = ({ date, setDate }: propTypes) => {
  const [disabledPrevButton, setDisabledPrevButton] = useState(false);

  useEffect(() => {
    // disable prev button if date is today
    if (moment(date).isSame(new Date(), "day")) {
      setDisabledPrevButton(true);
    } else {
      setDisabledPrevButton(false);
    }
  }, [date]);

  const prevWeekHandler = () => {
    const one_week_prev_date = moment(date)
      .subtract(1, "week")
      .startOf("isoWeek")
      .toDate();

    // set date to today if one_week_prev_date is less than today
    if (one_week_prev_date < new Date()) {
      setDate(new Date());
      return;
    }
    setDate(moment(date).subtract(1, "week").startOf("isoWeek").toDate());
  };

  const nextWeekHandler = () => {
    setDate(moment(date).add(1, "week").startOf("isoWeek").toDate());
  };

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={prevWeekHandler}
        disabled={disabledPrevButton}
        className="border-none flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-white bg-slate-800 py-2 px-4 rounded-md"
      >
        <IoMdArrowDropleft className="text-xl" /> Previous Week
      </button>
      <span className="font-medium">{moment(date).format("ll")}</span>
      <button
        onClick={nextWeekHandler}
        className="border-none flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-white bg-slate-800 py-2 px-4 rounded-md"
      >
        Next Week <IoMdArrowDropright className="text-xl" />
      </button>
    </div>
  );
};

export default Header;
