import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { path } from "../../contanst/path";

export default function Thanks() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col my-10 items-center gap-3 mx-2">
      <span>Đặt hàng thành công</span>
      <FontAwesomeIcon
        icon={faCircleCheck}
        style={{ color: "#45aa31" }}
        size="2xl"
        className="animate-bounce"
      />
      <span className="text-center">
        Nhân viên CSKH của chúng tôi sẽ gọi đến quý khách trong 5 phút nữa để
        xác nhận đơn hàng.
        <br />
        Xin lưu ý, đơn hàng sẽ chỉ được thực hiện sau khi việc xác nhận được
        hoàn tất.
      </span>
      <span>Flower Corner xin cảm ơn.</span>
      <button
        className="py-2 px-4 rounded text-white hover:outline hover:outline-red-200 hover:outline-offset-2 bg-red-500"
        onClick={() => navigate(path.home)}
      >
        Tiếp tục
      </button>
    </div>
  );
}
