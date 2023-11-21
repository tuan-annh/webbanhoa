import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { addCart } from "../../../redux/CartSlice"
import formatCurrencyVND from "../../../contanst/formatPrice"

export default function ProductHomePage() {
  const category = useSelector((state) => state.json.content.category)
  const product = useSelector((state) => state.json.content.product)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleAddCart = (item) => {
    dispatch(
      addCart({
        data: item,
        count: 1,
        checked: false,
      })
    )
  }
  return (
    <div className="flex flex-col">
      {category &&
        category.map((itemCate) => (
          <div key={itemCate.id}>
            <NavLink
              to={`/${itemCate.url}`}
              className="flex justify-center text-3xl my-5 hover:text-red-500 animate-bounce"
            >
              {itemCate.category_name}
            </NavLink>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mx-2">
              {product &&
                product
                  .filter(
                    (itemPro) => itemPro.category_id === itemCate.category_id
                  )
                  .slice(0, 4)
                  .map((item) => (
                    <div key={item.id}>
                      <img
                        src={item.url_img}
                        alt=""
                        className="w-full h-[250px] object-center cursor-pointer scale-95 duration-500 ease-in-out hover:scale-100 rounded"
                        onClick={() => navigate(`/${itemCate.url}/${item.id}`)}
                      />

                      <div className="flex flex-col my-2 gap-1 justify-center items-center">
                        <span
                          className="font-semibold line-clamp-1 capitalize cursor-pointer hover:text-red-500"
                          onClick={() =>
                            navigate(`/${itemCate.url}/${item.id}`)
                          }
                        >
                          {item.product_name}
                        </span>
                        <span className="text-red-500 font-medium">
                          {formatCurrencyVND(item.price)}
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
          </div>
        ))}
    </div>
  )
}
