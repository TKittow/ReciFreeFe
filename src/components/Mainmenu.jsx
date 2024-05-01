import { Nav, Navbar, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { currentUser } from "../lib/CurrentUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mainmenu() {
  const [isAuth, setIsAuth] = useState(false);
  const [author, setAuthor] = useState('')
  const [tried, setTried] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    } else if (!tried){
      navigate('/signup')
      setTried(true)
    }
  }, [isAuth, tried, navigate]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
        const userData = currentUser();
        if (!userData){
          return console.log('No token')
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userData}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.username);
            setAuthor(response.data.username);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchCurrentUser();
    //eslint-disable-next-line
}, []);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ReciFree</Navbar.Brand>
        
        {isAuth ? (
          <>
          <Nav className="me-auto">
          <Nav.Link href="/recipes">Recipes</Nav.Link>
          <Nav.Link href="/recipes/add">Add a recipe</Nav.Link>
          
        </Nav>
          <Nav>
            {author !== ''? <>
            <Nav.Link href={`/mypage/${author}`}>{author}</Nav.Link>
            </> : <></>}
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
          </>
        ) : (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">SignUp</Nav.Link>
          </Nav>
        )}
        
      </Container>
    </Navbar>
  )
}