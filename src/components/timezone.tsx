const Timezone = ({
  setTimezone,
}: {
  setTimezone: (timezone: string) => void;
}) => {
  return (
    <div className="my-5">
      <span className="text-base font-semibold">TimeZone:</span>
      <div className="border border-slate-800 p-2 mt-1 rounded-md">
        <select
          className="w-full rounded-md outline-none"
          onChange={(e) => setTimezone(e.target.value)}
          name="cars"
          id="cars"
        >
          <option value="Etc/UTC">UTC</option>
          <option value="America/New_York">New York (UTC-5)</option>
        </select>
      </div>
    </div>
  );
};

export default Timezone;
