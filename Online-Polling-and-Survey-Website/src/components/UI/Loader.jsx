import React from 'react';

// Main Loader Component
const Loader = ({ 
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  fullScreen = false,
  text = 'Loading...',
  overlay = false 
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    success: 'text-green-600',
    danger: 'text-red-600'
  };

  // Spinner Loader
  const SpinnerLoader = () => (
    <div className={`animate-spin rounded-full border-2 border-t-transparent ${colorClasses[color]}`}>
      <div className={`${sizeClasses[size]} rounded-full border-2 border-transparent`}></div>
    </div>
  );

  // Dots Loader
  const DotsLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} rounded-full ${colorClasses[color]} bg-current animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  // Bar Loader
  const BarLoader = () => (
    <div className={`w-24 h-1 bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
      <div 
        className={`h-full ${colorClasses[color]} bg-current animate-[loading_1.5s_ease-in-out_infinite]`}
        style={{
          background: `linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)`
        }}
      />
    </div>
  );

  const LoaderComponent = {
    spinner: SpinnerLoader,
    dots: DotsLoader,
    bar: BarLoader
  }[variant];

  // Full Screen Loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
        <div className="text-center">
          <div className="inline-block">
            <LoaderComponent />
          </div>
          {text && (
            <p className={`mt-4 font-medium ${colorClasses[color]}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Overlay Loader
  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
        <div className="text-center">
          <div className="inline-block">
            <LoaderComponent />
          </div>
          {text && (
            <p className={`mt-2 text-sm ${colorClasses[color]}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Inline Loader
  return (
    <div className="inline-flex items-center justify-center">
      <LoaderComponent />
      {text && (
        <span className={`ml-3 ${colorClasses[color]}`}>
          {text}
        </span>
      )}
    </div>
  );
};

// Skeleton Loader for Content Placeholders
export const SkeletonLoader = ({ 
  type = 'card',
  count = 1,
  className = '' 
}) => {
  const CardSkeleton = () => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="animate-pulse space-y-4">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div className="h-10 bg-gray-200 rounded w-10"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const TextSkeleton = () => (
    <div className={`animate-pulse space-y-2 ${className}`}>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  );

  const SkeletonComponent = {
    card: CardSkeleton,
    list: ListSkeleton,
    text: TextSkeleton
  }[type];

  if (count > 1) {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <SkeletonComponent key={i} />
        ))}
      </div>
    );
  }

  return <SkeletonComponent />;
};

// Button Loader (for loading states in buttons)
export const ButtonLoader = ({ variant = 'primary' }) => {
  const colorClasses = {
    primary: 'text-white',
    secondary: 'text-gray-800',
    outline: 'text-blue-600',
    danger: 'text-white'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full h-4 w-4 border-2 border-t-transparent ${colorClasses[variant]}`}></div>
    </div>
  );
};

// Page Loader
export const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="mt-6 text-2xl font-bold text-gray-800">PollMaster</h2>
      <p className="mt-2 text-gray-600">Loading your polls...</p>
      <div className="mt-8 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  </div>
);

export default Loader;