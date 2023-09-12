import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h1 style={{fontSize: '15rem', textAlign: 'center'}}>Oops!</h1>
            <h3 style={{textAlign: 'center',fontSize: '1.9rem'}}>404 - PAGE NOT FOUND</h3>
            <h6 style={{textAlign: 'center', margin: '1rem 2rem', padding: '0 2rem', fontSize: '1rem'}}>The page you are looking for might have been removed has its name changed or is temporarily unavailable.</h6>
            <div style={{ textAlign: 'center', margin: '1.2rem 2.4rem'}}>
                <Link to="/">
                    <button style={{padding: '0.5rem 1.8rem', borderRadius: '2rem', border: 'none', backgroundColor: 'rgb(80,80,80,0.5)', fontWeight: '600'}}>GO TO HOMEPAGE</button>
                </Link>
            </div>
        </>
    )
}

export default NotFound