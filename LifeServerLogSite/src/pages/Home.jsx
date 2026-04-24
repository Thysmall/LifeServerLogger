import Nav from "../components/Nav"
import {useState, useEffect } from 'react'


//Home page of site. Created with custom table formatting.
function Home() {
    const fetchURL = import.meta.env.VITE_SERVER_IP
    const [serverData, setServerData] = useState([]);
    const [liveData, setLiveData] = useState([]);
    const [activeData, setActiveData] = useState([])
    const [sortMethod, setSortMethod] = useState("RN")
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true);

    const [sortedByLive, setSortedByLive] = useState([])
    const [reverseSortedByLive, setReverseSortedByLive] = useState([])
    const [sortedByName, setSortedByName] = useState([])
    const [reverseSortedByName, setReverseSortedByName] = useState([])
    //On entering page, load the data.
    useEffect(() => {
        setLoading(true);
        
        fetchForMC()
        fetchForDeaths()
        const fetchingMC = setInterval(fetchForMC, 20000)
        const fetchingDeaths = setInterval(fetchForDeaths, 1000)
        setSortMethod("RN")
        return () => {
            clearInterval(fetchingMC);
            clearInterval(fetchingDeaths)
        }
        }, []);
        

    //If the data updates, create new sorted versions
    useEffect(() =>{
        setSortedByLive([...filteredData].sort((a,b) => a.victimNewLives - b.victimNewLives))
        setReverseSortedByLive([...filteredData].sort((a,b) => b.victimNewLives - a.victimNewLives))
        setSortedByName([...filteredData].sort((a,b) => a.victimName.localeCompare(b.victimName)))
        setReverseSortedByName([...filteredData].sort((a,b) => b.victimName.localeCompare(a.victimName)))
        
    }, [filteredData]);

    //If there was a new sort or the user sorts, update the tables data
    useEffect(()=> {
        
        const dataMap = {
            "N": reverseSortedByName,
            "RN": sortedByName,
            "L": reverseSortedByLive,
            "RL": sortedByLive
        };
        setActiveData(dataMap[sortMethod]);
    }, [reverseSortedByName, sortMethod]);

    //Change the sorted method between by name or reverse by name
    function changeSortName(){
        if(sortMethod == "N"){
            setSortMethod("RN")

        } else{
            setSortMethod("N")
        }
    }
    //Change the sorted method between by lives or reverse by lives
    function changeSortLive(){
        if(sortMethod == "L"){
            setSortMethod("RL")
        } else{
            setSortMethod("L")
        }
    }

    //Fetch server information from an external API. Change the ip in variables.env
    async function fetchForMC(){
        setLoading(true)
            await fetch(`https://api.mcsrvstat.us/2/${fetchURL}:25565`)
            .then(response => response.json())
            .then(result => {
                setServerData(result);
                setLoading(false)
            });
            
        }
    //Fetch the death data from the database using Spring
    async function fetchForDeaths(){
        await fetch(`http://${fetchURL}:8080/api/deaths`)
        .then(response => response.json())
        .then(result => {
            setLiveData(result);
            setFilteredData( Object.values(
            result.reduce((acc, current) =>{
                if (!acc[current.victimName] || current.id > acc[current.victimName].id){
                    acc[current.victimName] = current;}
                    return acc;
                }, {})))
        setLoading(false)
        });
    }

    if (loading) {
        return <p>Loading...</p>
    }else{

    return(
        <>
        <Nav />
        <h2>Home</h2>
        <h3>Current Lives</h3>
        <table>
            <thead>
                <tr>
                    <th onClick={() => changeSortName()}>Name {sortMethod == "N"|| sortMethod =="RN" ? (sortMethod =="N" ? "^" : "v") : ""}</th>
                    <th onClick={() => changeSortLive()}>Lives {sortMethod == "L"|| sortMethod =="RL" ? (sortMethod =="L" ? "^" : "v") : ""}</th>
                </tr>
            </thead>
            <tbody>
                {activeData?.map(death =>
            <tr key={death.id}>
              <td>{death.victimName}</td>
              <td>{death.victimNewLives}</td>
            </tr>
          )}

            </tbody>
        </table>
        <h3>Server Status</h3>
        <p id="status">{serverData?.online ? 'Online' : 'Offline'}</p>
        <p id="players">{serverData?.online ? 'Players: ' + serverData.players.online : ""}</p>

        </>
    )}
}

export default Home
