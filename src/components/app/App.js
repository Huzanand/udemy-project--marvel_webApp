import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'))        
const ComicsPage = lazy(() => import("../pages/ComicsPage"))    
const SinglePage = lazy(() => import('../pages/singlePage/SinglePage'))
const SingleChar = lazy(() => import('../singleChar/SingleChar'))
const SingleComic = lazy(() => import('../singleComic/SingleComic'))
const PageNotFound = lazy(() => import('../pages/404/Page404'))    

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='udemy-project--marvel_webApp/' element={<MainPage/>}/>
                            <Route path='udemy-project--marvel_webApp/comics' element={<ComicsPage/>}/>
                            <Route path='udemy-project--marvel_webApp/comics/:id' element={<SinglePage View={SingleComic} type={'comic'}/>}/>
                            <Route path='udemy-project--marvel_webApp/char/:id' element={<SinglePage View={SingleChar} type={'char'}/>}/>
                            <Route path='udemy-project--marvel_webApp/*' element={<PageNotFound/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;