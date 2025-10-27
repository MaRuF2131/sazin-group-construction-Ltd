import React from 'react'

function Loader({type}) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {`Loading ${type}...`}
          </p>
        </div>
      </div>
    );
}

export default Loader