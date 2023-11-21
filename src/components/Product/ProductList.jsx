import { Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { addCart } from "../../redux/CartSlice"
import { sortFilterProduct } from "./SortProduct"

export default function ProductList() {
  const dispatch = useDispatch()
  const { url } = useParams()
  const navigate = useNavigate()
  const urlLink = useLocation()
  const [page, setPage] = useState(1)
  const [selectSort, setSelectSort] = useState("default")
  const categoryList = useSelector((state) => state.json.content.category)
  const productList = useSelector((state) => state.json.content.product)
  const categoryId =
    categoryList && categoryList.find((item) => item.url === url).category_id
  const productListById =
    productList && productList.filter((item) => item.category_id === categoryId)
  const totalPage = productListById && Math.ceil(productListById.length / 8)
  const handleChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const productListFilterChange =
    productListById && productListById.splice((page - 1) * 8, 8)

  useEffect(() => {
    setPage(1)
    setSelectSort("default")
  }, [urlLink.pathname])

  const handleAddCart = (item) => {
    dispatch(
      addCart({
        data: item,
        count: 1,
        checked: false,
      })
    )
  }

  if (!productListById) {
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
    <div className="flex flex-col items-center gap-5 my-5">
      <div className="border border-black/50 rounded-md   ">
        <label htmlFor="sort" className=" p-2 bg-slate-300 rounded-l-md h-full">
          Sắp xếp theo
        </label>
        <select
          name={selectSort}
          value={selectSort}
          id="sort"
          className="p-2 rounded-r-md border-l border-black/50"
          onChange={(e) => setSelectSort(e.target.value)}
        >
          <option value="default">Mặc đinh</option>
          <option value="name_asc">Tên (A-Z)</option>
          <option value="name_desc">Tên (Z-A)</option>
          <option value="price_asc">Giá (Thấp &gt; Cao)</option>
          <option value="price_desc">Giá (Cao &gt; Thấp)</option>
        </select>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {sortFilterProduct[selectSort](productListFilterChange).map((item) => (
          <div key={item.id}>
            <img
              src={item.url_img}
              alt=""
              className="w-full h-[250px] object-center cursor-pointer scale-95 duration-500 ease-in-out hover:scale-100 rounded"
              onClick={() => navigate(`/${url}/${item.id}`)}
            />
            <div className="flex flex-col my-2 gap-1 justify-center items-center">
              <span className="font-semibold line-clamp-1 capitalize">
                {item.product_name}
              </span>
              <span className="text-red-500 font-medium">
                {item.price.toLocaleString()} VND
              </span>
              <button
                className="bg-red-500 px-5 uppercase rounded-md text-white py-1 hover:bg-red-700 "
                onClick={() => handleAddCart(item)}
              >
                thêm giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Pagination count={totalPage} page={page} onChange={handleChange} />
      </div>
    </div>
  )
}
