import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"
import { useSelector } from "react-redux"
import {
  faBars,
  faCartPlus,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { path } from "../../contanst/path"
import { useEffect, useState } from "react"
import clsx from "clsx"
import ModalMenu from "../Modal/ModalMenu"
import ModalSearch from "../Modal/ModalSearch"

export default function Header() {
  const logoHeader = useSelector((state) => state.json.header.logo_shop)
  const buttonHeader = useSelector((state) => state.json.header.button_page)
  const cart = useSelector((state) => state.cart)
  const [isSticky, setIsSticky] = useState(false)
  const [showModalMenu, setshowModalMenu] = useState(false)
  const [showModalSearch, setshowModalSearch] = useState(false)
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated)
  const navigate = useNavigate()

  const countCart =
    cart &&
    cart.reduce((total, currentValue) => {
      return total + currentValue.count
    }, 0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div>
      <div className="flex-col gap-3 sm:flex-row flex items-center my-5 mx-3">
        <div className="sm:flex gap-3 basis-1/3 justify-center hidden">
          <a
            href="https://www.facebook.com/flowercorner.vn/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="2xl"
              style={{ color: "#2c58a5" }}
              className="cursor-pointer"
            />
          </a>
          <a
            href="https://twitter.com/FlowerCorner3"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2xl"
              style={{ color: "#1e5ac2" }}
              className="cursor-pointer"
            />
          </a>
          <a
            href="https://www.instagram.com/flowercorner.vn/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="2xl"
              style={{ color: "#c3377b" }}
              className="cursor-pointer"
            />
          </a>
        </div>

        <div
          className="basis-1/3 hidden sm:flex justify-center cursor-pointer"
          onClick={() => navigate(path.home)}
        >
          <img src={logoHeader} alt="" className="w-3/4" />
        </div>

        <div className="flex basis-1/3 gap-2 justify-end mt-16 sm:mt-0">
          <div className="relative" onClick={() => setshowModalSearch(true)}>
            <input
              disabled={showModalSearch}
              type="text"
              className="w-[400px] sm:w-full border p-2 rounded cursor-pointer"
              placeholder="Tìm kiếm"
            />
            <span className="absolute right-[3%] top-[50%] -translate-y-1/2 cursor-pointer">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </span>
          </div>

          <div
            className="w-10 h-10 bg-red-500 rounded hidden sm:flex justify-center items-center relative cursor-pointer hover:bg-red-700"
            onClick={() => navigate(path.cart)}
          >
            <div className="text-white ">
              <FontAwesomeIcon icon={faCartPlus} />
            </div>
            <div className="absolute top-[-50%] right-[-50%] translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-500 flex justify-center items-center text-white">
              {countCart}
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx("sm:border-b pb-3 z-40", {
          fixed: isSticky,
          "sm:top-0": isSticky,
          "sm:left-0": isSticky,
          "sm:right-0": isSticky,
          "pt-2": isSticky,
          "sm:bg-white": isSticky,
        })}
      >
        <div className="mx-auto max-w-6xl flex justify-evenly items-center">
          {buttonHeader &&
            buttonHeader.map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.url}`}
                className="font-semibold hidden sm:block hover:text-red-600 scale-100 duration-500 ease-in-out hover:scale-125"
              >
                {item.item}
              </NavLink>
            ))}
        </div>
      </div>

      <div className="text-center text-red-600 font-semibold mt-1">
        <span>
          ĐẶT HOA ONLINE - GIAO MIỄN PHÍ TP HCM & HÀ NỘI - GỌI NGAY 1900 633 045
          HOẶC 0865 160 360
        </span>
      </div>

      <div className="fixed top-0 left-0 right-0 h-12 flex justify-between items-center sm:hidden shadow bg-white z-50">
        <div
          className=" w-10 h-10 cursor-pointer flex sm:hidden justify-center items-center hover:text-red-500"
          onClick={() => setshowModalMenu(!showModalMenu)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div onClick={() => navigate(path.home)}>
          <img
            src={logoHeader}
            alt=""
            className="h-12 object-cover cursor-pointer"
          />
        </div>
        <div
          className="w-10 h-10 flex justify-center items-center cursor-pointer hover:text-red-500"
          onClick={() => navigate(!isAuthenticated ? path.login : path.profile)}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>

      {showModalMenu && <ModalMenu setshowModalMenu={setshowModalMenu} />}
      {showModalSearch && (
        <ModalSearch setshowModalSearch={setshowModalSearch} />
      )}
    </div>
  )
}
