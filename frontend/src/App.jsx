import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage, { contactLoader } from './pages/ContactPage';
import AddContactPage from './pages/AddContactPage';
import EditContactPage from './pages/EditContactPage';
import RegisterPage from './pages/RegisterPage';
import VerifyPage from './pages/VerifyPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <ContactsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-contact"
          element={
            <ProtectedRoute>
              <AddContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-contact/:id"
          element={
            <ProtectedRoute>
              <EditContactPage />
            </ProtectedRoute>
          }
          loader={contactLoader}
        />
        <Route
          path="/contact/:id"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
          loader={contactLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
