import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../src/App.css";
import { useSelector } from "react-redux";
import ContentHomePage from "./ContentHome/ContentHomePage";
import ProductHomePage from "./ProductHomepage/ProductHomePage";
export default function HomePage() {
  const imgSlider = useSelector((state) => state.json.header.images_slide);
  const uuDai = useSelector((state) => state.json.header.uudai);
  return (
    <div className="flex flex-col gap-5 my-5">
      {/* Slider */}
      <div className="border-[6px] border-white shadow-lg">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {imgSlider &&
            imgSlider.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item} alt="" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {uuDai &&
          uuDai.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={item.img_url} alt="" className="w-28 object-cover " />
              <span className="text-center font-medium text-xl">
                {item.title}
              </span>
              <span className="text-center">{item.content}</span>
            </div>
          ))}
      </div>

      <div>
        <ProductHomePage />
      </div>

      <div>
        <ContentHomePage />
      </div>
    </div>
  );
}
