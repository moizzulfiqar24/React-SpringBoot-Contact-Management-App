import { Link } from 'react-router-dom';
import Card from './Card';

const HomeCards = () => {
    const handleDownload = async () => {
        try {
            const authToken = localStorage.getItem('authToken'); // Get the bearer token from local storage

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

            // Convert JSON data to CSV or XLSX format
            const XLSX = await import('xlsx'); // Dynamically import to avoid build issues
            const worksheet = XLSX.utils.json_to_sheet(contacts);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');

            // Create a downloadable Excel file
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
        <section className='py-4'>
            <div className='container-xl lg:container m-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
                    <Card>
                        <h2 className='text-2xl font-bold'>Browse Contacts</h2>
                        <p className='mt-2 mb-4'>
                            Easily explore and manage your saved contacts in one place.
                        </p>
                        <Link
                            to='/contacts'
                            className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
                        >
                            View Contacts
                        </Link>
                    </Card>
                    {/* <Card>
                        <h2 className='text-2xl font-bold'>Download Contacts</h2>
                        <p className='mt-2 mb-4'>
                            Quickly add new contacts to keep your network up-to-date.
                        </p>
                        <button
                            onClick={handleDownload}
                            className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
                        >
                            Download Contacts
                        </button>
                    </Card> */}
                    <Card bg='bg-slate-400'>
                        <h2 className='text-2xl font-bold'>Add Contacts</h2>
                        <p className='mt-2 mb-4'>
                            Quickly add new contacts to keep your network up-to-date.
                        </p>
                        <Link
                            to='/add-contact'
                            className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
                        >
                            Add New Contact
                        </Link>
                    </Card>
                </div>
            </div>
        </section>
    );
};
export default HomeCards;