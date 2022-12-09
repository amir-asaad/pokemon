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
import { Grid, Typography } from '@mui/material';
import PokemonTypeOrWeakness from './PokemonTypeOrWeakness';
import { Box } from '@mui/system';

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

  const displayPokemon = (
    pokemon: PokemonDataInterface | undefined,
    pokemonIndex: number
  ) => {
    const types: TypeNameI[] =
      pokemon?.types.map(({ type }) => ({
        name: type.name,
        url: type.url
      })) || [];

    return (
      <Box
        mb={0.5}
        sx={{
          height: '100%',
          py: 5
        }}
      >
        <Box
          component="img"
          src={pokemon?.sprites.other['official-artwork'].front_default}
          alt={pokemon?.name}
          sx={{
            objectFit: 'contain',
            maxWidth: {
              md: '150px'
            },
            width: {
              xs: '100%'
            },
            display: 'block',
            margin: '0 auto',
            border: '5px solid white',
            borderRadius: '50%',
            zIndex: pokemonIndex + 1
          }}
        />
        <Typography
          align="center"
          sx={{
            color: 'white',
            fontSize: {
              sm: '24px'
            },
            mb: 1,
            overflowWrap: {
              xs: 'break-word'
            }
          }}
        >
          {`${capitalize(pokemon?.name || '')}`}
        </Typography>
        <Typography
          align="center"
          sx={{
            color: 'white',
            fontSize: {
              sm: '20px'
            },
            mb: 1,
            overflowWrap: {
              xs: 'break-word'
            }
          }}
        >
          #{`${addZeroes(pokemon?.order || 0)}`}
        </Typography>
        <PokemonTypeOrWeakness
          typeOrWeaknessArray={types}
          centerList
        />
      </Box>
    );
  };

  const layoutPokemon = (
    stage: [number, string, PokemonDataInterface | undefined][]
  ) => {
    return (
      <Grid
        className="inner__container"
        justifyContent="space-around"
        container
        sx={{
          flexDirection: {
            md: 'column'
          }
        }}
      >
        {stage.map((pokemon, pokemonIndex) => {
          return (
            <Grid
              className="inner__item"
              item
              flexGrow={1}
              xs={4}
              md={12}
              key={pokemonIndex}
            >
              {displayPokemon(pokemon[2], pokemonIndex)}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const layoutStage = () => {
    return arrangedEvolution.map((stage, stageIndex) => {
      return (
        <Grid
          item
          key={`evolution-${stageIndex}`}
          flexGrow={1}
          mb="2"
          sx={{
            display: 'block',
            margin: 'auto 0'
          }}
        >
          {layoutPokemon(stage)}
        </Grid>
      );
    });
  };

  return (
    <Box
      component="div"
      sx={{
        mt: 3,
        padding: 3,
        backgroundColor: '#6c757d',
        borderRadius: '5px'
      }}
    >
      <Typography
        color="white"
        sx={{
          ml: 2,
          fontSize: {
            sm: '1.5rem'
          },
          fontWeight: 'bold'
        }}
      >
        Evolution
      </Typography>
      <Grid
        container
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row'
          }
        }}
      >
        {layoutStage()}
      </Grid>
    </Box>
  );
};

export default PokemonEvolution;
