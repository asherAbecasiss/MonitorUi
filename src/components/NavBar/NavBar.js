import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <div className={`${style.topnav} `}id={style.myTopnav}>
        <Link to={`/`}>
          Home <i className="fa fa-home" aria-hidden="true" />
      </Link>
        <a href="#">
          Blog <i className="fa fa-book" />
        </a>
        <a href="#">
          Contact <i className="fa fa-envelope" />
        </a>
        <a href="#">
          About <i className="fa fa-user" />
        </a>
        <div className="right-lnk">
          <a href="#">Login / Signup</a>
        </div>
        <a href="javascript:void(0);" className="icon" onclick="myFunction()">
          <i className="fa fa-bars" />
        </a>
      </div>
    </>
  );
}

export default NavBar;
