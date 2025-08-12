interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
  productId: number; // id produk unik dari database produk
}
