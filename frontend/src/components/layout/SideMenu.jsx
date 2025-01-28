import { FaHome, FaLaptop, FaTabletAlt, FaDesktop, FaVideo, FaPlus, FaFileImport, FaFileExport } from "react-icons/fa";
import { PiDesktopTower } from "react-icons/pi";
import { FiPrinter } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function SideMenu({ isOpen, toggleMenu }) {
  // TODO: check for initial screen width and set isOpen according to that

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-secondary text-white d-flex flex-column ms-0 ${
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
            <ul className="list-unstyled flex-grow-1 p-1 mb-0">
              <li className="">
                <Link to="/" className="p-2 text-white text-decoration-none d-flex align-items-center sidebar-link">
                    <FaHome className="me-2" />
                    Home
                </Link>
              </li>
              <li className="">
                <Link to="/devices/laptops" className="p-2 text-white text-decoration-none d-flex align-items-center sidebar-link">
                    <FaLaptop className="me-2" />
                    Laptops
                </Link>
              </li>
              <li className="">
                <Link to="/devices/tablets" className="p-2 text-white text-decoration-none d-flex align-items-center sidebar-link">
                  <FaTabletAlt className="me-2" />
                  Tablets
                </Link>
              </li>
              <li className="">
                <Link to="/devices/desktops" className="p-2 text-white text-decoration-none d-flex align-items-center sidebar-link">
                  <PiDesktopTower className="me-2" />
                  Desktops
                </Link>
              </li>
              <li className="">
                <Link to="/devices/projectors" className="p-2 text-white text-decoration-none d-flex align-items-center sidebar-link">
                  <FaVideo className="me-2" />
                  Projectors
                </Link>
              </li>
              <li className="">
                <Link to="#" className="p-2 text-white text-decoration-none d-flex align-items-center sidebar-link">
                  <FaDesktop className="me-2" />
                  Monitors (disabled)
                </Link>
              </li>
              <li className="">
                <Link to="#" className="p-2 text-white text-decoration-none d-flex align-items-center sidebar-link">
                  <FiPrinter className="me-2" />
                  Printers (disabled)
                </Link>
              </li>
              <li className="">
                <Link to="#" className="p-2 text-white text-decoration-none d-flex align-items-center sidebar-link">
                  <RiFileList3Line className="me-2" />
                  History (disabled)
                </Link>
              </li>
            </ul>

            {/* Bottom Buttons - currently disabled */}
            <div className="d-flex flex-column p-3">
              <button disabled className="btn btn-outline-light w-100 mb-2 d-flex align-items-center justify-content-center">
                <FaPlus className="me-2" />
                New Device
              </button>
              <button disabled className="btn btn-outline-light w-100 mb-2 d-flex align-items-center justify-content-center">
                <FaFileImport className="me-2" />
                Import
              </button>
              <button disabled className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
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
