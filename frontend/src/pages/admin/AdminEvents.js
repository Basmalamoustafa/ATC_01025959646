import React, { useEffect, useState } from 'react';
import API from '../../api';
import { Table, Button, Container, Spinner, Alert, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const token = localStorage.getItem('authToken');
  const role  = localStorage.getItem('userRole');

  const fetchEvents = async (pageNum = 1) => {
    try {
      const res = await API.get(`/events?page=${pageNum}&limit=10`);
      setEvents(res.data.events);
      setPages(res.data.pages);
      setPage(res.data.page);
    } catch {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents(page); // refresh current page
      toast.success('Event deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const renderPagination = () => (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            onClick={() => setPage(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );

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
          {events.map(evt => (
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
      {pages > 1 && renderPagination()}
    </Container>
  );
};

export default AdminEvents;
