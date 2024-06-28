import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';

const ManagerOrder = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersCollectionRef = collection(db, 'ordersInfo');
                const querySnapshot = await getDocs(ordersCollectionRef);
                const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersList);
            } catch (error) {
                console.error('Error fetching orders:', error.message);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, 'ordersInfo', orderId);
            await updateDoc(orderRef, { status: newStatus });
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error.message);
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#8B4513', marginBottom: '0' }}>Manage Orders</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => navigate('/managerproduct')}
                    >
                        Products
                    </button>
                    <button
                        style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => navigate('/managerorder')}
                    >
                        Orders
                    </button>
                    <button
                        style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => navigate('/managerrevenue')}
                    >
                        Revenue
                    </button>
                    <button
                        style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={logout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
            <div>
                {orders.map(order => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '10px' }}
                    >
                        <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#8B4513' }}>Order ID: {order.id}</h3>
                        <p style={{ marginBottom: '10px' }}>User ID: {order.userId}</p>
                        <p style={{ marginBottom: '10px' }}>Address: {order.address}</p>
                        <p style={{ marginBottom: '10px' }}>Phone Number: {order.phoneNumber}</p>
                        <p style={{ marginBottom: '10px' }}>Total Price: ${order.totalPrice.toFixed(2)}</p>
                        <p style={{ marginBottom: '10px' }}>Status:
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                style={{ padding: '5px', marginLeft: '5px' }}
                            >
                                <option value="Processing">Processing</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipping">Shipping</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManagerOrder;
