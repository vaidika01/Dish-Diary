import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 250px;
  background: #f9f9f9;
  padding: 15px;
  margin: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 0.9;
  }
`;

const RecipeTitle = styled.h3`
  margin: 10px 0;
  font-size: 22px;
  color: #444;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: #ff6347;
  }
`;

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: "none" }}>
      <Card>
        <RecipeImage src={recipe.image} alt={recipe.name} />
        <RecipeTitle>{recipe.title}</RecipeTitle>
      </Card>
    </Link>
  );
};

export default RecipeCard;
