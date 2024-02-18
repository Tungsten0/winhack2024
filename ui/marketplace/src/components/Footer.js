import { Link } from 'react-router-dom';

export default function Footer() {
return (

<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">

<p className="col-md-4 mb-0 text-body-secondary">© 2024 WinHacks, @UWindsor, by: Marco Lee-Shi</p>


<ul className="nav col-md-4 justify-content-end">
    <li>
        <Link to="/home" className="nav-link">
            <h5>Win-Market</h5>
        </Link>
    </li>
    <li className="nav-item">
        <Link to="/about" className="nav-link">
            <h5>About</h5>
        </Link>
    </li>
</ul>

</footer>
    )
}