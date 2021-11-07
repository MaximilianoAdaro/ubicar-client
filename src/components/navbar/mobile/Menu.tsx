import { Link } from "react-router-dom";
import styled from "styled-components";
import { urls } from "../../../constants";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  background: #effffa;
  transform: ${({ open }: { open: boolean }) =>
    open ? "translateX(0)" : "translateX(-100%)"};
  height: 100vh;
  text-align: left;
  padding: 2rem 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 9;

  background: rgba(241, 241, 241, 0.1);
  box-shadow: inset 25.1px -25.1px 25.1px rgba(183, 183, 183, 0.1),
    inset -25.1px 25.1px 25.1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 1.2em;
    text-transform: uppercase;
    padding: 0.6em 1.3em;
    font-weight: normal;
    letter-spacing: 0.5rem;
    color: #ff4000;
    text-decoration: none;
    transition: color 0.3s linear;
    border-bottom: 1px solid black;

    // @media (max-width: 576px) {
    //   font-size: 1em;
    //   //   text-align: center;
    // }

    &:hover {
      color: #343078;
    }
  }

  a:first-child {
    padding-top: 3em;
  }
`;

export const Menu = ({
  open,
  setOpen,
  isLoggedIn,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isLoggedIn: boolean;
}) => {
  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <StyledMenu open={open}>
      <Link onClick={closeMenu} to={urls.home}>
        Home
      </Link>
      <Link onClick={closeMenu} to={urls.listingPage}>
        Ver publicaciones
      </Link>
      {isLoggedIn ? (
        <Link onClick={closeMenu} to={urls.userProfile.path}>
          Perfil
        </Link>
      ) : (
        <>
          <Link onClick={closeMenu} to={urls.logIn}>
            Iniciar Sesion
          </Link>
          <Link onClick={closeMenu} to={urls.signUp}>
            Registrarse
          </Link>
        </>
      )}
    </StyledMenu>
  );
};

const StyledBurger = styled.button`
  position: absolute;
  top: 1em;
  left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1em;
  height: 1.3em;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 1.3em;
    height: 0.25rem;
    background: #ff4000;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }: { open: boolean }) =>
        open ? "rotate(45deg)" : "rotate(0)"};
    }

    :nth-child(2) {
      opacity: ${({ open }: { open: boolean }) => (open ? "0" : "1")};
      transform: ${({ open }: { open: boolean }) =>
        open ? "translateX(20px)" : "translateX(0)"};
    }

    :nth-child(3) {
      transform: ${({ open }: { open: boolean }) =>
        open ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;

export const Burger = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
