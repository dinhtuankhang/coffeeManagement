import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';

const ManagerRevenue = () => {
    const navigate = useNavigate();
    const [dailyRevenue, setDailyRevenue] = useState([]);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const ordersCollectionRef = collection(db, 'ordersInfo');
                const querySnapshot = await getDocs(ordersCollectionRef);
                const revenueByDate = {};
                querySnapshot.forEach(doc => {
                    const orderData = doc.data();
                    const orderDate = orderData.createdDate.toDate().toLocaleDateString();
                    const totalPrice = orderData.totalPrice;

                    if (revenueByDate[orderDate]) {
                        revenueByDate[orderDate] += totalPrice;
                    } else {
                        revenueByDate[orderDate] = totalPrice;
                    }
                });

                // Convert revenueByDate object to array for rendering
                const revenueArray = Object.entries(revenueByDate).map(([date, total]) => ({
                    date,
                    total
                }));

                setDailyRevenue(revenueArray);
            } catch (error) {
                console.error('Error fetching revenue:', error.message);
            }
        };

        fetchRevenue();
    }, []);

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
                <h2 style={{ color: '#8B4513', marginBottom: '0' }}>Manage Revenue</h2>
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
                <h3>Daily Revenue:</h3>
                <ul>
                    {dailyRevenue.map((item, index) => (
                        <li key={index}>
                            {item.date}: ${item.total.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManagerRevenue;
