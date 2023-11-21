import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { addCart } from "../../redux/CartSlice"
import { useEffect, useState } from "react"
import ModalBuyCart from "../Modal/ModalBuyCart"
import ModalDetailImg from "../Modal/ModalDetailImg"

export default function ProductDetails() {
  const { url, id } = useParams()
  const urlLink = useLocation()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const categoryList = useSelector((state) => state.json.content.product)
  const [showModal, setshowModal] = useState(false)
  const [showModalImg, setshowModalImg] = useState(false)
  const spttUrl = useSelector((state) => state.json.content.category)
  const idSpttUrl = spttUrl && spttUrl.find((item) => item.url === url)
  const listSpttUrl =
    categoryList &&
    categoryList.filter((item) => item.category_id === idSpttUrl.category_id)
  const navigate = useNavigate()
  const categoryItem = categoryList && categoryList[id - 1]
  const handleIncrease = () => {
    setCount(count + 1)
  }
  console.log(categoryItem)

  const handleReduce = () => {
    if (count === 1) {
      return
    }
    setCount(count - 1)
  }
  const handleAddCart = () => {
    dispatch(
      addCart({
        data: categoryItem,
        count: count,
        checked: false,
      })
    )
  }
  const handleAddCartSPLQ = (item) => {
    dispatch(
      addCart({
        data: item,
        count: 1,
        checked: false,
      })
    )
  }

  useEffect(() => {
    setCount(1)
  }, [urlLink])

  if (!categoryItem) {
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
    )
  }

  return (
    <div className="my-5 flex flex-col gap-10">
      <div className="mx-4 sm:mx-0 grid grid-cols-1 sm:grid-cols-2 gap-14">
        <div className="w-full p-2 border rounded-lg ">
          <img
            src={categoryItem.url_img}
            alt={categoryItem.product_name}
            className="mx-auto sm:w-full cursor-pointer object-cover"
            onClick={() => setshowModalImg(true)}
          />
        </div>

        <div className="flex flex-col gap-4 items-center sm:items-start">
          <span className="text-3xl pb-2 border-b border-slate-300 capitalize">
            {categoryItem.product_name}
          </span>
          <span className="text-red-500 text-2xl border-slate-300 pb-2 border-b">
            {categoryItem.price.toLocaleString()} VND
          </span>
          <div className="flex gap-2">
            <span className="font-medium">Khuyến mãi:</span>
            <span className="bg-[#ffe1e1] px-3 border-dashed border-black/70 rounded text-red-700 font-medium border">
              Giảm 50K
            </span>
            <span className="bg-[#ffe1e1] px-3 border-dashed border-black/70 rounded text-red-700 font-medium border">
              Giảm 25K
            </span>
            <span className="bg-[#ffe1e1] px-3 border-dashed border-black/70 rounded text-red-700 font-medium border">
              Giảm 10%
            </span>
          </div>
          <span className="flex gap-2 items-center">
            <span className="font-medium">Gọi ngay:</span>
            <span className=" px-4 rounded bg-[#ffe1e1] text-red-700 font-medium text-2xl">
              1900 633 045
            </span>
          </span>
          <div className="flex gap-5 items-center">
            <span className="font-medium">Số lượng:</span>
            <div className="flex gap-2">
              <span
                className="bg-slate-300 w-7 h-7 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-500 hover:text-white"
                onClick={handleReduce}
              >
                -
              </span>
              <span className="h-7 flex items-center">{count}</span>
              <span
                className="bg-slate-300 w-7 h-7 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-500 hover:text-white"
                onClick={handleIncrease}
              >
                +
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-orange-400 py-2 px-5 rounded-lg text-white hover:outline hover:outline-2 hover:outline-slate-300 hover:outline-offset-2"
              onClick={handleAddCart}
            >
              Thêm giỏ hàng
            </button>
            <button
              className="bg-red-400 py-2 px-5 rounded-lg text-white hover:outline hover:outline-2 hover:outline-slate-300 hover:outline-offset-2"
              onClick={() => setshowModal(!showModal)}
            >
              Đặt ngay
            </button>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-2 items-center">
              <img
                className="w-16"
                src="https://www.flowercorner.vn/image/icon/60mins.png"
                alt=""
              />
              <span className="opacity-80">Giao hoa NHANH trong 60 phút</span>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-16"
                src="https://www.flowercorner.vn/image/icon/freegifts.png"
                alt=""
              />
              <span className="opacity-80">
                Tặng miễn phí thiệp hoặc banner
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mx-2">
        <span className="text-2xl underline underline-offset-4 capitalize">
          {categoryItem.detail_product.title}
        </span>
        <span className="text-justify">
          {categoryItem.detail_product.content}
        </span>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <span className="text-2xl underline underline-offset-4 capitalize">
          Sản phẩm liên quan
        </span>
        <div className="grid  grid-cols-4 gap-5">
          {listSpttUrl &&
            listSpttUrl
              .filter((item) => item.id !== categoryItem.id)
              .slice(0, 4)
              .map((item) => (
                <div key={item.id}>
                  <img
                    src={item.url_img}
                    alt=""
                    className="w-full h-[250px] object-center cursor-pointer shadow scale-95 duration-500 ease-in-out hover:scale-100 rounded"
                    onClick={() => navigate(`/${url}/${item.id}`)}
                  />
                  <div className="flex flex-col my-2 gap-1 justify-center items-center">
                    <span className="font-semibold line-clamp-1">
                      {item.product_name}
                    </span>
                    <span className="text-red-500 font-medium">
                      {item.price.toLocaleString()} VND
                    </span>
                    <button
                      className="bg-red-500 px-5 uppercase rounded-md text-white py-1 hover:bg-red-700 "
                      onClick={() => handleAddCartSPLQ(item)}
                    >
                      thêm giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      {showModal && (
        <ModalBuyCart setshowModal={setshowModal} categoryItem={categoryItem} />
      )}
      {showModalImg && (
        <ModalDetailImg
          setshowModalImg={setshowModalImg}
          categoryItem={categoryItem}
        />
      )}
    </div>
  )
}
