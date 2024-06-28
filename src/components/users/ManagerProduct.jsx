import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';

const ManagerProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newProduct, setNewProduct] = useState({ productName: '', productPrice: '', productImg: '', category: '' });
    const [editProduct, setEditProduct] = useState(null);
    const [editImage, setEditImage] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollectionRef = collection(db, 'productsInfo');
                const querySnapshot = await getDocs(productsCollectionRef);
                const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsList);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoriesCollectionRef = collection(db, 'categoriesInfo');
                const querySnapshot = await getDocs(categoriesCollectionRef);
                const categoriesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories(categoriesList);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const handleAddProduct = async () => {
        try {
            const productsCollectionRef = collection(db, 'productsInfo');
            const newDocRef = await addDoc(productsCollectionRef, newProduct);
            setProducts([...products, { id: newDocRef.id, ...newProduct }]);
            setNewProduct({ productName: '', productPrice: '', productImg: '', category: '' });
        } catch (error) {
            console.error('Error adding product:', error.message);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteDoc(doc(db, 'productsInfo', productId));
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }
    };

    const handleEditProduct = async () => {
        try {
            const productRef = doc(db, 'productsInfo', editProduct.id);
            await updateDoc(productRef, editProduct);
            setProducts(products.map(product =>
                product.id === editProduct.id ? { ...product, ...editProduct } : product
            ));
            setEditProduct(null);
            setEditImage(null); // Reset edit image state
        } catch (error) {
            console.error('Error updating product:', error.message);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewProduct({ ...newProduct, productImg: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleEditImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditImage(reader.result);
            setEditProduct({ ...editProduct, productImg: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleAddCategory = async () => {
        try {
            const categoriesCollectionRef = collection(db, 'categoryInfo');
            const newDocRef = await addDoc(categoriesCollectionRef, { categoryName: newCategory });
            setCategories([...categories, { id: newDocRef.id, categoryName: newCategory }]);
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error.message);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteDoc(doc(db, 'categoryInfo', categoryId));
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error.message);
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
                <h2 style={{ color: '#8B4513', marginBottom: '0' }}>Manage Products</h2>
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
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.productName}
                    onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                />
                <input
                    type="text"
                    placeholder="Product Price"
                    value={newProduct.productPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, productPrice: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                />
                <input
                    type="file"
                    onChange={handleImageUpload}
                    style={{ marginBottom: '10px' }}
                />
                {newProduct.productImg && (
                    <img
                        src={newProduct.productImg}
                        alt="Product"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                    />
                )}
                <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.categoryName}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                <button
                    style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={handleAddProduct}
                >
                    Add Product
                </button>
            </div>
            <div>
                {products.map(product => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '10px' }}
                    >
                        {editProduct?.id === product.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editProduct.productName}
                                    onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
                                    style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                                />
                                <input
                                    type="text"
                                    value={editProduct.productPrice}
                                    onChange={(e) => setEditProduct({ ...editProduct, productPrice: e.target.value })}
                                    style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                                />
                                <input
                                    type="file"
                                    onChange={handleEditImageUpload}
                                    style={{ marginBottom: '10px' }}
                                />
                                {editImage && (
                                    <img
                                        src={editImage}
                                        alt="Product"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                                    />
                                )}
                                <button
                                    style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold', marginRight: '5px' }}
                                    onClick={handleEditProduct}
                                >
                                    Save
                                </button>
                                <button
                                    style={{ backgroundColor: '#FFF', color: '#8B4513', border: '1px solid #8B4513', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => setEditProduct(null)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#8B4513' }}>{product.productName}</h3>
                                <p style={{ marginBottom: '10px' }}>Price: ${product.productPrice}</p>
                                <p style={{ marginBottom: '10px' }}>Category: {product.category}</p>
                                <img
                                    src={product.productImg}
                                    alt="Product"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                                />
                                <div>
                                    <button
                                        style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold', marginRight: '5px' }}
                                        onClick={() => setEditProduct({ ...product })}
                                    >
                                        Edit
                                    </button>
                                    <button style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer', fontWeight: 'bold', marginRight: '5px' }}
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: '#8B4513' }}>Manage Categories</h3>
                <input
                    type="text"
                    placeholder="New Category Name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                />
                <button
                    style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={handleAddCategory}
                >
                    Add Category
                </button>
                <div style={{ marginTop: '10px' }}>
                    {categories.map(category => (
                        <div key={category.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <span style={{ marginRight: '10px' }}>{category.categoryName}</span>
                            <button
                                style={{ backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                                onClick={() => handleDeleteCategory(category.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagerProduct;
