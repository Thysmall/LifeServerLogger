import Nav from "../components/Nav"
import '../New.css'

const fetchURL = import.meta.env.VITE_SERVER_IP

const handleSubmit = async (event) =>{
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (data.timestamp) data.timestamp = new Date(data.timestamp).toISOString()
    if (data.lives) data.lives = parseInt(data.lives)
    const jsonString = JSON.stringify(data);
    try {
        const response = await fetch(`http://${fetchURL}:8080/api/deaths/post/`,
        {method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: jsonString
    });
        if (response.ok){alert("Log item added. Make sure to update the scoreboard on the server.")

        }else{
            const errorDetails = await response.json();
            console.error("Server validation error:", errorDetails);
            alert(`Failed: ${JSON.stringify(errorDetails)}`);
        }

    }catch (error) {
        console.error("Network or parsing error:", error);
        alert("Log item failed to add");
    }
    }

function New() {
    return(
        <>
        <Nav />
        <h2>New Log Item</h2>
        <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="victimName">Victim Name: </label>
        <input type="text" name="victimName" id="victimName"/>
        </div>

        <div>  
        <label htmlFor="victimUuid">Victim UUID: </label>
        <input type="text" name="victimUuid" id="victimUuid" />
        </div>

        <div>
        <label htmlFor="killerName">Killer: </label>
        <input type="text" name="killerName" id="killerName" />
        </div>

        <div>
        <label htmlFor="message">Death Message: </label>
        <input type="text" name="message" id="message" />
        </div>

        <div>
        <label htmlFor="timestamp">Timestamp: </label>
        <input type="datetime-local" name="timestamp" id="timestamp" />
        </div>

        <div>
        <label htmlFor="victimNewLives">New Lives: </label>
        <input type="number" name="victimNewLives" id="victimNewLives" min={0}/>
        </div>

        <div>
        <label htmlFor="description">Description: </label>
        <div>
        <textarea name="description" id="description" rows={5} cols={40}/>
        </div>
        </div>

        <input id="submit" type="submit" value="Submit" />
        </form>
        </>
    )
}

export default New