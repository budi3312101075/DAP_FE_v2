import React, { useEffect, useState } from "react";
import Layout from "../../components/moleculs/layout";
import axios from "axios";
import { formatRupiah } from "../../utils/Utils";
import { MdDeleteForever, MdVisibility } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import { ModalUpdatePengajuan } from "../../components/atoms/modal";

const Status = () => {
  const [data, setData] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(`/pengajuan`);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowImage = (url) => {
    setSelectedImg(url);
    document.getElementById("modal_view_image").showModal();
  };

  const columns = [
    {
      field: "No",
      headerName: "No",
      headerAlign: "center",
      align: "center",
      width: 70,
      renderCell: (params) => {
        const index = data.findIndex((row) => row.id === params.row.id);
        return <span>{index + 1}</span>;
      },
    },
    {
      field: "jenis_bantuan",
      headerName: "Jenis Bantuan",
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "nominal",
      headerName: "Nominal",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span className="font-medium text-blue-600">
          {formatRupiah(params.row.nominal)}
        </span>
      ),
    },
    {
      field: "deskripsi",
      headerName: "Deskripsi",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "bukti",
      headerName: "Bukti Pengajuan",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <button
          onClick={() =>
            handleShowImage(
              `${import.meta.env.VITE_IP_URL}/${params.row.bukti}`
            )
          }
          className="flex items-center mt-2 gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold mx-auto"
        >
          <MdVisibility size={16} /> Lihat Gambar
        </button>
      ),
    },
    {
      field: "bukti_transfer",
      headerName: "Bukti Transfer",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <button
          onClick={() =>
            handleShowImage(
              `${import.meta.env.VITE_IP_URL}/${params.row.bukti_transfer}`
            )
          }
          className="flex items-center mt-2 gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold mx-auto"
        >
          <MdVisibility size={16} /> Lihat Gambar
        </button>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const status = params.row.status?.toLowerCase();
        let color = "bg-slate-100 text-slate-600";
        if (status === "selesai")
          color = "bg-emerald-100 text-emerald-700 font-bold";
        if (status === "tolak") color = "bg-red-100 text-red-700 font-bold";
        if (status === "ditangguhkan")
          color = "bg-amber-100 text-amber-700 font-bold";

        return (
          <div
            className={`px-3 py-1 mt-3 rounded-full text-xs capitalize ${color}`}
          >
            {status || "Pending"}
          </div>
        );
      },
    },
    {
      field: "deskripsi_status",
      headerName: "Deskripsi Status",
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "tanggal",
      headerName: "Tanggal",
      flex: 0.1,
      minWidth: 120,
      align: "left",
      headerAlign: "center",
      renderCell: (params) => dayjs(params.row.tanggal).format("YYYY-MM-DD"),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="flex mt-[6px] justify-center gap-4">
          <button
            type="button"
            className={`flex items-center justify-center rounded-full bg-yellow-100 hover:bg-yellow-200 p-2 transition ${
              params.row.status === "ditangguhkan" ? "" : "hidden"
            }`}
            title="Update"
            onClick={() => {
              document.getElementById("updatedPengajuan").showModal();
              setCurrentData(params.row);
            }}
          >
            <GrUpdate size={18} className="text-yellow-700" />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Layout className="pb-10 h-screen overflow-hidden bg-slate-50">
        <h1 className="text-2xl font-semibold tracking-wide mb-8">
          Status Pengajuan
        </h1>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="h-[calc(100vh-200px)]">
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={25}
              rowsPerPageOptions={[25, 50, 100]}
              disableSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                  color: "#475569",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  fontWeight: 700,
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #f1f5f9",
                  fontSize: "0.875rem",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f0f9ff",
                },
              }}
            />
          </div>
        </div>

        {/* MODAL UNTUK PREVIEW GAMBAR */}
        <dialog id="modal_view_image" className="modal backdrop-blur-md">
          <div className="modal-box p-0 max-w-4xl bg-transparent shadow-none overflow-visible">
            <div className="relative flex flex-col items-center">
              <form method="dialog" className="absolute -top-12 right-0">
                <button className="btn btn-circle btn-sm bg-white border-none shadow-lg hover:bg-red-500 hover:text-white">
                  <FaTimes size={16} />
                </button>
              </form>

              <div className="bg-white p-3 rounded-2xl shadow-2xl">
                <img
                  src={selectedImg}
                  alt="Bukti Transfer"
                  className="max-h-[75vh] w-auto rounded-xl object-contain shadow-inner"
                />
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </Layout>
      <ModalUpdatePengajuan
        idModal="updatedPengajuan"
        selectedData={currentData}
        onUpdateSuccess={getData}
      />
    </>
  );
};

export default Status;
