import {
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import React, { memo } from 'react';
import { PokemonTypesInterface } from '../interface/store.interface';
import { pokemonTypeColor } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
interface Props {
  name: string;
  image: string;
  types: PokemonTypesInterface[];
}

const PokemonCard: React.FC<Props> = ({ name, image, types }) => {
  const navigate = useNavigate();
  const onViewPokemon = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    navigate(`/${name}`);
  };
  const mapTypes = () => {
    return types.map(({ type }) => {
      const typeObject = pokemonTypeColor().find(
        ({ name }) => name === type.name
      );

      return (
        <Chip
          key={type.name}
          label={type.name}
          size="small"
          style={{
            backgroundColor: typeObject ? typeObject.color : 'white',
            color: 'white',
            padding: '5px'
          }}
        />
      );
    });
  };

  return (
    <Card
      raised
      sx={{
        mx: 'auto',
        width: {
          sm: '80%'
        }
      }}
    >
      <CardActionArea
        onClick={(event) => {
          onViewPokemon(event);
        }}
        sx={{ m: 0 }}
      >
        <CardMedia
          component="img"
          image={image}
          sx={{
            mt: 2
          }}
        />
        <Typography
          align="center"
          sx={{ fontSize: { md: '1.2rem' } }}
        >
          {name}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ my: 2 }}
        >
          {mapTypes()}
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default memo(PokemonCard);
