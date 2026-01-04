import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";
import { TbSparkles } from "react-icons/tb";
import { detailUser } from "../../utils/Utils";
import {
  FolderOpen,
  FileText,
  ClipboardList,
  CheckCircle,
  Wallet,
  Users,
  Settings,
} from "lucide-react";

const NavItem = ({
  to,
  icon: Icon,
  label,
  isActive,
  isSubItem = false,
  action = false,
  badge = null,
}) => (
  <li>
    <Link
      to={to}
      onClick={
        action
          ? () => {
              // const modal = document.getElementById("SidebarAdd");
              if (modal) modal.showModal();
            }
          : undefined
      }
      className={`group flex items-center justify-between gap-3 py-3 px-4 rounded-xl transition-all duration-200 ease-in-out relative overflow-hidden
        ${isSubItem ? "text-sm ml-2" : "text-md"}
        ${
          isActive
            ? "bg-[#68ACC9] text-white shadow-lg shadow-[#68ACC9]/30 transform scale-[1.02]"
            : "text-[#6D737A] dark:text-gray-300 hover:bg-[#68ACC9]/10 dark:hover:bg-[#68ACC9]/20 hover:text-[#68ACC9] dark:hover:text-[#68ACC9] hover:shadow-md"
        }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {Icon && (
          <div className={`flex-shrink-0 ${isActive ? "animate-pulse" : ""}`}>
            <Icon
              size={isSubItem ? 18 : 22}
              className={`${
                isActive
                  ? "text-white drop-shadow-lg"
                  : "text-[#6D737A] dark:text-gray-400 group-hover:text-[#68ACC9] dark:group-hover:text-[#68ACC9] transition-colors"
              }`}
            />
          </div>
        )}
        <span
          className={`truncate ${isActive ? "font-semibold" : "font-medium"}`}
        >
          {label}
        </span>
      </div>

      {badge && (
        <span className="flex-shrink-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}

      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
      )}
    </Link>
  </li>
);

const NavDropdown = ({
  label,
  icon: Icon,
  children,
  initialOpen = false,
  badge = null,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  useEffect(() => {
    if (initialOpen) {
      setIsOpen(true);
    }
  }, [initialOpen]);

  return (
    <li className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-between w-full py-3 px-4 rounded-xl gap-3 transition-all duration-200 ease-in-out text-[#6D737A] dark:text-gray-300 hover:bg-[#68ACC9]/10 dark:hover:bg-[#68ACC9]/20 hover:text-[#68ACC9] dark:hover:text-[#68ACC9] focus:outline-none hover:shadow-md"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {Icon && (
            <Icon
              size={22}
              className="text-[#6D737A] dark:text-gray-400 group-hover:text-[#68ACC9] dark:group-hover:text-[#68ACC9] transition-colors flex-shrink-0"
            />
          )}
          <span className="text-md font-medium truncate">{label}</span>
          {badge && (
            <span className="flex-shrink-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <MdKeyboardArrowDown
          size={24}
          className={`text-[#6D737A] dark:text-gray-500 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="pl-4 flex flex-col gap-1">{children}</ul>
      </div>
    </li>
  );
};

function Sidebar({ variant = "default" }) {
  const users = detailUser();

  const location = useLocation();
  const currentPath = location.pathname;

  const isLgScreen = () =>
    typeof window !== "undefined" && window.innerWidth >= 1024;

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-expanded");
      return saved === "true" ? true : saved === "false" ? false : isLgScreen();
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", isSidebarOpen.toString());
    if (isSidebarOpen) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
    const handleResize = () => {
      if (!isLgScreen() && isSidebarOpen) {
      } else if (
        isLgScreen() &&
        localStorage.getItem("sidebar-expanded") === null
      ) {
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  const navItems = [
    ...(users.role === "Karyawan"
      ? [
          {
            groupLabel: "Main Menu",
            items: [
              {
                label: "Pengajuan",
                icon: ClipboardList,
                path: "/pengajuan",
              },
              {
                label: "Kriteria",
                icon: Settings,
                path: "/kriteria",
              },
              {
                label: "Laporan",
                icon: FileText,
                path: "/laporan",
              },
              {
                label: "Status",
                icon: CheckCircle,
                path: "/status",
              },
            ],
          },
        ]
      : []),

    ...(users.role === "Admin"
      ? [
          {
            groupLabel: "Main Menu",
            items: [
              {
                label: "Daftar Pengajuan",
                icon: FolderOpen,
                path: "/daftar-pengajuan",
              },
              {
                label: "Laporan",
                icon: FileText,
                path: "/laporan",
              },
              {
                label: "Keuangan",
                icon: Wallet,
                path: "/keuangan",
              },
            ],
          },
        ]
      : []),

    ...(users.role === "SuperAdmin"
      ? [
          {
            groupLabel: "Main Menu",
            items: [
              {
                label: "Daftar Pengajuan",
                icon: FolderOpen,
                path: "/daftar-pengajuan",
              },
              {
                label: "Laporan",
                icon: FileText,
                path: "/laporan",
              },
              {
                label: "Keuangan",
                icon: Wallet,
                path: "/keuangan",
              },
              {
                label: "Kriteria",
                icon: Settings,
                path: "/kriteria",
              },
              {
                label: "Daftar Users",
                icon: Users,
                path: "/daftar-users",
              },
            ],
          },
        ]
      : []),

    ...(users.role === "Manajemen"
      ? [
          {
            groupLabel: "Main Menu",
            items: [
              {
                label: "Laporan",
                icon: FileText,
                path: "/laporan",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <aside className="relative print:hidden">
      {/* Enhanced Toggle Button */}
      <button
        className={`fixed top-4 left-4 z-[60] p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 ${
          isSidebarOpen
            ? "bg-[#68ACC9] text-white"
            : "bg-white dark:bg-gray-800 text-[#6D737A] dark:text-gray-300"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && !isLgScreen() && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        id="sidebar"
        className={`fixed z-50 top-0 left-0 h-full w-72 bg-gradient-to-b from-white to-[#FBFBFB] dark:from-gray-800 dark:to-gray-900 transition-all duration-300 ease-in-out transform
        ${
          isSidebarOpen
            ? "translate-x-0 lg:static lg:shadow-none"
            : "-translate-x-full"
        }
        ${
          variant === "v2"
            ? "border-r-2 border-gray-200 dark:border-gray-700/60"
            : "lg:rounded-r-3xl shadow-2xl"
        }`}
      >
        {/* Header Section with Logo */}
        <div className="relative px-6 pt-16 pb-4 mb-4">
          <div className="absolute inset-0 rounded-br-3xl"></div>
          <Link to="/" className="block relative">
            <img
              src={logo}
              alt="Logo"
              className="size-16 w-auto drop-shadow-lg mt-7"
            />
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="px-4 mb-6">
          <div className="bg-[#68ACC9]/10 dark:bg-[#68ACC9]/20 rounded-xl p-4 border border-[#68ACC9]/30 dark:border-[#68ACC9]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#68ACC9] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {users.nama?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {users.nama || "User"}
                </p>
                <p className="text-xs text-[#6D737A] dark:text-gray-400 flex items-center gap-1">
                  <TbSparkles className="text-[#68ACC9]" size={12} />
                  {users.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-6 flex-grow flex flex-col overflow-y-auto pb-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {navItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.groupLabel && (
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xs uppercase text-[#6D737A] dark:text-gray-400 font-bold tracking-wider">
                    {section.groupLabel}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#68ACC9]/30 to-transparent dark:from-[#68ACC9]/20"></div>
                </div>
              )}
              <ul className="space-y-1">
                {(section.items || [section]).map((item, itemIndex) => {
                  if (item.children) {
                    const isGroupActive =
                      item.paths?.some((p) => currentPath.startsWith(p)) ||
                      item.children.some((child) =>
                        currentPath.startsWith(child.path)
                      );
                    return (
                      <NavDropdown
                        key={item.label || itemIndex}
                        label={item.label}
                        icon={item.icon}
                        initialOpen={isGroupActive}
                        badge={item.badge}
                      >
                        {item.children.map((child) => (
                          <NavItem
                            key={child.path}
                            to={child.path}
                            label={child.label}
                            isActive={currentPath.startsWith(child.path)}
                            isSubItem={true}
                            badge={child.badge}
                          />
                        ))}
                      </NavDropdown>
                    );
                  }
                  return (
                    <NavItem
                      key={item.path || itemIndex}
                      to={item.path}
                      icon={item.icon}
                      label={item.label}
                      isActive={currentPath.startsWith(item.path)}
                      action={item.action}
                      badge={item.badge}
                    />
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700/50">
          <div className="text-center">
            <p className="text-xs text-[#6D737A] dark:text-gray-400">
              © 2024 Dana Amal Polibatam
            </p>
            <p className="text-xs text-[#6D737A] dark:text-gray-500">v2.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
