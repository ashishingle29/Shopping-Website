import { useState, useContext, createContext } from "react";



const SearchContext=createContext();

const SearchProvider=({children})=>{
    const [values, setValues] = useState({
        keyword:"",
        results:[]
    });
    let loading=false;
    return (
        <SearchContext.Provider value={[values, setValues,loading]}>
            {children}
        </SearchContext.Provider>
    )
}
//custom hook:::::::
const useSearch=()=>useContext(SearchContext);
export {useSearch,SearchProvider};
