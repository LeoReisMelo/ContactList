import styled from 'styled-components';
import imgContact from '../assets/images/iphones.jpg';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  text-align: center;
  margin-top: 2.5%;
  background: -webkit-linear-gradient(90deg, rgba(0,94,186,1) 0%, rgba(52,93,157,1) 50%);
  background-color: ;
  height: 1000px;
  width: 600px;
  border-radius: 20px;
  font-family: 'Roboto';
  color: white!important;
  margin-bottom: 5%;
`;

export const Padlock = styled.div`
    margin: 0 auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2%;
    background-image: url(${imgContact});
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;