import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { userApi } from "../../service/userApi";
import getCurrentDateTime from "../../contanst/date";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { path } from "../../contanst/path";

export default function ModalBuyCart({ setshowModal, categoryItem }) {
  const [animate, setAnimate] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await userApi.PostCart({
        name: data.name,
        phone: data.phone,
        date: getCurrentDateTime(),
        product: { productId: categoryItem.id, quantity: 1 },
      });
      if (res.status) {
        toast.success("Đặt hàng thành công.");

        setTimeout(() => {
          setshowModal(false);
        }, 500);
        setAnimate(false);

        setTimeout(() => {
          navigate(path.booknow);
        }, 2000);
      }
    } catch (error) {
      toast.error("Đặt hàng thất bại . Vui lòng thử lại!!!");
    }
  };

  return createPortal(
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-black/20 z-50"
      onClick={() => {
        setTimeout(() => {
          setshowModal(false);
        }, 500);
        setAnimate(false);
      }}
    >
      <div className="flex justify-center h-full mt-40 items-start md:mt-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            "w-[600px] mx-2 bg-white p-5 rounded-lg duration-700 ease-in-out flex flex-col gap-2",
            {
              "opacity-100 translate-y-0": animate,
              "opacity-0 -translate-y-full": !animate,
            }
          )}
        >
          <span className="border-b border-black text-xl pb-3">
            ĐẶT HOA NHANH
          </span>
          <span>
            Quý khách vui lòng điền thông tin bên dưới và bấm nút đặt hàng, nhân
            viên chúng tôi sẽ gọi quý khách trong ít phút để hỗ trợ đặt hàng:
          </span>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex md:flex-row flex-col gap-4">
              <div className="flex flex-col md:basis-1/2 gap-1">
                <label htmlFor="">Họ và tên</label>
                <input
                  type="text"
                  required
                  placeholder="Họ và tên"
                  className="p-2 border rounded"
                  {...register("name")}
                />
              </div>
              <div className="flex flex-col md:basis-1/2 gap-1">
                <label htmlFor="">Số điện thoại</label>
                <input
                  type="tel"
                  required
                  placeholder="Số điện thoại"
                  className="p-2 border rounded"
                  {...register("phone")}
                />
              </div>
            </div>
            <span>* Đặt hoa nhanh từ 7:00-20:00</span>
            <div className="border-t border-black pt-3 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-black text-white hover:outline hover:outline-red-200 hover:outline-offset-2 rounded text-lg"
                onClick={() => {
                  setTimeout(() => {
                    setshowModal(false);
                  }, 1000);
                  setAnimate(false);
                }}
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 hover:outline hover:outline-red-200 hover:outline-offset-2 rounded text-white text-lg"
              >
                Gửi đơn hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
