import { Nav, Navbar, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Mainmenu() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ReciFree</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/recipes">Recipes</Nav.Link>
          <Nav.Link href="/recipes/add">Add a recipe</Nav.Link>
          
        </Nav>
        {isAuth ? (
          <Nav>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
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