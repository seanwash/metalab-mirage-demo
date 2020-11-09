import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  type: 'success' | 'error';
  message: string;
  url?: string;
};

const Banner = (props: Props) => {
  const themeColor = props.type === 'success' ? 'green' : 'red';

  return (
    <div className={`rounded-md bg-${themeColor}-50 p-4 mb-10`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className={`h-5 w-5 text-${themeColor}-400`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {props.type === 'success' && (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            )}
            {props.type === 'error' && (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className={`text-sm leading-5 text-${themeColor}-700`}>{props.message}</p>
          {props.url && (
            <p className="mt-3 text-sm leading-5 md:mt-0 md:ml-6">
              <Link
                to={props.url}
                className={`whitespace-no-wrap font-medium text-${themeColor}-700 hover:text-${themeColor}-600 transition ease-in-out duration-150`}
              >
                View Pokédex &rarr;
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
