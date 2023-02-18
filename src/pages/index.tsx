import Authors from "@/components/Authors";
import AuthorsQuotes from "@/components/AuthorsQuotes";
import RandomQuote from "@/components/RandomQuote";
import useItemsFromStore from "@/store/actions";
import Head from "next/head";
import styles from "../styles/styles.module.css";

const url = "https://dummyjson.com/quotes?skip=0&limit=100";

export interface QuoteI {
  id: number;
  quote: string;
  author: string;
}

export default function Home({ quotes }: { quotes: QuoteI[] }) {
  const currentAuthor = useItemsFromStore();

  return (
    <>
      <>
        <Head>
          <title>Quotes</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
      <div className={styles.flex}>
        <Authors quotes={quotes} />
        <div className={styles.quotes}>
          <RandomQuote quotes={quotes} />
          {currentAuthor && <AuthorsQuotes />}
        </div>
      </div>
    </>
  );
}

/**
 * A Next.js `getStaticProps` function that fetches data from a URL and returns it as props to a page component at build time.
 * Note that the `getStaticProps` can only be used with Page
 * @returns An object with a `props` property that contains the fetched data.
 */
export async function getStaticProps() {
  const res = await fetch(url); // Fetch data from the specified URL
  const data = await res.json(); // Convert the response data to JSON
  const quotes = data.quotes; // Extract the quotes data from the JSON

  return {
    props: {
      quotes, // Pass the quotes data as props to the page component
    },
  };
}