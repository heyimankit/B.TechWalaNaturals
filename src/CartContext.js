import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const existing = cartItems.find(item => item.id === product.id);
        if (existing) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + product.quantity }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product }]);
        }
    };


    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
