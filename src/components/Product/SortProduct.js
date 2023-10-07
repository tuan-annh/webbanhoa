export const sortFilterProduct = {
  price_asc: (data) => {
    return data.sort((a, b) => a.price - b.price);
  },
  price_desc: (data) => {
    return data.sort((a, b) => b.price - a.price);
  },
  name_asc: (data) => {
    return data.sort((a, b) => a.product_name.localeCompare(b.product_name));
  },
  name_desc: (data) => {
    return data.sort((a, b) => b.product_name.localeCompare(a.product_name));
  },
  default: (data) => {
    return data;
  },
};
