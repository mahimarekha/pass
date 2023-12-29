
import React from 'react';

const ConditionalDisplay = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

export default ConditionalDisplay;
