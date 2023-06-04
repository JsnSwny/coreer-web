import DatePicker from "react-datepicker";
import globalStyles from "@/styles/globalStyles.module.scss";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeInput {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const DateRangeInput = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateRangeInput) => {
  return (
    <div className={`${globalStyles.formGroup} ${globalStyles.formTwoColumn}`}>
      <div style={{ flex: 1 }}>
        <label className={globalStyles.label}>Start Date*</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className={globalStyles.input}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
        />
      </div>
      <div style={{ flex: 1 }}>
        <label className={globalStyles.label}>End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className={globalStyles.input}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
        />
      </div>
    </div>
  );
};

export default DateRangeInput;
