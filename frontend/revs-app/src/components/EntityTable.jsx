import { useEffect, useState } from 'react';
import axios from 'axios'
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";

// Add, update, delete popup
function EntityModal(props) {

    const ModalBody = () => {
        if (props.item) {
            return (
                Object.entries(props.item).map((data, index) => {
                    return (
                        <Form.Group key={index}>
                            <Form.Label>
                                {data[0]}
                            </Form.Label>
                            <br />
                            <Form.Control type="text" defaultValue={data[1]} />
                        </Form.Group>
                    )
                })
            )
        }
        else if (props.headers) {
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
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="danger">
                Delete
            </Button>
            <Button variant="success">
                Update
            </Button>
        </Modal.Footer>


    const addFooter =
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary">
                Delete
            </Button>
        </Modal.Footer>

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {<ModalBody/>}
                    </Form>
                </Modal.Body>
                {props.task === "update" ? updateFooter : addFooter}
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
                {props.items.map(val =>
                    <button className="dropdown-item">{val}</button>
                )}
            </div>
        </div>
    )
}

function EntityTable(props) {
    // Table data 
    const [TData, setTData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // update modal vaues
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedObject, setSelectedObject] = useState([]);

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
                Object.values(res.data.fields).map(field =>
                    tmp_headers.push(field.name)
                )
                setHeaders(tmp_headers)
                setTData(res.data.rows)
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
            <EntityModal task="add" headers={headers} show={showAddModal} handleClose={closeAddModal}/>
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