import { useParams } from "react-router-dom";
import {
  ShopBuyDisplay,
  ShopCreateDisplay,
  ShopDisplay,
  ShopSellDisplay,
} from "../components/shop";

const ShopPage = (_props: unknown) => {
  // get query param id
  const { id } = useParams();
  console.info("ShopPage id: ", id);
  let content = <div></div>;

  switch (id) {
    case "buy":
      content = <ShopBuyDisplay />;
      break;
    case "create":
      content = <ShopCreateDisplay />;
      break;
    case "sell":
      content = <ShopSellDisplay />;
      break;
    default:
      content = <ShopDisplay />;
      break;
  }
  return content;
};

export default ShopPage;
