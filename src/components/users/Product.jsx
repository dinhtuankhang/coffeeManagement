import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth, db } from '../../firebaseconfig';
import { collection, getDocs, query, addDoc } from 'firebase/firestore';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const asyncFunction = async () => {
            if (!auth.currentUser) {
                navigate('/introduction');
                return;
            }
            const productsCollection = collection(db, 'productsInfo');
            const userQuery = query(productsCollection);
            const docs = await getDocs(userQuery);
            let productsList = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        };

        asyncFunction();
    }, [navigate]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct.quantity > 1) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        } else {
            setCart(cart.filter(item => item.id !== product.id));
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
    };

    const handleCheckout = async () => {
        if (!auth.currentUser) {
            navigate('/introduction');
            return;
        }
    
        // Log the currentUser object to debug
        console.log('Current User:', auth.currentUser);
    
        if (!address || !phoneNumber) {
            alert('Please fill in all fields.');
            return;
        }
    
        const orderData = {
            userId: auth.currentUser.uid,
            address,
            phoneNumber,
            cart,
            totalPrice: getTotalPrice(),
            createdDate: new Date()
        };
    
        try {
            await addDoc(collection(db, 'ordersInfo'), orderData);
            alert('Order placed successfully!');
            setCart([]);
            setShowCheckout(false);
        } catch (error) {
            console.error('Error placing order:', error.message);
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
            navigate('/introduction');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <div style={{ backgroundColor: '#F3E5AB', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button
                    style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={logout}
                >
                    Log Out
                </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '10px', width: '200px' }}
                    >
                        <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#8B4513' }}>{product.productName}</h3>
                        <p style={{ marginBottom: '10px' }}>Price: ${product.productPrice}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                                onClick={() => addToCart(product)}
                            >
                                +
                            </button>
                            <button
                                style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                                onClick={() => removeFromCart(product)}
                            >
                                -
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            {cart.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#8B4513', color: '#FFF', padding: '10px', textAlign: 'center' }}
                >
                    <p style={{ marginBottom: '10px' }}>Items in Cart: {cart.length}</p>
                    <p style={{ marginBottom: '10px' }}>Total Price: ${getTotalPrice().toFixed(2)}</p>
                    {cart.map(item => (
                        <p key={item.id} style={{ marginBottom: '10px' }}>{item.productName} x {item.quantity}</p>
                    ))}
                    <button
                        style={{ backgroundColor: '#FFF', color: '#8B4513', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => setShowCheckout(true)}
                    >
                        Checkout
                    </button>
                </motion.div>
            )}
            {showCheckout && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '300px' }}>
                        <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#8B4513' }}>Checkout</h3>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                        />
                        <button
                            style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
                            onClick={handleCheckout}
                        >
                            Confirm Order
                        </button>
                        <button
                            style={{ backgroundColor: '#FFF', color: '#8B4513', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '10px' }}
                            onClick={() => setShowCheckout(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
