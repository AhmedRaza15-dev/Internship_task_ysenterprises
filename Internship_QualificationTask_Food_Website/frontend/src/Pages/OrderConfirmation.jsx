import React, { useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag, Clock, MapPin, CreditCard } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderData } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderData) {
      // If no order data (e.g., direct access), redirect to home
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null; // Or a loading spinner
  }

  const { items, total, customerDetails, orderId } = orderData;
  const deliveryDate = new Date();
  deliveryDate.setMinutes(deliveryDate.getMinutes() + 45); // Estimated 45 mins

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Success Header */}
        <div className="bg-white rounded-t-2xl shadow-sm p-8 text-center border-b border-gray-100">
          <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We've received it and will start preparing it soon.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
            Order #{orderId || Math.floor(Math.random() * 100000)}
          </div>
        </div>

        {/* Order Details Body */}
        <div className="bg-white rounded-b-2xl shadow-sm overflow-hidden">
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Items */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-orange-600" />
                Order Summary
              </h2>
              <div className="space-y-4">
                {items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b border-gray-50 last:border-0">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.quantity}x {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">{item.selectedSize} • {item.selectedSpiceLevel}</p>
                    </div>
                    <span className="font-medium text-gray-700">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$ {(parseFloat(total) / 1.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium">$ {(parseFloat(total) - parseFloat(total) / 1.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-orange-600">$ {total}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Delivery Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Details</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Estimated Delivery</p>
                    <p className="font-semibold text-gray-900">
                      {deliveryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivery Address</p>
                    <p className="font-semibold text-gray-900">
                      {customerDetails?.address || "123 Main St, New York, NY"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Method</p>
                    <p className="font-semibold text-gray-900">Cash on Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </button>
            <button 
               onClick={() => navigate('/browse')}
               className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Order More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
