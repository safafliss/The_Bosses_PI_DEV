import React from 'react';
import { Navigate } from 'react-router-dom';
import Associationpage from '../pages/Associationpage';
import Particularpage from '../pages/Particularpage';
import Proffpage from '../pages/Proffpage';
import Profile from '../pages/Profile';

const PrivateRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/login" replace />;
  }

  if (user.isConnected) {
    switch (user.role) {
      case 'PROFESSIONAL':
        return <Proffpage />
      case 'PARTICULAR':
        return <Particularpage />
      case 'ASSOCIATION':
        return <Associationpage />;
      case 'ADMIN':
        return <Profile />;

      default:
        return <Navigate to="*" replace />;
    }
  }
  return children;
};

export default PrivateRouter;
