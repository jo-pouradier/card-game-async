import { Shop } from "./Shop";
import { ShopBuy } from "./ShopBuy";
import { ShopCreate } from "./ShopCreate";
import { ShopLayout } from "./ShopLayout";
import { ShopSell } from "./ShopSell";

// create new component by combining the layout and the other components
export const ShopDisplay = () => {
  return (
    <>
      <ShopLayout>
        <Shop />
      </ShopLayout>
    </>
  );
};
export const ShopBuyDisplay = () => {
  return (
    <>
      <ShopLayout title="Buy">
        <ShopBuy />
      </ShopLayout>
    </>
  );
};
export const ShopCreateDisplay = () => {
  return (
    <>
      <ShopLayout title="Create">
        <ShopCreate />
      </ShopLayout>
    </>
  );
};
export const ShopSellDisplay = () => {
  return (
    <>
      <ShopLayout title="Sell">
        <ShopSell />
      </ShopLayout>
    </>
  );
};
