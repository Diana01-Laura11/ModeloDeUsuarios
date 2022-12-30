import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import UserEdit from './components/UserEdit';
const Router = () =>{
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path ='/' element={<CreateUser />}></Route>
                <Route exact path ='/usuarios' element={<Users />}></Route>
                <Route exact path ='/uptade/:id' element={<UserEdit />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;