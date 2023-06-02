import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import httpClient from "./httpClient";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import {
  Box,
  Table,
  FormControl,
  Toolbar,
  Stack,
  Paper,
  Button,
  MenuItem,
  TableBody,
  Container,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Select,
  InputLabel,
} from "@mui/material";
import Iconify from "./components/iconify/Iconify";

interface IUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  position: string;
  experience: string;
  noticeperiod: string;
  curctc: string;
  expctc: string;
  location: string;
  remarks: string;
  curcompany: string;
  doi: string;
  status: string;
  feedback: string;
  createdby: string;
  createddate: string;
  updateddate: string;
  vendor: string;
}

interface UserTableCellProps {
  className: string;
  value: string | undefined;
}

const UserTableCell: React.FC<UserTableCellProps> = ({ className, value }) => (
  <TableCell className={className}>{value}</TableCell>
);

const userProperties: (keyof IUser)[] = [
  "name",
  "phone",
  "email",
  "position",
  "experience",
  "noticeperiod",
  "curctc",
  "expctc",
  "location",
  "remarks",
  "curcompany",
  "doi",
  "status",
  "feedback",
  "createdby",
  "createddate",
  "updateddate",
  "vendor",
];

const Dashboard = () => {
  const [users, setUser] = useState<IUser[]>([]);
  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = useState("");

  const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 5,
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1, 0, 3),
    marginLeft: "17.5%",
  }));

  useEffect(() => {
    httpClient
      .get("http://localhost:5000/check-auth")
      .then((response) => {
        if (!response.data.isLoggedIn) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (selectedVendor) {
          setUser(resp.filter((user:IUser) => user.vendor === selectedVendor));
        } else {
          setUser(resp);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [selectedVendor]);

  const handleVendorChange = (event:any) => {
    setSelectedVendor(event.target.value);
  };

  return (
    <>
      <DashboardLayout />
      <Container className="font-link">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mb={5}
        >
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} />

          <a href="/addnew">
            <Button variant="text" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Candidate
            </Button>
          </a>
        </Stack>

        <StyledRoot>
          <Typography variant="h4" gutterBottom className="m-3 md-col-left">
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedVendor}
              label="Vendor"
              onChange={handleVendorChange}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"LinkedIn"}>LinkedIn</MenuItem>
              <MenuItem value={"Naukri"}>Naukri</MenuItem>
              <MenuItem value={"Referral"}>Referral</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </StyledRoot>

        <div className="">
          <TableContainer
            sx={{ width: "80%", float: "right" }}
            component={Paper}
          >
            <Table
              className="table table-center table-striped table-hover"
              aria-label="simple table"
            >
              <TableHead className="text-dark">
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Phone</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Position</th>
                  <th className="text-center">Experience</th>
                  <th className="text-center">Notice Period</th>
                  <th className="text-center">Current CTC</th>
                  <th className="text-center">Expected CTC</th>
                  <th className="text-center">Location</th>
                  <th className="text-center">Remarks</th>
                  <th className="text-center">Current Company</th>
                  <th className="text-center">Date of Interview</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Feedback</th>
                  <th className="text-center">Created By</th>
                  <th className="text-center">Created Date</th>
                  <th className="text-center">Updated Date</th>
                  <th className="text-center">Vendor</th>
                  <th> </th>
                </tr>
              </TableHead>
              <TableBody>
                {users.map((user: IUser) => (
                  <TableRow key={user.id}>
                    {userProperties.map((prop) => (
                      <UserTableCell
                        key={`${user.id}-${prop}`}
                        className="text-dark text-center"
                        value={user[prop]}
                      />
                    ))}
                    <TableCell>
                      <MenuItem>
                        <Link to={`/update/${user.id}`}>
                          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                          Edit
                        </Link>
                      </MenuItem>
                    </TableCell>
                    <TableCell sx={{ color: "error.main" }}>
                      <MenuItem>
                        <Link to={`/delete/${user.id}`}>
                          <Iconify
                            icon={"eva:trash-2-outline"}
                            sx={{ mr: 2 }}
                          />
                          Delete
                        </Link>
                      </MenuItem>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableBody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-dark text-center">{user.name}</td>
                    <td className="text-dark text-center">{user.phone}</td>
                    <td className="text-dark text-center">{user.email}</td>
                    <td className="text-dark text-center">{user.position}</td>
                    <td className="text-dark text-center">{user.experience}</td>
                    <td className="text-dark text-center">
                      {user.noticeperiod}
                    </td>
                    <td className="text-dark text-center">{user.curctc}</td>
                    <td className="text-dark text-center">{user.expctc}</td>
                    <td className="text-dark text-center">{user.location}</td>
                    <td className="text-dark text-center">{user.remarks}</td>
                    <td className="text-dark text-center">{user.curcompany}</td>
                    <td className="text-dark text-center">{user.doi}</td>
                    <td className="text-dark text-center">{user.status}</td>
                    <td className="text-dark text-center">{user.feedback}</td>
                    <td className="text-dark text-center">{user.createdby}</td>
                    <td className="text-dark text-center">
                      {user.createddate}
                    </td>
                    <td className="text-dark text-center">
                      {user.updateddate}
                    </td>
                    <td className="text-dark text-center">{user.vendor}</td>

                    <MenuItem>
                      <Link to={`/update/${user.id}`}>
                        <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                        Edit
                      </Link>
                    </MenuItem>

                    <MenuItem sx={{ color: "error.main" }}>
                      <Link to={`/delete/${user.id}`}>
                        <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
                        Delete
                      </Link>
                    </MenuItem>
                  </tr>
                ))}
              </TableBody> */}
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
