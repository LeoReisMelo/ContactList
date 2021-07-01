import React, { useState, useEffect, FormEvent } from "react";
import api from '../../services/api';
import {FiEdit2} from 'react-icons/fi';
import {
    Container,
    Content,
    Padlock
} from '../../components/UserComponents';
import '../../assets/styles/UserStyles.css';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FiTrash2 } from 'react-icons/fi';


export default function Users() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        district: '',
        number: '',
    });

    function handleInputChange(event){
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    }

    async function handleRegisterUser(event) {
        event.preventDefault();
            try {
                await api.post('users', formData);
                alert('Usuário cadastrado com sucesso');
                window.location.reload();
            } catch (error) {
                const message = error.response.data;
                alert(`Erro no cadastro, tente novamente, ${message}`);
             }
    }
    /*Preenchendo a tabela*/

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const [users, setUsers] = useState([]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() =>{
            api.get('users').then(response =>{
                setUsers(response.data);
            })
        }, []);
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    const classes = useStyles();

    async function handleDeleteUser(id, index) {
        try {
            await api.delete(`users/${id}`);
            const user = Array.from(users);
            user.splice(index, 1);
            setUsers(user);
        } catch (error) {
            alert('Erro ao deletar usuario, tente novamente')
        }
    }
    async function updateForm(index){
      const usersArray = Array.from(users);
      const userArray = usersArray.splice(index, 1);
      const user = await userArray[0];
      const inputName = document.getElementById('name');
      const inputEmail = document.getElementById('email');
      const inputPhone = document.getElementById('phone');
      const inputStreet = document.getElementById('street');
      const inputDistrict = document.getElementById('district');
      const inputNumber = document.getElementById('number');
      const buttonSubmit = document.getElementById('buttonSubmit');
      const buttonUpdate = document.getElementById('buttonUpdate');

      inputName.value = user.name;
      formData.name = user.name;
      inputEmail.value = user.email
      formData.email = user.email;
      inputPhone.value = user.phone;
      formData.phone = user.phone;
      inputStreet.value = user.street;
      formData.street = user.street;
      inputDistrict.value = user.district;
      formData.district = user.district;
      inputNumber.value = user.number;
      formData.number = user.number;
      buttonSubmit.hidden = true;
      buttonUpdate.hidden = false;
    }
    async function handleUpdateUser(id) {
        try {
            await api.patch(`users/${id}`, formData);
            const user = Array.from(users);
            setUsers(user);
            alert(`Usuario atualizado com sucesso`);
            window.location.reload();
        } catch (error) {
          const message = error.response.data;
            alert(`Erro ao atualizar usuario, tente novamente, ${message}`)
        }
    }


  return (
    <>
    <Container>
        <Content>
            <Padlock/>
            <h1><b>CADASTRO</b></h1>
            <form onSubmit={handleRegisterUser}>
                <h2>Nome:</h2>
                <input className="form_field" onChange={handleInputChange} name="name" id="name" type="text" placeholder="Digite o seu nome"/>
                <h2>Email:</h2>
                <input className="form_field" onChange={handleInputChange} name="email" id="email" type="email" placeholder="Digite o seu email"/>
                <h2>Celular:</h2>
                <input className="form_field" onChange={handleInputChange} name="phone" id="phone" type="text" placeholder="11 000000000 ou 11000000000"/>
                <h2>Rua:</h2>
                <input className="form_field" onChange={handleInputChange} name="street" id="street" type="text" placeholder="Digite a sua rua"/>
                <h2>Distrito:</h2>
                <input className="form_field" onChange={handleInputChange} name="district" id="district" type="text" placeholder="Digite o seu distrito"/>
                <h2>Número:</h2>
                <input className="form_field" onChange={handleInputChange} name="number" id="number" type="text" placeholder="Digite o número"/>
                <br/>
                <button className="buttonSubmit" id='buttonSubmit' type="submit">Cadastrar</button>
            </form>
            {users.map((user) => (
            <button className="buttonSubmit" onClick={() => handleUpdateUser(user.user_id)} hidden="true" id='buttonUpdate' type="button">Atualizar</button>
            ))}
        </Content>
    </Container>

    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Nome</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Telefone</StyledTableCell>
            <StyledTableCell align="center">Rua</StyledTableCell>
            <StyledTableCell align="center">Distrito</StyledTableCell>
            <StyledTableCell align="center">Número</StyledTableCell>
            <StyledTableCell align="center">Editar</StyledTableCell>
            <StyledTableCell align="center">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.user_id}>
              <TableCell component="th" scope="row">
                {user.user_id}
              </TableCell>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.phone}</TableCell>
              <TableCell align="left">{user.street}</TableCell>
              <TableCell align="left">{user.district}</TableCell>
              <TableCell align="left">{user.number}</TableCell>
              <TableCell align="center">{<button className="buttonUpdate" onClick={() => updateForm(index)} type="button"><FiEdit2 size={20} color="green"/></button>}</TableCell>
              <TableCell align="center">{<button className="buttonDelete" onClick={() => handleDeleteUser(user.user_id, index)} type="button"><FiTrash2 size={20} color="red"/></button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
