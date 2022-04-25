import { Card, CardActionArea, CardMedia, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { PokemonTypesInterface } from '../store/pokemonSlice';
import { pokemonTypeColor } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { SET_VIEW_POKEMON } from '../store/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
interface Props {
  name: string,
  image: string,
  types: PokemonTypesInterface[] 
}

const PokemonCard: React.FC<Props> = ({ name, image, types }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resultsData } = useAppSelector(state => state.pokemon);

  const mapTypes = () => {
    return types.map(({ type }) => {
      const typeObject = pokemonTypeColor().find(({ name }) => name === type.name)

      return (
        <Chip
          key={type.name}
          label={type.name}
          size="small"
          style={{ backgroundColor: typeObject ? typeObject.color : 'white' }}
        />
      )
    })
  };

  const onViewPokemon = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const found = resultsData.find(val => val.name === name);

    dispatch(SET_VIEW_POKEMON(found))
    
    navigate(`/${name}`)
  };

  return (
    <Card
      sx={{
        width: '150px',
        mx: 'auto'
      }}
    >
      <CardActionArea
        onClick={(event) => onViewPokemon(event) }
      >
        <CardMedia
          component="img"
          image={image}
          height="140"
          sx={{ mt: 2 }}
        />
        <Typography
          align='center'
        >
          { name }
        </Typography>
        <Stack
          direction='row'
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ my: 2 }}
        >
          { mapTypes() }
        </Stack>
      </CardActionArea>
    </Card>
  )
};

export default PokemonCard;
