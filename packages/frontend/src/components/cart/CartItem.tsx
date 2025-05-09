import { useDispatch } from 'react-redux';
import { removeItem, editItem } from '../../features';
import { cartItem } from '../../types';
import { formatPrice } from '../../utils';
import { generateAmountOptions } from '../../utils/generateAmountOptions';

export type cartItemProps = {
  cartItem: cartItem;
};

export const CartItem = (props: cartItemProps) => {
  const cartItem = props.cartItem;

  const dispatch = useDispatch();
  const removeItemFromCart = () => {
    dispatch(removeItem({ cartId: cartItem.cartId }));
  };
  const handleAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      editItem({
        cartId: cartItem.cartId,
        amount: parseInt(e.target.value),
      })
    );
  };
  return (
    <article
      key={cartItem.cartId}
      className="mb-12 flex gpy-y-4 flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={import.meta.env.VITE_BASE_IMG_URL + cartItem.main_img_url}
        alt={cartItem.title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="ml-4 sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{cartItem.title}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-neutral-content">{cartItem.company}</h4>
        {/* COLOR
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color:
          <span className="badge badge-sm" style={{ backgroundColor: cartItem.productColor }}></span>
        </p> */}
      </div>
      <div className="ml-4 sm:ml-24">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Ilość</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-border select-xs"
            value={cartItem.amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(cartItem.amount + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button className="mt-2 link link-primary link-hover text-sm" onClick={removeItemFromCart}>
          usuń
        </button>
      </div>
      {/* PRICE */}
      {cartItem.price ? (
        <p className="font-medium ml-4 sm:ml-auto mt-2 sm:mt-0">{formatPrice(cartItem.price)}</p>
      ) : null}
    </article>
  );
};
