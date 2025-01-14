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
