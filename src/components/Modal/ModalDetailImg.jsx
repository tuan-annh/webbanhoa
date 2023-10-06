import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function ModalDetailImg({ setshowModalImg, categoryItem }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);
  return createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center z-50"
      onClick={() => {
        setTimeout(() => {
          setshowModalImg(false);
        }, 500);
        setAnimate(false);
      }}
    >
      <div className="" onClick={(e) => e.stopPropagation()}>
        <div
          className={clsx("duration-700 ease-in-out mx-5", {
            "scale-0 opacity-0": !animate,
            "scale-100 opacity-100": animate,
          })}
        >
          <div
            className="flex justify-end mb-2"
            onClick={() => {
              setTimeout(() => {
                setshowModalImg(false);
              }, 500);
              setAnimate(false);
            }}
          >
            <FontAwesomeIcon
              icon={faX}
              size="xl"
              className="text-white/70 hover:text-white/100 cursor-pointer rotate-0 duration-700 ease-in-out hover:rotate-180"
            />
          </div>
          <img
            src={categoryItem.url_img}
            className="w-[500px] object-contain rounded"
            alt=""
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
