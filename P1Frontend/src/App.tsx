import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { Toaster } from 'react-hot-toast';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
// import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <Toaster position="top-right" />
      <main className="main-content">
        <RouterProvider router={router} />
      </main>
    </div>
  );
};

export { App };
