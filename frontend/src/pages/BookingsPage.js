import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import API from '../api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Please log in to view your bookings.');
        return;
      }

      const res = await API.get('/bookings/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      const msg = err.response?.data?.msg || 'Failed to fetch bookings.';
      setError(msg);
      toast.error(msg);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const token = localStorage.getItem('authToken');
      await API.delete(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Booking deleted successfully.');
      // Remove deleted booking from state
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error('Failed to delete booking:', err);
      const msg = err.response?.data?.msg || 'Failed to delete booking.';
      toast.error(msg);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Bookings</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {bookings.length === 0 && !error ? (
        <Alert variant="info">You haven't booked any events yet.</Alert>
      ) : (
        <Row>
          {bookings.map((booking) => {
            if (!booking.event) {
              // Event deleted/orphan booking
              return (
                <Col md={6} lg={4} key={booking._id} className="mb-4">
                  <Card border="danger">
                    <Card.Body>
                      <Card.Title>Event no longer exists</Card.Title>
                      <Card.Text>
                        The event you booked has been deleted by the admin.
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(booking._id)}
                      >
                        Delete Booking
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }

            // Normal booking
            return (
              <Col md={6} lg={4} key={booking._id} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={booking.event.image}
                    alt={booking.event.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{booking.event.name}</Card.Title>
                    <Card.Text>{booking.event.description}</Card.Text>
                    <p><strong>Venue:</strong> {booking.event.venue}</p>
                    <p><strong>Date:</strong> {new Date(booking.event.date).toLocaleString()}</p>
                    <p><strong>Price:</strong> ${booking.event.price}</p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default MyBookings;
