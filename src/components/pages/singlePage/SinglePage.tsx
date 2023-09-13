import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from "../../appBanner/AppBanner";
import './singlePage.scss';

const SinglePage = ({type, View}) => {
    console.log(type)
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const updateData = () => {
        clearError();
        type === 'comic' ? getComic(id).then(onDataLoaded) : getCharacter(id).then(onDataLoaded)
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <View data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;