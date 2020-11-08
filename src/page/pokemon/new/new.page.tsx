import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SuccessBanner: React.FC = () => {
  return (
    <div className="rounded-md bg-green-50 p-4 mb-10">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm leading-5 text-green-700">Pokemon was successfully added to the Pokédex!</p>
          <p className="mt-3 text-sm leading-5 md:mt-0 md:ml-6">
            <Link
              to="/"
              className="whitespace-no-wrap font-medium text-green-700 hover:text-green-600 transition ease-in-out duration-150"
            >
              View Pokédex &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const ErrorBanner: React.FC = () => {
  return (
    <div className="rounded-md bg-red-50 p-4 mb-10">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm leading-5 text-red-800">Pokemon could not be added to the Pokédex.</p>
        </div>
      </div>
    </div>
  );
};

const NewPage: React.FC = () => {
  const [name, setName] = useState<string>();
  const [baseExperience, setBaseExperience] = useState<string | undefined>();
  const [height, setHeight] = useState<string | undefined>();
  const [width, setWidth] = useState<string | undefined>();
  const [status, setStatus] = useState<'pending' | 'submitting' | 'success' | 'error'>('pending');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus('pending');

    const requestBody = {
      pokemon: {
        name,
        baseExperience,
        height,
        width,
        typeIds: [1],
        abilityIds: [1],
        moveIds: [1],
      },
    };

    const response = await fetch('/api/v2/pokemon', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    if (response.status === 201) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      {status === 'error' && <ErrorBanner />}
      {status === 'success' && <SuccessBanner />}

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Add a new Pokemon</h3>
            <p className="mt-1 text-sm leading-5 text-gray-600">
              This information will be displayed publicly for the benefit of trainers everywhere.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white sm:p-6">
                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    required
                    id="name"
                    className="form-input flex-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="Abracadabra"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="mt-6">
                  <label htmlFor="baseExperience" className="block text-sm leading-5 font-medium text-gray-700">
                    Base Experience
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      required
                      type="number"
                      min={0}
                      id="baseExperience"
                      className="form-input flex-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="9001"
                      onChange={(event) => setBaseExperience(event.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="height" className="block text-sm leading-5 font-medium text-gray-700">
                    Height (in cm)
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      required
                      type="number"
                      min={0}
                      id="height"
                      className="form-input flex-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="11"
                      onChange={(event) => setHeight(event.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="width" className="block text-sm leading-5 font-medium text-gray-700">
                    Width (in cm)
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      required
                      type="number"
                      min={0}
                      id="width"
                      className="form-input flex-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="42"
                      onChange={(event) => setWidth(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Save
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPage;
