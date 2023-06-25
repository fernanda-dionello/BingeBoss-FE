import { ModalElement } from "../Modal/ModalElement";
import Button from "react-bootstrap/Button";
import "./Filter.css";
import { categories } from "./utils/categories";
import { CheckedButton } from "../CheckedButton/CheckedButton";
import { useContext } from 'react';
import { Context } from '../../context/AuthContext';
import Api from "../../services/Api";
import { useNavigate } from 'react-router-dom';

export function Filter({ isOpen, onClose, childToParentData }) {
  let selectedCategories = [];
  let selectedType = [];
  let categoriesString = "";
  let typeString = "";
  const { filters, setFilters } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmitFilters = () => {
    const actionIndex = selectedCategories.findIndex((e) => e === 28);
    if (
      actionIndex !== -1 &&
      selectedType.length === 1 &&
      selectedType.find((e) => e === "tv")
    ) {
      selectedCategories[actionIndex] = 10759;
    }

    if (actionIndex !== -1 && selectedType.length === 2) {
      selectedCategories.push(10759);
    }

    categoriesString = selectedCategories.join(",");
    typeString =
      selectedType.length === 2 || selectedType.length === 0
        ? "multi"
        : selectedType[0];
  };

  const redirectToRecommendations = () => {
    Api.get("/search", {
      params: {
        page: 1,
        type: typeString,
        genre: categoriesString,
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("token")
        )}`,
      },
    })
      .then((res) => {
        console.log(res.data.results);
        navigate("/results", { state: res.data });
      })
      .catch((err) => console.log(err));
  }

  const handleCategories = (category) => {
    selectedCategories.includes(category)
      ? (selectedCategories = selectedCategories.filter((e) => e !== category))
      : selectedCategories.push(category);
  };

  const handleType = (type) => {
    selectedType.includes(type)
      ? (selectedType = selectedType.filter((e) => e !== type))
      : selectedType.push(type);
  };

  return (
    <ModalElement
      size="md"
      show={isOpen}
      onHide={() => {
        onClose();
      }}
      id="modal"
    >
      <h2 className="filter-title">Filters</h2>
      <p className="filter-subtitle">
        You can filter by as many categories as you like.
      </p>
      <div className="filter-wrapper">
        <h4>Category</h4>
        <div className="category-wrapper">
          {categories.map((category) => (
            <CheckedButton
              key={category.id}
              text={category.name}
              value={category.id}
              className="category"
              onClick={handleCategories}
              selected={filters?.categories.search(category.id) !== -1 && filters?.categories.search(category.id) !== undefined}
            />
          ))}
        </div>
      </div>
      <div className="filter-wrapper">
        <h4>Type</h4>
        <div className="category-wrapper">
          <CheckedButton
            key="movie"
            text="Movie"
            value="movie"
            className="category"
            onClick={handleType}
            selected={filters?.types === 'movie' || filters?.types ==='multi'}
          />
          <CheckedButton
            key="tv"
            text="Series"
            value="tv"
            className="category"
            onClick={handleType}
            selected={filters?.types === 'tv' || filters?.types ==='multi'}
          />
        </div>
      </div>
      <div className="filter-buttons-wrapper">
        <Button
          className="button button-filter"
          onClick={(e) => {
            handleSubmitFilters();
            redirectToRecommendations();
            onClose();
          }}
          variant="primary"
          type="button"
        >
          Give me the results!
        </Button>
        <Button
          className="button button-filter"
          onClick={(e) => {
            handleSubmitFilters();
            childToParentData({
              categories: categoriesString,
              types: typeString,
            });
            onClose();
          }}
          variant="primary"
          type="button"
        >
          Apply filters
        </Button>
      </div>
      <Button
        className="clear-filters-button"
        variant="link"
        size="sm"
        onClick={() => {
          selectedType=[];
          selectedCategories=[];
          setFilters(null);
          categoriesString="";
          typeString="";
          childToParentData(null);
        }}
      >
        Clear all filters
      </Button>
    </ModalElement>
  );
}
