import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import styles from './Register.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Le password non coincidono. Riprova.');
      return;
    }

    if (acceptTerms) {
      alert(`Registrazione simulata con successo per: ${firstName} ${lastName}`);
      navigate('/login');
    }
  };

  return (
    <AuthLayout title="Crea un Account" subtitle="Crea un account per continuare">
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

        <div className={styles.inputGroup}>
          <label className={styles.label}>Nome *</label>
          <input
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Il tuo nome"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Cognome *</label>
          <input
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Il tuo cognome"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimo 8 caratteri..."
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
            title="La password deve contenere almeno 8 caratteri, un numero, una lettera maiuscola e un carattere speciale."
          />
          <p className={styles.passwordRules}>
            Almeno 8 caratteri, 1 numero, 1 maiuscola e 1 carattere speciale
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Conferma password</label>
          <input
            type="password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Conferma password"
            required
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            required
          />
          <label htmlFor="terms" className={styles.checkboxLabel}>
            Accetto termini e condizioni
          </label>
        </div>

        <p className={styles.disclaimer}>
          Registrandoti diventerai un Okiver (creatore di contenuti). Per diventare Oklvisor (revisore) devi ricevere un invito da un team esistente.
        </p>

        <button type="submit" className={styles.submitBtn}>
          Registrati
        </button>

        <div className={styles.footerText}>
          Hai già un account? <Link to="/login" className={styles.link}>Accedi</Link>
        </div>
      </form>
    </AuthLayout>
  );
}