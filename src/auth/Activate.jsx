import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { apiCall } from '../utility';
import { auth } from '../Urls';

import jwt from 'jsonwebtoken';

const Activate = ({match}) => {

    const [formData, setFormData] = useState({
        name: "",
        token: "",
        show: true,
    });

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);

        if (token) {
            setFormData({...formData, name, token});
        }
    }, [])

    // destructuring props from state.
    const { name, token } = formData;

    const formSubmitHandler = (e) => {
        e.preventDefault();

        apiCall({
            method: "POST",
            body: { token },
            url: auth.accountActivation
        }).then(({ data, statusCode }) => {
            console.log(data);
            if (statusCode === 200) {
                setFormData({ ...formData, show: false });
                toast.success(data.message);
            } else {
                setFormData({ ...formData });
                toast.error(data.message);
            }
        }).catch(err => {
            console.log("error");
            setFormData({ ...formData });
            toast.error(err.data.message);
        })
    }

    const activationForm = () => (
        <div className="text-center">
            <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
            <button className='btn btn-outline-primary' onClick={formSubmitHandler}>Activate Account</button>
        </div>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {/* <h1 className="p-5 text-center text-secondary">Activate Account</h1> */}
                {activationForm()}
            </div>
        </Layout>
    );
}

export default Activate;