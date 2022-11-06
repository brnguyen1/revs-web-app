import { useEffect, useState } from 'react';
import axios from 'axios'

import "bootstrap/dist/css/bootstrap.min.css";


function EntityArray(props) {
    const [TData, setTData] = useState([]);
    const [headers, setHeaders] = useState([]);

    async function fetch_data() {
        var endpoint = 'http://localhost:4173/' + props.entityName
        console.log(endpoint)
        const res = await axios.get(endpoint)
        return res
    }

    function parse_data() {
        fetch_data().then(res => {
            console.log(res)
            let tmp_headers = []
            for (const [idx, field] of Object.entries(res.data.fields)) {
                tmp_headers.push(field.name)
            }
            setHeaders(tmp_headers)
            setTData(res.data.rows)
        })
    }

    useEffect(() => {
        parse_data();
    }, []);

    const tableHeaders = headers.map((header) =>
        <th scope={header} key={header} className="col-md-2">
            {header}
        </th>
    )

//
    const tableItems = Object.values(TData).map((rows, i) => {
        return (
            <tr key={i}>
                {Object.values(rows).map((cols, idx) => {
                    let input;
                    if (Array.isArray(cols)) {
                        input = cols.toString();
                    }
                    else {
                        input = cols
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

    return (
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
    );
}

export default EntityArray;