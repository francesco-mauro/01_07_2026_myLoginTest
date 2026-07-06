import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Una mail di recupero è stata simulata per: ${email}`);
      setEmail(''); // Svuota il campo dopo l'invio
    }
  };

  return (
    <AuthLayout 
      title="Recupera Password" 
      subtitle="Inserisci la tua email per richiedere il recupero password"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        
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

        <button type="submit" className={styles.submitBtn}>
          Richiedi recupero
        </button>

        <div className={styles.footerText}>
          <Link to="/login" className={styles.backLink}>
            &larr; Torna al login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}