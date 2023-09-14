import { useState } from "react";
import {Helmet} from "react-helmet";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchForm from "../searchForm/SearchForm";
import decoration from '../../resources/img/vision.png';

const MainPage: React.FC = () => {
    const [selectedChar, setChar] = useState<number | null>(null);
    const [searchChar, setSearchChar] = useState<number | null>(null)
        
    const onCharSelected = (id) => {
        setChar(id)
    }

    const onCharSearch = (id: number) => {
        setSearchChar(id)
    }
    
    return(
        <>
            <Helmet>
                <meta
                name="description"
                content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar onCharSelected={onCharSelected}/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                        <SearchForm onCharSearch={onCharSearch}/>   
                    </ErrorBoundary> 
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;