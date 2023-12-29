import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { path } from "../../contanst/path"
import { useForm } from "react-hook-form"
import { userApi } from "../../service/userApi"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { Login } from "../../redux/AccountSlice"
import clsx from "clsx"
import ModalAlertLogin from "./Modal/ModalAlertAccount"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [deboune, setDeboune] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    setShowModal(true)
  }, [])

  const onSubmit = async (data) => {
    if (!data) {
      toast.info("vui long nhap thong tin")
      return
    }
    setDeboune(true)
    try {
      const res = await userApi.LoginUserApi({ ...data })
      if (res.status === 200) {
        toast.success("Đăng nhập thành công")
        setTimeout(() => {
          dispatch(Login())
        }, 1000)
        localStorage.setItem(
          "user",
          JSON.stringify({
            account: data.username,
            token: res.data.token,
          })
        )
      }
    } catch (error) {
      console.log(error)
      toast.warning("Đăng nhập thất bại")
    } finally {
      setDeboune(false)
    }
  }

  return (
    <>
      {showModal && <ModalAlertLogin setshowModal={setShowModal} />}
      <div className="border border-black/30 md:w-[700px] mx-auto my-10 py-5 px-10 gap-3 flex flex-col rounded-xl">
        <span className="self-center text-3xl font-semibold">
          Đăng nhập tài khoản
        </span>
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-medium">
              Tài Khoản
            </label>
            <input
              type="text"
              id="username"
              className="p-2 border rounded"
              required
              {...register("username")}
              defaultValue="johnd"
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-medium">
              Mật khẩu
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="p-2 border rounded"
              required
              {...register("password")}
              defaultValue="m38rmF$"
            />
            <span
              className="absolute right-3  bottom-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                size="lg"
              />
            </span>
          </div>
          <button
            type="submit"
            className={clsx(
              "bg-red-500 rounded scale-100 w-fit py-2 px-5 self-center text-white hover:scale-105 duration-500 ease-in-out flex items-center",
              {
                "cursor-no-drop": deboune,
              }
            )}
            disabled={deboune}
          >
            {deboune && (
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
            Đăng nhập
          </button>
        </form>
        <span className="self-center">
          Bạn chưa có tài khoản ?{" "}
          <Link
            to={path.register}
            className="underline text-red-500 underline-offset-2"
          >
            Đăng Ký
          </Link>
        </span>
      </div>
    </>
  )
}
