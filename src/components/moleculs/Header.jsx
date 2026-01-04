import React from "react";
import DropdownProfile from "../atoms/dropdownProfile";

function Header({ variant = "default" }) {
  return (
    <header
      className={`sticky top-0 z-30 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 ${
        variant === "v2" || variant === "v3"
          ? "before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10"
          : "max-lg:shadow-sm lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-16 ${
            variant === "v2" || variant === "v3"
              ? ""
              : "lg:border-b border-gray-200 dark:border-gray-700/60"
          }`}
        >
          <div className="flex items-center" />

          <div className="flex items-center space-x-3">
            <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
            <DropdownProfile align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
