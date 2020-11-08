import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { apiCall } from '../utility';
import { auth } from '../Urls';

import { isAuth } from './Helpers.js';

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        buttonText: "Submit"
    });

    // destructuring props from state.
    const { name, email, password, buttonText } = formData;

    const onChangeHandler = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        setFormData({ ...formData, [name]: value });
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        setFormData({ ...formData, buttonText: "Submitting..." });

        apiCall({
            method: "POST",
            body: { name, email, password },
            url: auth.signUp
        }).then(({ data, statusCode }) => {
            if (statusCode === 200) {
                setFormData({ ...formData, name: "", email: "", password: "", buttonText: "Submitted" });
                toast.success(data.message);
            } else {
                setFormData({ ...formData, name: "", email: "", password: "", buttonText: "Retry" });
                toast.error(data.message);
            }
        }).catch(err => {
            console.log("error");
            setFormData({ ...formData, name: "", email: "", password: "", buttonText: "Submit" });
            toast.error(err.data.message);
        })
    }

    const signupForm = () => (
        <form autoComplete="false">
            <div className="form-group">
                <label htmlFor="" className='text-muted'>Name</label>
                <input type="text" placeholder="Enter your Name" className="form-control" name="name" value={name} onChange={onChangeHandler} />
            </div>
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
                <h1 className="p-5 text-center text-secondary">Signup</h1>
                {signupForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    );
}

export default Signup;