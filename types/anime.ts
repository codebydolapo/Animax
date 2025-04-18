export default interface Anime {
    id: string;
    picture: string;
    synopsis: string;
    licensor: string;
    title: string;
    link: string;
    genres: string[];
    producers: string[];
    fromType: string;
    nbEp: string;
    releaseDate: string;
    score: string | number;
    members: string;
    trailerLink: string;
  }