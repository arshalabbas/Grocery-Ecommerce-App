import IconButton from "../ui/IconButton";
import { icons } from "@/constants";
import * as Haptics from "expo-haptics";
import { useCartStore } from "@/stores/useCartStore";
import { useUser } from "@/stores/useUserStore";
import { ImageSource } from "expo-image";
import { useRouter } from "expo-router";

interface Props {
  id: string;
  title: string;
  image: ImageSource;
  price: number;
  unit: string;
  fixedQuantity: number;
  allowedLimit: number;
  stock: number;
}

const ProductCartButton = ({
  id,
  title,
  image,
  price,
  unit,
  fixedQuantity,
  allowedLimit,
  stock,
}: Props) => {
  const router = useRouter();

  const cartData = useCartStore((state) => state.products).find(
    (item) => item.id === id,
  );
  const addProduct = useCartStore((state) => state.addProduct);
  const location = useUser((state) => state.location);

  const onPressCartButton = () => {
    Haptics.selectionAsync();

    if (!cartData) {
      addProduct({
        id,
        title,
        image: image as string,
        district: location.district,
        price,
        quantity: 1,
        unit,
        fixedQuantity,
        allowedLimit,
        stock,
      });
    } else {
      router.push(`/(root)/product/${id}`);
    }
  };

  return (
    <IconButton
      disabled={stock <= 0}
      icon={cartData ? icons.bagSuccess : icons.bag}
      className={cartData && "bg-secondary"}
      onPress={onPressCartButton}
    />
  );
};

export default ProductCartButton;
