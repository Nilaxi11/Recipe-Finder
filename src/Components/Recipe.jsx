import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Recipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/recipes`)
      .then((response) => setRecipes(response.data.recipes));
  }, []);

  return (
    <div style={styles.container}>
      {recipes.map((food) => (
        <div key={food.id} style={styles.card}>
          
          {/* Image */}
          <img src={food.image} alt={food.name} style={styles.image} />

          {/* Content */}
          <h3>{food.name}</h3>

          <p><strong>Cuisine:</strong> {food.cuisine}</p>

          <p>
            <strong>Ingredients:</strong><br />
            {food.ingredients.join(", ")}
          </p>

          <p><strong>Time:</strong> {food.prepTimeMinutes} mins</p>

        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    justifyContent: "center"
  },
  card: {
    width: "300px",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px"
  }
};

export default Recipe;