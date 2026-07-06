import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import AuthLayout from '../components/AuthLayout';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      // Salviamo l'utente nello store Redux
      dispatch(login(email));
      
      // Essendo un'app di test, mostriamo un alert per confermare che Redux ha ricevuto l'azione
      alert(`Accesso effettuato con l'email: ${email}\nLo stato Redux è stato aggiornato!`);
    }
  };

  return (
    <AuthLayout title="Accedi" subtitle="Accedi al tuo account per continuare">
      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* Pulsante Google Mock */}
        <button type="button" className={styles.googleBtn} onClick={() => alert('Login con Google simulato')}>
          Continua con Google
        </button>

        <div className={styles.divider}>oppure</div>

        {/* Campo Email */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Indirizzo email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@esempio.com"
            required
          />
        </div>

        {/* Campo Password con Link di Recupero */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.label}>Password</label>
            <Link to="/forgot-password" className={styles.link}>
              Password dimenticata?
            </Link>
          </div>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
          />
        </div>

        {/* Pulsante Submit */}
        <button type="submit" className={styles.submitBtn}>
          Accedi
        </button>

        {/* Link alla Registrazione */}
        <div className={styles.footerText}>
          Non hai un account? <Link to="/register" className={styles.link}>Registrati</Link>
        </div>
      </form>
    </AuthLayout>
  );
}