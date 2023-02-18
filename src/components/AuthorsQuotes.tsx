import useItemsFromStore from "@/store/actions";
import React from "react";
import styles from "../styles/styles.module.css";

const AuthorsQuotes = () => {
  // Retrieve current author and quotes from global state
  const { currentAuthor, quotes } = useItemsFromStore();

  // Filter quotes by current author
  const filterByAuthor = quotes.filter((item) => item.author === currentAuthor);

  // Render filtered quotes as a list
  return (
    <div>
      {filterByAuthor.length > 0 && (
        <div>
          <h2 className={styles.borderBottom}>{currentAuthor}</h2>
          {filterByAuthor.map((authQuote) => {
            const { id, quote } = authQuote;
            return (
              <div key={id} className={styles.underline}>
                <h2>{`" ${quote} "`}</h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AuthorsQuotes;
