import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaTimes,
  FaSave,
  FaBan,
  FaInfoCircle,
  FaEdit,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaFileAlt,
  FaWallet,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Ban,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Mail,
  Phone,
  Plus,
  Save,
  Shield,
  ShieldCheck,
  User,
  Wallet,
  X,
} from "lucide-react";

export const ModalAddKriteria = ({ idModal, onAddSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      is_special: 0,
    },
  });

  const onSubmit = async (data) => {
    closeModal();
    const result = await Swal.fire({
      title: "Konfirmasi Data",
      text: "Apakah Anda yakin ingin menambahkan kriteria bantuan ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Simpan!",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton: "rounded-lg px-4 py-2",
        cancelButton: "rounded-lg px-4 py-2",
      },
    });

    if (result.isConfirmed) {
      try {
        const payload = {
          ...data,
          nominal: parseInt(data.nominal),
          is_special: data.is_special ? 1 : 0,
        };

        const response = await axios.post(`/kriteria`, payload);

        toast.success(response.data.msg || "Kriteria berhasil ditambahkan! 🎉");

        if (onAddSuccess) onAddSuccess();
        reset();
        document.getElementById(idModal).close();
      } catch (error) {
        console.error("Error Add Kriteria:", error);
        toast.error(
          error.response?.data?.message || "Gagal menambahkan kriteria."
        );
      }
    }
  };

  const closeModal = () => {
    reset();
    document.getElementById(idModal).close();
  };

  return (
    <dialog
      id={idModal}
      className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
    >
      <div className="modal-box bg-white p-0 rounded-2xl shadow-2xl max-w-2xl border border-slate-100">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-xl text-slate-800">
              Tambah Kriteria
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Lengkapi informasi bantuan di bawah ini
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Jenis Bantuan */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Jenis Bantuan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("jenis_bantuan", {
                  required: "Jenis bantuan wajib diisi",
                })}
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.jenis_bantuan
                    ? "border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:ring-blue-100"
                } focus:outline-none focus:ring-4 focus:border-blue-500 transition-all bg-slate-50/30`}
                placeholder="Contoh: Bantuan Menikah"
              />
              {errors.jenis_bantuan && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <FaInfoCircle size={10} /> {errors.jenis_bantuan.message}
                </p>
              )}
            </div>

            {/* Nominal */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Nominal (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("nominal", { required: "Nominal wajib diisi" })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/30"
                placeholder="0"
              />
            </div>

            {/* Batas Waktu */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Batas Waktu <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("batas_waktu", {
                  required: "Batas waktu wajib diisi",
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/30 text-slate-600"
              />
            </div>

            {/* Dokumen */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Persyaratan Dokumen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("dokumen", { required: "Dokumen wajib diisi" })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/30"
                placeholder="e.g. KTP, KK, SKTM"
              />
            </div>

            {/* Keterangan */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Keterangan
              </label>
              <textarea
                {...register("keterangan")}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/30 resize-none"
                placeholder="Tambahkan catatan jika perlu..."
              ></textarea>
            </div>

            {/* Is Special - Modern Switch Style */}
            <div className="md:col-span-2 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-700">
                  Kriteria Spesial
                </h4>
                <p className="text-xs text-slate-500">
                  Aktifkan jika Bantuan dapat diklaim beberapa kali hingga saldo
                  habis.
                </p>
              </div>
              <input
                type="checkbox"
                {...register("is_special")}
                className="toggle toggle-primary toggle-md"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-3 mt-10">
            <button
              type="button"
              onClick={closeModal}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaBan /> Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <FaSave /> Simpan Data
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop Click */}
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};

export const ModalUpdatedKriteria = ({
  idModal,
  selectedData,
  onUpdateSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (selectedData) {
      setValue("jenis_bantuan", selectedData.jenisBantuan);
      setValue("nominal", selectedData.nominal);
      setValue("batas_waktu", selectedData.batasWaktu);
      setValue("keterangan", selectedData.keterangan);
      setValue("dokumen", selectedData.dokumen);

      if (selectedData.batas_waktu) {
        const date = new Date(selectedData.batas_waktu)
          .toISOString()
          .split("T")[0];
        setValue("batas_waktu", date);
      }
    }
  }, [selectedData, setValue]);

  const onSubmit = async (data) => {
    closeModal();
    const confirm = await Swal.fire({
      title: "Perbarui Data?",
      text: "Pastikan data kriteria sudah benar sebelum disimpan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Perbarui",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        const payload = {
          ...data,
          nominal: parseInt(data.nominal),
        };

        const response = await axios.patch(
          `/kriteria/${selectedData.id}`,
          payload
        );

        toast.success(response.data.msg || "Data berhasil diperbarui! ✨");

        if (onUpdateSuccess) onUpdateSuccess();
        closeModal();
      } catch (error) {
        console.error("Update Error:", error);
        toast.error(error.response?.data?.msg || "Gagal memperbarui data.");
      }
    }
  };

  const closeModal = () => {
    document.getElementById(idModal).close();
  };

  return (
    <dialog
      id={idModal}
      className="modal modal-bottom sm:modal-middle backdrop-blur-md"
    >
      <div className="modal-box bg-white p-0 rounded-2xl shadow-2xl max-w-2xl border border-slate-100">
        {/* Header - Indigo Accent for Edit Mode */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-indigo-50/30">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <FaEdit size={16} />
              </div>
              <h3 className="font-bold text-xl text-slate-800">
                Updated Kriteria
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-400 transition-all"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Jenis Bantuan */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Jenis Bantuan
              </label>
              <input
                type="text"
                {...register("jenis_bantuan", {
                  required: "Field ini wajib diisi",
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/50"
              />
              {errors.jenis_bantuan && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <FaInfoCircle size={10} /> {errors.jenis_bantuan.message}
                </p>
              )}
            </div>

            {/* Nominal */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Nominal (Rp)
              </label>
              <input
                type="number"
                {...register("nominal", { required: "Nominal wajib diisi" })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/50"
              />
            </div>

            {/* Batas Waktu */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Batas Waktu
              </label>
              <input
                type="number"
                {...register("batas_waktu", {
                  required: "Batas waktu wajib diisi",
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/50"
              />
            </div>

            {/* Dokumen */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Dokumen Persyaratan
              </label>
              <input
                type="text"
                {...register("dokumen", { required: "Dokumen wajib diisi" })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/50"
              />
            </div>

            {/* Keterangan */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Keterangan
              </label>
              <textarea
                {...register("keterangan")}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/50 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-3 mt-10">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaBan /> Batalkan
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <FaSave /> Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};

export const ModalAddPengajuan = ({ idModal, onAddSuccess }) => {
  const [kriteria, setKriteria] = useState([]);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const fileWatch = watch("bukti");

  useEffect(() => {
    const fetchKriteria = async () => {
      try {
        const res = await axios.get("/kriteria");
        setKriteria(res.data.data || res.data);
      } catch (err) {
        console.error("Gagal mengambil kriteria");
      }
    };
    fetchKriteria();
  }, []);

  useEffect(() => {
    if (fileWatch && fileWatch.length > 0) {
      const file = fileWatch[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [fileWatch]);

  const closeModal = () => {
    reset();
    setPreview(null);
    document.getElementById(idModal)?.close();
  };

  const onSubmit = async (data) => {
    document.getElementById(idModal)?.close();

    const confirm = await Swal.fire({
      title: "Kirim Pengajuan?",
      text: "Pastikan semua data dan bukti sudah benar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Ya, Kirim Sekarang",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      const formData = new FormData();
      formData.append("tanggal", data.tanggal);
      formData.append("deskripsi", data.deskripsi);
      formData.append("nominal", data.nominal);
      formData.append("id_kriteria", data.id_kriteria);
      formData.append("bukti", data.bukti[0]);

      const response = await axios.post("/pengajuan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.msg || "Pengajuan berhasil dikirim");
      onAddSuccess();
      closeModal();
    } catch (error) {
      closeModal();
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan server";
      toast.error(errorMsg);
      Swal.fire("Gagal", errorMsg, "error");
    }
  };

  return (
    <dialog
      id={idModal}
      className="modal modal-bottom sm:modal-middle backdrop-blur-md"
    >
      <div className="modal-box bg-white p-0 rounded-2xl shadow-2xl max-w-3xl border border-slate-100">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/30">
          <div>
            <h3 className="font-bold text-xl text-slate-800">
              Form Pengajuan Baru
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Silahkan isi detail permohonan bantuan Anda
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-white text-slate-400"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="px-8 py-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Kriteria */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Pilih Kriteria <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("id_kriteria", {
                    required: "Kriteria wajib dipilih",
                  })}
                  className="select select-bordered w-full bg-slate-50 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">-- Pilih Jenis Bantuan --</option>
                  {kriteria.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.jenisBantuan}
                    </option>
                  ))}
                </select>
                {errors.id_kriteria && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.id_kriteria.message}
                  </p>
                )}
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("tanggal", {
                    required: "Tanggal wajib diisi",
                  })}
                  className="input input-bordered w-full bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              {/* Nominal */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Nominal yang Diajukan <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("nominal", {
                    required: "Nominal wajib diisi",
                    valueAsNumber: true,
                  })}
                  className="input input-bordered w-full bg-slate-50 border-slate-200 rounded-xl"
                  placeholder="Rp 0"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Deskripsi / Alasan
                </label>
                <textarea
                  {...register("deskripsi", {
                    required: "Alasan wajib diisi",
                  })}
                  className="textarea textarea-bordered w-full bg-slate-50 border-slate-200 rounded-xl resize-none"
                  rows="3"
                  placeholder="Jelaskan secara singkat tujuan pengajuan..."
                ></textarea>
              </div>
            </div>

            {/* ========= RIGHT ========= */}
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Upload Bukti (Max 5MB) <span className="text-red-500">*</span>
              </label>

              <div
                className={`relative flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 transition-all ${
                  preview
                    ? "border-blue-400 bg-blue-50/20"
                    : "border-slate-300 bg-slate-50 hover:border-blue-400"
                }`}
              >
                {preview ? (
                  <div className="relative w-full h-full flex flex-col items-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-48 rounded-lg shadow-md mb-2 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setValue("bukti", null);
                      }}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Ganti Foto
                    </button>
                  </div>
                ) : (
                  <>
                    <FaCloudUploadAlt
                      size={40}
                      className="text-slate-400 mb-2"
                    />
                    <p className="text-xs text-slate-500 text-center">
                      Klik atau seret file gambar ke sini
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      JPG, PNG, atau JPEG
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  {...register("bukti", {
                    required: "Bukti wajib diunggah",
                    validate: {
                      maxSize: (files) =>
                        files[0]?.size <= 5000000 || "Ukuran file maksimal 5MB",
                    },
                  })}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {errors.bukti && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.bukti.message}
                </p>
              )}
            </div>
          </div>

          {/* ================= Footer ================= */}
          <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaBan /> Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <FaSave /> Kirim Pengajuan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export const ModalUpdatePengajuan = ({
  idModal,
  selectedData,
  onUpdateSuccess,
}) => {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (selectedData) {
      reset({
        deskripsi: selectedData.deskripsi || "",
      });
      // Set preview lama jika ada
      if (selectedData.bukti) {
        setPreview(`${import.meta.env.VITE_IP_URL}/${selectedData.bukti}`);
      }
    }
  }, [selectedData, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("File terlalu besar! Maksimal 5MB");
        return;
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const closeModal = () => {
    document.getElementById(idModal).close();
  };

  const onSubmit = async (data) => {
    try {
      closeModal();
      const formData = new FormData();
      formData.append("deskripsi", data.deskripsi);

      if (data.bukti_file[0]) {
        formData.append("bukti", data.bukti_file[0]);
      } else {
        return toast.error("File bukti wajib diunggah ulang");
      }

      const confirm = await Swal.fire({
        title: "Update Pengajuan?",
        text: "Data akan diperbarui dan status akan direset.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Ya, Update",
      });

      if (confirm.isConfirmed) {
        const res = await axios.patch(
          `/pengajuan/${selectedData.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        toast.success(res.data.msg);
        if (onUpdateSuccess) onUpdateSuccess();
        closeModal();
      }
    } catch (error) {
      reset();
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan";
      toast.error(errorMsg);
    }
  };

  return (
    <dialog id={idModal} className="modal backdrop-blur-sm">
      <div className="modal-box max-w-lg p-0 rounded-2xl overflow-hidden bg-white">
        <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">Update Pengajuan</h3>
          <button
            onClick={() => {
              reset();
              closeModal();
            }}
            className="text-slate-400 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Input Deskripsi */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Deskripsi / Alasan Perubahan
            </label>
            <textarea
              {...register("deskripsi", { required: "Deskripsi wajib diisi" })}
              className="textarea textarea-bordered w-full bg-slate-50 focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            {errors.deskripsi && (
              <p className="text-red-500 text-xs mt-1">
                {errors.deskripsi.message}
              </p>
            )}
          </div>

          {/* Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Upload Bukti Baru (Max 5MB)
            </label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center bg-slate-50 hover:bg-slate-100 transition-all">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-40 object-contain rounded-lg mb-2"
                />
              ) : (
                <FaCloudUploadAlt size={40} className="text-slate-300" />
              )}
              <span className="text-xs text-slate-500">
                Klik untuk ganti bukti transfer
              </span>
              <input
                type="file"
                accept="image/*"
                {...register("bukti_file", {
                  required: "File bukti harus diupload",
                })}
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {errors.bukti_file && (
              <p className="text-red-500 text-xs mt-1">
                {errors.bukti_file.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                reset();
                closeModal();
              }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaBan /> Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <FaSave /> Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export const ModalKonfirmasiPengajuan = ({
  idModal,
  selectedData,
  onUpdateSuccess,
}) => {
  const [preview, setPreview] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (selectedData) {
      reset({
        status: selectedData.status || "",
        deskripsiStatus: selectedData.deskripsi_status || "",
      });
      setSelectedStatus(selectedData.status || "");
    }
  }, [selectedData, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("File terlalu besar! Maksimal 5MB");
        return;
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const closeModal = () => {
    setPreview(null);
    document.getElementById(idModal).close();
  };

  const onSubmit = async (data) => {
    try {
      document.getElementById(idModal).close();
      const formData = new FormData();
      formData.append("status", data.status);
      formData.append("deskripsiStatus", data.deskripsiStatus);

      if (data.status.toLowerCase() === "selesai") {
        if (data.bukti_transfer[0]) {
          formData.append("buktiTransfer", data.bukti_transfer[0]);
        } else {
          return toast.error(
            "Bukti transfer wajib diunggah untuk status Selesai"
          );
        }
      }

      const result = await Swal.fire({
        title: "Konfirmasi Pengajuan?",
        text: `Apakah Anda yakin ingin mengubah status menjadi ${data.status}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Ya, Konfirmasi",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const response = await axios.patch(
          `/konfirmasiPengajuan/${selectedData.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        toast.success(response.data.msg || "Status berhasil diperbarui!");
        if (onUpdateSuccess) onUpdateSuccess();
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Terjadi kesalahan server");
    }
  };

  return (
    <dialog id={idModal} className="modal backdrop-blur-sm">
      <div className="modal-box max-w-lg p-0 rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-600">
            <FaCheckCircle size={20} />
            <h3 className="font-bold text-lg text-slate-800">
              Konfirmasi Pengajuan
            </h3>
          </div>
          <button
            onClick={() => {
              reset();
              closeModal();
            }}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Pilih Status */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Pilih Status Konfirmasi
            </label>
            <select
              {...register("status", { required: "Status wajib dipilih" })}
              className="select select-bordered w-full bg-slate-50 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">-- Pilih Status --</option>
              <option value="selesai">Selesai</option>
              <option value="ditangguhkan">Ditangguhkan</option>
              <option value="tolak">Tolak</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Input Deskripsi Status */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Keterangan / Alasan
            </label>
            <textarea
              {...register("deskripsiStatus", {
                required: "Keterangan wajib diisi",
              })}
              placeholder="Berikan alasan atau pesan tambahan..."
              className="textarea textarea-bordered w-full bg-slate-50 h-24"
            />
            {errors.deskripsiStatus && (
              <p className="text-red-500 text-xs mt-1">
                {errors.deskripsiStatus.message}
              </p>
            )}
          </div>

          {/* Upload Bukti Transfer - Hanya muncul jika status 'Selesai' */}
          {selectedStatus === "selesai" && (
            <div className="animate-fade-in">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Upload Bukti Transfer (Wajib)
              </label>
              <div className="relative border-2 border-dashed border-blue-200 rounded-xl p-4 flex flex-col items-center bg-blue-50/50 hover:bg-blue-50 transition-all cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-40 object-contain rounded-lg mb-2 shadow-sm"
                  />
                ) : (
                  <FaCloudUploadAlt size={40} className="text-blue-300 mb-2" />
                )}
                <span className="text-xs font-medium text-blue-600">
                  Klik untuk upload bukti transfer
                </span>
                <input
                  type="file"
                  accept="image/*"
                  {...register("bukti_transfer")}
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 italic">
                * Format: JPG, PNG (Max 5MB)
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                reset();
                closeModal();
              }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaBan /> Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <FaSave /> Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export const ModalAddKeuangan = ({ idModal, onUpdateSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const closeModal = () => {
    reset();
    document.getElementById(idModal)?.close();
  };

  const onSubmit = async (data) => {
    document.getElementById(idModal)?.close();

    const confirm = await Swal.fire({
      title: "Simpan Pemasukan?",
      text: "Pastikan data keterangan dan nominal sudah sesuai.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    try {
      const response = await axios.post("/keuangan", {
        keterangan: data.keterangan,
        nominal: parseInt(data.nominal),
      });

      if (response.data.success) {
        toast.success(response.data.msg || "Keuangan berhasil ditambahkan");
        if (onUpdateSuccess) onUpdateSuccess();
        closeModal();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan server";
      toast.error(errorMsg);
      Swal.fire("Gagal", errorMsg, "error");
      reset();
    }
  };

  return (
    <dialog
      id={idModal}
      className="modal modal-bottom sm:modal-middle backdrop-blur-md"
    >
      <div className="modal-box bg-white p-0 rounded-2xl shadow-2xl max-w-lg border border-slate-100">
        {/* Header - Mengikuti Style Pengajuan */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/30">
          <div>
            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              Form Pemasukan Baru
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Silahkan input detail dana masuk secara manual
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-white text-slate-400 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
          <div className="space-y-4">
            {/* Input Nominal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                <FaWallet className="text-blue-500" /> Nominal (Rp){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  {...register("nominal", {
                    required: "Nominal wajib diisi",
                    min: { value: 1000, message: "Minimal Rp 1.000" },
                  })}
                  className={`input input-bordered w-full pl-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700 ${
                    errors.nominal ? "border-red-500" : ""
                  }`}
                  placeholder="0"
                />
              </div>
              {errors.nominal && (
                <p className="text-red-500 text-[10px] mt-1 font-bold">
                  {errors.nominal.message}
                </p>
              )}
            </div>

            {/* Input Keterangan */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                <FaFileAlt className="text-blue-500" /> Keterangan{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("keterangan", {
                  required: "Keterangan wajib diisi",
                  minLength: { value: 5, message: "Minimal 5 karakter" },
                })}
                className={`textarea textarea-bordered w-full bg-slate-50 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all resize-none ${
                  errors.keterangan ? "border-red-500" : ""
                }`}
                rows="3"
                placeholder="Contoh: Dana bulan desember..."
              ></textarea>
              {errors.keterangan && (
                <p className="text-red-500 text-[10px] mt-1 font-bold">
                  {errors.keterangan.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer - Mengikuti Style Pengajuan */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaBan /> Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <FaSave /> Simpan Data
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export const ModalUpdateKeuangan = ({
  idModal,
  selectedData,
  onUpdateSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (selectedData) {
      reset({
        keterangan: selectedData.keterangan,
        nominal: selectedData.nominal,
      });
    }
  }, [selectedData, reset]);

  const closeModal = () => {
    document.getElementById(idModal)?.close();
  };

  const onSubmit = async (data) => {
    document.getElementById(idModal)?.close();

    const confirm = await Swal.fire({
      title: "Update Data Keuangan?",
      text: "Pastikan data perubahan sudah benar.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Ya, Update",
      cancelButtonText: "Batal",
    });

    try {
      const response = await axios.patch(`/keuangan/${selectedData.id}`, {
        keterangan: data.keterangan,
        nominal: parseInt(data.nominal),
      });

      if (response.data.success) {
        toast.success(response.data.msg || "Data berhasil diperbarui");
        if (onUpdateSuccess) onUpdateSuccess();
        closeModal();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Terjadi kesalahan server";
      toast.error(errorMsg);
      Swal.fire("Gagal", errorMsg, "error");
      reset();
    }
  };

  return (
    <dialog
      id={idModal}
      className="modal modal-bottom sm:modal-middle backdrop-blur-md"
    >
      <div className="modal-box bg-white p-0 rounded-2xl shadow-2xl max-w-lg border border-slate-100">
        {/* Header - Konsisten dengan style Biru */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/30">
          <div>
            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              <FaEdit className="text-blue-600" size={20} /> Edit Data Keuangan
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Perbarui keterangan atau nominal catatan keuangan ini
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-white text-slate-400 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
          <div className="space-y-4">
            {/* Input Keterangan */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                <FaFileAlt className="text-blue-500" /> Keterangan{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("keterangan", {
                  required: "Keterangan wajib diisi",
                  minLength: { value: 5, message: "Minimal 5 karakter" },
                })}
                className={`textarea textarea-bordered w-full bg-slate-50 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all resize-none ${
                  errors.keterangan ? "border-red-500" : ""
                }`}
                rows="3"
                placeholder="Masukkan keterangan baru..."
              ></textarea>
              {errors.keterangan && (
                <p className="text-red-500 text-[10px] mt-1 font-bold">
                  {errors.keterangan.message}
                </p>
              )}
            </div>

            {/* Input Nominal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                <FaWallet className="text-blue-500" /> Nominal (Rp){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  {...register("nominal", {
                    required: "Nominal wajib diisi",
                    min: { value: 1000, message: "Minimal Rp 1.000" },
                  })}
                  className={`input input-bordered w-full pl-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700 ${
                    errors.nominal ? "border-red-500" : ""
                  }`}
                  placeholder="0"
                />
              </div>
              {errors.nominal && (
                <p className="text-red-500 text-[10px] mt-1 font-bold">
                  {errors.nominal.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <FaBan /> Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <FaSave /> Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export const ModalUpdatedUsers = ({
  idModal,
  selectedData,
  onUpdateSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Memasukkan data user ke dalam form saat modal dibuka/data terpilih
  useEffect(() => {
    if (selectedData) {
      setValue("nama", selectedData.nama);
      setValue("username", selectedData.username);
      setValue("email", selectedData.email);
      setValue("no_telepon", selectedData.no_telepon);
      setValue("role", selectedData.role);
    }
  }, [selectedData, setValue]);

  const closeModal = () => {
    document.getElementById(idModal).close();
  };

  const onSubmit = async (data) => {
    document.getElementById(idModal).close();
    const confirm = await Swal.fire({
      title: "Perbarui Data User?",
      text: "Pastikan informasi akun sudah benar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Update",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.patch(`/users/${selectedData.id}`, data);

        if (response.data.success) {
          toast.success(response.data.msg || "Akun berhasil diperbarui! ✨");
          if (onUpdateSuccess) onUpdateSuccess();
          closeModal();
        }
      } catch (error) {
        console.error("Update Error:", error);
        // Menangkap error 'Username sudah digunakan' dsb dari backend
        const errorMsg =
          error.response?.data?.failed ||
          error.response?.data?.message ||
          "Gagal memperbarui user.";
        toast.error(errorMsg);
      }
    }
  };

  return (
    <dialog
      id={idModal}
      className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
    >
      <div className="modal-box bg-white p-0 rounded-2xl shadow-2xl max-w-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-800">Edit Akun</h3>
              <p className="text-xs text-slate-500">
                ID User: #{selectedData?.id}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-400 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
          <div className="space-y-5">
            {/* Nama Lengkap */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                <User size={14} className="text-slate-400" /> Nama Lengkap
              </label>
              <input
                type="text"
                {...register("nama", { required: "Nama wajib diisi" })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/50"
                placeholder="Masukkan nama lengkap"
              />
              {errors.nama && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <Info size={12} /> {errors.nama.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                  <span className="text-slate-400">@</span> Username
                </label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username wajib diisi",
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>

              {/* Role */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                  <Shield size={14} className="text-slate-400" /> Role Akses
                </label>
                <select
                  {...register("role", { required: "Pilih role" })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/50"
                >
                  <option value="Karyawan">Karyawan</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                  <option value="Manajemen">Manajemen</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                <Mail size={14} className="text-slate-400" /> Alamat Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Format email salah",
                  },
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/50"
              />
            </div>

            {/* No Telepon */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
                <Phone size={14} className="text-slate-400" /> Nomor Telepon
              </label>
              <input
                type="text"
                {...register("no_telepon")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-3 mt-10">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <Ban size={16} /> Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <Save size={16} /> Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};

export const ModalResetPassword = ({
  idModal,
  selectedData,
  userLoginRole,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPwd, setShowPwd] = React.useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Tentukan apakah user adalah admin/superadmin
  const isAdmin =
    userLoginRole?.toLowerCase() === "admin" ||
    userLoginRole?.toLowerCase() === "superadmin";

  const closeModal = () => {
    reset();
    const modal = document.getElementById(idModal);
    if (modal) modal.close();
  };

  const onSubmit = async (data) => {
    const confirm = await Swal.fire({
      title: "Ganti Password?",
      text: "User akan menggunakan password baru ini untuk login berikutnya.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Ganti",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.patch(
          `/resetPassword/${selectedData.id}`,
          data
        );

        if (response.data.success) {
          toast.success("Password berhasil diperbarui! 🔑");
          closeModal();
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.failed || "Gagal reset password.";
        toast.error(errorMsg);
      }
    }
  };

  return (
    <dialog
      id={idModal}
      className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
    >
      <div className="modal-box bg-white p-0 rounded-2xl shadow-2xl max-w-md border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-amber-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-md">
              <KeyRound size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-800">
                Reset Password
              </h3>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                User: {selectedData?.username}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-white text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-4">
          {/* PASSWORD LAMA: Di-hide jika isAdmin === true */}
          {!isAdmin && (
            <div className="flex flex-col gap-1.5 animate-in fade-in duration-300">
              <label className="text-xs font-bold text-slate-700 ml-1">
                Password Lama
              </label>
              <div className="relative">
                <input
                  type={showPwd.old ? "text" : "password"}
                  {...register("currentPassword", {
                    required: !isAdmin ? "Password lama wajib diisi" : false,
                  })}
                  placeholder="Masukkan password saat ini"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition-all bg-slate-50/50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd({ ...showPwd, old: !showPwd.old })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPwd.old ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-[10px] ml-1">
                  {errors.currentPassword.message}
                </p>
              )}
              <hr className="border-slate-100 mt-4" />
            </div>
          )}

          {/* Password Baru */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 ml-1">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showPwd.new ? "text" : "password"}
                {...register("newPassword", {
                  required: "Password baru wajib diisi",
                  minLength: { value: 6, message: "Minimal 6 karakter" },
                })}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition-all bg-slate-50/50 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPwd({ ...showPwd, new: !showPwd.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPwd.new ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-[10px] ml-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Konfirmasi Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 ml-1">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showPwd.confirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Konfirmasi wajib diisi",
                  validate: (val) => {
                    if (watch("newPassword") !== val) {
                      return "Password tidak cocok";
                    }
                  },
                })}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition-all bg-slate-50/50 text-sm"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPwd({ ...showPwd, confirm: !showPwd.confirm })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPwd.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-[10px] ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-3 mt-10">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <Ban size={16} /> Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-lg shadow-amber-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <ShieldCheck size={16} /> Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};
