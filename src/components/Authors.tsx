import { QuoteI } from "@/pages";
import React, { useEffect } from "react";
import { chunkArray } from "@/utils/chunk";
import styles from "../styles/styles.module.css";
import useItemsFromStore from "@/store/actions";

/**
 * A React component that displays a list of authors and their number of quotes.
 *
 * @param quotes - An array of quotes data to be used to generate the author list.
 */
const Authors = ({ quotes }: { quotes: QuoteI[] }) => {
  // Get various state variables and functions from a custom hook
  const {
    authors,
    currentAuthor,
    currentChunk,
    sidebar,
    setCurrentAuthor,
    setQuotes,
    setAuthors,
    setSidebar,
    setAuthorsInChunks,
  } = useItemsFromStore();

  // Split the list of authors into smaller chunks for pagination
  const quotesChunks = chunkArray(authors, 13);

  // Function to handle pagination when the user clicks on "Prev Page" or "Next Page"
  const handleChunk = (diff: number) => {
    setAuthorsInChunks(quotesChunks, diff);
  };

  // Set the quotes and authors state variables when the component mounts or when the `quotes` prop changes
  useEffect(() => {
    setQuotes(quotes);
    setAuthors();
  }, [quotes, setAuthors, setQuotes]);

  // Render the component
  return (
    <>
      <button
        className={`${styles.showAuthors} ${styles.btnBlue}`}
        style={!sidebar ? { zIndex: 15 } : { zIndex: -5 }}
        onClick={() => setSidebar(true)}
      >
        Authors
      </button>
      <div className={`${styles.authors} ${!sidebar && styles.margiMinus}`}>
        <p className={styles.hideSidebar} onClick={() => setSidebar(false)}>
          Close
        </p>

        <h2 className={styles.borderBottom}>Authors</h2>
        <div className={styles.pageNav}>
          <button onClick={() => handleChunk(-1)}>Prev Page</button>
          <p>
            {currentChunk + 1} / {quotesChunks.length}
          </p>
          <button onClick={() => handleChunk(1)}>Next Page</button>
        </div>
        <ul>
          {quotesChunks[currentChunk]
            ?.sort((a, b) => b?.numberOfQuotes - a?.numberOfQuotes) // Sort the authors by the number of quotes they have
            .map((auth, index) => {
              return (
                <li
                  className={
                    currentAuthor === auth.name ? styles.activeAuthor : ""
                  }
                  key={index}
                  onClick={() => setCurrentAuthor(auth.name)}
                >
                  {auth.name} <span>{auth.numberOfQuotes}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Authors;
