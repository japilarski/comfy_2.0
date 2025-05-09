import { useSelector } from 'react-redux';
import { cartState } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils';

export const CartTotals = () => {
  const cartState = useSelector((state: { cartState: cartState }) => state.cartState);

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Wartość produktów</span>
          <span className="font-medium">{formatPrice(cartState.cartTotal)} zł</span>
        </p>
        {/* SHIPPING */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Dostawa od</span>
          <span className="font-medium">{formatPrice(cartState.shipping)} zł</span>
        </p>
        {/* ORDER TOTAL */}
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span>Razem</span>
          <span className="font-medium">{formatPrice(cartState.orderTotal)} zł</span>
        </p>
      </div>
    </div>
  );
};
