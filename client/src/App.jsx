import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Join from "./pages/Join.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import CheckIn from "./pages/CheckIn.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/check-in"
        element={
          <ProtectedRoute>
            <CheckIn />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="wrap" style={{ padding: "120px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 40, marginBottom: 16 }}>Page not found</h1>
      <Link to="/" className="btn btn-primary">Back home</Link>
    </div>
  );
}
