import { useEffect, useState } from 'react';
import axios from 'axios'

function EntityTable(props) {
    async function fetch_data() {
        var endpoint = 'http://localhost:4173/' + props.entityName
        console.log(endpoint)
        const res = await axios.get(endpoint)
        return res
    }

    function parse_data(){
        fetch_data().then(res => {
            console.log(res)
            setTData(res.data.rows)
        })
    }

    const [TData, setTData] = useState([]);

    useEffect(() => {
        parse_data();
    }, []);

    const listItems = TData.map((entity) =>
    <li key={entity.order_id}>{entity.order_id} : {entity.employee_id}</li>
    )

    return (
        <ul>{listItems}</ul>
    );
}

export default EntityTable;