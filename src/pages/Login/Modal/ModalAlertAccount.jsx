import clsx from "clsx"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

function ModalAlertLogin({ setshowModal }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return createPortal(
    <div
      className="fixed left-0 right-0 bottom-0 top-0 bg-black/20 z-50"
      onClick={() => {
        setTimeout(() => {
          setshowModal(false)
        }, 1000)
        setAnimate(false)
      }}
    >
      <div className="h-full mx-auto mt-20">
        <div
          className={clsx(
            "w-[400px] mx-4 md:mx-auto  duration-1000 bg-white ease-in-out p-4 rounded-md",
            {
              "opacity-100 scale-100": animate,
              "opacity-100 scale-0": !animate,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-full text-end my-2 pr-2"
            onClick={() => {
              setTimeout(() => {
                setshowModal(false)
              }, 1000)
              setAnimate(false)
            }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="xl"
              className="hover:text-red-500 cursor-pointer"
            />
          </div>
          <div>
            <p>
              Do là API có sẵn nên quá trình đăng ký vẫn sẽ trả về thông báo
              thành công. Tuy nhiên, lưu ý rằng dữ liệu tài khoản mới sẽ không
              được lưu lại trong hệ thống, điều này có nghĩa là bạn chỉ có thể
              đăng nhập bằng các tài khoản đã được cung cấp sẵn bởi API. Người
              dùng không thể sử dụng tài khoản mới đăng ký để đăng nhập.
            </p>
            <p>
              Link tài khoản :{" "}
              <a
                href="https://fakestoreapi.com/users"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-red-500"
              >
                https://fakestoreapi.com/users
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ModalAlertLogin
