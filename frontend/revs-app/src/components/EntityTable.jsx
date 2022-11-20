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
        let item = {...props.item}
        setItemData(item)
    }, [props.item])


    //------------------------- API Requests -------------------------//
    const addItem = () => {

    }

    //------------------------- Form Functions -------------------------//
    const updateDataText = (event) => {
        itemData[event.target.name] = event.target.value
        console.log(props.item)
    }

    const updateDataArray = (event) => {
        itemData[event.target.name][event.target.index] = event.target.value
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
    const ModalBody = () => {
        if (props.task === "update") {
            return (
                // Consider if object is array
                Object.entries(itemData).map((data, index) => {
                    var formField = <></>
                    if (Array.isArray(data[1])) {
                        formField = data[1].map((item, index) => {
                            return (
                                <div className="row" key={index} >
                                    <div className="col-10">
                                        <Form.Control type="text" name={data[0]} index={index} defaultValue={item} onChange={updateDataArray} />
                                    </div>
                                    <div className='col-2'>
                                        <Button variant='secondary' onClick={() => removeDataArrayItem(data[0], index)}>X</Button>
                                    </div>
                                    <br />
                                </div>
                            )
                        })

                        formField =
                            <div key={index}>
                                {formField}
                                <Button onClick={() => addDataArrayItem(data[0])}>+</Button>
                            </div>

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
                props.headers.map((header, index) => {
                    return (
                        <Form.Group key={index}>
                            <Form.Label>
                                {header}
                            </Form.Label>
                            <br />
                            <Form.Control type="text" />
                        </Form.Group>
                    )
                })
            )
        }
    }

    const updateFooter =
        <Modal.Footer>
            <Button variant="danger me-3">
                Delete
            </Button>
            <Button variant="success me-3">
                Update
            </Button>

        </Modal.Footer>


    const addFooter =
        <Modal.Footer>
            <Button variant="primary">
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
    const [headers, setHeaders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // update modal vaues
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedObject, setSelectedObject] = useState({});

    //add modal values
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        async function fetch_data() {
            var endpoint = 'http://localhost:4173/' + props.entityName
            const res = await axios.get(endpoint)
            return res
        }

        function parse_data() {
            fetch_data().then(res => {
                let tmp_headers = []
                Object.keys(res.data[0]).map(field => {
                    tmp_headers.push(field)
                })
                setHeaders(tmp_headers)
                setTData(res.data)
                setLoading(false)
            })
        }

        parse_data();
    }, [props.entityName]);

    // Update Modal function
    function openUpdateModal(item) {
        setSelectedObject(item)
        setShowUpdateModal(true)
    }

    const closeUpdateModal = () => setShowUpdateModal(false)

    // Add modal function
    const openAddModal = () => setShowAddModal(true)
    const closeAddModal = () => setShowAddModal(false)



    const tableHeaders = headers.map((header) =>
        <th scope={header} key={header} className="col-md-2">
            {header}
        </th>
    )

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
            <EntityModal task="update" item={selectedObject} show={showUpdateModal} handleClose={closeUpdateModal} />
            <EntityModal task="add" headers={headers} show={showAddModal} handleClose={closeAddModal} />
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