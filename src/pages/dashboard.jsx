import { useState, useEffect, useMemo } from "react";
import Layout from "../components/moleculs/layout";
import axios from "axios";
import {
  Users,
  FileCheck,
  FileClock,
  FileX,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { formatRupiah } from "../utils/Utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

function Dashboard() {
  const [dataRaw, setDataRaw] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    selesai: 0,
    pending: 0,
    tolak: 0,
  });
  const [totalNominal, setTotalNominal] = useState(0);
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/dataDashboard");
      const data = response.data.data;
      const nominal = response.data.totalDana;

      setDataRaw(data); // Simpan data mentah untuk diolah grafik
      setTotalNominal(nominal);

      setStats({
        total: data.length,
        selesai: data.filter((i) => i.status?.toLowerCase() === "selesai")
          .length,
        pending: data.filter(
          (i) => i.status?.toLowerCase() === "ditangguhkan" || !i.status
        ).length,
        tolak: data.filter((i) => i.status?.toLowerCase() === "tolak").length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  // Mengolah data mentah menjadi format grafik (Pengajuan per Bulan)
  const chartData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    // Inisialisasi data 0 untuk setiap bulan
    const monthlyCount = months.map((month) => ({ name: month, total: 0 }));

    dataRaw.forEach((item) => {
      const monthIndex = dayjs(item.tanggal).month(); // Ambil index bulan (0-11)
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyCount[monthIndex].total += 1;
      }
    });

    return monthlyCount;
  }, [dataRaw]);

  const cards = [
    {
      title: "Total Pengajuan",
      value: stats.total,
      icon: <Users size={24} />,
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      desc: "Semua data masuk",
    },
    {
      title: "Pencairan Selesai",
      value: stats.selesai,
      icon: <FileCheck size={24} />,
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      desc: "Berhasil diverifikasi",
    },
    {
      title: "Menunggu / Pending",
      value: stats.pending,
      icon: <FileClock size={24} />,
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      desc: "Butuh tindak lanjut",
    },
    {
      title: "Pengajuan Ditolak",
      value: stats.tolak,
      icon: <FileX size={24} />,
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
      desc: "Tidak memenuhi syarat",
    },
  ];

  return (
    <Layout>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm">
            Update statistik bantuan per {dayjs().format("DD MMMM YYYY")}
          </p>
        </div>

        {/* Total Dana Card */}
        <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="z-10">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Saldo Kas Bantuan
            </p>
            <h2 className="text-4xl font-black text-slate-800">
              {formatRupiah(totalNominal)}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-emerald-600 font-bold text-xs bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
              <TrendingUp size={14} /> <span>Dana tersedia saat ini</span>
            </div>
          </div>
          <div className="z-10 p-4 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200 text-white">
            <Wallet size={35} />
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-[0.03] text-slate-900 rotate-12">
            <Activity size={220} />
          </div>
        </div>

        {/* Statistik Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm group"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-2xl ${card.lightColor} ${card.textColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  {card.icon}
                </div>
                <ArrowUpRight size={18} className="text-slate-200" />
              </div>
              <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
                {card.title}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800">
                  {card.value}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Record
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grafik Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-800">Tren Pengajuan</h3>
                <p className="text-xs text-slate-400">
                  Jumlah pengajuan per bulan
                </p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                <TrendingUp size={18} />
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 600, fill: "#94a3b8" }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                    cursor={{ stroke: "#2563eb", strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Info Side Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" /> Log Aktivitas
            </h3>
            <div className="space-y-4">
              {dataRaw.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent"
                >
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs uppercase">
                    {item.nama?.substring(0, 2)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-700 truncate">
                      {item.nama}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-none">
                      Mengajukan {item.jenis_bantuan} •{" "}
                      {dayjs(item.tanggal).format("DD MMM")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
