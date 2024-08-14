import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";
import styled from "styled-components";

const colors = {
  background: "#faf3e0",
  text: "#333333",
  heading: "#6a4c41",
  primary: "#ff6b6b",
  border: "#ddd",
  buttonHover: "#ff4757",
  error: "#dc3545",
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: ${colors.background};
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 5px;
  font-size: 16px;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    background-color: #e1e1e1;
    cursor: not-allowed;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${colors.heading};
  text-align: center;
`;

const Notification = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: ${(props) => (props.success ? "green" : colors.error)};
  background-color: ${(props) => (props.success ? "#d4edda" : "#f8d7da")};
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid ${colors.primary};
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const EditRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    preparation: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError("Recipe not found");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/recipes/${id}`, recipe);
      navigate(`/recipe/${id}`);
    } catch (error) {
      setError("Failed to update recipe");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <FormContainer>
        <Title>Edit Recipe</Title>
        {error && <Notification>{error}</Notification>}
        <Form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Recipe Title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
          <TextArea
            placeholder="Ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            rows="4"
            required
          />
          <TextArea
            placeholder="Preparation Instructions"
            name="preparation"
            value={recipe.preparation}
            onChange={handleChange}
            rows="4"
            required
          />
          <SubmitButton type="submit">Update Recipe</SubmitButton>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default EditRecipePage;
