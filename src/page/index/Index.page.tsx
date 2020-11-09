import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import qs from 'qs';

import { Pokemon, Move, Type } from '../../lib/types';

const DEFAULT_PAGE_LENGTH = 12

const IndexPage: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>();
  const match = useRouteMatch();

  useEffect(() => {
    const fetchData = async () => {
      let query = qs.parse(window.location.search, { ignoreQueryPrefix: true });

      if (searchKeyword) {
        query = { ...query, keyword: searchKeyword };
      }

      const response = await fetch(`/api/v2/pokemon?${qs.stringify(query)}`);
      const { pokemon } = await response.json();

      setPokemon(pokemon);
    };

    fetchData();
  }, [match, searchKeyword]);

  const arrayToSentence = (array: Move[] | Type[], key: 'name') => {
    return array.map((item) => item[key]).join(', ');
  };

  return (
    <>
      <form>
        <label
          htmlFor="search"
          className="block text-sm font-medium leading-5 text-gray-700"
        >Search Pokemon</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="search"
              className="form-input block w-full pl-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              placeholder="Kabuto"
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </div>
        </div>
      </form>

      <div className="mt-8 pb-5 border-b border-gray-200 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Known Pokemon</h3>
        <div className="flex space-x-3">
          <span className="shadow-sm rounded-md">
            <Link
              to="/pokemon/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Add new Pokemon
            </Link>
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Types
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Moves
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {pokemon.map((pokemon) => (
                  <tr key={pokemon.id}>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {pokemon.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {arrayToSentence(pokemon.types, 'name')}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {arrayToSentence(pokemon.moves, 'name')}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
              {pokemon.length > DEFAULT_PAGE_LENGTH && (
                <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <Link
                      to={{
                        pathname: '/',
                        search: '?page=1',
                      }}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    >
                      Previous
                    </Link>
                    <Link
                      to={{
                        pathname: '/',
                        search: '?page=2',
                      }}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    >
                      Next
                    </Link>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
