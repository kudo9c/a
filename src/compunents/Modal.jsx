import { CloseOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
`

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
`

const Button = styled.button`
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
`

const Title = styled.span`
  display: inline-block;
  text-align: center;
  margin-top: 10px;
  color: #43a047;
`

const ModalBody = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
`

const Footer = styled.div`
  flex: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Btn = styled.button`
  width: 100px;
  height: 35px;
  margin: 10px;
  border: none;
  background-color: ${props => props.cancel ? "crimson" : "cornflowerblue"};
  color: white;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  
`

const Modal = ({stateModal, message, action}) => {
  
  return (
    <Wrapper>
      <ModalBackground onClick={() => stateModal(false)}>
      <ModalContainer>
          <Button onClick={() => stateModal(false)}><CloseOutlined/></Button>
          <ModalBody>{message}</ModalBody>
          <Footer>
            <Btn onClick={() => stateModal(false)} cancel>Quay lại</Btn>
            <Link to={`/${action ? "login" : ""}`}>
              <Btn>{action ? "Đăng nhập" : "Trang chủ"}</Btn>
            </Link>
          </Footer>
        </ModalContainer>
      </ModalBackground>
    </Wrapper>
  )
}

export default Modal