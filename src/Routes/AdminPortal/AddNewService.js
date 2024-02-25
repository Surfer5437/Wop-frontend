// import { useCallback, useEffect, useState } from "react";
// import WopApi from "../api";
// import Background from "../../Helpers/Background";
// import { useDropzone } from 'react-dropzone';

// function AddNewService() {
//     const initialState = {
//         date: "",
//         service_type: "",
//         pdf_file_id: "",
//         company_id: "",
//         po_number: "",
//         invoice_number: ""
//     };
//     const [selectedOption, setSelectedOption] = useState({ companies: [] });
//     const [formData, setFormData] = useState(initialState);
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         async function companiesLoad() {
//             const result = await WopApi.getCompanies();
//             setSelectedOption({ companies: result.companies || [] });
//         }
//         companiesLoad();
//     }, []);

//     const onDrop = useCallback(acceptedFiles => {
//         setFiles(currentFiles => [...currentFiles, ...acceptedFiles]);
//     }, []);
//     const { getRootProps, getInputProps } = useDropzone({ onDrop });

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setFormData(data => ({ ...data, [name]: value }));
//     };

//     async function handleSubmit(e) {
//         e.preventDefault();
//         const submissionFormData = new FormData();
//         // Append form fields to formData
//         Object.entries(formData).forEach(([key, value]) => {
//             submissionFormData.append(key, value);
//         });
//         // Append files to formData
//         files.forEach((file, index) => {
//             submissionFormData.append(`files[${index}]`, file);
//         });
//         try {
//             const response = await WopApi.uploadFile(submissionFormData);
//             console.log('Submission successful', response);
//             setFormData(initialState);
//             setFiles([]);
//         } catch (error) {
//             console.error('Submission failed', error);
//         }
//     }

//     return (
//         <>
//             <Background />
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-6 custom-container mx-auto">
//                         <div className="container border rounded p-4 my-3">
//                             <h1 className="my-3">Add Service</h1>
//                             <form onSubmit={handleSubmit}>
//                                 <select
//                                     className="form-control my-3"
//                                     id="company_id"
//                                     name="company_id"
//                                     value={formData.company_id}
//                                     onChange={handleChange}
//                                     required>
//                                     <option value="" disabled>Select a company</option>
//                                     {selectedOption.companies.map(company => (
//                                         <option key={company.id} value={company.id}>{company.name}</option>
//                                     ))}
//                                 </select>

//                                 <input
//                                     className="form-control my-3"
//                                     id="date"
//                                     type="date"
//                                     name="date"
//                                     placeholder="Date"
//                                     value={formData.date}
//                                     onChange={handleChange} />

//                                 <input
//                                     className="form-control my-3"
//                                     id="service_type"
//                                     type="text"
//                                     name="service_type"
//                                     placeholder="Service Type"
//                                     value={formData.service_type}
//                                     onChange={handleChange} required />

//                                 <input
//                                     className="form-control my-3"
//                                     id="po_number"
//                                     type="text"
//                                     name="po_number"
//                                     placeholder="PO Number"
//                                     value={formData.po_number}
//                                     onChange={handleChange} required />

//                                 <input
//                                     className="form-control my-3"
//                                     id="invoice_number"
//                                     type="text"
//                                     name="invoice_number"
//                                     placeholder="Invoice Number"
//                                     value={formData.invoice_number}
//                                     onChange={handleChange} required />

//                                 <section className="container border rounded p-4 my-3">
//                                     <div {...getRootProps({ className: 'dropzone' })}>
//                                         <input {...getInputProps()} />
//                                         <p>Drag 'n' drop some files here, or click to select files</p>
//                                     </div>
//                                     <aside>
//                                         <ul>{files.map(file => (
//                                             <li key={file.path}>
//                                                 {file.path} - {file.size} bytes
//                                             </li>
//                                         ))}</ul>
//                                     </aside>
//                                 </section>

//                                 <button className="btn btn-primary btn-block my-3">Submit</button>
//                             </form>
//                         </div></div></div></div>
//         </>
//     )
// }

// export default AddNewService;


import { useCallback, useEffect, useState } from "react";
import WopApi from "../api";
import Background from "../../Helpers/Background";
import { useDropzone } from 'react-dropzone';

function AddNewService() {
    const initialState = {
        date: "",
        service_type: "",
        pdf_file_id: "",
        company_id: "",
        po_number: "",
        invoice_number: ""
    };

    const [selectedOption, setSelectedOption] = useState({ companies: [] });
    const [formData, setFormData] = useState(initialState);
    const [files, setFiles] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState({ success: false, message: "" });

    useEffect(() => {
        async function companiesLoad() {
            const result = await WopApi.getCompanies();
            setSelectedOption({ companies: result.companies || [] });
        }
        companiesLoad();
    }, []);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(currentFiles => [...currentFiles, ...acceptedFiles]);
    }, []);

    const removeFile = fileName => {
        setFiles(currentFiles => currentFiles.filter(file => file.path !== fileName));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const submissionFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            submissionFormData.append(key, value);
        });
        for (let i = 0; i < files.length; i++) {
            submissionFormData.append('file', files[i]);
        }

        try {
            console.log(submissionFormData)
            await WopApi.uploadFile(submissionFormData);
            setSubmissionStatus({ success: true, message: "Submission successful!" });
            setFormData(initialState);
            setFiles([]);
        } catch (error) {
            setSubmissionStatus({ success: false, message: `Submission failed: ${error.toString()}` });
        }
    }

    return (
        <>
            <Background />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 custom-container mx-auto">
                        <div className="container border rounded p-4 my-3">
                            <h1 className="my-3">Add Service</h1>
                            {submissionStatus.message && (
                                <div className={`alert ${submissionStatus.success ? 'alert-success' : 'alert-danger'}`}>
                                    {submissionStatus.message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <select
                                    className="form-control my-3"
                                    id="company_id"
                                    name="company_id"
                                    value={formData.company_id}
                                    onChange={handleChange}
                                    required>
                                    <option value="" disabled>Select a company</option>
                                    {selectedOption.companies.map(company => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>

                                <input
                                    className="form-control my-3"
                                    id="date"
                                    type="date"
                                    name="date"
                                    placeholder="Date"
                                    value={formData.date}
                                    onChange={handleChange} />

                                <input
                                    className="form-control my-3"
                                    id="service_type"
                                    type="text"
                                    name="service_type"
                                    placeholder="Service Type"
                                    value={formData.service_type}
                                    onChange={handleChange} required />

                                <input
                                    className="form-control my-3"
                                    id="po_number"
                                    type="text"
                                    name="po_number"
                                    placeholder="PO Number"
                                    value={formData.po_number}
                                    onChange={handleChange} required />

                                <input
                                    className="form-control my-3"
                                    id="invoice_number"
                                    type="text"
                                    name="invoice_number"
                                    placeholder="Invoice Number"
                                    value={formData.invoice_number}
                                    onChange={handleChange} required />

                                <section className="container border rounded p-4 my-3">
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                    <aside>
                                        <ul>
                                            {files.map(file => (
                                                <li key={file.path}>
                                                    {file.path} - {file.size} bytes
                                                    <button type="button" onClick={() => removeFile(file.path)}>Remove</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </aside>
                                </section>
                                <button className="btn btn-primary btn-block my-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddNewService;
