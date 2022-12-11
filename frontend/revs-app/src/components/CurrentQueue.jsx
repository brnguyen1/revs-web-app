import { useEffect, useState } from 'react';
import axios from 'axios'
import React from 'react'

function CurrentQueue() {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const updateQueue = () => {
            axios.get(process.env.REACT_APP_BACKEND_API + 'queue').then(res => {
                setQueue(res.data)
            })
        }
        const queueInterval = setInterval(updateQueue, 2000);
        return () => clearInterval(queueInterval)
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                {queue.map((item, index) => {
                    return (
                        <>
                            {(index % 3 === 0 && index !== 0) ? <div className='w-100' /> : null}
                            <div className='col-4 py-2'>
                                <div className='card h-100'>
                                    <div className='card-body'>
                                        <h4 className='card-title'>Queue ID: {item.id}</h4>
                                        {item.order_menu_items.map(menu_item => {
                                            return (
                                                <h6 className='card-text'>{menu_item}</h6>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>

    )
}

export default CurrentQueue;