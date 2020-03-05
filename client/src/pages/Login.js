import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);

    const authContext = useContext(AuthContext);

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    const handleChangePassword = e => {
        setPassword(e.target.value);
    };

    const postLogin = async e => {
        e.preventDefault();
        const result = await axios.post(
            'http://localhost:5000/api/user/login',
            {
                email,
                password
            }
        );
        if (result.status === 200) {
            authContext.setToken(result.data.data);
            setLoggedIn(true);
            console.log('Successfully logged in !', result);
        } else {
            alert('Erreur');
        }
    };

    if (isLoggedIn) return <Redirect to="/" />;

    return (
        <div className="login">
            <form>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={e => handleChangeEmail(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => handleChangePassword(e)}
                />
                <input type="submit" name="validate" onClick={postLogin} />
            </form>
            <Link to="/login">Don't have an account ?</Link>
        </div>
    );
}

export default Login;
