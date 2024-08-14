import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import recipesData from "../data";
import axios from "../services/axiosInstance";

const colors = {
  background: "#faf3e0",
  text: "#333333",
  heading: "#6a4c41",
  primary: "#ff6b6b",
  secondary: "#dc3545",
  border: "#ddd",
};

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 80px auto 20px auto;
  background-color: ${colors.background};
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 2px solid ${colors.border};
  margin-bottom: 20px;
  border-radius: 8px;
`;

const RecipeTitle = styled.h1`
  margin: 20px 0;
  font-size: 2.5rem;
  color: ${colors.text};
  text-align: center;
  font-weight: bold;
`;

const Ingredients = styled.div`
  margin-bottom: 20px;
`;

const Preparation = styled.div`
  margin-bottom: 30px;
`;

const IngredientsTitle = styled.h2`
  font-size: 1.75rem;
  color: ${colors.heading};
  margin-bottom: 10px;
  border-bottom: 2px solid ${colors.border};
  padding-bottom: 5px;
`;

const PreparationTitle = styled.h2`
  font-size: 1.75rem;
  color: ${colors.heading};
  margin-bottom: 10px;
  border-bottom: 2px solid ${colors.border};
  padding-bottom: 5px;
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #e14d4d;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 14px;
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${colors.secondary};

  &:hover {
    background-color: #c82333;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 50px;
  color: ${colors.text};
  font-size: 1.2rem;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 50px;
  color: ${colors.secondary};
  font-size: 1.2rem;
  font-weight: bold;
`;

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    ingredients: "",
    preparation: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Database fetch error:", error);
        const dummyRecipe = recipesData.find(
          (recipe) => recipe.id === parseInt(id)
        );
        if (dummyRecipe) {
          setRecipe(dummyRecipe);
        } else {
          setError("Recipe not found");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/recipes/${id}`);
      navigate("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError("Failed to delete recipe");
    }
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!recipe) {
    return <ErrorMessage>Recipe not found</ErrorMessage>;
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        {recipe.image && (
          <RecipeImage
            src={
              recipe.image.startsWith("http") || recipe.image.startsWith("/")
                ? recipe.image
                : `/uploads/${recipe.image}`
            }
            alt={recipe.title}
          />
        )}

        <RecipeTitle>{recipe.title}</RecipeTitle>
        <Ingredients>
          <IngredientsTitle>Ingredients</IngredientsTitle>
          <p>{recipe.ingredients}</p>
        </Ingredients>
        <Preparation>
          <PreparationTitle>Preparation</PreparationTitle>
          <p>{recipe.preparation}</p>
        </Preparation>
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleEdit}>Edit</Button>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </div>
      </PageContainer>
    </>
  );
};

export default RecipePage;
