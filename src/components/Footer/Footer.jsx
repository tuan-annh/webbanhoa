import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"
import {
  faArrowDown,
  faPhoneVolume,
  faZ,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useSelector } from "react-redux"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"
import { path } from "../../contanst/path"

export default function Footer() {
  const footerJsonData = useSelector((state) => state.json.footer)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const navigate = useNavigate()
  return (
    <footer>
      <div className="flex flex-col gap-2 sm:gap-0 mx-2 sm:mx-auto sm:flex-row mb-14 mt-8">
        <div className="flex flex-col gap-2 basis-1/3">
          <div className="w-2/3">
            <img src={footerJsonData.logo_shop} alt="" />
          </div>
          <span className="flex flex-col">
            <span>Hotline: 1900 633 045 - 0865 160 360 </span>
            <span>Email: sales@flowercorner.vn</span>
          </span>
          <span className="uppercase font-semibold">theo dõi</span>
          <span>
            {footerJsonData.fl &&
              footerJsonData.fl.content.map((item, index) => (
                <a
                  href={item.href}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i
                    className={`${item.icon} w-8 cursor-pointer hover:text-red-500`}
                  />
                </a>
              ))}
          </span>
        </div>

        <div className="flex flex-col gap-2 basis-1/3">
          <span
            className="uppercase font-semibold cursor-pointer"
            onClick={() => setShow1(!show1)}
          >
            chăm sóc khách hàng
            <span className="ml-2 sm:hidden">
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          </span>
          {footerJsonData.list_header_left &&
            footerJsonData.list_header_left.map((item, index) => (
              <span
                key={index}
                className={clsx(
                  "opacity-80 sm:block cursor-pointer hover:text-red-600",
                  {
                    hidden: !show1,
                    block: show1,
                  }
                )}
                onClick={() => {
                  navigate(`${path.customerservice}/${item.url}`)
                }}
              >
                {item.title}
              </span>
            ))}
        </div>

        <div className="flex flex-col gap-2 basis-1/3">
          <span
            className="uppercase font-semibold cursor-pointer"
            onClick={() => setShow2(!show2)}
          >
            SHOP HOA FLOWERCORNER
            <span className="ml-2 sm:hidden">
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          </span>
          {footerJsonData.address &&
            footerJsonData.address.content.map((item, index) => (
              <div
                key={index}
                className={clsx("opacity-80 sm:block", {
                  hidden: !show2,
                  block: show2,
                })}
              >
                <span className="font-semibold mr-2">{item.title}</span>
                <span className="hover:text-red-500 cursor-pointer">
                  {item.content}
                </span>
              </div>
            ))}
          <span className="opacity-80">
            CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ ZAS
          </span>
          <span className="opacity-80">Mã số thuế: 0313630426</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#e91e63] p-1 sm:p-3 z-10">
        <div className="flex justify-center text-white">
          <div className="flex gap-2 justify-center items-center pr-3 sm:pr-10 cursor-pointer border-r">
            <FontAwesomeIcon icon={faPhoneVolume} />
            <a href="tel:1900633045" className="hidden md:block">
              Gọi ngay 1900 633 045
            </a>
            <span className=" md:hidden">Hỗ trợ</span>
          </div>
          <div className="flex gap-2 justify-center items-center px-3 sm:px-10 cursor-pointer border-r">
            <FontAwesomeIcon icon={faZ} />
            <a
              className="hidden md:block"
              href="https://oa.zalo.me/1057696361500855184"
              target="_blank"
              rel="noreferrer"
            >
              Nhắn Tin Zalo
            </a>
            <a
              className=" md:hidden"
              href="https://oa.zalo.me/1057696361500855184"
              target="_blank"
              rel="noreferrer"
            >
              Zalo
            </a>
          </div>
          <div className="flex gap-2 justify-center items-center pl-3 sm:pl-10 cursor-pointer">
            <FontAwesomeIcon icon={faFacebookMessenger} />
            <a
              href="https://www.facebook.com/flowercorner.vn/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
