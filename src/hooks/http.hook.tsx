import { useState, useCallback } from "react";

interface IRequest {
    (url: string, 
        method?: string, 
        body?: any, 
        headers?: HeadersInit): Promise<any>;
}

interface IuseHttp{
    loading: boolean;
    request: IRequest;
    error: boolean | null | string;
    clearError: () => void;
}
  

export const useHttp: () => IuseHttp = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request: IRequest = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type':'appliation/json'}) =>{

        setLoading(true);

        try{
            const response = await fetch(url, {method, body, headers});

            if(!response.ok){
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data;
        } catch(e: any){
            setLoading(false);
            setError(e.message);
            throw e;
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}