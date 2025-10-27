import React from 'react'

function ErrorCard({type,refetch}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="text-center bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-gray-200 dark:border-neutral-700 p-8 max-w-md mx-4">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Connection Error</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{`We're unable to load ${type} at the moment. Please check your connection and try again.`}</p>
        <button
          onClick={() => refetch()}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorCard