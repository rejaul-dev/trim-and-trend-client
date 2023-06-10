import { format } from "date-fns";
import { useEffect, useState } from "react";
import AppointmentOptions from "./AppointmentOptions";
import BookingModal from "../BookingModal/BookingModal";

export default function AvailableAppointments({ selectedDate }) {
  // appointment state
  const [appointmentOptions, setAppointmentOptions] = useState([]);

  // services state
  const [services, setServices] = useState(null);

  useEffect(() => {
    fetch("appointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setAppointmentOptions(data));
  }, []);

  return (
    <section>
      <p className="text-md md:text-2xl text-center font-bold text-primary">
        Available Appointments{" "}
        <span className="text-error">{format(selectedDate, "PP")}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-24">
        {appointmentOptions.map((option) => (
          <AppointmentOptions
            key={option.id}
            appointmentOption={option}
            setServices={setServices}
          />
        ))}
      </div>
      {services && (
        <BookingModal services={services} selectedDate={selectedDate} />
      )}
    </section>
  );
}
