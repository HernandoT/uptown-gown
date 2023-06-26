import * as React from "react";
import "./Calendar.css";
import { Flex, Paper, Text } from "@mantine/core";
import Separator from "../separator";
import DatePicker from "react-datepicker";
import { Button } from "@mui/material";
import { modals } from "@mantine/modals";

const Calendar = ({ disableDate }) => {

  return (
    <Paper p={24} miw={400}>
      <Text fz={24} fw={600}>
        Cek Ketersediaan
      </Text>
      <Separator _gap={24} />
      <div className="calendar">
        <DatePicker
          disabled
          minDate={new Date()}
          inline
          excludeDates={disableDate}
        />
      </div>
      <Separator _gap={24} />
      <Flex justify="flex-end">
        <Button variant="text" color="error" onClick={modals.closeAll}>
          TUTUP
        </Button>
      </Flex>
    </Paper>
  );
};

export default Calendar;
