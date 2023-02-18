import { create } from "zustand";
import { QuoteI } from "@/pages";

export interface AuthorI {
  name: string;
  numberOfQuotes: number;
}

type State = {
  currentAuthor: string;
  authors: AuthorI[];
  quotes: QuoteI[];
  randomQuote: QuoteI;
  sidebar: boolean;
  currentChunk: number;
};

type Actions = {
  setCurrentAuthor: (arg: string) => void;
  setAuthors: () => void;
  setQuotes: (arg: QuoteI[]) => void;
  setRandomQuote: (arg: QuoteI[]) => void;
  setSidebar: (arg: boolean) => void;
  setAuthorsInChunks: (arg1: AuthorI[][], arg2: number) => void;
};

// Define the useQuoteStore custom hook, which returns an object with state and action functions.
export const useQuoteStore = create<State & Actions>((set) => ({
  // Initialize state variables.
  currentAuthor: "",
  authors: [],
  quotes: [],
  randomQuote: { id: 0, quote: "", author: "" },
  sidebar: true,
  currentChunk: 0,
  // Define action functions to update state variables.
  setCurrentAuthor: (arg) =>
    set((state) => {
      // If the window width is less than 1500 pixels, hide the sidebar when a new author is selected.
      if (window.innerWidth < 1500) {
        return {
          ...state,
          sidebar: false,
          currentAuthor: arg,
          randomQuote: { id: 0, quote: "", author: "" },
        };
      }
      // Otherwise, just update the currentAuthor variable.
      return {
        ...state,
        currentAuthor: arg,
        randomQuote: { id: 0, quote: "", author: "" },
      };
    }),
  setAuthors: () =>
    set((state) => {
      // Create a map to store the number of quotes for each author.
      const uniqueAuthors = new Map<string, number>();
      const authors: AuthorI[] = [];

      // Iterate over the list of quotes and count the number of quotes for each author.
      for (const quote of state.quotes) {
        if (uniqueAuthors.has(quote.author)) {
          uniqueAuthors.set(quote.author, uniqueAuthors.get(quote.author)! + 1);
        } else {
          uniqueAuthors.set(quote.author, 1);
          authors.push({
            name: quote.author,
            numberOfQuotes: 1,
          });
        }
      }

      // Update the numberOfQuotes property for each author object.
      for (const author of authors) {
        author.numberOfQuotes = uniqueAuthors.get(author.name)!;
      }

      // Update the authors state variable.
      return { ...state, authors: authors };
    }),
  setQuotes: (arg) => set((state) => ({ ...state, quotes: arg })),
  setRandomQuote: (arg: QuoteI[]) =>
    set((state) => {
      // Generate a random index and select a quote from the list of quotes.
      const randomIndex = Math.floor(Math.random() * arg.length);
      const selectedQuote = arg[randomIndex];
      // Update the randomQuote state variable and clear the currentAuthor variable.
      return { ...state, randomQuote: selectedQuote, currentAuthor: "" };
    }),
  setSidebar: (arg: boolean) => set((state) => ({ ...state, sidebar: arg })),
  setAuthorsInChunks: (arg1: AuthorI[][], arg2: number) =>
    set((state) => {
      // Calculate new chunk index
      const newChunk = state.currentChunk + arg2;

      // Check if new index is out of bounds
      if (newChunk < 0) {
        // If new index is negative, wrap around to last chunk
        return { ...state, currentChunk: arg1.length - 1 };
      } else if (newChunk >= arg1.length) {
        // If new index is greater than the number of chunks, wrap around to first chunk
        return { ...state, currentChunk: 0 };
      } else {
        // Otherwise, update current chunk index with the new value
        return { ...state, currentChunk: newChunk };
      }
    }),
}));
