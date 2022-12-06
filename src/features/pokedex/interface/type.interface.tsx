export interface TypeDataI {
  damage_relations: DamageRelationsI;
}

interface DamageRelationsI {
  double_damage_from: DamageRelationsDataI[];
  half_damage_from: DamageRelationsDataI[];
  no_damage_from: DamageRelationsDataI[];
}

export interface DamageRelationsDataI {
  name: string;
  url: string;
}
