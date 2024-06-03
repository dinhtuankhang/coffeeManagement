// ⁡⁣⁣⁢​‌‌‍𝗘𝗺𝗽𝗹𝗼𝘆𝗲𝗲 𝗤𝘂𝗶𝗰𝗸 𝗖𝗵𝗮𝘁​⁡
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseconfig';
import { collection, query, where, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'; // Import from 'react-firebase-hooks/firestore' for Firestore

const EQuickChat = () => {
    const navigate = useNavigate();
    const [receiver, setReceiver] = useState('')
    const [renderEmployee, setRenderEmployee] = useState([])
    const [message, setMessage] = useState('');
    const messageCollection = collection(db, 'messages');
    const queryMessages = query(messageCollection); // Query messages collection
    const [messages, loading, error] = useCollectionData(queryMessages, { idField: 'id' }); // Use useCollectionData for Firestore
    const [currentUserProfile, setCurrentUserProfile] = useState({
        fullname: '',
        userRole: '',
        img: '',
        id: '',
    });

    useEffect(() => {
        const asyncFunction = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userCollection = collection(db, 'employeesInfo');
                    const userQuery = query(userCollection, where('uid', '==', user.uid));
                    const querySnapshot = await getDocs(userQuery);
                    querySnapshot.forEach((doc) => {
                        const currentUser = doc.data();
                        setCurrentUserProfile({
                            fullname: currentUser.fullname,
                            img: currentUser.img,
                            userRole: currentUser.userRole,
                            id: currentUser.uid,
                            docId: doc.id,
                        });
                    });
                } else {
                    // User is signed out
                }
            });
        };
        asyncFunction();
    }, []);
    useEffect(() => {
        const asycnFunction = async () => {
            const userCollection = collection(db, 'employeesInfo')
            const userQuery = query(userCollection, where("userRole", "==", "employee"))
            const docs = await getDocs(userQuery)
            let employeesList = docs.docs.map(doc => doc.data())
            setRenderEmployee(employeesList)
        }
        asycnFunction()
    }, [])
    const sendMessage = async () => {
        if (message.trim() !== '') {
            await addDoc(collection(db, 'messages'), {
                text: message,
                sender: currentUserProfile.fullname,
                time: serverTimestamp(),
            });
            setMessage('');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px', position: 'fixed' }}>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => navigate('/edashboard')}>Dashboard</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => navigate('/enotification')}>Notification</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => navigate('/ecalendar')}>Calendar</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => navigate('/elibrary')}>Library</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => navigate('/echat')}>Quick Chat</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => {
                    const auth = getAuth();
                    signOut(auth).then(() => {
                        // Sign-out successful.
                        navigate('/introduction')
                    }).catch((error) => {
                        // An error happened.
                    });
                }}>Log Out</h1>
            </div>
            <div style={{ marginLeft: '200px', width: '100%', height: '695px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflowY: 'auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Chat</h1>
                {loading && <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#888' }}>Loading messages...</p>}
                {error && <p style={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</p>}
                <div style={{ height: '540px', overflowY: 'auto' }}>
                    {messages && messages
                        .slice()
                        .sort((a, b) => a.time?.toDate() - b.time?.toDate()) //⁡⁢⁣⁣ Sort messages based on timestamp⁡
                        .map((msg) => (
                            <div key={msg.id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <p style={{ marginBottom: '5px', fontSize: '16px', fontWeight: 'bold' }}>{msg.sender}</p>
                                <p style={{ marginBottom: '5px', fontSize: '14px', color: 'black', wordWrap: 'break-word' }}>{msg.text}</p>
                                <p style={{ fontSize: '12px', color: '#aaa' }}>{new Date(msg.time?.toDate()).toLocaleString()}</p>
                            </div>
                        ))}
                </div>

                <div style={{ marginTop: '20px', display: 'flex' }}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' }}
                        placeholder="Type your message..."
                    />
                    <button onClick={sendMessage} style={{ padding: '8px 20px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Send</button>
                </div>
            </div>

        </div>
    );
};

export default EQuickChat;
