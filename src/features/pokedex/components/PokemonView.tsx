import {
  Box,
  Card,
  Container,
  Grid,
  List,
  ListItemButton
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useParams } from 'react-router-dom';

import {
  fetchEvolutionChain,
  fetchEvolutionDetails,
  fetchPokemonWeaknessData,
  fetchSpecies,
  fetchVarieties,
  viewPokemonData
} from '../store/pokemonSlice';
import { RESET_VIEW_POKEMON, setState } from '../store/pokemonSlice';

import Details from './Details';
import Forms from './Forms';
import Stats from './Stats';
import Evolution from './Evolution';
import NameAndImage from './NameAndImage';
import {
  EvolutionChainI,
  EvolutionI
} from '../interface/evolution.interface';
import EvolutionEevee from './EvolutionEevee';

const PokemonView: React.FC = () => {
  const [activeDisplay, setActiveDisplay] = useState(0);

  const buttons = ['Details', 'Forms', 'Stats', 'Evolution'];

  const dispatch = useAppDispatch();
  const { viewPokemon } = useAppSelector((state) => state.pokemon);
  const params = useParams();

  const arrangeEvolution = useCallback(
    (data: EvolutionI) => {
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
    },
    [dispatch]
  );

  useEffect(() => {
    return function () {
      dispatch(RESET_VIEW_POKEMON());

      RESET_VIEW_POKEMON();
    };
  }, [dispatch]);

  useEffect(() => {
    if (viewPokemon.id < 1) {
      const id = params.id ? params.id.toLowerCase() : '';

      dispatch(viewPokemonData(id))
        .unwrap()
        .then((data) => {
          dispatch(fetchPokemonWeaknessData());
          dispatch(fetchSpecies())
            .unwrap()
            .then((speciesData) => {
              // No other varieties
              if (speciesData.varieties.length > 1) {
                dispatch(fetchVarieties());
              } else {
                // Has other varieties
                dispatch(
                  setState([
                    {
                      stateName: 'varietiesData',
                      value: [data]
                    }
                  ])
                );
              }

              dispatch(fetchEvolutionChain())
                .unwrap()
                .then((evolutionData) => {
                  arrangeEvolution(evolutionData);
                });
            });
        });
    }
  }, [dispatch, viewPokemon, params, arrangeEvolution]);

  const onDisplay = (buttonIndex: number) => {
    setActiveDisplay(buttonIndex);
  };

  const showActiveDisplay = () => {
    switch (activeDisplay) {
      case 0:
        return <Details />;
      case 1:
        return <Forms />;
      case 2:
        return <Stats />;
      case 3:
        const eevees = [133, 134, 135, 136, 196, 197, 470, 471, 700];

        return eevees.includes(viewPokemon.id) ? (
          <EvolutionEevee />
        ) : (
          <Evolution />
        );
      default:
        return <Details />;
    }
  };

  return (
    <Container
      className="view"
      sx={{ my: '10%' }}
      maxWidth="xl"
    >
      <Card className="view__card">
        <Grid
          container
          sx={{
            flexDirection: { xs: 'column', lg: 'row' },
            padding: 3
          }}
          minHeight="300px"
          spacing={3}
        >
          <Grid
            item
            flexBasis={0}
            flexGrow={1}
          >
            <NameAndImage />
          </Grid>
          <Grid
            item
            flexGrow={1}
            flexBasis={0}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <List
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'row'
                },
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              {buttons.map((button, buttonIndex) => {
                return (
                  <ListItemButton
                    classes={{
                      selected: `view__button--active ${viewPokemon.types[0]?.type.name}--background`
                    }}
                    key={`button-${buttonIndex}`}
                    selected={activeDisplay === buttonIndex}
                    sx={{
                      justifyContent: 'center',
                      paddingLeft: 0,
                      paddingRight: 0,
                      fontSize: {}
                    }}
                    onClick={() => {
                      onDisplay(buttonIndex);
                    }}
                  >
                    {button}
                  </ListItemButton>
                );
              })}
            </List>
            <Box
              sx={{
                flexGrow: 1,
                width: '100%'
              }}
            >
              {showActiveDisplay()}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default PokemonView;
