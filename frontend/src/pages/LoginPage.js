import React, { useState } from 'react';
import { Form, Card, Button, Alert, Container, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', {
        email: form.email,
        password: form.password
      });

      const { token, user } = res.data; // Receive user object, which contains the role
      const { role } = user; // Extract role from the user object


      // Store the role and token in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      toast.success(`Logged in successfully as ${role}`);

      // Redirect based on the stored role
      if (role === 'admin') {
        navigate('/admin/events');  // Admin Panel
      } else {
        navigate('/');  // User Dashboard
      }

    } catch (err) {
      const msg = err.response?.data?.msg || 'Failed to log in. Please check your credentials.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: 400, marginTop: '2rem' }}>
      <Card className="p-4">
        <h2 className="mb-4 text-center">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </Form.Group>

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Log In'}
          </Button>
        </Form>

        <div className="mt-3 text-center">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
