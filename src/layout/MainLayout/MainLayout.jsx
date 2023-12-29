import PropTypes from "prop-types"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowUp,
  faLock,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { path } from "../../contanst/path"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { Logout } from "../../redux/AccountSlice"

function MainLayout({ children }) {
  const [showButton, setShowButton] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  window.addEventListener("scroll", handleScroll)
  return (
    <div>
      <div className="border-b hidden sm:block">
        <div className="flex max-w-6xl md:mx-auto justify-between my-2 opacity-80 mx-5">
          <div>
            <span>
              HOTLINE:{" "}
              <a href="tel:1900 633 045" className="hover:text-red-500">
                1900 633 045
              </a>{" "}
              |{" "}
              <a href="tel:0865 160 360" className="hover:text-red-500">
                0865 160 360
              </a>
            </span>
          </div>

          {isAuthenticated ? (
            <div className="flex gap-5">
              <div
                className="flex justify-center items-center gap-1 cursor-pointer hover:text-red-500"
                onClick={() => navigate(path.profile)}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Tài khoản</span>
              </div>
              <div
                className="flex justify-center items-center gap-1 cursor-pointer hover:text-red-500"
                onClick={() => dispatch(Logout())}
              >
                <FontAwesomeIcon icon={faPowerOff} />
                <span>Đăng xuất</span>
              </div>
            </div>
          ) : (
            <div
              className="flex justify-center items-center gap-1 cursor-pointer hover:text-red-500"
              onClick={() => navigate(path.login)}
            >
              <FontAwesomeIcon icon={faLock} />
              <span>Đăng nhập</span>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-6xl mx-auto min-h-[600px]">
        <Header />
        {children}
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto ">
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
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
