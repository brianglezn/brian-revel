import LoginForm from '@/components/auth/LoginForm';
import styles from './Login.module.css';

const LoginPage = () => {
    return (
        <div className={styles.loginContainer}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
