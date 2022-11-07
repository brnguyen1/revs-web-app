import { useEffect, useState } from 'react';
import axios from 'axios'

import ClipLoader from "react-spinners/ClipLoader";
import "bootstrap/dist/css/bootstrap.min.css";

const ArrayDropdown = (props) => {
    const [isOpen, setOpen] = useState(false)
    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

    const toggleDrop = () => {
        setOpen(!isOpen)
    }

    return (
        <div className="dropdown" onClick={toggleDrop}>
            <button type="button" className="btn btn-secondary" id={props.id} data-togle="dropdown" aria-haspopup="true" aria-expanded="false">
                Items
            </button>
            <div className={menuClass} aria-labelledby={props.id}>
                {props.items.map(val =>
                    <a className="dropdown-item">{val}</a>
                )}
            </div>
        </div>
    )
}

function EntityTable(props) {
    const [TData, setTData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function fetch_data() {
        var endpoint = 'http://localhost:4173/' + props.entityName
        const res = await axios.get(endpoint)
        return res
    }

    useEffect(() => {

        function parse_data() {
            fetch_data().then(res => {
                let tmp_headers = []
                for (const [idx, field] of Object.entries(res.data.fields)) {
                    tmp_headers.push(field.name)
                }
                setHeaders(tmp_headers)
                setTData(res.data.rows)
                setLoading(false)
            })
        }

        parse_data();
    }, []);

    const tableHeaders = headers.map((header) =>
        <th scope={header} key={header} className="col-md-2">
            {header}
        </th>
    )


    const tableItems = Object.values(TData).map((rows, i) => {
        return (
            <tr key={i}>
                {Object.values(rows).map((col, idx) => {
                    let input;
                    if (Array.isArray(col)) {
                        input = <ArrayDropdown items={col} id={idx} />
                    }
                    else if(typeof col === 'boolean'){
                        if(col){
                            input = "True" 
                        }
                        else{
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
    return (
        <div>
            {isLoading ? <ClipLoader /> : dataTable}
        </div>
    );
}

export default EntityTable