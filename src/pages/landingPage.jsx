import React, { useState, useEffect } from "react";
import {
  Heart,
  FileText,
  ClipboardList,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DanaAmalLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Under Maintenance.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#68ACC9] rounded-full flex items-center justify-center">
                <Heart className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#68ACC9]">Dana Amal</h1>
                <p className="text-xs text-[#6D737A]">
                  Politeknik Negeri Batam
                </p>
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              {["Beranda", "Tentang", "Visi & Misi", "Kontak"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(" & ", "-"))
                  }
                  className="text-[#6D737A] hover:text-[#68ACC9] transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
              <Link to="/login">Login</Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#6D737A]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {["Beranda", "Tentang", "Visi & Misi", "Kontak"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(" & ", "-"))
                  }
                  className="block w-full text-left text-[#6D737A] hover:text-[#68ACC9] py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="beranda"
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-[#68ACC9]/10 rounded-full">
                <span className="text-[#68ACC9] font-semibold text-sm">
                  Bersama Berbagi, Bersama Sejahtera
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Dana Amal <span className="text-[#68ACC9]">Polibatam</span>
              </h1>
              <p className="text-lg text-[#6D737A] leading-relaxed">
                Platform sosial yang menghubungkan karyawan Polibatam untuk
                berbagi dan saling membantu dalam berbagai kebutuhan kehidupan.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("tentang")}
                  className="px-8 py-3 bg-[#68ACC9] text-white rounded-full font-semibold hover:bg-[#68ACC9]/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Pelajari Lebih Lanjut
                </button>
                <button
                  onClick={() => scrollToSection("kontak")}
                  className="px-8 py-3 border-2 border-[#68ACC9] text-[#68ACC9] rounded-full font-semibold hover:bg-[#68ACC9] hover:text-white transition-all"
                >
                  Hubungi Kami
                </button>
              </div>
            </div>
            <div className="relative lg:h-96 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-[#68ACC9]/20 to-transparent rounded-3xl"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img src="./Hero.png" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-[#68ACC9]" size={32} />
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FBFBFB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              icon={<Heart size={40} />}
              title="Total Dana"
              description="Jumlah dana yang terkumpul dari kontribusi karyawan"
              color="bg-green-500"
            />
            <Card
              icon={<FileText size={40} />}
              title="Pengajuan"
              description="Ajukan permintaan bantuan untuk kebutuhan Anda"
              color="bg-blue-500"
            />
            <Card
              icon={<ClipboardList size={40} />}
              title="Laporan"
              description="Riwayat donasi dan bantuan untuk karyawan"
              color="bg-purple-500"
            />
            <Card
              icon={<CheckCircle size={40} />}
              title="Kriteria Bantuan"
              description="Syarat dan ketentuan pengajuan bantuan"
              color="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="tentang" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cara Untuk Melindungi Sesama
            </h2>
            <div className="w-24 h-1 bg-[#68ACC9] mx-auto"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Dana AMAL
                </h3>
                <p className="text-[#68ACC9] font-semibold text-lg mb-6">
                  Politeknik Negeri Batam
                </p>
                <p className="text-[#6D737A] leading-relaxed text-justify">
                  Dana Amal Polibatam adalah dana sosial yang disetorkan setiap
                  bulan oleh semua karyawan polibatam dan dikumpulkan oleh
                  pengelola Dana Amal. Dana yang dikumpulkan ini akan
                  dikeluarkan untuk kepentingan sosial seperti santunan kedukaan
                  karyawan, bantuan berobat, pernikahan, kelahiran anak dan
                  kegiatan sosial lainnya yang relevan.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Transparansi Dana",
                    "Kemudahan Pengajuan",
                    "Laporan Terperinci",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#68ACC9] rounded-full"></div>
                      <span className="text-[#6D737A]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" flex items-center justify-end">
                <img src="./Helping.gif" alt="helping" className="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        id="visi-misi"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FBFBFB] to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Visi dan Misi
            </h2>
            <div className="w-24 h-1 bg-[#68ACC9] mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-[#68ACC9]/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-[#68ACC9]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Visi Dana Amal
              </h3>
              <p className="text-[#6D737A] leading-relaxed text-justify">
                Menjadi sarana terbaik bagi karyawan Polibatam untuk berbagi
                dengan sesama. Visi ini menggambarkan tujuan Dana Amal Polibatam
                untuk menjadi sarana yang bermanfaat bagi karyawan Polibatam
                untuk berbagi dengan sesama.
              </p>
            </div>

            <div className="flex justify-center">
              <img src="./Visi.gif" alt="" className="-mt-2" />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-[#68ACC9]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-[#68ACC9]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Misi Dana Amal
              </h3>
              <p className="text-[#6D737A] leading-relaxed text-justify">
                Dana Amal Polibatam akan dikelola secara efisien dan transparan
                untuk memastikan bahwa dana yang terkumpul dapat digunakan
                secara tepat sasaran. Memberikan kemudahan bagi karyawan untuk
                berbagi dengan sesama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Motto */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#68ACC9]/10 via-[#68ACC9]/5 to-[#68ACC9]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-12 bg-white rounded-3xl shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Moto Kami
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#68ACC9]">
              "Bersama berbagi, bersama sejahtera"
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="kontak" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Hubungi Kami
            </h2>
            <div className="w-24 h-1 bg-[#68ACC9] mx-auto"></div>
            <p className="text-[#6D737A] mt-4">
              Ada pertanyaan? Kami siap membantu Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Kirim Pesan
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-[#6D737A] font-medium mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukan nama lengkap anda"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#68ACC9] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#6D737A] font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Masukan email anda"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#68ACC9] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#6D737A] font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Masukan subject anda"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#68ACC9] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#6D737A] font-medium mb-2">
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Masukan pesan anda"
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#68ACC9] focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#68ACC9] text-white py-3 rounded-xl font-semibold hover:bg-[#68ACC9]/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Kirim Pesan</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div className="w-full max-w-md mx-auto mb-8 flex items-center justify-center">
                <img src="./Contact.gif" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#68ACC9] rounded-full flex items-center justify-center">
              <Heart size={20} />
            </div>
            <h3 className="text-xl font-bold">Dana Amal Polibatam</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Bersama berbagi, bersama sejahtera
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Dana Amal Polibatam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Card({ icon, title, description, color }) {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div
        className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-[#6D737A] leading-relaxed">{description}</p>
    </div>
  );
}
