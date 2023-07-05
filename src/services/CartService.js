import { BaseService } from "./baseService";

class CartService extends BaseService {
  addToCart = (data) => {
    return this.post(`/api/cart/add-service-to-cart`, data);
  };
  removeServiceFromCart = (id) => {
    return this.delete(`/api/cart/remove-service-from-cart/${id}`);
  };
  getCartItemByCategory = (category) => {
    return this.get(`/api/cart/cart-item`, { category });
  };
  getCartItemCheckout = (cartItems) => {
    return this.get(`/api/cart/checkout`, { cartItems });
  };
}

export const cartService = new CartService();
