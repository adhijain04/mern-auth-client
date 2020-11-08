import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { apiCall } from '../utility';
import { auth } from '../Urls';

import { authenticate, isAuth } from './Helpers';

// 3rd party auth imports.
import Google from '../auth/Google';
import Facebook from '../auth/Facebook';

const Signin = ({ history }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        buttonText: "Submit"
    });

    // destructuring props from state.
    const { email, password, buttonText } = formData;

    const onChangeHandler = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        setFormData({ ...formData, [name]: value });
    }

    const informParent = (data) => {
        authenticate(data, () => {
            setFormData({ ...formData, email: "", password: "", buttonText: "Submitted" });
            toast.success(`Hey ${data.user.name}, Welcome back.`);
            isAuth() && isAuth().role === "admin" ? history.push('/admin') : history.push('/private')
        });
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        setFormData({ ...formData, buttonText: "Singning in..." });

        apiCall({
            method: "POST",
            body: { email, password },
            url: auth.signIn
        }).then(({ data, statusCode }) => {
            if (statusCode === 200) {

                // save the response (user info => in local storage), (token => in cookie).
                authenticate(data, () => {
                    setFormData({ ...formData, email: "", password: "", buttonText: "Submitted" });
                    toast.success(`Hey ${data.user.name}, Welcome back.`);
                    isAuth() && isAuth().role === "admin" ? history.push('/admin') : history.push('/private')
                });

            } else {
                setFormData({ ...formData, email: "", password: "", buttonText: "Retry" });
                toast.error(data.message);
            }
        }).catch(err => {
            console.log("error", err);
            setFormData({ ...formData, email: "", password: "", buttonText: "Submit" });
            toast.error(err);
        })
    }

    const signinForm = () => (
        <form autoComplete="false">
            <div className="form-group">
                <label htmlFor="" className='text-muted'>Email</label>
                <input type="email" placeholder="Enter your Email" className="form-control" name="email" value={email} onChange={onChangeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="" className='text-muted'>Password</label>
                <input type="password" placeholder="Enter your Password" className="form-control" name="password" value={password} onChange={onChangeHandler} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={formSubmitHandler}>{buttonText}</button>
        </form>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="p-5 text-center text-secondary">Signin</h1>
                <Google informParent={informParent} />
                <Facebook informParent={informParent} />
                <br />
                <h6 className="text-center text-secondary">OR</h6>
                {signinForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    );
}

export default Signin;
