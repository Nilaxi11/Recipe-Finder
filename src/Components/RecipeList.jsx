import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Navbar
} from "react-bootstrap";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [allTags, setAllTags] = useState([]);

  // Fetch recipes
  const fetchRecipes = async () => {
    try {
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();
      setRecipes(data.recipes);

      // Extract unique tags
      const tags = [
        ...new Set(data.recipes.flatMap((r) => r.tags))
      ];
      setAllTags(tags);

    } catch (err) {
      console.error(err);
    }
  };

  // Search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${search}`
      );
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  //  FILTER LOGIC (Meal + Tag)
  const filteredRecipes = recipes.filter((recipe) => {
    const mealMatch =
      selectedMeal === "All" ||
      recipe.mealType?.includes(selectedMeal);

    const tagMatch =
      selectedTag === "All" ||
      recipe.tags?.includes(selectedTag);

    return mealMatch && tagMatch;
  });

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            RecipeFinder
          </Navbar.Brand>

          <Form className="ms-auto" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                placeholder="Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="light" type="submit">
                🔍
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {/* Sidebar */}
          <Col lg={3} className="mb-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h5>Filters</h5>

              {/* Meal Filter */}
              <h6 className="mt-3">Meal Type</h6>
              <div>
                {["All", "Breakfast", "Lunch", "Dinner", "Snack"].map(
                  (meal) => (
                    <Button
                      key={meal}
                      size="sm"
                      className="me-2 mb-2"
                      variant={
                        selectedMeal === meal
                          ? "primary"
                          : "outline-primary"
                      }
                      onClick={() => setSelectedMeal(meal)}
                    >
                      {meal}
                    </Button>
                  )
                )}
              </div>

              {/* TAG FILTER */}
              <h6 className="mt-3">Tags</h6>
              <div>
                <Button
                  size="sm"
                  className="me-2 mb-2"
                  variant={
                    selectedTag === "All"
                      ? "success"
                      : "outline-success"
                  }
                  onClick={() => setSelectedTag("All")}
                >
                  All
                </Button>

                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    size="sm"
                    className="me-2 mb-2"
                    variant={
                      selectedTag === tag
                        ? "success"
                        : "outline-success"
                    }
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </Col>

          {/* Recipes */}
          <Col lg={9}>
            {/* Active Filters */}
            <div className="mb-3">
              {selectedMeal !== "All" && (
                <span className="me-3">
                  Meal: <strong>{selectedMeal}</strong>
                </span>
              )}
              {selectedTag !== "All" && (
                <span>
                  Tag: <strong>{selectedTag}</strong>
                </span>
              )}
            </div>

            <Row>
              {filteredRecipes.map((recipe) => (
                <Col
                  md={6}
                  lg={4}
                  key={recipe.id}
                  className="mb-4"
                >
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      src={recipe.image}
                      style={{
                        height: "200px",
                        objectFit: "cover"
                      }}
                    />

                    <Card.Body>
                      <Card.Title>{recipe.name}</Card.Title>

                      <div className="d-flex justify-content-between">
                        <span className="badge bg-primary">
                          {recipe.prepTimeMinutes} mins
                        </span>
                        <small>
                          {recipe.mealType?.[0]}
                        </small>
                      </div>

                      {/* Show tags */}
                      <div className="mt-2">
                        {recipe.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="badge bg-light text-dark me-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card.Body>

                    <Card.Footer className="bg-transparent">
                      <Button
                        as={Link}
                        to={`/recipe/${recipe.id}`}
                        className="w-100"
                      >
                        View Recipe
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecipeList;