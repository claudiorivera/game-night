import { BGGGameResponse } from "lib/fetchBggGameById";

type GameMetaDataProps = {
  game: BGGGameResponse;
};

type DescriptionProps = {
  term: string;
  definition: string;
};

const Description = ({ term, definition }: DescriptionProps) => (
  <div className="flex items-center gap-2">
    <dt>{term}:</dt>
    <dd>{definition}</dd>
  </div>
);

export const GameMetaData = ({ game }: GameMetaDataProps) => {
  if (!game) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <span>Authors: </span>
        <div className="flex flex-wrap gap-1">
          {game.authors.map((author) => (
            <div className="badge" key={author}>
              {author}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <span>Categories: </span>
        <div className="flex flex-wrap gap-1">
          {game.categories.map((category) => (
            <div className="badge" key={category}>
              {category}
            </div>
          ))}
        </div>
      </div>
      <Description
        term="Average BGG Rating"
        definition={`${game.rating.toFixed(2)} (${game.numOfRatings} ratings)`}
      />
      <Description
        term="Players"
        definition={`${game.minPlayers} to ${game.maxPlayers}`}
      />
      <Description
        term="Playing Time"
        definition={`${game.playingTime} minutes`}
      />
      <Description term="Ages" definition={`${game.minAge}+`} />
    </div>
  );
};
