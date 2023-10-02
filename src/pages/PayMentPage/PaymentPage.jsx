import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { path } from "../../contanst/path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import clsx from "clsx";
import { paymentCart, removeCartById } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { userApi } from "../../service/userApi";
import getCurrentDateTime from "../../contanst/date";

export default function PaymentPage() {
  const { register, handleSubmit } = useForm();
  const dataShoppingCart = useSelector((state) => state.cart);
  const [buy, setBuy] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = () => {
    setBuy(true);
  };

  const checkDataPayment =
    dataShoppingCart && dataShoppingCart.filter((item) => item.checked);

  const handleOrderCart = async () => {
    try {
      const res = await userApi.PostCart({
        date: getCurrentDateTime(),
        products: [...checkDataPayment].map((item) => {
          return { productId: item.data.id, quantity: item.count };
        }),
      });
      if (res.status) {
        dispatch(paymentCart());
        toast.success("Đặt hàng thành công");
      }
    } catch (error) {
      toast.error("Đặt hàng thất bại.");
    }
  };

  if (checkDataPayment.length === 0) {
    return <Navigate to={path.home} />;
  }

  return (
    <div className="mx-5 xl:mx-0 grid md:grid-cols-5 gap-5 my-10">
      <div
        className={clsx("md:col-span-3", {
          "opacity-100": !buy,
          "opacity-50": buy,
        })}
      >
        <span className="flex border-b border-slate-400 text-xl py-2 mb-4 md:justify-start justify-center">
          Thông tin người nhận
        </span>
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="hovaten">
                Họ và tên *
              </label>
              <input
                disabled={buy}
                required
                type="text"
                placeholder="Họ tên"
                id="hovaten"
                className={clsx("p-2 border border-slate-300 rounded", {
                  "cursor-no-drop": buy,
                })}
                {...register("hovaten")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="dienthoai">
                Điện thoại *
              </label>
              <input
                disabled={buy}
                required
                type="tel"
                placeholder="Điện thoại"
                id="dienthoai"
                className={clsx("p-2 border border-slate-300 rounded", {
                  "cursor-no-drop": buy,
                })}
                {...register("dienthoai")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="diachi">
              Địa chỉ *
            </label>
            <input
              disabled={buy}
              required
              type="text"
              placeholder="Địa chỉ"
              id="diachi"
              className={clsx("p-2 border border-slate-300 rounded", {
                "cursor-no-drop": buy,
              })}
              {...register("diachi")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="loinhan">
              Lời nhắn [Cho người nhận]
            </label>
            <textarea
              disabled={buy}
              id="loinhan"
              rows="3"
              className={clsx("p-2 border border-slate-300 rounded", {
                "cursor-no-drop": buy,
              })}
              {...register("loinhan")}
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="yeucau">
              Yêu cầu, lưu ý [cho flowercorner.vn]
            </label>
            <textarea
              disabled={buy}
              id="yeucau"
              rows="2"
              className={clsx("p-2 border border-slate-300 rounded", {
                "cursor-no-drop": buy,
              })}
              {...register("yeucau")}
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="anthongtin" className="font-medium">
              Ẩn thông tin
            </label>
            <div className="flex gap-2 items-center">
              <input
                disabled={buy}
                type="checkbox"
                value="anthongtinnguoigui"
                {...register("checked")}
                className={clsx("w-4 h-4", {
                  "cursor-pointer": !buy,
                  "cursor-no-drop": buy,
                })}
              />
              <span>Ẩn thông tin người gửi</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={buy}
            className={clsx(
              "w-fit self-end p-2 bg-red-500 rounded text-white",
              {
                "hover:outline-none hover:outline-red-200": !buy,
                "cursor-no-drop": buy,
              }
            )}
          >
            Xác nhận và tiếp tục
          </button>
        </form>
      </div>

      <div
        className={clsx("md:col-span-2", {
          "opacity-100": buy,
          "opacity-50": !buy,
        })}
      >
        <span className="flex border-b border-slate-400 text-xl py-2 mb-4 md:justify-start justify-center">
          Chi tiết đơn hàng
        </span>
        <div className="grid grid-cols-10 text-center">
          <div className="col-span-2 border border-slate-300 p-2">#</div>
          <div className="col-span-4 border border-slate-300 p-2">
            Tên sản phẩm
          </div>
          <div className="col-span-3 border border-slate-300 p-2">
            Tổng cộng
          </div>
          <div className="col-span-1 border border-slate-300 p-2"></div>
        </div>
        {checkDataPayment.map((item) => (
          <div className="grid grid-cols-10 text-center" key={item.data.id}>
            <div className="col-span-2 border border-slate-300">
              <img
                src={item.data.url_img}
                alt=""
                className="w-16 h-16 mx-auto my-3"
              />
            </div>
            <div className="col-span-4 border border-slate-300 flex justify-center items-center">
              {item.count} x {item.data.product_name}
            </div>
            <div className="col-span-3 border border-slate-300 flex justify-center items-center">
              {(item.data.price * item.count).toLocaleString()}VND
            </div>
            <div
              className="col-span-1 border border-slate-300 flex justify-center items-center cursor-pointer"
              onClick={() => dispatch(removeCartById(item.data.id))}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-10">
          <div className="col-span-6 border border-slate-300 text-end p-2">
            Tổng phụ
          </div>
          <div className="col-span-4 border border-slate-300 text-end p-2">
            {checkDataPayment
              .reduce((acc, cur) => acc + cur.count * cur.data.price, 0)
              .toLocaleString()}
            VND
          </div>
        </div>
        <div className="grid grid-cols-10">
          <div className="col-span-6 border border-slate-300 text-end p-2">
            Phí vận chuyển
          </div>
          <div className="col-span-4 border border-slate-300 text-end p-2">
            60,000VND
          </div>
        </div>
        <div className="grid grid-cols-10">
          <div className="col-span-6 border border-slate-300 text-end p-2">
            Tổng cộng
          </div>
          <div className="col-span-4 border border-slate-300 text-end p-2">
            {checkDataPayment
              .reduce((acc, cur) => acc + cur.count * cur.data.price, 60000)
              .toLocaleString()}
            VND
          </div>
        </div>
        <div className="my-3">
          <label htmlFor="chonphuongthucthanhtoan">
            Chọn phương thức thanh toán
          </label>
          <select
            disabled={!buy}
            defaultValue="a"
            id="chonphuongthucthanhtoan"
            className={clsx("w-full border rounded p-1 mt-1", {
              "cursor-no-drop": !buy,
              "cursor-pointer": buy,
            })}
          >
            <option value="a">Chuyển khoản ngân hàng</option>
            <option value="">Thẻ ATM, Visa, Master, QR (VNPAY)</option>
            <option value="">Thẻ Visa, Master (Tazapay) </option>
            <option value="">Ví điện tử </option>
            <option value="">Paypal (Paypal, Thẻ Visa, Master)</option>
          </select>
        </div>
        <div
          className={clsx("flex lg:flex-row md:flex-col  gap-2", {
            "justify-end": !buy,
            "justify-between": buy,
          })}
        >
          {buy && (
            <button
              className={clsx(" text-white px-5 py-2 rounded", {
                "cursor-no-drop bg-black/50": !buy,
                "hover:outline hover:outline-slate-300 bg-black": buy,
              })}
              disabled={!buy}
              onClick={() => setBuy(false)}
            >
              Chỉnh sửa thông tin
            </button>
          )}

          <button
            className={clsx(" text-white px-5 py-2 rounded", {
              "cursor-no-drop bg-red-300": !buy,
              "hover:outline hover:outline-slate-300 bg-red-600": buy,
            })}
            disabled={!buy}
            onClick={handleOrderCart}
          >
            Xác nhận đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
