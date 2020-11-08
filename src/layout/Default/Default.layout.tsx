import React from "react";

const DefaultLayout: React.FC = (props) => {
  return (
    <div className="bg-gray-200 h-full">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/v1/workflow-mark-on-dark.svg"
                  alt="Workflow logo"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg leading-6 font-semibold text-gray-900">
            Dashboard
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
