import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../../contanst/path";
import { Logout } from "../../redux/AccountSlice";
import { Fragment } from "react";

export default function ModalMenu({ showModalMenu, setshowModalMenu }) {
  const buttonHeader = useSelector((state) => state.json.header.button_page);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    showModalMenu &&
    createPortal(
      <div
        className={clsx("fixed top-0 left-0 right-0 bottom-0 bg-black/5 z-50", {
          "opacity-100 translate-x-0": showModalMenu,
          "opacity-0 -translate-x-full": !showModalMenu,
        })}
        onClick={() => setshowModalMenu(!showModalMenu)}
      >
        <div
          className={clsx("h-full w-[200px] bg-slate-300 p-2 flex flex-col", {
            // "opacity-100 translate-x-0": showModalMenu,
            // "opacity-0 -translate-x-full": !showModalMenu,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="self-end px-3 py-1 cursor-pointer hover:text-red-500 rotate-0 duration-500 ease-in-out hover:rotate-90"
            onClick={() => setshowModalMenu(false)}
          >
            <FontAwesomeIcon icon={faX} size="xl" />
          </div>
          {buttonHeader &&
            buttonHeader.map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.url}`}
                className="font-semibold p-2 border-b hover:bg-slate-200"
                onClick={() => setshowModalMenu(false)}
              >
                {item.item}
              </NavLink>
            ))}
          <div
            className="font-semibold p-2 border-b hover:bg-slate-200 cursor-pointer"
            onClick={() => {
              setshowModalMenu(false);
              navigate(path.cart);
            }}
          >
            Giỏ Hàng
          </div>

          {isAuthenticated ? (
            <div
              className="font-semibold p-2 border-b hover:bg-slate-200 cursor-pointer"
              onClick={() => {
                dispatch(Logout());
                setTimeout(() => {
                  setshowModalMenu(false);
                }, 0);
              }}
            >
              Đăng xuất
            </div>
          ) : (
            <Fragment />
          )}
        </div>
      </div>,
      document.body
    )
  );
}
