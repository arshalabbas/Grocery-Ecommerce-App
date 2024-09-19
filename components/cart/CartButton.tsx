import { useCartStore } from "@/stores/useCartStore";
import CountButton from "../ui/CountButton";
import { useUser } from "@/stores/useUserStore";
import * as Haptics from "expo-haptics";

interface Props {
  id: string;
  image: string;
  title: string;
  price: number;
  unit: string;
  fixedQuantity: number;
  allowedLimit: number;
  stock: number;
}

const CartButton = ({
  id,
  image,
  title,
  price,
  unit,
  fixedQuantity,
  allowedLimit,
  stock,
}: Props) => {
  const location = useUser((state) => state.location);
  const cartProduct = useCartStore((state) => state.products)?.find(
    (item) => item.id === id,
  );
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const addProduct = useCartStore((state) => state.addProduct);

  const onIncrementQuantity = () => {
    Haptics.selectionAsync();
    if (cartProduct) {
      incrementQuantity(id);
    } else {
      addProduct({
        id,
        image,
        title,
        quantity: 1,
        price,
        unit,
        district: location.district,
        fixedQuantity,
        allowedLimit,
        stock,
      });
    }
  };

  const onDecrementQuantity = () => {
    Haptics.selectionAsync();
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
