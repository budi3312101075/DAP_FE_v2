import React from "react";
import Layout from "../../components/moleculs/layout";
import { Plus, FileText } from "lucide-react";
import { ModalAddPengajuan } from "../../components/atoms/modal";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { DataTablePengajuan } from "../../components/moleculs/table";
import { formatRupiah } from "../../utils/Utils";

const Pengajuan = () => {
  const [dataProses, setDataProses] = useState();
  const [dataSelesai, setDataSelesai] = useState();
  const [dataAll, setDataAll] = useState();
  const [plafonPengajuan, setPlafonPengajuan] = useState([]);

  const getData = async () => {
    try {
      const data = await axios.get(`/plafonPengajuan`);
      setDataProses(data.data.data.dataProses.total);
      setDataSelesai(data.data.data.dataSelesai.total);
      setDataAll(data.data.data.dataAll.total);
      setPlafonPengajuan(data.data.data.plafonPengajuan);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "no",
      headerName: "No",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "name",
      headerName: "Jenis Bantuan",
      flex: 0.1,
      minWidth: 200,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "nominal",
      headerName: "Nominal Limit",
      flex: 0.1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatRupiah(params.value),
    },
    {
      field: "total",
      headerName: "Total Pengajuan",
      flex: 0.1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatRupiah(params.value),
    },
    {
      field: "sisa",
      headerName: "Sisa Pengajuan",
      flex: 0.1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatRupiah(params.value),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Pengajuan Layanan
              </h1>
              <p className="text-slate-500 mt-1">
                Kelola dan pantau semua pengajuan aktif Anda di sini.
              </p>
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-[#68ACC9] hover:bg-cyan-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm"
              onClick={() => {
                document.getElementById("modalAddPengajuan").showModal();
              }}
            >
              <Plus size={18} />
              Buat Pengajuan Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                label: "Total Pengajuan",
                value: dataAll,
                color: "bg-blue-50 text-blue-700",
              },
              {
                label: "Sedang Diproses",
                value: dataProses,
                color: "bg-amber-50 text-amber-700",
              },
              {
                label: "Selesai",
                value: dataSelesai,
                color: "bg-emerald-50 text-emerald-700",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm"
              >
                <p className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold mt-1`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#68ACC9] rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                  <FileText className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                    Plafon Pengajuan
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Daftar plafon pengajuan Anda
                  </p>
                </div>
              </div>
            </div>

            <div className="p-0 overflow-x-auto">
              <DataTablePengajuan rows={plafonPengajuan} columns={columns} />
            </div>
          </div>
        </div>
      </Layout>
      <ModalAddPengajuan idModal={"modalAddPengajuan"} onAddSuccess={getData} />
    </>
  );
};

export default Pengajuan;
