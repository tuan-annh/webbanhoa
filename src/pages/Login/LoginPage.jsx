import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { path } from "../../contanst/path";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
          className="bg-red-500 rounded scale-100 w-fit py-2 px-5 self-center text-white hover:scale-105 duration-500 ease-in-out"
        >
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
  );
}
