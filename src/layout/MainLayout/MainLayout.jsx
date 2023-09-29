import PropTypes from "prop-types";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { path } from "../../contanst/path";

function MainLayout({ children }) {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleScroll = () => {
    if (window.pageYOffset > 400) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);
  return (
    <div>
      <div className="border-b-2">
        <div className="flex max-w-7xl md:mx-auto justify-between my-2 opacity-80 mx-5">
          <div>
            <span>HOTLINE: 1900 633 045 | 0865 160 360</span>
          </div>
          <div className="flex gap-3">
            <div
              className="flex justify-center items-center gap-1 cursor-pointer hover:text-red-500"
              onClick={() => navigate(path.login)}
            >
              <FontAwesomeIcon icon={faLock} />
              <span className=" hidden md:block">Đăng nhập</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto min-h-[600px]">
        <Header />
        {children}
      </div>
      <div className="border-t-2">
        <div className="max-w-7xl mx-auto ">
          <Footer />
        </div>
      </div>
      {showButton && (
        <div className="fixed right-2 bottom-20">
          <button
            className="w-14 h-14 bg-red-500 rounded-full text-white translate-y-0 hover:-translate-y-3 duration-500 ease-in-out"
            onClick={scrollToTop}
          >
            <FontAwesomeIcon icon={faArrowUp} size="xl" />
          </button>
        </div>
      )}
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
