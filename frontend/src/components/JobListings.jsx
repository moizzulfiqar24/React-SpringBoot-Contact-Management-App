import React, { useEffect, useState } from 'react';
import JobListing from './JobListing'; // Reusing the same component name
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            const apiUrl = 'http://localhost:8080/contact/all';
            const token = localStorage.getItem('authToken'); // Get auth token from localStorage

            if (!token) {
                console.error('No auth token found');
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch contacts. Please try again later.');
                }

                const data = await res.json();

                // If isHome is true, filter only favourite contacts
                const filteredContacts = isHome ? data.filter(contact => contact.isFavourite) : data;

                setContacts(filteredContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <section className="bg-slate-400 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-black mb-6 text-center">
                    {isHome ? 'Favourite Contacts' : 'All Contacts'}
                </h2>

                {loading ? (
                    <Spinner loading={loading} />
                ) : contacts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contacts.map((contact) => (
                            <JobListing key={contact.email} contact={contact} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-700">No contacts found.</p>
                )}
            </div>
        </section>
    );
};

export default JobListings;
