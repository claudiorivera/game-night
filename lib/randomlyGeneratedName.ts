import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";

const randomlyGeneratedName = () =>
  `${uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    style: "capital",
    separator: " ",
  })}`;

export default randomlyGeneratedName;
