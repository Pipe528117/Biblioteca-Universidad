// frontend/src/views/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(formData);

      if (data.success) {
        // Guardar sesión en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirección según el rol del usuario
        if (data.user.rol === 'admin') {
          navigate('/users');
        } else {
          navigate('/books');
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error de conexión con el servidor.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-lg rounded-3">
            <div className="card-body p-4 p-sm-5">
              <h3 className="card-title text-center fw-bold mb-4 text-primary">
                📚 Iniciar Sesión
              </h3>

              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="ejemplo@universidad.edu.co"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-bold"
                  disabled={loading}
                >
                  {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="small text-muted mb-0">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;