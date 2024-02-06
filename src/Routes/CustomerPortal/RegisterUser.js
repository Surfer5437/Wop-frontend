import React, { useState, useEffect } from 'react';
import WopApi from '../api.js';
import { useNavigate, useParams } from 'react-router-dom';
import Background from '../../Helpers/Background.js';

function RegisterUser() {

    const { registerLink } = useParams();
    let initialState = "";
    const navigate = useNavigate();
    useEffect(() => {
        async function companyLoad() {
            try {

                console.log(registerLink)
                let result = await WopApi.getRegistraionCompanyInfo(registerLink);
                result['username'] = "";
                result['password'] = "";
                result['passwordVerify'] = "";
                setFormData(result);
            } catch (error) {
            }
        }
        companyLoad(); // Invoke the async function immediately

    }, [registerLink, initialState]);


    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    console.log(initialState)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await WopApi.registerUserToCompany(formData).then((result) => {
                if (result) {
                    console.log(result);
                    alert('User account created')
                    navigate(`/`);
                }
            })

        } catch (e) {
            alert(e[0])
        }
    }

    return (
        <>
            <Background />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 custom-container mx-auto">
                        <div className="container border rounded p-4 my-3">
                            <h1 className="my-3">Register User Account</h1>
                            {formData ?
                                <>
                                    <h2 className='my-3'>{formData.company_name}</h2>

                                    <form onSubmit={handleSubmit}>
                                        <input
                                            className="form-control my-3"
                                            id="email"
                                            type="text"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange} required />

                                        <input
                                            className="form-control my-3"
                                            id="username"
                                            type="text"
                                            name="username"
                                            placeholder="username"
                                            value={formData.username}
                                            onChange={handleChange} required />

                                        <input
                                            className="form-control my-3"
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="password"
                                            value={formData.password}
                                            onChange={handleChange} required />

                                        <input
                                            className="form-control my-3"
                                            id="passwordVerify"
                                            type="password"
                                            name="passwordVerify"
                                            placeholder="retype password"
                                            value={formData.passwordVerify}
                                            onChange={handleChange} required />

                                        <button className="btn btn-primary btn-block my-3">Submit</button>

                                    </form></> : <div className='display-4'>Loading..........</div>}
                        </div></div></div></div>
        </>
    )
}

export default RegisterUser;
