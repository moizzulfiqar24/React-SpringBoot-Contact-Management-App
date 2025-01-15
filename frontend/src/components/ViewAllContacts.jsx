import React from 'react';

const ViewAllContacts = () => {
    const handleDownload = async () => {
        try {
            const authToken = localStorage.getItem('authToken');

            if (!authToken) {
                alert('No authentication token found. Please log in.');
                return;
            }

            const response = await fetch('http://localhost:8080/contact/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch contacts.');
            }

            const contacts = await response.json();

            const XLSX = await import('xlsx');
            const worksheet = XLSX.utils.json_to_sheet(contacts);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');

            const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelFile], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'contacts.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading contacts:', error);
            alert('Error downloading contacts. Please try again.');
        }
    };

    return (
        // <section className="m-auto max-w-lg my-10 px-6 flex justify-center">
        <section className="bg-black flex justify-center">
            <button
                onClick={handleDownload}
                className="border border-white border-2 text-white text-center my-10 py-4 px-6 rounded-xl hover:bg-indigo-600"
            >
                Download All Contacts
            </button>
        </section>
    );


};

export default ViewAllContacts;
