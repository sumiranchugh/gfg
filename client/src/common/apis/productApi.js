import { PRODUCTS_FILTER, PRODUCTS } from "../URLS";

export const filterProductsAPI = (searchTxt, callback, errorCallback) => {
  fetch(PRODUCTS_FILTER + searchTxt)
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => {
      console.log(err);
      errorCallback({
        state: true,
        message: "Oh snap! Cables broken :( "
      });
    });
};

export const fetchProductsAPI = (callback, errorCallback) => {
  fetch(PRODUCTS)
    .then(res => {
      if (res.status !== 200) {
        throw new Error();
      }
      return res.json();
    })
    .then(data => callback(data))
    .catch(err => {
      console.log(err);
      errorCallback({
        state: true,
        message: "Oh snap! Cables broken :( "
      });
    });
};
