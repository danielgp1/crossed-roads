import './Welcome.css';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export default function Welcome() {
  return (
    <div className="body-welcome">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <RegisterForm />
        <LoginForm />
      </div>
    </div>
  );
}
