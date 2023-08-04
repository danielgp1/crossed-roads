import './Welcome.css';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useFormState } from './WelcomeFunctions';


export default function Welcome() {
  const formState = useFormState();
  return (
    <div className="body-welcome">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <RegisterForm formState={formState} />
        <LoginForm formState={formState} />
      </div>
    </div>
  );
}
