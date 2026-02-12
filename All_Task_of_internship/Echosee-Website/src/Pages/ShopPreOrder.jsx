// ShopPreOrder.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  CreditCard, 
  Package, 
  Shield, 
  Truck, 
  CheckCircle,
  Loader2,
  Lock,
  Smartphone,
  Zap,
  Globe
} from 'lucide-react';

const ShopPreOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [focusField, setFocusField] = useState(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      quantity: 1,
      plan: 'premium'
    }
  });

  const selectedPlan = watch('plan');
  const quantity = watch('quantity') || 1;

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowPayment(true);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    setPaymentSuccess(true);
    setOrderSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      reset();
      setShowPayment(false);
      setPaymentSuccess(false);
      setTimeout(() => setOrderSuccess(false), 5000);
    }, 3000);
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 35000,
      features: ['20+ languages', 'Basic AI features', 'Local storage', '1-year warranty'],
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 40000,
      features: ['40+ languages', 'Advanced AI', 'Cloud sync', '2-year warranty', 'Priority support'],
      color: 'from-[#22D3EE] to-[#7C84FD]',
      recommended: true
    }
  ];

  const calculateTotal = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    return (plan?.price || 0) * quantity;
  };

  const InputField = ({ label, name, type = 'text', validation = {}, ...props }) => (
    <div className="relative mb-6">
      <motion.div
        animate={{
          scale: focusField === name ? 1.02 : 1,
          borderColor: focusField === name ? '#22D3EE' : '#374151'
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <input
          {...register(name, validation)}
          type={type}
          onFocus={() => setFocusField(name)}
          onBlur={() => setFocusField(null)}
          className={`w-full px-4 pt-6 pb-2 bg-[#1E293B] border rounded-xl focus:outline-none transition-all ${
            errors[name] ? 'border-red-500' : 'border-gray-600'
          }`}
          {...props}
        />
        <motion.label
          animate={{
            y: focusField === name || watch(name) ? -12 : 0,
            fontSize: focusField === name || watch(name) ? '0.75rem' : '1rem',
            color: errors[name] ? '#EF4444' : focusField === name ? '#22D3EE' : '#9CA3AF'
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
        >
          {label}
        </motion.label>
      </motion.div>
      
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-1 flex items-center"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            {errors[name]?.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#22D3EE] via-[#7C84FD] to-[#C084FC] bg-clip-text text-transparent">
            Pre-Order EchoSee
          </h1>
          <p className="text-xl text-gray-300">Reserve your pair today. Limited stock available.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1E3A8A]/30 backdrop-blur-sm rounded-3xl p-8 border border-[#22D3EE]/10"
          >
            <AnimatePresence mode="wait">
              {!orderSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-white">Order Details</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                      {/* Personal Info */}
                      <div className="bg-[#1E293B] rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                          <Smartphone className="w-5 h-5 mr-2 text-[#22D3EE]" />
                          Personal Information
                        </h3>
                        
                        <InputField
                          label="Full Name"
                          name="name"
                          validation={{ required: "Name is required" }}
                        />
                        
                        <InputField
                          label="Email Address"
                          name="email"
                          type="email"
                          validation={{
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          }}
                        />
                        
                        <InputField
                          label="Phone Number"
                          name="phone"
                          validation={{
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9+\-\s]+$/,
                              message: "Invalid phone number"
                            }
                          }}
                        />
                      </div>

                      {/* Shipping Address */}
                      <div className="bg-[#1E293B] rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                          <Truck className="w-5 h-5 mr-2 text-[#22D3EE]" />
                          Shipping Address
                        </h3>
                        
                        <InputField
                          label="Address"
                          name="address"
                          validation={{ required: "Address is required" }}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            label="City"
                            name="city"
                            validation={{ required: "City is required" }}
                          />
                          <InputField
                            label="ZIP Code"
                            name="zipCode"
                            validation={{ required: "ZIP code is required" }}
                          />
                        </div>
                      </div>

                      {/* Product Selection */}
                      <div className="bg-[#1E293B] rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                          <Package className="w-5 h-5 mr-2 text-[#22D3EE]" />
                          Select Your Plan
                        </h3>
                        
                        <div className="space-y-4 mb-6">
                          {plans.map((plan) => (
                            <motion.label
                              key={plan.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`block cursor-pointer p-4 rounded-xl border-2 transition-all ${
                                selectedPlan === plan.id
                                  ? 'border-[#22D3EE] bg-gradient-to-r from-[#22D3EE]/10 to-transparent'
                                  : 'border-gray-600 hover:border-gray-500'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    selectedPlan === plan.id 
                                      ? 'border-[#22D3EE] bg-[#22D3EE]' 
                                      : 'border-gray-500'
                                  }`}>
                                    {selectedPlan === plan.id && (
                                      <CheckCircle className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">{plan.name}</div>
                                    <div className="text-sm text-gray-400">PKR {plan.price.toLocaleString()}</div>
                                  </div>
                                </div>
                                {plan.recommended && (
                                  <span className="px-3 py-1 text-xs bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white rounded-full">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <ul className="mt-3 space-y-1 ml-9">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="text-sm text-gray-300 flex items-center">
                                    <Zap className="w-3 h-3 mr-2 text-[#22D3EE]" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <input
                                type="radio"
                                {...register('plan')}
                                value={plan.id}
                                className="hidden"
                              />
                            </motion.label>
                          ))}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between">
                          <span className="text-white">Quantity</span>
                          <div className="flex items-center space-x-4">
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                const current = watch('quantity') || 1;
                                if (current > 1) {
                                  // Update quantity
                                  const event = { target: { value: current - 1 } };
                                  register('quantity').onChange(event);
                                }
                              }}
                              className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600"
                            >
                              -
                            </motion.button>
                            <span className="text-xl font-bold text-white">{quantity}</span>
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                const current = watch('quantity') || 1;
                                if (current < 5) {
                                  const event = { target: { value: current + 1 } };
                                  register('quantity').onChange(event);
                                }
                              }}
                              className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600"
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-[#1E293B] rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4 text-white">Order Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white">PKR {calculateTotal().toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Shipping</span>
                            <span className="text-green-400">Free</span>
                          </div>
                          <div className="flex justify-between pt-3 border-t border-gray-700">
                            <span className="text-lg font-bold text-white">Total</span>
                            <span className="text-2xl font-bold text-[#22D3EE]">
                              PKR {calculateTotal().toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Lock className="w-5 h-5 mr-2" />
                            Proceed to Payment
                          </div>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4 text-white">Order Confirmed!</h2>
                  <p className="text-gray-300 mb-6">
                    Your EchoSee pre-order has been successfully placed. 
                    You'll receive a confirmation email shortly.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#1E293B] rounded-2xl p-6 max-w-md mx-auto"
                  >
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Package className="w-8 h-8 text-[#22D3EE]" />
                      <Shield className="w-8 h-8 text-[#7C84FD]" />
                      <Truck className="w-8 h-8 text-[#C084FC]" />
                    </div>
                    <p className="text-sm text-gray-400">
                      Estimated delivery: 4-6 weeks
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Features & Payment UI */}
          <div className="space-y-8">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 border border-[#C084FC]/20"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Why EchoSee?</h2>
              <div className="space-y-6">
                {[
                  { icon: Globe, title: "40+ Languages", desc: "Real-time translation" },
                  { icon: Zap, title: "AI-Powered", desc: "Advanced computer vision" },
                  { icon: Shield, title: "2-Year Warranty", desc: "Comprehensive coverage" },
                  { icon: Package, title: "Free Shipping", desc: "Worldwide delivery" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-[#1E293B]/30 hover:bg-[#1E293B]/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#7C84FD] flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mock Payment UI */}
            <AnimatePresence>
              {showPayment && !paymentSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#1E3A8A]/30 backdrop-blur-sm rounded-3xl p-8 border border-[#22D3EE]/10"
                >
                  <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                    <CreditCard className="w-6 h-6 mr-2 text-[#22D3EE]" />
                    Secure Payment
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Card Number */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-[#1E293B] border border-gray-600 rounded-xl focus:outline-none focus:border-[#22D3EE]"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="flex space-x-2">
                            <div className="w-8 h-6 bg-red-500 rounded"></div>
                            <div className="w-8 h-6 bg-blue-500 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Expiry Date */}
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-[#1E293B] border border-gray-600 rounded-xl focus:outline-none focus:border-[#22D3EE]"
                        />
                      </div>

                      {/* CVV */}
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">CVV</label>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="123"
                            className="w-full px-4 py-3 bg-[#1E293B] border border-gray-600 rounded-xl focus:outline-none focus:border-[#22D3EE]"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <Lock className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Button */}
                    <motion.button
                      onClick={handlePayment}
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#C084FC] text-white font-semibold disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing Payment...
                        </div>
                      ) : (
                        `Pay PKR ${calculateTotal().toLocaleString()}`
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPreOrder;