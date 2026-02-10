
import type { TGuitar, CartItem, TGuitarID } from "../types"
import { useState, useEffect, useEffectEvent, useMemo } from "react"
import { db } from "../data/db"

const useCart = () => {
      const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const minimumProductQuantity = 1;



  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: TGuitar) =>{
    const itemExist = cart.findIndex(n => n.id == item.id)
    if (itemExist >= 0) {
      const updatedCar = [...cart];
      updatedCar[itemExist].quantity++;
      setCart(updatedCar);
    } else {
      const newItem: CartItem = {...item, quantity : 1}
    setCart([...cart, newItem]);
    }
  }

  const removeFromCart = (id: TGuitarID)=> {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id.id));
  }

    const increaseQuantity = (id: TGuitarID) => {
      const updatedCar = cart.map( item => {
        if(item.id === id.id) {
          return{
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
      setCart(updatedCar);
    }


    const decreaseQuantity = (id: TGuitarID) =>{
      const updatedCart = cart.map( item => {
        if(item.id === id.id && item.quantity > minimumProductQuantity ) {
          return{
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item;
      })
      setCart(updatedCart)
    }


    const cleanCart = () => {
      setCart([]);
    }



    const isEmpty = useMemo(() => cart.length == 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.quantity * item.price), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity, 
        cleanCart,
        isEmpty,
        cartTotal
    }
}

export default useCart;