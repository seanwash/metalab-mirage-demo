import React, { useState } from 'react';
import Banner from '../Banner';
import { Link } from 'react-router-dom';

const PokemonForm: React.FC = () => {
  const [name, setName] = useState<string>();
  const [baseExperience, setBaseExperience] = useState<string | undefined>();
  const [height, setHeight] = useState<string | undefined>();
  const [width, setWidth] = useState<string | undefined>();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus('submitting');

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
      {status === 'success' && <Banner type="success" message="Your Pokemon has been added to the Pokédex" url="/" />}
      {status === 'error' && <Banner type="error" message="There was an error adding this Pokemon." />}

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
                    placeholder="Alakazam"
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
                  <Link
                    to="/"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
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

export default PokemonForm;
