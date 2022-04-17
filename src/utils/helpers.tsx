export const capitalize = (text: string): string => {
  return text.slice(0, 1).toUpperCase() + text.slice(1,)
}

export const pokemonTypeColor = () => {
  return [
    { name: 'bug', color: '#A8B820' },
    { name: 'dark', color: '#705848' },
    { name: 'dragon', color: '#7038F8' },
    { name: 'electric', color: '#F8D030' },
    { name: 'fairy', color: '#EE99AC' },
    { name: 'fighting', color: '#C03028' },
    { name: 'fire', color: '#F08030' },
    { name: 'flying', color: '#A890F0' },
    { name: 'ghost', color: '#705898' },
    { name: 'grass', color: '#78C850' },
    { name: 'ground', color: '#E0C068' },
    { name: 'ice', color: '#98D8D8' },
    { name: 'normal', color: '#C6C6A7' },
    { name: 'poison', color: '#A040A0' },
    { name: 'psychic', color: '#F85888' },
    { name: 'rock', color: '#B8A038' },
    { name: 'steel', color: '#B8B8D0' },
    { name: 'water', color: '#6890F0' }
  ]
}