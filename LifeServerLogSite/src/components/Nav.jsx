import { Link } from "react-router-dom";

//Navigation bar of all website pages
export function Nav() {
    
    return (
        <div id="nav">
      <h1>Life Server Logger</h1>
      <ul>
        <li><Link to='/'><h2>Home</h2></Link></li>
        <li><Link to='/log'><h2>Log</h2></Link></li>
        <li><Link to='/new'><h2>New</h2></Link></li>
      </ul>
    </div>
    );
}
export default Nav;