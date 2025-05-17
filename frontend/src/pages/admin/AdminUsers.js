import React, { useEffect, useState } from 'react';
import API from '../../api';
import { Table, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const handlePromote = async (userId) => {
    try {
      await API.patch(
        `/auth/promote/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('User promoted to admin');
      // Update the local list so the promotion is reflected immediately:
      setUsers(us =>
        us.map(u => (u._id === userId ? { ...u, role: 'admin' } : u))
      );
    } catch {
      toast.error('Promotion failed');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (!token || localStorage.getItem('userRole') !== 'admin') {
    return <Alert variant="danger">Access denied</Alert>;
  }

  return (
    <Container className="mt-4">
      <h2>Admin: Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== 'admin' && (
                  <Button
                    size="sm"
                    onClick={() => handlePromote(u._id)}
                  >
                    Promote
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsers;
