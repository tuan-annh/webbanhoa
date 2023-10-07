import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../../service/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { path } from "../../contanst/path";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [debounce, setDebounce] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setDebounce(true);
      const res = await userApi.RegisterUserApi(data);
      console.log(res);
      if (res.status) {
        toast.success("Đăng kí tài khoản thành công");
        navigate(path.login);
      }
    } catch (error) {
      toast.error("Đăng kí tài khoản thất bại. Vui lòng thử lại !");
      console.log(error);
    } finally {
      setDebounce(false);
    }
  };
  return (
    <div className="border border-black/30 md:w-[700px] mx-auto my-10 py-5 px-5 mg:px-10 gap-3 flex flex-col rounded-xl">
      <span className="self-center text-3xl font-semibold">
        Đăng ký tài khoản
      </span>
      <form
        action=""
        className="flex flex-col"
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
            {...register("username", {
              required: {
                value: true,
                message: "Vui lòng nhập tên tài khoản.",
              },
              minLength: {
                value: 5,
                message: "Tài khoản có tổi thiểu 5 kí tự.",
              },
            })}
          />
          <span className="mb-3 h-[1px] text-center  text-red-900">
            {errors.username?.message}
          </span>
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="font-medium">
            Mật khẩu
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="p-2 border rounded"
            {...register("password", {
              required: { value: true, message: "Vui lòng nhập mật khẩu." },
              minLength: {
                value: 5,
                message: "Mật khẩu có tối thiểu 5 kí tự",
              },
            })}
          />
          <span
            className="absolute right-3  bottom-6  cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              size="lg"
            />
          </span>
          <span className="mb-3 h-[1px] text-center  text-red-900">
            {errors.password?.message}
          </span>
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="confirmpassword" className="font-medium">
            Nhập lại mật khẩu
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmpassword"
            className="p-2 border rounded"
            {...register("confirmpassword", {
              required: { value: true, message: "Vui lòng nhập lại mật khẩu." },
              validate: (value) =>
                value === getValues("password") ||
                "Mật khẩu nhập lại không đúng.",
            })}
          />
          <span
            className="absolute right-3  bottom-6  cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              size="lg"
            />
          </span>
          <span className="mb-3 h-[1px] text-center  text-red-900">
            {errors.confirmpassword?.message}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="p-2 border rounded"
            {...register("email", {
              required: {
                value: true,
                message: "Vui lòng nhập email.",
              },
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email chưa đúng định dạng nn@nn.nn.",
              },
            })}
          />
          <span className="mb-3 h-[1px] text-center  text-red-900">
            {errors.email?.message}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tel" className="font-medium">
            Số điện thoại
          </label>
          <input
            type="tel"
            id="tel"
            className="p-2 border rounded"
            {...register("phone", {
              required: {
                value: true,
                message: "Vui lòng nhập số điện thoại.",
              },
              pattern: {
                value: /^\+?[0-9][0-9]{9,10}$/,
                message: "Số điện thoại chưa đúng.",
              },
            })}
          />
          <span className="mb-3 h-[1px] text-center  text-red-900">
            {errors.phone?.message}
          </span>
        </div>
        <button
          type="submit"
          className="bg-red-500 rounded scale-100 w-fit py-2 px-5 self-center text-white hover:scale-105 duration-500 ease-in-out mt-5 flex items-center justify-center"
        >
          {debounce && (
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
          Đăng ký
        </button>
      </form>
    </div>
  );
}
