import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Reports.css";
import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid } from "@mui/x-data-grid";

const Reports = () => {
  const [value, setValue] = useState(dayjs("2022-04-17"));

  const columns = [
    { field: "tanggal", headerName: "Tanggal", minWidth: 150, flex: 1 },
    { field: "keterangan", headerName: "Keterangan", minWidth: 500, flex: 3 },
    { field: "debit", headerName: "Debit", minWidth: 200, flex: 2 },
    { field: "kredit", headerName: "Kredit", minWidth: 200, flex: 2 },
  ];

  const rows = [
    {
      id: 1,
      tanggal: "01/03/2023",
      keterangan: "Rent - 088899998888 - Jane Doe",
      debit: "Rp. 1.000.000",
    },
    {
      id: 2,
      tanggal: "01/03/2023",
      keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
      kredit: "Rp. 500.000",
    },
    {
      id: 3,
      tanggal: "01/03/2023",
      keterangan: "Custom Rent - 088899998888 - Jane Doe",
      debit: "Rp. 1.000.000",
    },
    {
      id: 4,
      tanggal: "01/03/2023",
      keterangan: "Csutom Made - 088899998888 - Jane Doe",
      debit: "Rp. 1.000.000",
    },
    {
      id: 5,
      tanggal: "01/03/2023",
      keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
      kredit: "Rp. 500.000",
    },
    {
      id: 6,
      tanggal: "01/03/2023",
      keterangan: "Rent - 088899998888 - Jane Doe",
      debit: "Rp. 1.000.000",
    },
    {
      id: 7,
      tanggal: "01/03/2023",
      keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
      kredit: "Rp. 500.000",
    },
    {
      id: 8,
      tanggal: "01/03/2023",
      keterangan: "Custom Rent - 088899998888 - Jane Doe",
      debit: "Rp. 1.000.000",
    },
    {
      id: 9,
      tanggal: "01/03/2023",
      keterangan: "Kain lapis 150000, kain motif 200000, fee jahit baju 150000",
      kredit: "Rp. 500.000",
    },
  ];

  return (
    <div className="reports">
      <AdminTitle props={"Reports"} />
      <div className="reports-content">
        <div className="reports-search">
          <div className="reports-date-filter">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Dari Tanggal"
                defaultValue={dayjs("2022-04-17")}
                className="reports-datepicker"
              />
              <DatePicker
                label="Sampai Tanggal"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                className="reports-datepicker"
              />
            </DemoContainer>
          </LocalizationProvider>
          </div>
          <button className="reports-add">FILTER</button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            style={{ marginTop: "3%", border: "none", height: "70vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
