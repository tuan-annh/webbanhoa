import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { path } from "../../contanst/path"
import {
  checkedAll,
  checkedCart,
  editCart,
  removeCart,
} from "../../redux/CartSlice"
import { toast } from "react-toastify"
import clsx from "clsx"
import formatCurrencyVND from "../../contanst/formatPrice"

export default function ShoppingCartPage() {
  const dataShoppingCart = useSelector((state) => state.cart)
  const category = useSelector((state) => state.json.content.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const checkDataPayment =
    dataShoppingCart && dataShoppingCart.filter((item) => item.checked)

  const handleReduce = (item, index) => {
    if (item.count > 1) {
      dispatch(editCart({ id: item.data.id, quantity: -1 }))
      return
    }
    if (window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?")) {
      dispatch(removeCart(index))
      toast.success("Xóa sản phẩm thành công !!!")
    }
  }

  const handleIncrease = (item) => {
    dispatch(editCart({ id: item.data.id, quantity: 1 }))
  }

  const handleRemove = (index) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?")) {
      dispatch(removeCart(index))
      toast.success("Xóa sản phẩm thành công !!!")
    }
  }

  const handleChecked = (index) => {
    dispatch(checkedCart(index))
  }

  const handleAllCart = () => {
    dispatch(checkedAll())
  }

  const handleNextPage = (data) => {
    const url = category.find(
      (item) => item.category_id === data.data.category_id
    ).url
    navigate(`/${url}/${data.data.id}`)
  }

  if (dataShoppingCart.length === 0) {
    return (
      <div className="flex flex-col items-center my-5 gap-10">
        <img
          src="https://bambo.vn/assets/images/no-cart.png"
          alt="Giỏ hàng trống"
          className="w-2/3 md:w-auto"
        />
        <NavLink
          to={path.home}
          className="bg-red-500 py-2 px-5 rounded text-white scale-100 duration-500 ease-in-out hover:scale-110 hover:bg-red-700"
        >
          Mua sắm ngay
        </NavLink>
      </div>
    )
  }

  return (
    <div className="my-10 mx-2 xl:mx-0">
      <div className="grid grid-cols-7 text-center pr-5 border dark:border-neutral-500">
        <div className=" md:px-6 px-2 py-1 md:py-4 flex items-center justify-center">
          <input
            type="checkbox"
            onChange={handleAllCart}
            checked={dataShoppingCart.every((item) => item.checked)}
            className="cursor-pointer w-5 h-5"
          />
        </div>
        <div className="col-span-2 md:px-6 px-2 py-1 md:py-4">Sản phẩm</div>
        <div className=" md:px-6 px-2 py-1 md:py-4">Đơn giá</div>
        <div className=" md:px-6 px-2 py-1 md:py-4">Số lượng</div>
        <div className=" md:px-6 px-2 py-1 md:py-4">Số tiền</div>
        <div className=" md:px-6 px-2 py-1 md:py-4">Thao tác</div>
      </div>

      <div className="max-h-[500px] overflow-y-scroll ">
        {dataShoppingCart.map((item, index) => (
          <div
            key={item.data.id}
            className="grid grid-cols-7 text-center border dark:border-neutral-500"
          >
            <div className="whitespace-nowrap flex justify-center items-center  md:px-6 px-2 py-1 md:py-4 font-medium">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChecked(index)}
                className="cursor-pointer h-5 w-5"
              />
            </div>
            <div
              className="col-span-2  md:px-6 px-2 py-1 md:py-4 flex gap-3 line-clamp-2 items-center cursor-pointer"
              onClick={() => handleNextPage(item)}
            >
              <img
                src={item.data.url_img}
                alt=""
                className=" w-16 sm:w-20 object-cover rounded "
              />
              <span className="w-full line-clamp-2">
                {item.data.product_name}
              </span>
            </div>
            <div className="whitespace-nowrap  md:px-6 px-2 py-1 md:py-4 flex justify-center items-center">
              {formatCurrencyVND(item.data.price)}
            </div>
            <div className="whitespace-nowrap  md:px-6 px-2 py-1 md:py-4 h-full gap-1 md:gap-3 sm:gap-1 flex justify-center items-center">
              <span
                className="bg-slate-200 w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-400 cursor-pointer"
                onClick={() => handleReduce(item, index)}
              >
                -
              </span>
              <span>{item.count}</span>
              <span
                className="bg-slate-200 w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-400 cursor-pointer"
                onClick={() => handleIncrease(item)}
              >
                +
              </span>
            </div>
            <div className="whitespace-nowrap  md:px-6 px-2 py-1 md:py-4 flex justify-center items-center">
              {formatCurrencyVND(item.data.price * item.count)}
            </div>
            <div
              className="whitespace-nowrap  md:px-6 px-2 py-1 md:py-4 hover:text-red-500 cursor-pointer flex justify-center items-center"
              onClick={() => handleRemove(index)}
            >
              Xoá
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 border dark:border-neutral-500">
        <div className="whitespace-nowrap col-span-4 text-center  md:px-6 px-2 py-1 md:py-4">
          Tổng cộng
        </div>
        <div className="whitespace-nowrap text-center  md:px-6 px-2 py-1 md:py-4 col-span-2">
          {formatCurrencyVND(
            dataShoppingCart
              .filter((item) => item.checked)
              .reduce((acc, cur) => acc + cur.count * cur.data.price, 0)
          )}
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <button
          className="bg-slate-300 opacity-80 hover:opacity-100 px-5 py-2 rounded"
          onClick={() => navigate(path.home)}
        >
          Tiếp tục mua sắm
        </button>
        <button
          className={clsx("bg-red-600 text-white px-5 py-2 rounded", {
            "cursor-no-drop": checkDataPayment.length === 0 ? true : false,
            "hover:outline hover:outline-slate-300":
              checkDataPayment.length > 0 ? true : false,
          })}
          onClick={() => navigate(path.payment)}
          disabled={checkDataPayment.length === 0 ? true : false}
        >
          Thanh toán
        </button>
      </div>
    </div>
  )
}
