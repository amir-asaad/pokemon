import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchEvolutionChain,
  fetchEvolutionDetails,
  PokemonDataInterface,
  TypeNameI
} from '../store/pokemonSlice';
import { EvolutionChainI } from '../interface/evolution.interface';
import '../styles/evolution.pokemon.css';
import { addZeroes, capitalize } from '../../../utils/helpers';
import { Button, Typography } from '@mui/material';
import PokemonTypeOrWeakness from './PokemonTypeOrWeakness';

const PokemonEvolution: React.FC = () => {
  const dispatch = useAppDispatch();
  const { arrangedEvolution } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchEvolutionChain())
      .unwrap()
      .then((data) => {
        const evolution: [number, string][][] = [];
        evolution.push([[0, data.chain.species.name]]);

        const recursionFunc = (
          evolvesTo: EvolutionChainI[],
          evolutionIndex: number,
          innerEvolutionIndex: number
        ) => {
          let currentIndex = innerEvolutionIndex;

          for (let i = 0; i < evolvesTo.length; i++) {
            const innerEvolveTo = evolvesTo[`${i}`];
            const innerEvolution: [number, string] = [
              currentIndex,
              innerEvolveTo.species.name
            ];

            if (evolution[`${evolutionIndex}`]) {
              evolution[`${evolutionIndex}`].push(innerEvolution);
            } else {
              evolution[`${evolutionIndex}`] = [innerEvolution];
            }

            if (innerEvolveTo.evolves_to.length > 0) {
              recursionFunc(
                innerEvolveTo.evolves_to,
                evolutionIndex + 1,
                currentIndex
              );

              currentIndex++;
            }
          }
        };

        recursionFunc(data.chain.evolves_to, 1, 0);
        dispatch(fetchEvolutionDetails(evolution));
      });
  }, [dispatch]);

  const displayStage = () => {
    return arrangedEvolution.map((stage, stageIndex) => {
      return (
        <div
          className="evolution__inner-stage"
          key={`evolution-${stageIndex}`}
        >
          {stage.map((pokemon, pokemonIndex) => (
            <div key={pokemonIndex}>
              {displayPokemon(pokemon[2], stageIndex)}
            </div>
          ))}
        </div>
      );
    });
  };

  const displayPokemon = (
    pokemon: PokemonDataInterface | undefined,
    stageIndex: Number
  ) => {
    const types: TypeNameI[] =
      pokemon?.types.map(({ type }) => ({
        name: type.name,
        url: type.url
      })) || [];

    return (
      <div className="inner-stage__pokemon">
        <img
          src={pokemon?.sprites.other['official-artwork'].front_default}
          alt={pokemon?.name}
        />
        <Typography
          align="center"
          variant="h5"
          sx={{
            color: 'white'
          }}
        >
          {`${capitalize(pokemon?.name || '')} #${addZeroes(
            pokemon?.order || 0
          )}`}
        </Typography>
        <PokemonTypeOrWeakness typeOrWeaknessArray={types} />
        <Button href="/">Go back</Button>
      </div>
    );
  };

  return <div className="evolution">{displayStage()}</div>;
};

export default PokemonEvolution;
