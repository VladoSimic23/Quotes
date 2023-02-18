import { useQuoteStore } from "./store";

// This custom hook uses the useQuoteStore hook to retrieve the state and actions from the store.

const useItemsFromStore = () => {
  // The following lines use the useQuoteStore hook to retrieve specific values from the store's state:
  const authors = useQuoteStore((state) => state.authors);
  const currentAuthor = useQuoteStore((state) => state.currentAuthor);
  const currentChunk = useQuoteStore((state) => state.currentChunk);
  const sidebar = useQuoteStore((state) => state.sidebar);
  const quotes = useQuoteStore((state) => state.quotes);
  const randomQuote = useQuoteStore((state) => state.randomQuote);

  // The following lines use the useQuoteStore hook to retrieve specific actions from the store:
  const setCurrentAuthor = useQuoteStore((state) => state.setCurrentAuthor);
  const setQuotes = useQuoteStore((state) => state.setQuotes);
  const setAuthors = useQuoteStore((state) => state.setAuthors);
  const setSidebar = useQuoteStore((state) => state.setSidebar);
  const setAuthorsInChunks = useQuoteStore((state) => state.setAuthorsInChunks);
  const setRandomQuote = useQuoteStore((state) => state.setRandomQuote);

  // The following object contains all of the state and actions retrieved from the store:
  return {
    authors,
    currentAuthor,
    currentChunk,
    sidebar,
    quotes,
    randomQuote,
    setAuthors,
    setAuthorsInChunks,
    setQuotes,
    setCurrentAuthor,
    setSidebar,
    setRandomQuote,
  };
};

export default useItemsFromStore;
