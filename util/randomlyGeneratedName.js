import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

const randomlyGeneratedName = () =>
  `${uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    style: "capital",
    separator: " ",
  })}`;

export default randomlyGeneratedName;
