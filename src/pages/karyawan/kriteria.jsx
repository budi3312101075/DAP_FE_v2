import React, { useEffect, useState } from "react";
import Layout from "../../components/moleculs/layout";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import {
  detailUser,
  formatBatasWaktu,
  formatRupiah,
  formatSpecial,
} from "../../utils/Utils";
import { DataTable } from "../../components/moleculs/table";
import { Plus } from "lucide-react";
import {
  ModalAddKriteria,
  ModalUpdatedKriteria,
} from "../../components/atoms/modal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

const Kriteria = () => {
  const users = detailUser();
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});

  const getData = async () => {
    try {
      const data = await axios.get(`/kriteria`);
      setData(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Data",
        text: "Apakah Anda yakin ingin menghapus data ini?",
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
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`/kriteria/${id}`);
        toast.success(response.data.msg || "Data berhasil dihapus! ✨");
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      field: "No",
      headerName: "No",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const index = data.findIndex((row) => row.id === params.row.id);
        return <span>{index + 1}</span>;
      },
    },
    {
      field: "jenisBantuan",
      headerName: "Jenis Bantuan",
      flex: 0.1,
      minWidth: 200,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "nominal",
      headerName: "Nominal",
      flex: 0.1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatRupiah(params.value),
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      flex: 0.3,
      minWidth: 50,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "dokumen",
      headerName: "Dokumen",
      flex: 0.3,
      minWidth: 50,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "batasWaktu",
      headerName: "Batas Waktu",
      flex: 0.1,
      minWidth: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatBatasWaktu(params.value),
    },
    {
      field: "isSpecial",
      headerName: "Special",
      flex: 0.1,
      minWidth: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatSpecial(params.value),
    },
    ...(users.role === "SuperAdmin" || users.role === "Admin"
      ? [
          {
            field: "action",
            headerName: "Action",
            flex: 0.2,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
              <div className="flex mt-[6px] justify-center gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full bg-yellow-100 hover:bg-yellow-200 p-2 transition"
                  title="Update"
                  onClick={() => {
                    document.getElementById("updatedDrawing").showModal();
                    setCurrentData(params.row);
                  }}
                >
                  <GrUpdate size={18} className="text-yellow-700" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(params.row.id)}
                  className="flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 p-2 transition"
                  title="Delete"
                >
                  <MdDeleteForever size={22} className="text-red-600" />
                </button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <Layout className="pb-10 max-h-screen ">
        <h1
          className={`text-2xl font-semibold tracking-wide  ${
            users.role === "Karyawan" ? "mb-10" : "mb-3"
          }`}
        >
          Kriteria Dana Bantuan
        </h1>

        <div
          className={`flex justify-end mb-4 ${
            users.role === "Karyawan" && "hidden"
          }`}
        >
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-[#68ACC9] hover:bg-cyan-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm"
            onClick={() => document.getElementById("addDrawing").showModal()}
          >
            <Plus size={18} />
            Tambah Kriteria
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-[calc(100vh-200px)]">
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={25}
              rowsPerPageOptions={[25, 50, 100]}
              density="comfortable"
              disableSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-cell": { borderBottom: "1px solid #f3f4f6" },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f9fafb",
                  borderBottom: "2px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                },
                "& .MuiDataGrid-row:hover": { backgroundColor: "#f0f9ff" },
                "& .MuiDataGrid-cell:focus": { outline: "none" },
                "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
              }}
            />
          </div>
        </div>
      </Layout>

      <ModalAddKriteria idModal={"addDrawing"} onAddSuccess={getData} />
      <ModalUpdatedKriteria
        idModal="updatedDrawing"
        selectedData={currentData}
        onUpdateSuccess={getData}
      />
    </>
  );
};

export default Kriteria;
