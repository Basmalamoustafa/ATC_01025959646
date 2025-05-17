import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Form, Container, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

const AdminEventForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    name: '', description: '', category: '',
    date: '', venue: '', price: '', image: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!isEdit) return;
    API.get(`/events/${id}`)
      .then(res => setForm({
        ...res.data,
        date: res.data.date.slice(0, 16)
      }))
      .catch(() => toast.error('Failed to load event'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEdit) {
        await API.put(`/events/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Event updated');
      } else {
        await API.post('/events', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Event created');
      }
      navigate('/admin/events');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Save failed');
    }
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await API.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setForm(f => ({ ...f, image: res.data.imageUrl }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error('Image upload failed');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop
  });

  if (loading) return <Spinner animation="border" />;

  if (!token || localStorage.getItem('userRole') !== 'admin') {
    return <Alert variant="danger">Access denied</Alert>;
  }

  return (
    <Container style={{ maxWidth: 600, marginTop: '2rem' }}>
      <h2>{isEdit ? 'Edit Event' : 'Create New Event'}</h2>
      <Form onSubmit={handleSubmit}>
        {['name', 'category', 'venue'].map(field => (
          <Form.Group className="mb-3" key={field}>
            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
            <Form.Control
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date & Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Image</Form.Label>
          <div
            {...getRootProps({
              className: 'dropzone border p-3 text-center',
              style: {
                cursor: 'pointer',
                border: '2px dashed #ccc',
                borderRadius: '10px',
                background: '#fafafa'
              }
            })}
          >
            <input {...getInputProps()} />
            {form.image ? (
              <img src={form.image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: 200 }} />
            ) : (
              <p>Drag & drop an image here, or click to select</p>
            )}
          </div>
        </Form.Group>

        <Button type="submit">
          {isEdit ? 'Update Event' : 'Create Event'}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminEventForm;
