import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const ItemDetailContainer = () => {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    const {id}= useParams()

    useEffect(() => {
        const collectionProd = collection(db, 'productos');
        const ref = doc(collectionProd, id);

        getDoc(ref)
            .then((res) => {
                //console.log(res);
                setItem({
                    id: res.id,
                    ...res.data(),
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });

            return () => setLoading(true);
    }, [id]);

    if (loading) {
        return (
            <div
                style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center',}}
            >
                <HashLoader style={{ marginTop: '100px' }}/>
            </div>
        );
    }


    return (
        <div className="item-list-container">
            <ItemDetail item={item} />
        </div>
    );
};

export default ItemDetailContainer;