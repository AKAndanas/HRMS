import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./Signup"
import Login from "./Login"
import Dashboard from "./Dashboard"
import AddNewCandidate from "./AddNewCandidate"
import LandingPage from "./LandingPage";
import DeleteForm from "./Delete";
import UpdateForm from "./Update";
import ThemeProvider  from "./theme"
function App() {

  return (
    
    <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/addnew" element={<AddNewCandidate/>} />
        <Route path="/update/:id" element={<UpdateForm />} />
        <Route path="/delete/:id" element={<DeleteForm/>} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}



export default App
