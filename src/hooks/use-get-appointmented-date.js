import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { getAcceptedAppointments } from "../services/appointment";

const useGetAppointmentedDate = () => {
  const { data, isFetching } = useQuery(
    ["get-appointment-date-memomized"],
    () => getAcceptedAppointments()
  );
  const listAppointmented = React.useMemo(() => {
    const _list = {};

    //memomized count of picked date
    data?.appointments.map((appointment) => {
      const formatedDate = appointment.tanggal.format("DD/MM/YYYY");
      if (_list[formatedDate]) {
        _list[formatedDate] += 1;
      } else {
        _list[formatedDate] = 1;
      }
    });

    return _list;
  }, [data?.appointments]);

  const shouldDisableDate = React.useCallback(
    (day) => {
      const formatedDate = day.format("DD/MM/YYYY");

      const isDisabled =
        !!listAppointmented[formatedDate] &&
        listAppointmented[formatedDate] > 2;
      return isDisabled;
    },
    [listAppointmented]
  );

  return { listAppointmented, isFetching, shouldDisableDate };
};

export default useGetAppointmentedDate;
