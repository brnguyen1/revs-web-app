import { useEffect, useState } from 'react';
import axios from 'axios'
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/css/EntityTable.css"

// Add, update, delete popup
function EntityModal(props) {
    const [itemData, setItemData] = useState({});

    //------------------------- Component Initialization -------------------------//
    useEffect(() => {
        if (props.item) {
            let item = { ...props.item }
            setItemData(item)
        }
        else {
            let item = {}
            Object.entries(props.headers).forEach(header => {
                if (header[1] === "array") {
                    item[header[0]] = [];
                }
                else {
                    item[header[0]] = "";
                }
            })
            delete item["id"]
            setItemData(item)
        }
    }, [props.item, props.headers])


    //------------------------- API Requests -------------------------//
    const addItem = () => {
        let req = axios.post('http://localhost:4173/' + props.entityName, itemData)
        Promise.resolve(req)
        props.handleComplete()
        props.handleClose()
    }

    const deleteItem = () => {
        let req = axios.delete('http://localhost:4173/' + props.entityName + '/' + itemData["id"])
        Promise.resolve(req)
        props.handleComplete()
        props.handleClose()
    }

    const updateItem = () => {
        let req = axios.put('http://localhost:4173/' + props.entityName + '/' + itemData["id"], itemData)
        Promise.resolve(req)
        props.handleComplete()
        props.handleClose()
    }

    const deleteItem = () => {
        console.log(itemData)
        axios.delete('http://localhost:4173/' + props.entityName + '/' + itemData["id"]).then(res =>
            console.log(res)
        )
    }

    const updateItem = () => {
        console.log(itemData)
        axios.put('http://localhost:4173/' + props.entityName + '/' + itemData["id"], itemData).then(res =>
            console.log(res)
        )
    }

    //------------------------- Form Functions -------------------------//
    const updateDataText = (event) => {
        itemData[event.target.name] = event.target.value
    }

    const updateDataArray = (key, index, value) => {
        itemData[key][index] = value
    }

    function removeDataArrayItem(key, index) {
        let item = { ...itemData }
        item[key].splice(index, 1)
        setItemData(item)
    }

    function addDataArrayItem(key) {
        let item = { ...itemData }
        item[key].push("")
        setItemData(item)
    }

    //------------------------- Modal Content -------------------------//
    const ModalArray = (props) => {
        let formField = props.data[1].map((item, index) => {
            return (
                <div className="row" key={index} >
                    <div className="col-10">
                        <Form.Control type="text" name={props.data[0]} defaultValue={item} onChange={(e) => updateDataArray(props.data[0], index, e.target.value)} />
                    </div>
                    <div className='col-2'>
                        <Button variant='secondary' onClick={() => removeDataArrayItem(props.data[0], index)}>X</Button>
                    </div>
                    <br />
                </div>
            )
        })

        formField =
            <div key={props.key}>
                {formField}
                <Button onClick={() => addDataArrayItem(props.data[0])}>+</Button>
            </div>

        return formField
    }

    const ModalBody = () => {
        if (props.task === "update") {
            return (
                // Consider if object is array
                Object.entries(itemData).map((data, index) => {
                    var formField = <></>
                    if (data[0] === "id") {
                        formField =
                            <Form.Control type="text" name={data[0]} defaultValue={data[1]} disabled />
                    }
                    else if (Array.isArray(data[1])) {
                        formField = <ModalArray data={data} />
                    }
                    else {
                        formField =
                            <Form.Control type="text" name={data[0]} defaultValue={data[1]} onChange={updateDataText} />
                    }

                    return (
                        <div className='row' key={index}>
                            <Form.Group >
                                <Form.Label>
                                    {data[0]}
                                </Form.Label>
                                <br />

                                {formField}
                            </Form.Group>
                        </div>
                    )
                })
            )
        }

        // 
        else if (props.task === "add") {
            return (
                Object.entries(props.headers).map((header, index) => {
                    if (header[0] === "id") return null;
                    return (
                        <Form.Group key={index}>
                            <Form.Label>
                                {header[0]}
                            </Form.Label>
                            <br />
                            {header[1] === "array" ? <ModalArray data={[header[0], itemData[header[0]]]} /> : <Form.Control name={header[0]} type="text" defaultValue={itemData[header[0]]} onChange={updateDataText} />}
                        </Form.Group>
                    )
                })
            )
        }
    }

    const updateFooter =

        <Modal.Footer>
            <div className='container-fluid'>
                <div className="row">
                    <div className='col-6 justify-content-start d-flex'>
                        <Button variant="danger me-3" onClick={deleteItem}>
                            Delete
                        </Button>
                    </div>
                    <div className='col-6 justify-content-end d-flex'>
                        <Button variant="success me-3" onClick={updateItem}>
                            Update
                        </Button>
                    </div>

                </div>
            </div>
        </Modal.Footer>


    const addFooter =
        <Modal.Footer>
            <Button variant="primary" onClick={addItem}>
                Add
            </Button>
        </Modal.Footer>

    const updateTitle = <Modal.Title>Update/Delete</Modal.Title>

    const addTitle = <Modal.Title>Add</Modal.Title>

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    {props.task === "update" ? updateTitle : null}
                    {props.task === "add" ? addTitle : null}
                </Modal.Header>
                <Modal.Body>
                    <div className='container-fluid clearfix'>
                        <Form>
                            {<ModalBody />}
                        </Form>
                    </div>
                </Modal.Body>
                {props.task === "update" ? updateFooter : null}
                {props.task === "add" ? addFooter : null}
            </Modal>
        </>
    );
}

// To create a button on table for items that are arrays
const ArrayDropdown = (props) => {
    const [isOpen, setOpen] = useState(false)
    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

    const toggleDrop = () => {
        setOpen(!isOpen)
    }

    return (
        <div className="dropdown" >
            <button type="button" onMouseEnter={toggleDrop} onMouseLeave={toggleDrop} className="btn btn-secondary" id={props.id} data-togle="dropdown" aria-haspopup="true" aria-expanded="false">
                Items
            </button>
            <div className={menuClass} aria-labelledby={props.id}>
                {props.items.map((val, index) =>
                    <button key={index} className="dropdown-item">{val}</button>
                )}
            </div>
        </div>
    )
}

function EntityTable(props) {
    // Table data 
    const [TData, setTData] = useState({});
    const [headers, setHeaders] = useState({});
    const [isLoading, setLoading] = useState(true);
    // update modal vaues
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedObject, setSelectedObject] = useState({});

    //add modal values
    const [showAddModal, setShowAddModal] = useState(false);

    //------------------------- Initialization Function -------------------------//
    async function fetch_data() {
        var endpoint = 'http://localhost:4173/' + props.entityName
        const res = await axios.get(endpoint)
        return res
    }

    const parse_data = () => {
        fetch_data().then(res => {
            let tmp_headers = {}
            Object.entries(res.data[0]).forEach(field => {
                if (Array.isArray(field[1])) {
                    tmp_headers[field[0]] = "array";
                }
                else { tmp_headers[field[0]] = "text"; }
            })
            setHeaders(tmp_headers)
            setTData(res.data)
            console.log(TData)
            setLoading(false)
        })
    }

    useEffect(() => {
        parse_data();
    }, []);

    //------------------------- Component Functions -------------------------//

    // Update Modal function
    function openUpdateModal(item) {
        setSelectedObject(item)
        setShowUpdateModal(true)
    }

    const closeUpdateModal = () => setShowUpdateModal(false)

    // Add modal function
    const openAddModal = () => setShowAddModal(true)
    const closeAddModal = () => setShowAddModal(false)

    // Rerender on add, update, or delete
    const completeRequest = () => {
        setLoading(true);
        parse_data()
    }

    //------------------------- Component Content -------------------------//

    const tableHeaders = Object.keys(headers).map((header) => {
        return (
            <th scope={header} key={header} className="col-md-2">
                {header}
            </th>
        )
    })

    const tableItems = Object.values(TData).map((row, i) => {
        return (
            <tr key={i} onClick={() => openUpdateModal(row)}>
                {Object.values(row).map((col, idx) => {
                    let input;
                    if (Array.isArray(col)) {
                        input = <ArrayDropdown items={col} id={idx} />
                    }
                    else if (typeof col === 'boolean') {
                        if (col) {
                            input = "True"
                        }
                        else {
                            input = "False"
                        }
                    }
                    else {
                        input = col
                    }

                    return (
                        <td key={idx}>
                            {input}
                        </td>
                    )
                })}
            </tr>
        )
    })

    const dataTable =
        <div>
            <EntityModal task="update" item={selectedObject} show={showUpdateModal} handleComplete={completeRequest} handleClose={closeUpdateModal} entityName={props.entityName} />
            <EntityModal task="add" headers={headers} show={showAddModal} handleComplete={completeRequest} handleClose={closeAddModal} entityName={props.entityName} />
            <Button variant="primary" onClick={openAddModal}> Add New Item </Button>

            <table className="table table-hover table-sm table-bordered">
                <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
        </div>
    return (
        <>
            {isLoading ? <ClipLoader /> : dataTable}
        </>
    );
}

export default EntityTable