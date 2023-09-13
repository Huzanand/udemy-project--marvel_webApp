import React, {useState, useEffect} from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = (props) => {
   
    const [char, setChar] =  useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();
    const {onCharSelected} = props;

    const onCharLoaded = char => {
        setChar(char);
    }

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateChar = () =>{
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} onCharSelected={onCharSelected}/> : null;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

const View = ({char, onCharSelected}) => {
    let {name, description, thumbnail, homepage, wiki, id} = char;
    let thumbnailClazz = 'randomchar__img';

    if (description){
        if (description.length > 180) description = `${description.slice(0, 180)}...`;
    }

        if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || 
            thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'){
            thumbnailClazz += ' randomchar__img_notFound'
        } 

    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className={thumbnailClazz} onClick={() =>onCharSelected(id)}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;