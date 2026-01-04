import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigFile from "@tailwindConfig";
import { useAuth } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

export const tailwindConfig = () => {
  return resolveConfig(tailwindConfigFile);
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const formatThousands = (value) =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const detailUser = () => {
  const { loginResponse } = useAuth();
  const user = jwtDecode(loginResponse);
  return user;
};

export const generateUUID = () => {
  return uuidv4();
};

export const formatRupiah = (value) => {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatBatasWaktu = (value) => {
  if (value === null || value === undefined) return "-";
  const num = Number(value);
  if (num > 548) return "∞";
  return `${num} hari`;
};

export const formatSpecial = (value) => {
  if (value === 1 || value === "1") return "Ya";
  if (value === 0 || value === "0") return "Tidak";
  return "-";
};

export const toRupiah = (IDR) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(IDR);

  return rupiah;
};

export const formatDate = (rawDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(rawDate).toLocaleDateString("id-ID", options);
  return formattedDate;
};
