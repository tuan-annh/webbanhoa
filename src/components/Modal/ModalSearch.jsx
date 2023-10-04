import { TextField } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FilterText, listFilterChanges } from "../../redux/JsonDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ModalSearch({ setshowModalSearch }) {
  const [animate, setAnimate] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const filterSearchList = useSelector(listFilterChanges);
  const listCategory = useSelector((state) => state.json.content.category);
  const navigate = useNavigate();
  useEffect(() => {
    setAnimate(true);
    dispatch(FilterText(""));
  }, [dispatch]);

  const handleNextSearch = (item) => {
    const url = listCategory.find(
      (cate) => cate.category_id === item.category_id
    ).url;
    setTimeout(() => {
      setshowModalSearch(false);
      navigate(`/${url}/${item.id}`);
    }, 1000);
    setAnimate(false);
  };

  return createPortal(
    <div
      className="fixed left-0 right-0 bottom-0 top-0 bg-black/20 z-50"
      onClick={() => {
        setTimeout(() => {
          setshowModalSearch(false);
        }, 1000);
        setAnimate(false);
      }}
    >
      <div className="h-full pt-10">
        <div
          className={clsx(
            "h-[90%] w-[700px] mx-auto  duration-1000 bg-white ease-in-out p-4 rounded-md",
            {
              "opacity-100 scale-100": animate,
              "opacity-100 scale-0": !animate,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-full text-end my-2 pr-2"
            onClick={() => {
              setTimeout(() => {
                setshowModalSearch(false);
              }, 1000);
              setAnimate(false);
            }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="xl"
              className="hover:text-red-500 cursor-pointer"
            />
          </div>
          <TextField
            value={text}
            label="tìm kiếm"
            className="bg-white rounded w-full"
            onChange={(e) => {
              setText(e.target.value);
              dispatch(FilterText(e.target.value));
            }}
          />
          <div className="h-5/6 overflow-y-auto mt-5 rounded">
            {filterSearchList &&
              filterSearchList.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-3 gap-2 bg-white p-2 cursor-pointer hover:bg-white/80"
                  onClick={() => handleNextSearch(item)}
                >
                  <img
                    src={item.url_img}
                    alt=""
                    className="w-2/3 mx-auto border rounded-md object-cover"
                  />
                  <span className="col-span-2 flex items-center">
                    {item.product_name}
                  </span>
                </div>
              ))}
            {!filterSearchList && text && <span>Không có sản phẩm nào.</span>}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ModalSearch;
