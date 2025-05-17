// frontend/src/pages/admin/AdminEvents.js
import React, { useEffect, useState } from 'react';
import API from '../../api';
import { Table, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');
  const role  = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setEvents(res.data.events); // ✅ fix: use res.data.events not res.data
      } catch {
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(ev => ev.filter(e => e._id !== id));
      toast.success('Event deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (!token || role !== 'admin') {
    return <Alert variant="danger">Access denied</Alert>;
  }

  return (
    <Container className="mt-4">
      <h2>Admin: Manage Events</h2>
      <Button as={Link} to="/admin/events/new" className="mb-3">
        + Create New Event
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th><th>Date</th><th>Venue</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(events) && events.map(evt => (
            <tr key={evt._id}>
              <td>{evt.name}</td>
              <td>{new Date(evt.date).toLocaleDateString()}</td>
              <td>{evt.venue}</td>
              <td>${evt.price}</td>
              <td>
                <Button
                  size="sm"
                  as={Link}
                  to={`/admin/events/${evt._id}/edit`}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(evt._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminEvents;
