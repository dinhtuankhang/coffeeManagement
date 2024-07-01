import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseconfig';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const [editedAddress, setEditedAddress] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedProducts, setEditedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, 'productsInfo');
            const productsQuery = query(productsCollection);
            const productDocs = await getDocs(productsQuery);
            const productsList = productDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (auth.currentUser) {
                const ordersCollection = collection(db, 'ordersInfo');
                const ordersQuery = query(ordersCollection, where('userId', '==', auth.currentUser.uid));
                const orderDocs = await getDocs(ordersQuery);
                const ordersList = orderDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersList);
            }
        };

        fetchOrders();
    }, []);

    const editOrder = (order) => {
        const currentTime = new Date();
        const orderTime = new Date(order.createdDate.seconds * 1000);
        const timeDiff = (currentTime - orderTime) / 1000 / 60; 
        if (timeDiff > 5) {
            alert('You can only edit the order within 5 minutes after it is created.');
            return;
        }
        setSelectedOrder(order);
        setEditedAddress(order.address);
        setEditedPhoneNumber(order.phoneNumber);
        const newData = order.cart;
        setEditedProducts(newData);
        calculateTotalPrice(newData);
    };

    const calculateTotalPrice = (products) => {
        const total = products.reduce((sum, product) => sum + product.productPrice * product.quantity, 0);
        setTotalPrice(total);
    };

    const updateOrder = async () => {
        try {
            await updateDoc(doc(db, 'ordersInfo', selectedOrder.id), {
                address: editedAddress,
                phoneNumber: editedPhoneNumber,
                cart: editedProducts,
                totalPrice: totalPrice
            });
            alert('Order updated successfully!');
            setSelectedOrder(null);
        } catch (error) {
            console.error('Error updating order:', error.message);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await deleteDoc(doc(db, 'ordersInfo', orderId));
            setOrders(orders.filter(order => order.id !== orderId));
            alert('Order deleted successfully!');
        } catch (error) {
            console.error('Error deleting order:', error.message);
        }
    };

    const handleProductQuantityChange = (productId, newQuantity) => {
        const updatedProducts = editedProducts.map(product => {
            if (product.id === productId && newQuantity >= 0) {
                return { ...product, quantity: newQuantity };
            }
            return product;
        });
        setEditedProducts(updatedProducts);
        calculateTotalPrice(updatedProducts);
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
        <div style={{ backgroundColor: '#F3E5AB', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', zIndex: 1 }}>
                <motion.button
                    style={{
                        backgroundColor: '#8B4513',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                    onClick={() => setShowMenu(!showMenu)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Menu
                </motion.button>
                {showMenu && (
                    <div style={{
                        position: 'absolute',
                        top: '50px',
                        right: '0',
                        backgroundColor: '#FFF',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 2
                    }}>
                        <motion.button
                            style={{
                                backgroundColor: '#8B4513',
                                color: '#FFF',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                            }}
                            onClick={() => navigate('/product')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Cart
                        </motion.button>
                        <motion.button
                            style={{
                                backgroundColor: '#8B4513',
                                color: '#FFF',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                            }}
                            onClick={() => navigate('/order')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Orders
                        </motion.button>
                        <motion.button
                            style={{
                                backgroundColor: '#8B4513',
                                color: '#FFF',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                            }}
                            onClick={logout}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Log Out
                        </motion.button>
                    </div>
                )}
            </div>
            <h2 style={{ color: '#8B4513', marginBottom: '20px' }}>Your Orders</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <motion.div
                            key={order.id}
                            style={{
                                backgroundColor: '#FFF',
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onClick={() => editOrder(order)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <p style={{ margin: 0, color: '#8B4513', fontWeight: 'bold' }}>Order ID: {order.id}  ({order.status})</p>
                            <p style={{ margin: 0 }}>Total Price: ${order.totalPrice.toFixed(2)}</p>
                            <p style={{ margin: 0 }}>Date: {new Date(order.createdDate.seconds * 1000).toLocaleDateString()}</p>
                            <motion.button
                                style={{
                                    backgroundColor: '#FF6347',
                                    color: '#FFF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px'
                                }}
                                onClick={(e) => { e.stopPropagation(); deleteOrder(order.id); }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Delete
                            </motion.button>
                        </motion.div>
                    ))
                ) : (
                    <p style={{ color: '#8B4513' }}>No orders found.</p>
                )}
            </div>
            {selectedOrder && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 3
                }}>
                    <div style={{
                        backgroundColor: '#FFF',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        width: '400px'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '10px', color: '#8B4513' }}>Edit Order</h3>
                        <input
                            type="text"
                            placeholder="Address"
                            value={editedAddress}
                            onChange={(e) => setEditedAddress(e.target.value)}
                            style={{
                                width: '100%',
                                marginBottom: '10px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #8B4513',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={editedPhoneNumber}
                            onChange={(e) => setEditedPhoneNumber(e.target.value)}
                            style={{
                                width: '100%',
                                marginBottom: '10px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #8B4513',
                            }}
                        />
                        <h4 style={{ color: '#8B4513' }}>Products:</h4>
                        {editedProducts.map(product => (
                            <div key={product.id} style={{ marginBottom: '10px' }}>
                                <span>{product.productName}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <motion.button
                                        style={{
                                            backgroundColor: '#8B4513',
                                            color: '#FFF',
                                            border: 'none',
                                            borderRadius: '5px',
                                            padding: '5px 10px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={() => handleProductQuantityChange(product.id, product.quantity - 1)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        -
                                    </motion.button>
                                    <span>{product.quantity}</span>
                                    <motion.button
                                        style={{
                                            backgroundColor: '#8B4513',
                                            color: '#FFF',
                                            border: 'none',
                                            borderRadius: '5px',
                                            padding: '5px 10px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={() => handleProductQuantityChange(product.id, product.quantity + 1)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        +
                                    </motion.button>
                                </div>
                            </div>
                        ))}
                        <h4 style={{ color: '#8B4513' }}>Total Price: ${totalPrice.toFixed(2)}</h4>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <motion.button
                                style={{
                                    backgroundColor: '#8B4513',
                                    color: '#FFF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}
                                onClick={updateOrder}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Confirm
                            </motion.button>
                            <motion.button
                                style={{
                                    backgroundColor: '#FF6347',
                                    color: '#FFF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}
                                onClick={() => setSelectedOrder(null)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Close
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
