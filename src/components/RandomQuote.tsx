import { QuoteI } from "@/pages";
import useItemsFromStore from "@/store/actions";
import styles from "../styles/styles.module.css";

// Define props for RandomQuote component
export type RandomQuoteProps = {
  quotes: QuoteI[];
};

// Define RandomQuote functional component
const RandomQuote = ({ quotes }: RandomQuoteProps) => {
  // Use custom hook to access necessary state and methods
  const { setRandomQuote, randomQuote } = useItemsFromStore();

  return (
    <div>
      {/* Render button that triggers setRandomQuote method */}
      <button
        className={`${styles.btnBlue} ${styles.btn}`}
        onClick={() => setRandomQuote(quotes)}
      >
        Random Quote
      </button>
      {/* If a randomQuote has been generated, render it */}
      {randomQuote.id !== 0 && (
        <div>
          {/* Render quote and author */}
          <h2 className={styles.quote}>
            {randomQuote.quote}
            <span></span>
          </h2>
          <h2 className={`${styles.quote2} ${styles.borderBottom}`}>
            {randomQuote.author}
          </h2>
        </div>
      )}
    </div>
  );
};

// Export RandomQuote component as default
export default RandomQuote;
