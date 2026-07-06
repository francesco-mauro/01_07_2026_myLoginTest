import { type ReactNode } from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authCard}>
        <div className={styles.logoContainer}>K</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}