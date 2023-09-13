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

const App: React.FC = () => {
    return (
        <Router basename="/udemy-project--marvel_webApp">
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='' element={<MainPage/>}/>
                            <Route path='comics' element={<ComicsPage/>}/>
                            <Route path='comics/:id' element={<SinglePage View={SingleComic} type={'comic'}/>}/>
                            <Route path='char/:id' element={<SinglePage View={SingleChar} type={'char'}/>}/>
                            <Route path='*' element={<PageNotFound/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;