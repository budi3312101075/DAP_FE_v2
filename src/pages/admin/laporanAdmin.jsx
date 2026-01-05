import React, { useEffect, useState } from "react";
import Layout from "../../components/moleculs/layout";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Calendar,
  RefreshCcw,
  Search,
  Phone,
  Info,
  FileText,
} from "lucide-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { formatRupiah } from "../../utils/Utils";
import { MdVisibility } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

dayjs.extend(isBetween);

const LaporanAdmin = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  // State Filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/laporan");
      if (response.data.success) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data laporan:", err);
    } finally {
      setLoading(false);
    }
  };

  const exportDataExcel = async () => {
    try {
      const response = await axios.get(
        `/exportLaporanExcel/?search=${searchTerm}&startDate=${startDate}&endDate=${endDate}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Laporan_Dana_Amal_Polibatam.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Gagal mengekspor data laporan:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let result = data;

    if (startDate && endDate) {
      result = result.filter((item) =>
        dayjs(item.tanggal).isBetween(startDate, endDate, "day", "[]")
      );
    }

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.jenis_bantuan?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(result);
  }, [startDate, endDate, searchTerm, data]);

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
  };

  const handleShowImage = (url) => {
    setSelectedImg(url);
    document.getElementById("modal_view_images_laporan").showModal();
  };

  const columns = [
    {
      field: "No",
      headerName: "No",
      headerAlign: "center",
      align: "center",
      width: 70,
      renderCell: (params) => {
        const index = filteredData.findIndex((row) => row.id === params.row.id);
        return <span className="font-medium text-slate-500">{index + 1}</span>;
      },
    },
    {
      field: "nama",
      headerName: "Nama Penerima",
      flex: 1,
      minWidth: 180,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <span className="font-semibold text-slate-700">{params.value}</span>
      ),
    },
    {
      field: "no_telepon",
      headerName: "Telepon",
      flex: 0.8,
      minWidth: 100,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div className="flex items-center gap-2 text-slate-600">
          <Phone size={12} className="text-slate-400" />
          {params.value}
        </div>
      ),
    },
    {
      field: "tanggal",
      headerName: "Tanggal",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-blue-500" />
          {dayjs(params.row.tanggal).format("DD MMM YYYY")}
        </div>
      ),
    },
    {
      field: "jenis_bantuan",
      headerName: "Jenis Bantuan",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase">
          {params.value}
        </span>
      ),
    },
    {
      field: "deskripsi",
      headerName: "Deskripsi",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "nominal",
      headerName: "Nominal",
      flex: 1,
      minWidth: 150,
      align: "right",
      headerAlign: "center",
      renderCell: (params) => (
        <span className="font-bold text-blue-600">
          {formatRupiah(params.row.nominal)}
        </span>
      ),
    },
    {
      field: "bukti",
      headerName: "File Bukti",
      width: 280,
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex flex-row gap-2 items-center h-full mx-auto justify-center">
          <button
            onClick={() =>
              handleShowImage(
                `${import.meta.env.VITE_IP_URL}/${params.row.bukti}`
              )
            }
            className="flex items-center gap-1 px-2 py-2 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase shrink-0"
          >
            <MdVisibility size={14} /> Pengajuan
          </button>
          <button
            onClick={() =>
              handleShowImage(
                `${import.meta.env.VITE_IP_URL}/${params.row.bukti_transfer}`
              )
            }
            className="flex items-center gap-1 px-2 py-2 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold uppercase shrink-0 border border-indigo-100"
          >
            <MdVisibility size={14} /> Transfer
          </button>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-center h-full w-full">
          <span className="px-4 py-1.5 text-[10px] font-extrabold tracking-widest border bg-emerald-50 text-emerald-700 border-emerald-100 uppercase">
            {params.value}
          </span>
        </div>
      ),
    },
  ];

  return (
    <Layout className="pb-10 min-h-screen bg-slate-50/50">
      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Header & Filter Row */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Laporan Selesai
              </h1>
              <p className="text-slate-500 text-sm">
                Arsip data pengajuan yang telah berhasil dicairkan.
              </p>
            </div>
          </div>

          {/* Filter Card - Sama persis style-nya */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Cari Nama / Bantuan
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-2.5 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Ketik kata kunci..."
                  className="pl-10 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Dari Tanggal
              </label>
              <input
                type="date"
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Sampai Tanggal
              </label>
              <input
                type="date"
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-4">
              <button
                onClick={resetFilter}
                className="flex items-center text-xs justify-center gap-2 w-full px-1 py-2.5 font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all border border-rose-100"
              >
                <RefreshCcw size={16} /> Reset Filter
              </button>
              <button
                onClick={exportDataExcel}
                className="flex items-center justify-center gap-2 w-full px-1 py-2.5 text-xs font-bold text-green-600 bg-green-50 hover:bg-green-100 rounded-xl transition-all border border-green-100"
              >
                <RefreshCcw size={16} /> Export Excel
              </button>
            </div>
          </div>
        </div>

        {/* Table container - Sama persis style-nya */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-[650px] w-full">
            <DataGrid
              rows={filteredData}
              columns={columns}
              loading={loading}
              pageSize={25}
              disableSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8fafc",
                  color: "#475569",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  borderBottom: "2px solid #f1f5f9",
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

      {/* Modal Gambar - Style Backdrop Blur */}
      <dialog id="modal_view_images_laporan" className="modal backdrop-blur-md">
        <div className="modal-box p-0 max-w-4xl bg-transparent shadow-none">
          <div className="relative flex flex-col items-center">
            <form method="dialog" className="absolute -top-12 right-0">
              <button className="btn btn-circle btn-sm bg-white border-none shadow-lg hover:bg-red-500 hover:text-white transition-all">
                <FaTimes size={16} />
              </button>
            </form>
            <div className="bg-white p-2 rounded-2xl shadow-2xl">
              <img
                src={selectedImg}
                alt="Bukti Transfer"
                className="max-h-[80vh] w-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Layout>
  );
};

export default LaporanAdmin;
