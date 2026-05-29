import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Card,
  Button, Navbar
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = useCallback(async () => {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);
    const data = await res.json();
    setRecipe(data);
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (!recipe) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">RecipeFinder</Navbar.Brand>
          <Button as={Link} to="/" variant="outline-primary">
            ← Back
          </Button>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col lg={8} className="mx-auto">

            <h1>{recipe.name}</h1>

            <div className="mb-3">
              ⭐ {recipe.rating} ({recipe.reviewCount} reviews)
            </div>

            <div className="mb-3">
              <span className="badge bg-primary me-2">
                Prep: {recipe.prepTimeMinutes} mins
              </span>
              <span className="badge bg-success me-2">
                {recipe.caloriesPerServing} kcal
              </span>
              <span className="badge bg-secondary">
                {recipe.servings} servings
              </span>
            </div>

            {/* Image */}
            <img
              src={recipe.image}
              alt={recipe.name}
              className="img-fluid rounded mb-4"
            />

            {/* Ingredients */}
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <h4>Ingredients</h4>
                <ul>
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            {/* Instructions */}
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <h4>Instructions</h4>
                <ol>
                  {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecipeDetail;