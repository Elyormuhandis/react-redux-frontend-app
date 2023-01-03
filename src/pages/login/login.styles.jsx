import styled from "styled-components";
import img1 from "../../assets/img/bg1.jpg";
import img2 from "../../assets/img/bg2.jpg";
import img3 from "../../assets/img/bg3.jpg";
import img4 from "../../assets/img/bg4.jpg";
import img5 from "../../assets/img/bg5.jpg";
import img6 from "../../assets/img/bg6.jpg";
import img7 from "../../assets/img/bg7.jpg";
import img8 from "../../assets/img/bg8.jpg";
import img9 from "../../assets/img/bg9.jpg";

let img;
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
switch (getRandomInt(1, 9)) {
  case 1:
    img = img1;
    break;
  case 2:
    img = img2;
    break;
  case 3:
    img = img3;
    break;
  case 4:
    img = img4;
    break;
  case 5:
    img = img5;
    break;
  case 6:
    img = img6;
    break;
  case 7:
    img = img7;
    break;
  case 8:
    img = img8;
    break;
  case 9:
    img = img9;
    break;
  default:
    img = img4;
    break;
}

export const LoginStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
`;

export const LoginContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FromStyle = styled.form`
  width: 350px;
`;
export const FromControlStyle = styled.input`
  width: 20rem;
  margin-bottom: 25px;
  padding: 15px 25px;
  border-radius: 50px;
  outline: none;
  border: none;
  color: rgb(178, 186, 194);
  letter-spacing: 2px;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: small;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  &::placeholder {
    color: rgb(178, 186, 194);
    font-size: small;
  }
`;

export const BtnStyle = styled.button`
  margin-top: 15px;
  background-color: rgba(183, 7, 7, 0.5);
  font-size: small;
  transition: all 0.3s;
  width: 20rem;
  margin-bottom: 15px;
  padding: 15px 25px;
  border-radius: 50px;
  outline: none;
  border: none;
  color: rgb(178, 186, 194);
  &:hover {
    transition: all 0.3s;
    cursor: pointer;
    color: white;
    background-color: rgba(250, 9, 53, 0.8);
  }
  &:active {
    transform: translateY(4px);
  }
`;

export const InputLabel = styled.label`
  position: relative;
`;

export const ErrorMessage = styled.p`
  position: absolute;
  color: rgba(250, 9, 53, 0.8);
  top: 35px;
  left: 25px;
  font-size: small;
`;

export const ErrorAuth = styled.p`
  text-align:center;
  margin-right:35px;
  color: rgba(250, 9, 53, 0.8);
`;
