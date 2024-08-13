import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";
import About from "./components/sidebar/About";
import Footer from "./components/sidebar/Footer";
import { Box } from "@mui/material";

function App() {
  const { user } = useContext(Context);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        <Topbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={user ? <Home /> : <Register />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/write" element={user ? <Write /> : <Register />} />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Register />}
            />
            <Route path="/post/:postId" element={<Single />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
