const Footer: React.FC = () => {
    return (
      <footer>
        <div>
          <p>
            &copy; {new Date().getFullYear()} Employee Reimbursement System (ERS). All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export { Footer };