import { useSelector } from 'react-redux';
import { cartState } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils';

export const CartTotals = () => {
  const cartState = useSelector(
    (state: { cartState: cartState }) => state.cartState
  );

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">
            {formatPrice(cartState.cartTotal)} $
          </span>
        </p>
        {/* SHIPPING */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">
            {formatPrice(cartState.shipping)} $
          </span>
        </p>
        {/* TAX */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(cartState.tax)} $</span>
        </p>
        {/* ORDER TOTAL */}
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span>Order Total</span>
          <span className="font-medium">
            {formatPrice(cartState.orderTotal)} $
          </span>
        </p>
      </div>
    </div>
  );
};
