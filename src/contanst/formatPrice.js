export default function formatCurrencyVND(amount) {
  // Chia số tiền thành phần nguyên
  const integerPart = Math.floor(amount).toString()

  // Thêm dấu phẩy ngăn cách hàng nghìn vào phần nguyên
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // Kết hợp phần nguyên và thêm ký hiệu tiền tệ VND
  const formattedAmount = `${formattedIntegerPart} ₫`

  return formattedAmount
}
