import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Attendance from './pages/Attendance'

function App() {

  // New change

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Attendance />} />
      </Routes>
    </Router>
  )
}

export default App
