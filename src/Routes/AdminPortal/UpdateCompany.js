import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WopApi from "../api";
import Emailjs from '../../Helpers/Email.js';

function AddNewCompany() {
  const { id } = useParams();

  const initialState = {
    name: "",
    address: "",
    contact_name: "",
    phone_number: "",
    tax_id: "",
    email: ""
  };

  const [formData, setFormData] = useState(initialState);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }
  // get specific company data from database and catch error.
  useEffect(() => {
    async function companyLoad() {
      try {
        const result = await WopApi.getCompany(id);
        delete result.user;
        setFormData(result);
        console.log(result)
      } catch (error) {
      }
    }

    companyLoad(); // Invoke the async function immediately

  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await WopApi.patchCompany(id, formData).then((result) => {

      })
      setFormData(initialState);
    } catch (e) {
      alert(e[0])
    }
  }

  async function emailRegisterUser(companyRegisterLink) {
    const messageTextArea =
      `<html>
        <body>
          <p>Your company has been added to our work order portal. Please click the following link to register your login information for your company.</p>
          <a href="${companyRegisterLink}">Click Here</a>
          <p>If link doesn't work, please copy and paste the following link into your browser.<p/>
          <p>${companyRegisterLink}</p>
        </body>
      </html>`
    Emailjs.sendEmailData({
      to_name: formData.name,
      to_email: formData.email,
      message: messageTextArea
    });
  };
  async function hashing() {
    try {
      let hashed = await WopApi.sendRegistrationEmailForNewUser(formData);
      emailRegisterUser(hashed);
      alert(`Email sent to ${formData.name} at email: ${formData.email}`)
    } catch (e) {
      alert(e[0])
    }

  }
  return (

    <div className="container">
      <div className="row">
        <div className="col-md-6 custom-container mx-auto">
          <div className="container border rounded p-4 my-3">
            <h1 className="my-3">Update Company Information</h1>
            {formData ?
              <>
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control my-3"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Company name"
                    value={formData.name}
                    onChange={handleChange} required />

                  <input
                    className="form-control my-3"
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange} required />

                  <input
                    className="form-control my-3"
                    id="contact_name"
                    type="text"
                    name="contact_name"
                    placeholder="contact name"
                    value={formData.contact_name}
                    onChange={handleChange} required />

                  <input
                    className="form-control my-3"
                    id="phone_number"
                    type="integer"
                    name="phone_number"
                    placeholder="phone number"
                    value={formData.phone_number}
                    onChange={handleChange} required />

                  <input
                    className="form-control my-3"
                    id="tax_id"
                    type="text"
                    name="tax_id"
                    placeholder="tax id number"
                    value={formData.tax_id}
                    onChange={handleChange} />

                  <input
                    className="form-control my-3"
                    id="email"
                    type="text"
                    name="email"
                    placeholder="company email"
                    value={formData.email}
                    onChange={handleChange} />

                  <button className="btn btn-primary btn-block my-3">Submit</button>
                  
                </form></> : <div className='display-4'>Loading..........</div>}
                {formData.user_id === null ?
                    <><button className="btn btn-primary btn-block my-3" onClick={hashing}>Send email to register user</button>
                    </> : <><div>Has user assigned to company.</div></>}
          </div></div></div></div>
  )
}

export default AddNewCompany;
