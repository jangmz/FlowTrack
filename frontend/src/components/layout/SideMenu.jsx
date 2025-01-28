import { useState } from "react";
import { FaLaptop, FaTabletAlt, FaDesktop, FaVideo, FaPlus, FaFileImport, FaFileExport } from "react-icons/fa";
import { PiDesktopTower } from "react-icons/pi";
import { FiPrinter } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function SideMenu({ isOpen, toggleMenu }) {
  // TODO: check for initial screen width and set isOpen according to that
  // TODO: eliminate z-index when the width of the screen is > 800px

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-primary text-white d-flex flex-column ms-0 ${
          isOpen ? "side-menu-open" : "side-menu-closed"
        }`}
        style={{
            height: "100vh",
            width: isOpen ? "250px" : "0",
            position: "fixed",
            top: "56px",
            left: "0",
            transition: "width 0.3s ease",
            backgroundColor: "#005f84",
            overflow: "hidden"
        }}
      >
        {isOpen && (
          <div className="d-flex flex-column">
            {/* Menu Items */}
            <ul className="list-unstyled flex-grow-1 p-3 mb-0">
              <li className="mb-3">
                <Link to="/devices/laptops" className="text-white text-decoration-none d-flex align-items-center">
                    <FaLaptop className="me-2" />
                    Laptops
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/devices/tablets" className="text-white text-decoration-none d-flex align-items-center">
                  <FaTabletAlt className="me-2" />
                  Tablets
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/devices/desktops" className="text-white text-decoration-none d-flex align-items-center">
                  <PiDesktopTower className="me-2" />
                  Desktops
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/devices/projectors" className="text-white text-decoration-none d-flex align-items-center">
                  <FaVideo className="me-2" />
                  Projectors
                </Link>
              </li>
              <li className="mb-3">
                <Link to="#" className="text-white text-decoration-none d-flex align-items-center">
                  <FaDesktop className="me-2" />
                  Monitors
                </Link>
              </li>
              <li className="mb-3">
                <Link to="#" className="text-white text-decoration-none d-flex align-items-center">
                  <FiPrinter className="me-2" />
                  Printers
                </Link>
              </li>
              <li className="mb-3">
                <Link to="#" className="text-white text-decoration-none d-flex align-items-center">
                  <RiFileList3Line className="me-2" />
                  History
                </Link>
              </li>
            </ul>

            {/* Bottom Buttons */}
            <div className="d-flex flex-column p-3">
              <button className="btn btn-outline-light w-100 mb-2 d-flex align-items-center justify-content-center">
                <FaPlus className="me-2" />
                New Device
              </button>
              <button className="btn btn-outline-light w-100 mb-2 d-flex align-items-center justify-content-center">
                <FaFileImport className="me-2" />
                Import
              </button>
              <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
                <FaFileExport className="me-2" />
                Export
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        className="btn btn-primary d-md-none position-fixed"
        style={{ bottom: "10px", left: "10px", zIndex: 1050 }}
        onClick={toggleMenu}
      >
        ☰
      </button>
    </>
  );
}
