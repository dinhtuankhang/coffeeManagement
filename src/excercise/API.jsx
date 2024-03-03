import { faMousePointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { hover } from '@testing-library/user-event/dist/hover'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'

const API = () => {
    const [cursor, setCursor] = useState('default')
    const [data, setData] = useState([])
    const [callForm, setCallForm] = useState('Add')
    const [editId, setEditId] = useState(null)
    const [input, setInput] = useState({
        title: "",
        authorID: "",
        createDate: "",
        updateDate: "",
        content: "",
        image: "",
    })
    const closeRef = useRef()
    const checkRef = useRef()
    const openRef = useRef()
    const handleCursor = () => {
        setCursor(state => {
            if (state === 'default') {
                return 'pointer'
            }
            return 'default'
        })
    }
    const handleInputChange = (e) => {
        const newData = { ...input, [e.target.name]: e.target.value }
        setInput(newData)
    }
    const handleSubmitForm = () => {
        closeRef.current.click()
        if (callForm === 'Add') {
            handleAdd();
        }
        if (callForm === 'Edit') {
            handleEdit();
        }
    }
    const handleAdd = async () => {
        await fetch('https://65b5ea4dda3a3c16ab00077e.mockapi.io/Articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: input.title,
                authorID: 1,
                createDate: Date.now(),
                updateDate: Date.now(),
                content: input.content,
                image: input.image,
            })
        })
        await fetchData()
    }
    const handleDelete = async (deleteId) => {
        await fetch(`https://65b5ea4dda3a3c16ab00077e.mockapi.io/Articles/${deleteId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
        await fetchData()
    }
    const handleEdit = async () => {
        await fetch(`https://65b5ea4dda3a3c16ab00077e.mockapi.io/Articles/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: input.title,
                authorID: input.authorID,
                updateDate: Date.now,
                content: input.content,
                image: input.image,
            })
        })
            .then((response) => response.json())
        await fetchData()
    }
    // const fetchArticles = async () => {
    //     const res = await fetch("https://65b5ea4dda3a3c16ab00077e.mockapi.io/Articles");
    //     const data = res.json();
    //   };
    //   const response = useQuery("Articles", fetchArticles)
    const fetchData = async () => {
        fetch('https://65b5ea4dda3a3c16ab00077e.mockapi.io/Articles')
            .then((response) => response.json())
            .then((json) => setData(json))
        setInput({
            title: "",
            authorID: "",
            createDate: "",
            updateDate: "",
            content: "",
            image: "",
        })
    }
    useEffect(() => {
        fetch('https://65b5ea4dda3a3c16ab00077e.mockapi.io/Articles')
            .then((response) => response.json())
            .then((json) => setData(json));
    }, [])

    return (
        <>
            {
                data.map(el => (
                    <div key={el.id}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '30px', color: 'red', fontWeight: 'bold' }}>{el.id}</p>
                            <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'blue', marginTop: '8px', marginLeft: '10px' }}>{el.title}</p>
                            <i onClick={() => handleDelete(el.id)} class="fa-solid fa-trash" onMouseEnter={handleCursor} onMouseLeave={handleCursor} style={{ cursor: cursor, height: '10px' }}></i>
                            <i onClick={() => {
                                openRef.current.click()
                                setEditId(el.id)
                                setInput({
                                    title: el.title,
                                    content: el.content,
                                    image: el.image,
                                })
                                setCallForm('Edit')
                            }} class="fa-regular fa-pen-to-square" onMouseEnter={handleCursor} onMouseLeave={handleCursor} style={{ cursor: cursor, height: '10px', marginLeft: '20px' }}></i>
                        </div>
                        <p style={{ fontSize: '10px', width: '300px', marginLeft: '30px' }}>{el.body}</p>
                    </div>
                ))
            }
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addForm" onClick={() => setCallForm('Add')} ref={openRef}>
                ADD CONTENT
            </button>
            <div onClick={(e) => {
                if (e.target == checkRef.current) {
                    setInput({
                        title: "",
                        authorID: "",
                        createDate: "",
                        updateDate: "",
                        content: "",
                        image: "",
                    })
                }
            }} ref={checkRef} className="modal fade" id="addForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <div>
                                <h5 className="modal-title" id="exampleModalLongTitle">New Contact Information</h5>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                                setInput({
                                    title: "",
                                    authorID: "",
                                    createDate: "",
                                    updateDate: "",
                                    content: "",
                                    image: "",
                                })
                            }
                            }>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div>
                            {(() => {
                                if (callForm === 'Edit') {
                                    return (<div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Title:</p>
                                        <input type='text' name='title' value={input.title} style={{ height: '50px' }} onChange={handleInputChange} defaultValue={input.title} />
                                        <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Content:</p>
                                        <input type='text' name='content' value={input.content} style={{ height: '50px' }} onChange={handleInputChange} defaultValue={input.body} />
                                        <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Image:</p>
                                        <input type='text' name='image' value={input.image} style={{ height: '50px' }} onChange={handleInputChange} defaultValue={input.body} />
                                    </div>)
                                }
                                if (callForm === 'Add') {
                                    return (<div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Title:</p>
                                        <input type='text' name='title' value={input.title} style={{ height: '50px' }} onChange={handleInputChange} />
                                        <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Content:</p>
                                        <input type='text' name='content' value={input.content} style={{ height: '50px' }} onChange={handleInputChange} />
                                        <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Image</p>
                                        <input type='text' name='image' value={input.image} style={{ height: '50px' }} onChange={handleInputChange} />
                                    </div>)
                                }
                            })()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={closeRef} onClick={() => {
                                setInput({
                                    title: "",
                                    authorID: "",
                                    createDate: "",
                                    updateDate: "",
                                    content: "",
                                    image: "",
                                })
                            }
                            }>Close</button>
                            {(() => {
                                if (callForm === 'Edit') {
                                    return (<button type="button" className="btn btn-primary" onClick={handleSubmitForm} >Edit</button>)
                                }
                                if (callForm === 'Add') {
                                    return (<button type="button" className="btn btn-primary" onClick={handleSubmitForm} >Add</button>)
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default API