import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          className="bg-red-500 rounded scale-100 w-fit py-2 px-5 self-center text-white hover:scale-105 duration-500 ease-in-out mt-5"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
