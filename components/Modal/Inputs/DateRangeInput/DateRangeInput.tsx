import FormError from "@/components/Forms/Error/FormError";
import globalStyles from "@/styles/globalStyles.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

interface DateRangeInput {
  control: any;
  errors: any;
  watch: any;
  startDateRequired?: boolean;
  endDateRequired?: boolean;
}

const DateRangeInput = ({
  control,
  errors,
  watch,
  startDateRequired = true,
  endDateRequired = false,
}: DateRangeInput) => {
  const watchStartDate = watch("start_date");
  const watchEndDate = watch("end_date");

  return (
    <div className={`${globalStyles.formGroup} ${globalStyles.formTwoColumn}`}>
      <div style={{ flex: 1 }}>
        <label className={globalStyles.label}>Start Date{startDateRequired ? "*" : ""}</label>
        <Controller
          control={control}
          name="start_date"
          render={({ field }) => {
            return (
              <DatePicker
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                selectsStart
                startDate={field.value}
                endDate={watchEndDate}
                className={globalStyles.input}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
              />
            );
          }}
        ></Controller>
        <FormError message={errors.start_date?.message} />
      </div>
      <div style={{ flex: 1 }}>
        <label className={globalStyles.label}>End Date</label>
        <Controller
          control={control}
          name="end_date"
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date) => field.onChange(date)}
              selectsEnd
              startDate={watchStartDate}
              endDate={field.value}
              minDate={watchStartDate}
              className={globalStyles.input}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
            />
          )}
        ></Controller>
        <FormError message={errors.end_date?.message} />
      </div>
    </div>
  );
};

export default DateRangeInput;
