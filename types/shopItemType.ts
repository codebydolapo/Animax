export default interface ShopItemType {
  id: string;
  name: string;
  price: string | number;
  pictures: string[];
  quantity: number;
  description: string;
  comments: string[]
}