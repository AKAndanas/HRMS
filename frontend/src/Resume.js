import React from "react";
import DocumentTools from "./components/resume/DocumentTools.tsx";
import IndexQuery from "./components/resume/IndexQuery.tsx";
import "./App.css";
import DashboardLayout from "./layouts/dashboard/DashboardLayout.js";
const Resume = () => {
  return (
    <>
      <DashboardLayout />
      <div className="app69">
        <div className="content">
          <DocumentTools />
          <IndexQuery />
        </div>
      </div>
    </>
  );
};

export default Resume;
