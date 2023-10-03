import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../../contanst/path";
import { Logout } from "../../redux/AccountSlice";
import { Fragment, useEffect, useState } from "react";

export default function ModalMenu({ setshowModalMenu }) {
  const buttonHeader = useSelector((state) => state.json.header.button_page);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  return createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/5 z-50"
      onClick={() => {
        setTimeout(() => {
          setshowModalMenu(false);
        }, 1000);
        setAnimate(false);
      }}
    >
      <div className="h-full">
        <div
          className={clsx(
            "w-[250px] h-full bg-white p-2 flex flex-col duration-700 ease-in-out",
            {
              "opacity-100 translate-x-0": animate,
              "opacity-100 -translate-x-full": !animate,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="self-end px-3 py-1 cursor-pointer hover:text-red-500 rotate-0 duration-500 ease-in-out hover:rotate-90"
            onClick={() => {
              setTimeout(() => {
                setshowModalMenu(false);
              }, 1000);
              setAnimate(false);
            }}
          >
            <FontAwesomeIcon icon={faX} size="xl" />
          </div>
          {buttonHeader &&
            buttonHeader.map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.url}`}
                className="font-semibold p-2 border-b hover:bg-slate-200"
                onClick={() => {
                  setTimeout(() => {
                    setshowModalMenu(false);
                  }, 1000);
                  setAnimate(false);
                }}
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
                }, 1000);
                setAnimate(false);
              }}
            >
              Đăng xuất
            </div>
          ) : (
            <Fragment />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
