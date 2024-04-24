import React, {useState } from 'react'
import SearchContext from './Context1'

function SearchBar(props) {

    const [btnvalue, setbtnvalue] = useState('Sale');
    const [iconVal, setISiocnVal] = useState(false)
    const [isSearch, setIssearch] = useState(false);
    const [pageid, setPageid] = useState(false);
    const [pagename,setPagename]=useState('');
    const [propertyName,setPropertyname]=useState('');

    const [chatlead,setchatlead]=useState('ok');
    const [userchat,setUserchat]=useState('');

    const [loc, setloc] = useState('');


    return (
        <SearchContext.Provider value={{iconVal, setISiocnVal, setbtnvalue, btnvalue , isSearch, setIssearch, loc, setloc,pageid, setPageid,pagename,setPagename,propertyName,setPropertyname,chatlead,setchatlead,userchat,setUserchat}}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchBar