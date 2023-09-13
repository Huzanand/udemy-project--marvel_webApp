import React from "react";
import { useState} from "react";
import useMarvelService from "../services/MarvelService";

export const useList = (item, customOffset = 210) => {
    const [itemList, setItemList] = useState([]); 
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(customOffset);
    const [itemsEnded, setItemsEnded] = useState(false);

    const {getAllCharacters, getAllComics, loading, error} = useMarvelService();

    const onRequest = () => {
        setNewItemsLoading(true);
        if (item === 'char') {
            getAllCharacters(offset)
            .then(onItemsListLoaded)
        } else{
            getAllComics(offset)
            .then(onItemsListLoaded)
        }
    }

    const onItemsListLoaded = (newItemsList) => {
        let ended = false;
        const plusOffset = item === 'char' ? 9 : 8;

        if(newItemsList.length < plusOffset){            
            ended = true;
        }

        setItemList(itemList => [...itemList, ...newItemsList]);
        setNewItemsLoading(newItemsLoading => false);
        setOffset(offset => offset + plusOffset);        
        setItemsEnded(ComicsEnded => ended)
    }

    return {itemList, newItemsLoading, offset, itemsEnded, onRequest, loading, error}
}