import React, { useEffect, useState } from "react";
import Layout from "../../components/moleculs/layout";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { detailUser, formatRupiah } from "../../utils/Utils";
import { Calendar, Wallet, Filter, RefreshCcw, Plus } from "lucide-react";
import {
  ModalAddKeuangan,
  ModalUpdateKeuangan,
} from "../../components/atoms/modal";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

dayjs.extend(isBetween);

const Laporan = () => {
  const users = detailUser();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalDana, setTotalDana] = useState(0);
  const [currentData, setCurrentData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(`/keuangan`);
      const keuangan = response.data.data.keuangan;
      setData(keuangan);
      setFilteredData(keuangan);
      setTotalDana(response.data.data.totalDana);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Hapus Keuangan?",
        text: "Apakah Anda yakin ingin menghapus keuangan ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "rounded-lg px-4 py-2",
          cancelButton: "rounded-lg px-4 py-2",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`/keuangan/${id}`);
          toast.success(response.data.msg || "Data berhasil dihapus! ✨");
          getData();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      const itemDate = dayjs(item.tanggal);
      return itemDate.isBetween(startDate, endDate, "day", "[]");
    });
    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Jalankan filter otomatis saat tanggal berubah
  useEffect(() => {
    handleFilter();
  }, [startDate, endDate]);

  const columns = [
    {
      field: "No",
      headerName: "No",
      headerAlign: "center",
      align: "center",
      width: 70,
      renderCell: (params) => {
        const index = filteredData.findIndex((row) => row.id === params.row.id);
        return <span>{index + 1}</span>;
      },
    },
    {
      field: "tanggal",
      headerName: "Tanggal",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-400" />
          {dayjs(params.row.tanggal).format("DD MMM YYYY")}
        </div>
      ),
    },
    {
      field: "nominal",
      headerName: "Nominal",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span className="font-bold text-blue-600">
          {formatRupiah(params.row.nominal)}
        </span>
      ),
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const status = params.row.status?.toLowerCase();
        let colorClasses = "bg-blue-50 text-blue-600 border-blue-100";
        if (status === "pengeluaran") {
          colorClasses = "bg-red-50 text-red-500 border-red-100";
        } else if (status === "pemasukan") {
          colorClasses = "bg-emerald-50 text-emerald-600 border-emerald-100";
        }

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${colorClasses}`}
          >
            {params.row.status}
          </span>
        );
      },
    },
    ...(users.role !== "Karyawan"
      ? [
          {
            field: "action",
            headerName: "Aksi",
            width: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
              <div className="flex gap-2 mt-2">
                <button
                  className={`p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-all border border-amber-100 ${
                    params.row.status === "pengeluaran" ? "hidden" : ""
                  }`}
                  title="updated"
                  onClick={() => {
                    document.getElementById("updateKeuangan").showModal();
                    setCurrentData(params.row);
                  }}
                >
                  <GrUpdate size={14} />
                </button>
                <button
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all border border-red-100"
                  title="Hapus"
                  onClick={() => handleDelete(params.row.id)}
                >
                  <MdDelete size={18} />
                </button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <Layout className="pb-10 min-h-screen bg-slate-50/50">
        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Laporan Keuangan
              </h1>
              <p className="text-slate-500 text-sm">
                Pantau arus kas dan saldo dana bantuan Anda.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center gap-4 min-w-[280px]">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <Wallet size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Total Dana Tersisa
                </p>
                <h2 className="text-xl font-bold text-slate-800">
                  {formatRupiah(totalDana)}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider ml-1">
                  Dari Tanggal
                </label>
                <input
                  type="date"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-600"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider ml-1">
                  Sampai Tanggal
                </label>
                <input
                  type="date"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-600"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <button
                onClick={resetFilter}
                className="mt-5 flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-xl transition-all active:scale-95"
              >
                <RefreshCcw size={16} />
                <span>Reset</span>
              </button>
            </div>

            <button
              className={`flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 ${
                users.role === "Karyawan" ? "hidden" : ""
              }`}
              onClick={() => {
                document.getElementById("addKeuangan").showModal();
              }}
            >
              <Plus size={18} />
              Add Data
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-[600px] w-full">
              <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[25, 50, 100]}
                disableSelectionOnClick
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f8fafc",
                    color: "#64748b",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #f1f5f9",
                    color: "#334155",
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
      <ModalAddKeuangan idModal="addKeuangan" onUpdateSuccess={getData} />
      <ModalUpdateKeuangan
        idModal="updateKeuangan"
        selectedData={currentData}
        onUpdateSuccess={getData}
      />
    </>
  );
};

export default Laporan;
