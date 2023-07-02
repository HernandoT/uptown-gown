import * as React from "react";
import AdminTitle from "../../components/AdminTitle/AdminTitle";
import "./Appointments.css";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../../services/appointment";
import { getCustomers } from "../../services/customer";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import DetailButton from "../../components/DetailButton";
import { TbHanger } from "react-icons/tb";
import { CgUnavailable, CgCheckO } from "react-icons/cg";

const Appointments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isInitiate, setIsInitiate] = React.useState(false);
  const [appointments, setAppointments] = React.useState([]);
  const [todayAppointment, setTodayAppointment] = React.useState(0);
  const [tomorrowAppointment, setTomorrowAppointment] = React.useState(0);
  const [dayAfterTomorrowAppointment, setDayAfterTomorrowAppointment] =
    React.useState(0);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, isFetching } = useQuery(["get-appointments"], () =>
    getAppointments()
  );

  const { data: dataCustomers, isFetching: isFetchingCustomers } = useQuery(
    ["get-customers"],
    () => getCustomers()
  );

  React.useEffect(() => {
    if (!isFetching && !isFetchingCustomers && !isInitiate) {
      let dataAppointment = data?.data;
      dataAppointment.sort(
        (a, b) => a.status - b.status || b.tanggal - a.tanggal
      );
      const now = dayjs();
      const todayDate = now.get("date");
      const todayMonth = now.get("month");
      const todayYear = now.get("year");
      let today = 0;
      let tomorrow = 0;
      let dayAfterTomorrow = 0;
      dataAppointment = dataAppointment.map((appointment) => {
        const appointmentDate = appointment.tanggal.get("date");
        const appointmentMonth = appointment.tanggal.get("month");
        const appointmentYear = appointment.tanggal.get("year");
        const isAccepted = appointment.status === 2;
        const isSameMonthAndYear =
          appointmentMonth === todayMonth && appointmentYear === todayYear;
        if (appointmentDate === todayDate && isSameMonthAndYear && isAccepted) {
          today += 1;
        } else if (
          appointmentDate - todayDate === 1 &&
          isSameMonthAndYear &&
          isAccepted
        ) {
          tomorrow += 1;
        } else if (
          appointmentDate - todayDate === 2 &&
          isSameMonthAndYear &&
          isAccepted
        ) {
          dayAfterTomorrow += 1;
        }
        const cust = dataCustomers.data.find((customer) => {
          return customer.id === appointment.id_customer;
        });
        appointment.email = cust.email;
        appointment.nama = cust.nama;
        appointment.nomor_telepon = cust.nomor_telepon;
        return appointment;
      });
      setAppointments(dataAppointment);
      setTodayAppointment(today);
      setTomorrowAppointment(tomorrow);
      setDayAfterTomorrowAppointment(dayAfterTomorrow);
      setIsInitiate(true);
    }
  }, [
    data?.data,
    dataCustomers?.data,
    isFetching,
    isFetchingCustomers,
    isInitiate,
  ]);

  const columns = [
    { field: "email", headerName: "Email", minWidth: 100, flex: 1 },
    { field: "nama", headerName: "Nama", minWidth: 100, flex: 1 },
    {
      field: "nomor_telepon",
      headerName: "Nomor Telepon",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "tanggal",
      headerName: "Tanggal",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{dayjs(row.tanggal).format("DD/MM/YYYY")}</>;
      },
    },
    { field: "waktu", headerName: "Waktu", minWidth: 100, flex: 1 },
    { field: "keterangan", headerName: "Keterangan", minWidth: 200, flex: 2 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => {
        if (row.status === 1)
          return <div style={{ color: "orange" }}>PENDING</div>;
        else if (row.status === 2)
          return <div style={{ color: "green" }}>TERIMA</div>;
        else if (row.status === 3)
          return <div style={{ color: "red" }}>TOLAK</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 50,
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: ({ row }) => {
        const onClick = () => {
          navigate(`/admin/appointment/${row.id}`);
        };
        return <DetailButton onClick={onClick} />;
      },
    },
  ];

  return (
    <div className="appointments">
      <AdminTitle props={"Appoinment"} />
      <div className="appointments-content">
        <div className="appointments-card">
          <div className="card-container">
            <TbHanger
              className="appointments-card-icon"
              style={{
                color: "#EDBF52",
                backgroundColor: "rgba(237, 191, 82, 0.2)",
              }}
            />
            <div style={{ flex: 1 }}>
              <div>Appointment Hari Ini</div>
              <div className="appointments-card-value">{todayAppointment}</div>
            </div>
          </div>
          <div className="card-container">
            <CgCheckO
              className="appointments-card-icon"
              style={{
                color: "green",
                backgroundColor: "rgba(0, 128, 0, 0.2)",
              }}
            />
            <div style={{ flex: 1 }}>
              <div>Appointment Besok</div>
              <div className="appointments-card-value">
                {tomorrowAppointment}
              </div>
            </div>
          </div>
          <div className="card-container">
            <CgUnavailable
              className="appointments-card-icon"
              style={{
                color: "red",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
            <div style={{ flex: 1 }}>
              <div>Appointment Lusa</div>
              <div className="appointments-card-value">
                {dayAfterTomorrowAppointment}
              </div>
            </div>
          </div>
        </div>
        <div className="appointments-search">
          <TextField
            id="search"
            type="search"
            label="Cari menurut nomor telepon"
            className="appointments-search-input"
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: "65%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ backgroundColor: "white" }}
          />
          <button
            className="appointments-add"
            onClick={() => navigate("/admin/add-appointment")}
          >
            + TAMBAH APPOINTMENT
          </button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          {!isInitiate ? (
            <CircularProgress color="secondary" />
          ) : (
            <DataGrid
              rows={appointments.filter((appointment) =>
                appointment.nomor_telepon.includes(searchTerm)
              )}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              style={{ marginTop: "3%", height: "70vh" }}
              className="card-container"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
