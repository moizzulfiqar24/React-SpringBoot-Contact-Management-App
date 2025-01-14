// import { useState } from 'react';
// import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const EditJobPage = ({ updateJobSubmit }) => {
//     const job = useLoaderData();
//     const [title, setTitle] = useState(job.title);
//     const [type, setType] = useState(job.type);
//     const [location, setLocation] = useState(job.location);
//     const [description, setDescription] = useState(job.description);
//     const [salary, setSalary] = useState(job.salary);
//     const [companyName, setCompanyName] = useState(job.company.name);
//     const [companyDescription, setCompanyDescription] = useState(
//         job.company.description
//     );
//     const [contactEmail, setContactEmail] = useState(job.company.contactEmail);
//     const [contactPhone, setContactPhone] = useState(job.company.contactPhone);

//     const navigate = useNavigate();
//     const { id } = useParams();

//     const submitForm = (e) => {
//         e.preventDefault();

//         const updatedJob = {
//             id,
//             title,
//             type,
//             location,
//             description,
//             salary,
//             company: {
//                 name: companyName,
//                 description: companyDescription,
//                 contactEmail,
//                 contactPhone,
//             },
//         };

//         updateJobSubmit(updatedJob);

//         toast.success('Job Updated Successfully');

//         return navigate(`/jobs/${id}`);
//     };

//     return (
//         <section className='bg-indigo-50'>
//             <div className='container m-auto max-w-2xl py-24'>
//                 <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
//                     <form onSubmit={submitForm}>
//                         <h2 className='text-3xl text-center font-semibold mb-6'>
//                             Update Job
//                         </h2>

//                         <div className='mb-4'>
//                             <label
//                                 htmlFor='type'
//                                 className='block text-gray-700 font-bold mb-2'
//                             >
//                                 Job Type
//                             </label>
//                             <select
//                                 id='type'
//                                 name='type'
//                                 className='border rounded w-full py-2 px-3'
//                                 required
//                                 value={type}
//                                 onChange={(e) => setType(e.target.value)}
//                             >
//                                 <option value='Full-Time'>Full-Time</option>
//                                 <option value='Part-Time'>Part-Time</option>
//                                 <option value='Remote'>Remote</option>
//                                 <option value='Internship'>Internship</option>
//                             </select>
//                         </div>

//                         <div className='mb-4'>
//                             <label className='block text-gray-700 font-bold mb-2'>
//                                 Job Listing Name
//                             </label>
//                             <input
//                                 type='text'
//                                 id='title'
//                                 name='title'
//                                 className='border rounded w-full py-2 px-3 mb-2'
//                                 placeholder='eg. Beautiful Apartment In Miami'
//                                 required
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                             />
//                         </div>
//                         <div className='mb-4'>
//                             <label
//                                 htmlFor='description'
//                                 className='block text-gray-700 font-bold mb-2'
//                             >
//                                 Description
//                             </label>
//                             <textarea
//                                 id='description'
//                                 name='description'
//                                 className='border rounded w-full py-2 px-3'
//                                 rows='4'
//                                 placeholder='Add any job duties, expectations, requirements, etc'
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                             ></textarea>
//                         </div>

//                         <div className='mb-4'>
//                             <label
//                                 htmlFor='type'
//                                 className='block text-gray-700 font-bold mb-2'
//                             >
//                                 Salary
//                             </label>
//                             <select
//                                 id='salary'
//                                 name='salary'
//                                 className='border rounded w-full py-2 px-3'
//                                 required
//                                 value={salary}
//                                 onChange={(e) => setSalary(e.target.value)}
//                             >
//                                 <option value='Under $50K'>Under $50K</option>
//                                 <option value='$50K - 60K'>$50K - $60K</option>
//                                 <option value='$60K - 70K'>$60K - $70K</option>
//                                 <option value='$70K - 80K'>$70K - $80K</option>
//                                 <option value='$80K - 90K'>$80K - $90K</option>
//                                 <option value='$90K - 100K'>$90K - $100K</option>
//                                 <option value='$100K - 125K'>$100K - $125K</option>
//                                 <option value='$125K - 150K'>$125K - $150K</option>
//                                 <option value='$150K - 175K'>$150K - $175K</option>
//                                 <option value='$175K - 200K'>$175K - $200K</option>
//                                 <option value='Over $200K'>Over $200K</option>
//                             </select>
//                         </div>

//                         <div className='mb-4'>
//                             <label className='block text-gray-700 font-bold mb-2'>
//                                 Location
//                             </label>
//                             <input
//                                 type='text'
//                                 id='location'
//                                 name='location'
//                                 className='border rounded w-full py-2 px-3 mb-2'
//                                 placeholder='Company Location'
//                                 required
//                                 value={location}
//                                 onChange={(e) => setLocation(e.target.value)}
//                             />
//                         </div>

//                         <h3 className='text-2xl mb-5'>Company Info</h3>

//                         <div className='mb-4'>
//                             <label
//                                 htmlFor='company'
//                                 className='block text-gray-700 font-bold mb-2'
//                             >
//                                 Company Name
//                             </label>
//                             <input
//                                 type='text'
//                                 id='company'
//                                 name='company'
//                                 className='border rounded w-full py-2 px-3'
//                                 placeholder='Company Name'
//                                 value={companyName}
//                                 onChange={(e) => setCompanyName(e.target.value)}
//                             />
//                         </div>

//                         <div className='mb-4'>
//                             <label
//                                 htmlFor='company_description'
//                                 className='block text-gray-700 font-bold mb-2'
//                             >
//                                 Company Description
//                             </label>
//                             <textarea
//                                 id='company_description'
//                                 name='company_description'
//                                 className='border rounded w-full py-2 px-3'
//                                 rows='4'
//                                 placeholder='What does your company do?'
//                                 value={companyDescription}
//                                 onChange={(e) => setCompanyDescription(e.target.value)}
//                             ></textarea>
//                         </div>

//                         <div className='mb-4'>
//                             <label
//                                 htmlFor='contact_email'
//                                 className='block text-gray-700 font-bold mb-2'
//                             >
//                                 Contact Email
//                             </label>
//                             <input
//                                 type='email'
//                                 id='contact_email'
//                                 name='contact_email'
//                                 className='border rounded w-full py-2 px-3'
//                                 placeholder='Email address for applicants'
//                                 required
//                                 value={contactEmail}
//                                 onChange={(e) => setContactEmail(e.target.value)}
//                             />
//                         </div>
//                         <div className='mb-4'>
//                             <label
//                                 htmlFor='contact_phone'
//                                 className='block text-gray-700 font-bold mb-2'
//                             >
//                                 Contact Phone
//                             </label>
//                             <input
//                                 type='tel'
//                                 id='contact_phone'
//                                 name='contact_phone'
//                                 className='border rounded w-full py-2 px-3'
//                                 placeholder='Optional phone for applicants'
//                                 value={contactPhone}
//                                 onChange={(e) => setContactPhone(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <button
//                                 className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
//                                 type='submit'
//                             >
//                                 Update Job
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };
// export default EditJobPage;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar, FaRegStar } from 'react-icons/fa';

const EditJobPage = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('User is not authenticated. Please log in.');
                }

                const response = await fetch(`http://localhost:8080/contact/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setAddress(data.address);
                    setIsFavourite(data.isFavourite);
                    setImage(null); // Reset the image to avoid pre-loading
                } else {
                    throw new Error('Failed to load contact details');
                }
            } catch (error) {
                console.error('Error fetching contact:', error);
                toast.error(error.message);
                navigate('/contacts');
            }
        };

        fetchContact();
    }, [id, navigate]);

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('isFavourite', isFavourite);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
            if (!token) {
                throw new Error('User is not authenticated. Please log in.');
            }

            const response = await fetch(`http://localhost:8080/contact/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                toast.success('Contact updated successfully!');
                navigate(`/contact/${id}`); // Navigate to the contact detail page after success
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update contact');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
            toast.error(error.message);
        }
    };

    return (
        <section className='bg-indigo-50'>
            <div className='container m-auto max-w-2xl py-24'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <form onSubmit={submitForm} encType="multipart/form-data">
                        <h2 className='text-3xl text-center font-semibold mb-6'>Edit Contact</h2>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Name</label>
                            <input
                                type='text'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Contact Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Email</label>
                            <input
                                type='email'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Contact Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Phone</label>
                            <input
                                type='tel'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Contact Phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Address</label>
                            <textarea
                                className='border rounded w-full py-2 px-3'
                                placeholder='Contact Address'
                                rows='3'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Upload Image</label>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <div className='mb-4 flex items-center'>
                            <button
                                type='button'
                                className='text-2xl mr-2'
                                onClick={() => setIsFavourite(!isFavourite)}
                            >
                                {isFavourite ? <FaStar className='text-red-500' /> : <FaRegStar className='text-gray-400' />}
                            </button>
                            <span className='text-gray-700 font-bold'>Mark as Favourite</span>
                        </div>

                        <div>
                            <button
                                className='bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl w-full focus:outline-none focus:shadow-outline'
                                type='submit'
                            >
                                Update Contact
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditJobPage;
