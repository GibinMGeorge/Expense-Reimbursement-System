import React from "react"; 
import { PageWrapperProps } from "../../interfaces/PageWrapperProps";

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div>
      <section>
        {children}
      </section>
    </div>
  );
};

export { PageWrapper };