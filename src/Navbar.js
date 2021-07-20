import { Link } from 'react-router-dom'

const Navbar = () => {
    return ( 
        <nav className="navbar">
                <Link style={{fontSize: '30px'}} to="/">Crimes</Link>

            <div className="links">
                <Link to="/crimes" style={{fontSize: '20px'}} >Crimes</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;
