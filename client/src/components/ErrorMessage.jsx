import { CircleAlert } from 'lucide-react';

function ErrorMessage({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="error-message" role="alert">
      <CircleAlert size={20} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
