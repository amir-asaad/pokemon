import { Card, CardMedia, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { PokemonTypesInterface } from '../store/pokemonSlice';
import { pokemonTypeColor } from '../../../utils/helpers';
interface Props {
  name: string,
  image: string,
  types: PokemonTypesInterface[] 
}

const PokemonCard: React.FC<Props> = ({ name, image, types }) => {
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
  }

  return (
    <Card
      sx={{
        maxWidth: '140px',
        mx: 'auto'
      }}
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
    </Card>
  )
};

export default PokemonCard;
