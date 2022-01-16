import './Header.css';

import { Link } from 'react-router-dom';

import Button from '../../common/Button/Button';
import LogoutButton from '../../common/LogoutButton/LogoutButton';
import Logo from '../../../public/images/logo.png';

import { useSelector } from 'react-redux';
import { getIsLogged } from '../../../store/selectors';

function Header() {
  const isLogged = useSelector(getIsLogged);

  return (
    <header className="header-container">
      <Link to="/">
        <img src={Logo} alt="" width="100" />
      </Link>
      <div className="menu-container">
        <Button className="newpost-button" as={Link} to="/adverts/new">
          New Post
        </Button>
      </div>
      <div className="loguser-container">{isLogged && <LogoutButton />}</div>
    </header>
  );
}

export default Header;
