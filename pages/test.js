import React from 'react';
import DateRangePicker from "@/components/DateRangePicker";

const ParentComponent = () => {
  return (
    <div>
      <DateRangePicker id="picker1" getDate={handleDateRange1} />
      <DateRangePicker id="picker2" getDate={handleDateRange2} />
    </div>
  );
};

export default ParentComponent;