import React from 'react';
import { Link } from 'react-router-dom';

const DefaultLayout: React.FC = (props) => {
  return (
    <div className="bg-gray-200 h-full">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg leading-6 font-semibold text-gray-900">
            <Link to="/">🐛 Pokédex</Link>
          </h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">{props.children}</div>
        </div>
      </main>
    </div>
  );
};

export default DefaultLayout;
