import React, { useEffect, useState } from "react";
import Layout from "../../components/moleculs/layout";
import {
  ModalResetPassword,
  ModalUpdatedUsers,
} from "../../components/atoms/modal";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Users,
  UserPlus,
  Search,
  RefreshCcw,
  ShieldCheck,
  Trash2,
  Edit3,
  UserCheck,
  UserX,
  AtSign,
} from "lucide-react";
import { toast } from "react-toastify";
import { detailUser } from "../../utils/Utils";
import Swal from "sweetalert2";

const DaftarUsers = () => {
  const users = detailUser();
  const role = users?.role;

  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users");
      if (response.data.success) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      }
    } catch (err) {
      toast.error("Gagal mengambil data users");
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (id) => {
    try {
      const response = await axios.patch(`/blockUser/${id}`);
      if (response.data.success) {
        toast.success(response.data.msg);
        getData();
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const deletedUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data user yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`/users/${id}`);

        if (response.data.success) {
          toast.success(response.data.msg);
          getData();
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Terjadi kesalahan");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = data.filter(
      (user) =>
        user.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(result);
  }, [searchTerm, data]);

  const columns = [
    {
      field: "id",
      headerName: "No",
      flex: 0.1,
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const index = filteredData.findIndex((row) => row.id === params.row.id);
        return <span className="font-medium text-slate-500">{index + 1}</span>;
      },
    },
    {
      field: "nama",
      headerName: "NAMA LENGKAP",
      flex: 0.5,
      width: 180,
      renderCell: (params) => (
        <span className="font-bold text-slate-700">{params.value}</span>
      ),
    },
    {
      field: "username",
      headerName: "USERNAME",
      flex: 0.3,
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <AtSign size={14} className="text-blue-400" />
          {params.value}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 0.3,
      width: 220,
      renderCell: (params) => (
        <span className="text-slate-600 text-sm">{params.value}</span>
      ),
    },
    {
      field: "no_telepon",
      headerName: "NO. TELEPON",
      flex: 0.3,
      width: 150,
      renderCell: (params) => (
        <span className="text-slate-600 font-medium">{params.value}</span>
      ),
    },
    {
      field: "role",
      headerName: "HAK AKSES",
      flex: 0.3,
      width: 140,
      renderCell: (params) => (
        <div
          className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border ${
            params.value === "SuperAdmin"
              ? "bg-purple-50 text-purple-600 border-purple-100"
              : "bg-indigo-50 text-indigo-600 border-indigo-100"
          }`}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "is_Blocked",
      headerName: "STATUS",
      width: 130,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value === 0 ? (
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] uppercase">
            <UserCheck size={14} /> Aktif
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-rose-600 font-bold text-[10px] uppercase">
            <UserX size={14} /> Terblokir
          </div>
        ),
    },
    {
      field: "aksi",
      headerName: "ACTION",
      width: 120,
      flex: 0.3,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => blockUser(row.id)}
              className={`p-2 rounded-lg transition-all active:scale-90 shadow-sm border ${
                row.is_Blocked
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                  : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
              }`}
              title={row.is_Blocked ? "Unblock User" : "Block User"}
            >
              {row.is_Blocked ? <UserCheck size={16} /> : <UserX size={16} />}
            </button>

            {!row.is_Blocked && (
              <button
                onClick={() => {
                  setCurrentData(params.row);
                  document.getElementById("updatedUsers").showModal();
                }}
                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all active:scale-90 shadow-sm border border-blue-100"
                title="Ubah User"
              >
                <Edit3 size={16} />
              </button>
            )}

            <button
              onClick={() => {
                setCurrentData(params.row);
                document.getElementById("resetPassword").showModal();
              }}
              className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-all active:scale-90 shadow-sm border border-purple-100"
              title="Reset Password"
            >
              <RefreshCcw size={16} />
            </button>

            <button
              onClick={() => deletedUser(row.id)}
              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-all active:scale-90 shadow-sm border border-rose-100"
              title="Hapus User"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Layout>
        <div className="p-6 bg-slate-50/50 min-h-screen">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-left">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
                <Users className="text-blue-600" size={28} />
                Manajemen Data User
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Daftar seluruh pengguna yang memiliki akses ke dashboard sistem.
              </p>
            </div>
          </div>

          {/* Filter & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari user..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSearchTerm("");
                  getData();
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 border border-red-200 rounded-xl transition-all"
              >
                <RefreshCcw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95">
                <UserPlus size={18} />
                Tambah User
              </button>
            </div>
          </div>

          {/* Tabel */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={filteredData}
                columns={columns}
                loading={loading}
                pageSize={10}
                rowHeight={65}
                disableSelectionOnClick
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f8fafc",
                    color: "#64748b",
                    fontSize: "0.75rem",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #f1f5f9",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Layout>

      <ModalUpdatedUsers
        idModal="updatedUsers"
        selectedData={currentData}
        onUpdateSuccess={getData}
      />

      <ModalResetPassword
        idModal="resetPassword"
        selectedData={currentData}
        userLoginRole={role}
      />
    </>
  );
};

export default DaftarUsers;
