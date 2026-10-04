import { useState } from "react";
import styles from "./JokeCard.module.css";

function JokeCard() {
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);

    try {
      setError("");

      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke.");
      }

      const data = await response.json();

      console.log(data);
      setJoke(data);
    } catch (error) {
      console.error("Couldn't fetch joke:", error);
      setJoke(null);
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.jokeCard}>
      <h1>Random Joke</h1>

      <p>Click a button to fetch a fresh one.</p>

      <button onClick={fetchJoke} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Joke"}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {joke ? (
        <div>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      ) : !error ? (
        <p>No joke yet.</p>
      ) : null}
    </div>
  );
}

export default JokeCard;