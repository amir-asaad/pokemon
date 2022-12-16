import { Container } from '@mui/material';
import PokemonList from './features/pokedex/components/PokemonList';
import './styles/App.css';

function App() {
  return (
    <Container
      className="App"
      sx={{
        padding: 0
      }}
      maxWidth="xl"
    >
      <PokemonList />
    </Container>
  );
}

export default App;
