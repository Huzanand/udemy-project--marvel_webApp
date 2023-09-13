import './charList.scss';

import React, { useEffect, useRef } from 'react';
import { useList } from '../../hooks/list.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {TransitionGroup, CSSTransition} from "react-transition-group"

const CharList = (props) => {
    const {itemList, newItemsLoading, offset, itemsEnded, onRequest, loading, error} = useList('char');

    useEffect(() => {
        onRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
                item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                    imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition
                    timeout={500}  key={item.id} >
                    <li ref={el => itemRefs.current[i] = el}
                        className="char__item" tabIndex={0}                       
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i)}}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

        const items = renderItems(itemList)

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {items}
                <button 
                className="button button__main button__long"
                disabled={newItemsLoading}
                onClick={() => onRequest(offset)}
                style={{'display': itemsEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;