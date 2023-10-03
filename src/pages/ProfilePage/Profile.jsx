import { useEffect, useState } from "react";
import { userApi } from "../../service/userApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { register, handleSubmit } = useForm();

  const [allUser, setAllUser] = useState();
  const localData = localStorage.getItem("user");
  const userLocal = JSON.parse(localData).account;
  const accountUser =
    allUser && allUser.find((item) => item.username === userLocal);

  const getAllUser = async () => {
    try {
      const res = await userApi.GetAllUser();
      if (res.status) {
        setAllUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const onSubmit = async (data) => {
    if (
      data.phone === accountUser.phone &&
      data.address ===
        accountUser.address.number +
          " , " +
          accountUser.address.street +
          " , " +
          accountUser.address.city
    ) {
      toast.info("Bạn chưa có thay đổi nào");
      return;
    }
    try {
      const res = await userApi.updateUser(accountUser.id, {
        username: userLocal,
        phone: data.phone,
        city: data.city,
      });
      if (res.status) {
        toast.success("Thay đổi thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!accountUser) {
    return (
      <div
        role="status"
        className="w-full h-[500px] flex justify-center items-center"
      >
        <svg
          aria-hidden="true"
          className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
      </div>
    );
  }
  return (
    <div className="w-[650px] mx-auto my-10">
      <span className="flex justify-center text-2xl">Thông tin cá nhân</span>
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
            disabled
            value={accountUser.username}
            className="p-2 border rounded capitalize"
            {...register("username")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            defaultValue={
              accountUser.address.number +
              " , " +
              accountUser.address.street +
              " , " +
              accountUser.address.city
            }
            className="p-2 border rounded capitalize"
            {...register("address")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tel" className="font-medium">
            Số điện thoại
          </label>
          <input
            type="tel"
            id="tel"
            defaultValue={accountUser.phone}
            className="p-2 border rounded"
            {...register("phone")}
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 rounded scale-100 w-fit py-2 px-5 self-center text-white hover:scale-105 duration-500 ease-in-out mt-5"
        >
          Lưu thông tin
        </button>
      </form>
    </div>
  );
}
