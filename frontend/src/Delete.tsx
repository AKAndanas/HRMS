import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpClient from "./httpClient";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import { Container, Card, Stack } from "@mui/material";

export default function DeleteForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    httpClient
      .get("http://localhost:5000/check-auth")
      .then((response) => {
        if (response.data.isLoggedIn) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    httpClient
      .delete(`http://localhost:5000/user/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <DashboardLayout />
      <Container>
        <Card className=" text-center card1">
          <div className="m-3 d-flex flex-row justify-content-center col-md-12">
            <div className="card2 text-center">
              <div className="justify-content-center align-items-center">
                <Stack spacing={1}>
                <form>
                  <p> Are you sure? </p>
                  <button onClick={handleSubmit}>YES</button>
                </form>
                </Stack>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}
