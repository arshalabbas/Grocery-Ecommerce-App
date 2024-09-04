import { useCartStore } from "@/stores/useCartStore";
import CountButton from "../ui/CountButton";
import { useUser } from "@/stores/useUserStore";

interface Props {
  id: string;
  image: string;
  title: string;
  price: number;
  unit: string;
}

const CartButton = ({ id, image, title, price, unit }: Props) => {
  const location = useUser((state) => state.location);
  const cartProduct = useCartStore((state) => state.products)?.find(
    (item) => item.id === id,
  );
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const addProduct = useCartStore((state) => state.addProduct);

  const onIncrementQuantity = () => {
    if (cartProduct) {
      incrementQuantity(id);
    } else {
      addProduct({
        id,
        image: image,
        title: title,
        quantity: 1,
        price: price,
        unit: unit,
        district: location.district,
      });
    }
  };

  const onDecrementQuantity = () => {
    decrementQuantity(id);
  };
  return (
    <CountButton
      count={cartProduct?.quantity || 0}
      onIncrementCount={onIncrementQuantity}
      onDecrementCount={onDecrementQuantity}
    />
  );
};

export default CartButton;
