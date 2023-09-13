import './searchForm.scss'

import useMarvelService from '../../services/MarvelService';
import React, { useState } from 'react';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik'
import {Link} from "react-router-dom"

const SearchForm = ({onCharSearch}) =>{
    const [char, setChar] = useState('');
    const {getCharacterByName, clearError, loading, error} = useMarvelService();

    const updateChar = char => {
        clearError();

        getCharacterByName(char)
            .then(onCharLoaded) 
    }

    const onCharLoaded = (char) =>{
        setChar(char)
        onCharSearch(char[0].id)
    }

    const errorMessage = error ? <div className="char__search-error">The server isn't working :(</div> : null;
    const result = !char ? null : char.length > 0 ?
            <div className='char__success-wrap'>
                <div className="char__success-content">There is! Visit {char[0].name} page?</div>
                <Link to={`/char/${char[0].id}`} 
                      className="button button__secondary">
                    <div className="inner">TO PAGE</div>
                </Link>
            </div> 
            : <div className="char__search-error">The character was not found. Check the name and try again</div>

    return(
        <div className='char__base'>
            <Formik
                initialValues={{charName: ''}}
                validate={value => {
                    const errors = {};
                    if (!value.charName) errors.charName = 'This field is required!'
                    return errors
                }}
                onSubmit={({charName}) => {
                    updateChar(charName)
                }}>
                <Form>
                    <div className='char__base-inner'>
                        <label className="char__title">Or find a character by name:</label>
                        <Field 
                            type="text" 
                            id={'charName'}
                            name={'charName'} 
                            placeholder={'Enter name'}
                            className='char__input'
                        />
                        <button 
                            type='submit'
                            disabled={loading}
                            className="button button__main" 
                        >
                            <div className="inner">FIND</div>
                        </button>
                        <FormikErrorMessage name={'charName'} component="label" className="char__search-error"/>
                    </div>      
                </Form>
            </Formik>
            {errorMessage}
            {result}
        </div>
    )
}

export default SearchForm;