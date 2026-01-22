import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Store() {
  const [cart, setCart] = useState([]);
  const products = [
    { id: 1, name: "Sneakers", category: "Shoes", price: 899 },
    { id: 2, name: "Formal Shoes", category: "Shoes", price: 1299 },
    { id: 3, name: "Human Hair Wig", category: "Hair", price: 2500 },
    { id: 4, name: "Braided Hair Bundle", category: "Hair", price: 450 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayFast = () => {
    const merchant_id = "10000100"; // sandbox ID
    const merchant_key = "46f0cd694581a"; // sandbox key
    const amount = total;
    const item_name = encodeURIComponent("TLN Luxe Style Order");
    const url = `https://sandbox.payfast.co.za/eng/process?merchant_id=${merchant_id}&merchant_key=${merchant_key}&amount=${amount}&item_name=${item_name}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <img src="/TLN_Luxe_Logo.png" alt="TLN Luxe Style" className="h-20" />
        <div className="text-lg font-semibold">Cart: {cart.length} items</div>
      </header>

      <section className="mb-10 bg-black text-white rounded-3xl p-10 shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">TLN Luxe Style</h1>
          <p className="text-lg mb-6">Luxury Hair & Footwear</p>
          <div className="flex gap-4">
            <Button className="bg-white text-black">Shop Shoes</Button>
            <Button className="bg-white text-black">Shop Hair</Button>
          </div>
        </div>
        <div>
          <img src="/TLN_Luxe_Logo.png" alt="TLN Luxe Style" className="h-40 md:h-60" />
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Delivery Options</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>🚚 Courier nationwide (South Africa)</li>
          <li>📍 Local delivery & collection available</li>
        </ul>
      </section>

      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="rounded-2xl shadow">
            <CardContent className="p-4">
              <div className="h-32 bg-gray-200 rounded-xl mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <p className="font-bold">R{product.price}</p>
              <Button className="mt-4 w-full" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-10 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>R{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="font-bold mb-4">Total: R{total}</p>
            <div className="space-y-3">
              <Button className="w-full bg-yellow-500 text-black" onClick={handlePayFast}>
                Pay with PayFast (Sandbox)
              </Button>
              <a
                href={`https://wa.me/27700000000?text=I%20want%20to%20order%20items%20worth%20R${total}`}
                target="_blank"
                className="block text-center bg-green-600 text-white py-2 rounded-xl font-semibold"
              >
                Order via WhatsApp
              </a>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
