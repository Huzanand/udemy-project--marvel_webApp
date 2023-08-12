import './comicsList.scss';
import { Link } from 'react-router-dom';
import { useList } from '../../hooks/list.hook';
import {useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const {itemList, newItemsLoading, offset, itemsEnded, onRequest, loading, error} = useList();

    useEffect(() => {
        onRequest(offset)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function renderComics (comicsList) {
        const comics = comicsList.map((item, i) => {
            
            return (
                <li className="comics__item"
                key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{`${item.price}$`}</div>
                    </Link>
                </li>
            )
        }) 

        return (
        <ul className="comics__grid">
            {comics}
        </ul>)
    }

    const comics = renderComics(itemList);
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;


    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {comics}
            <button className="button button__main button__long"
                disabled={newItemsLoading}
                onClick={() => onRequest(offset)}
                style={{'display': itemsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;