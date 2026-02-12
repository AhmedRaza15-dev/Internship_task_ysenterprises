import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(null);

  const placeOrder = (data) => {
    setOrderData(data);
  };

  return (
    <OrderContext.Provider value={{ orderData, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
