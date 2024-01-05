import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WopApi from "../api";

function  AddNewCompany () {
    const { id } = useParams();

    const initialState = {
        name: "",
        address: "",
        contact_name: "",
        phone_number: "",
        tax_id: ""
    };

   const [formData, setFormData] = useState(initialState);
    const handleChange = e =>{
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }
  
    useEffect(() => {
      async function companyLoad() {
        try {
          const result = await WopApi.getCompany(id);
          console.log(result)
          delete result.user_id;
          delete result.user
          console.log(result)
          setFormData(result);
        } catch (error) {
          console.error('Error loading companies:', error);
        }
      }
    
      companyLoad(); // Invoke the async function immediately
    
    }, [id]);  

   async function  handleSubmit (e) {
        e.preventDefault();
        console.log(formData)
        try{
            await WopApi.patchCompany(id, formData).then((result)=>{
              console.log(result.invoice)
            }) 
        setFormData(initialState);
        } catch(e){
            alert(e[0])
        }
           
    }

    return (
        
        <div className="container">
    <div className="row">
      <div className="col-md-6 custom-container mx-auto">
        <div className="container border rounded p-4 my-3">
            <h1 className="my-3">Update Company Information</h1>
{formData? 
            <>

            <form onSubmit={handleSubmit}>
                <input
                className="form-control my-3"
                id="name"
                type="text"
                name="name"
                placeholder="Company name"
                value={formData.name}
                onChange={handleChange} required/>

                <input
                className="form-control my-3"
                id="address"
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange} required/>
                
                <input
                className="form-control my-3"
                id="contact_name"
                type="text"
                name="contact_name"
                placeholder="contact name"
                value={formData.contact_name}
                onChange={handleChange} required/>

                <input
                className="form-control my-3"
                id="phone_number"
                type="integer"
                name="phone_number"
                placeholder="phone number"
                value={formData.phone_number}
                onChange={handleChange} required/>

                <input
                className="form-control my-3"
                id="tax_id"
                type="text"
                name="tax_id"
                placeholder="tax id number"
                value={formData.tax_id}
                onChange={handleChange}/>

                <button className="btn btn-primary btn-block my-3">Submit</button>
            </form></>: <div className='display-4'>Loading..........</div>}
        </div></div></div></div>
    )
}

export default AddNewCompany;
