import React, { useEffect } from "react";
import DocumentTools from "./components/resume/DocumentTools";
import IndexQuery from "./components/resume/IndexQuery";
import "./App.css";
import DashboardLayout from "./layouts/dashboard/DashboardLayout.js";
import { Card} from '@mui/material';
import httpClient from "./httpClient.js";
import { useNavigate } from "react-router-dom";
import DeleteFiles from "./apis/deleteFile";

const Resume = () => {
  const navigate = useNavigate();

  useEffect(() => {
    httpClient
      .get("http://localhost:5000/check-auth")
      .then((response) => {
        if (!response.data.isLoggedIn) {
          navigate("/resume");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DashboardLayout />
      <div className="app69">
        <DeleteFiles />
          <Card className="content">
          <DocumentTools />
          <IndexQuery />
          </Card>
          <Card className="content"> </Card>
      </div>
    </>
  );
};

export default Resume;
