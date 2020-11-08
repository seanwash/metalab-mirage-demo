import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Pokemon, Ability, Move, Type } from '../../lib/types';

const IndexPage: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v2/pokemon');
      const { pokemon } = await response.json();
      // TODO: Is there a way to default the sort order of a collection?
      setPokemon(pokemon.reverse());
    };

    fetchData();
  }, []);

  const arrayToSentence = (array: Ability[] | Move[] | Type[], key: 'name') => {
    return array.map((item) => item[key]).join(', ');
  };

  return (
    <>
      <div className="pb-5 border-b border-gray-200 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
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
                      Abilities
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Moves
                    </th>
                    <th className="px-6 py-3 bg-gray-50" />
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
                        {arrayToSentence(pokemon.abilities, 'name')}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {arrayToSentence(pokemon.moves, 'name')}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
