import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./index.css";
import "./css/style.css";
import { useAuth } from "./store/auth";
import Login from "./pages/auth/login";
import NotFound from "./pages/auth/404";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/landingPage";
import Pengajuan from "./pages/karyawan/pengajuan";
import Kriteria from "./pages/karyawan/kriteria";
import Status from "./pages/karyawan/status";
import Laporan from "./pages/karyawan/laporan";
import DaftarPengajuan from "./pages/admin/daftarPengajuan";
import LaporanAdmin from "./pages/admin/laporanAdmin";
import DaftarUsers from "./pages/admin/daftarUsers";

function App() {
  const navigate = useNavigate();
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const { loginResponse } = useAuth();
  let role;
  let decoded;

  if (loginResponse) {
    const token = loginResponse;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("dap");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 100);
    }
  }

  role = decoded?.role;

  if (role === "Karyawan") {
    return (
      <>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/pengajuan" element={<Pengajuan />} />
          <Route path="/kriteria" element={<Kriteria />} />
          <Route path="/status" element={<Status />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }

  if (role === "Admin") {
    return (
      <>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/daftar-pengajuan" element={<DaftarPengajuan />} />
          <Route path="/laporan" element={<LaporanAdmin />} />
          <Route path="/keuangan" element={<Laporan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }

  if (role === "SuperAdmin") {
    return (
      <>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/kriteria" element={<Kriteria />} />
          <Route path="/daftar-pengajuan" element={<DaftarPengajuan />} />
          <Route path="/keuangan" element={<Laporan />} />
          <Route path="/laporan" element={<LaporanAdmin />} />
          <Route path="/daftar-users" element={<DaftarUsers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }

  if (role === "Manajemen") {
    return (
      <>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/laporan" element={<LaporanAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
