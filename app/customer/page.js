'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch('/api/customer');
      const data = await res.json();
      setCustomers(data);
    }
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/customer/${id}`, { method: 'DELETE' });
    setCustomers(customers.filter(customer => customer._id !== id));
  };

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.name} ({customer.memberNumber}) - {customer.interests}
            <button onClick={() => router.push(`/customer/${customer._id}`)}>View</button>
            <button onClick={() => handleDelete(customer._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/customer/add')}>Add New Customer</button>
    </div>
  );
}


export default function CustomerDetail() {
    const [customer, setCustomer] = useState(null);
    const router = useRouter();
    const { id } = router.query;
  
    useEffect(() => {
      if (!id) return;
      async function fetchCustomer() {
        const res = await fetch(`/api/customer/${id}`);
        const data = await res.json();
        setCustomer(data);
      }
      fetchCustomer();
    }, [id]);
  
    return (
      <div>
        {customer ? (
          <>
            <h1>{customer.name}</h1>
            <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
            <p>Member Number: {customer.memberNumber}</p>
            <p>Interests: {customer.interests}</p>
            <button onClick={() => router.push(`/customer/edit/${customer._id}`)}>Edit</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }


  export default function AddCustomer() {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [memberNumber, setMemberNumber] = useState('');
    const [interests, setInterests] = useState('');
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const customer = { name, dateOfBirth, memberNumber, interests };
      await fetch('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
      });
      router.push('/');
    };
  
    return (
      <div>
        <h1>Add New Customer</h1>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type="date" placeholder="Date of Birth" />
          <input value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} placeholder="Member Number" />
          <input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Interests" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

