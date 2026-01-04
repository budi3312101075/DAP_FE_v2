import React from "react";
import { GoArrowRight } from "react-icons/go";
const Hero = () => {
  return (
    <>
      <div className="hero-content max-h-max pb-24 justify-between flex-col lg:flex-row-reverse bg-secondary rounded-3xl max-w-full text-white font-poppins">
        <img
          src="./Hero.png"
          className="xl:max-w-2xl lg:max-w-lg  hidden lg:block"
          data-aos="zoom-in-left"
          data-aos-duration="1000"
        />
        <div className="max-w-lg  mx-auto">
          <h1 className="lg:text-5xl text-3xl font-bold">
            DOMPET AMAL POLIBATAM
          </h1>
          <p className="py-6 text-sm lg:text-xl">
            Sistem Aplikasi berbasis web sebagai platform pendata dana sosial
            karyawan Polibatam.
          </p>
          <button className="px-5 py-1 lg:w-56 flex items-center lg:pl-7 lg:gap-3 bg-primary text-secondary rounded-full lg:py-2">
            Baca Selengkapnya <GoArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
