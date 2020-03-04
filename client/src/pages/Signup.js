import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="signup">
            <form>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <input type="password" name="password" />
                <input type="submit" name="validate" />
            </form>
            <Link to="/login">Already have an account ?</Link>
        </div>
    );
}
export default Signup;
