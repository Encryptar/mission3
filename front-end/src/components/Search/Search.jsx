import React, { useEffect, useState } from 'react'
import "./Search.css"

const Search = () => {

    const [inputState, setInputState] = useState();
    const [responseState, setResponseState] = useState(null);

    useEffect(() =>{
        if(responseState != null){
            for(var i=0; i<responseState.webPages.value.length; i++){
                console.log(responseState.webPages.value[i].url);
            }
        }
    }, [responseState]);

    function RunSearchAPI(){
        UseBingSearch(FormatStringForQuery(inputState))
    }

    function FormatStringForQuery(string){
        return string.replace(/[^A-Za-z0-9\s]/g," ").replace(/\s{2,}/g, " ").trim().replaceAll(" ", "%20");
    }

    function UseBingSearch(string){
        const fetchPromise = fetch('http://localhost:9000/search',{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({query:string})
        }).then(
            (res) => {
                if(res.status !== 200){
                    console.log('Wrong status code; should be 200, instead received: ' + res.status);
                    return;
                }
                res.json().then((data) => {
                    setResponseState(data);
                })
            }
        ).catch((error) => {
            console.log("Error occured while fetching: ", + error);
        });
        console.log(fetchPromise)
    }

  return (
    <div>
        <form className='search-form'>
            <input className="search-box" type='text' onChange={(event) => setInputState(event.target.value)}></input>
            <input className="submit-button" type='submit' onClick={
                (event) =>{ 
                    event.preventDefault();
                    RunSearchAPI();
                }
                }></input>
        </form>
    </div>
  )
}

export default Search