export const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-lg ${className}`}>
    {children}
  </button>
);
