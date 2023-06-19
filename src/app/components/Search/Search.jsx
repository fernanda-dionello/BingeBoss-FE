import { useContext, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Api from "../../services/Api";
import _ from "lodash";
import "./Search.css";
import filter from "../../assets/filter.svg";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/AuthContext";
import { Filter } from "../Filter/Filter";

export function Search() {
  const [search, setSearch] = useState("");
  const [contentData, setContentData] = useState({});
  const [openfilter, setOpenfilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedTypes, setSelectedTypes] = useState("");
  const { hasTextInSearchField, setHasTextInSearchField, setFilters } = useContext(Context);

  const data = useRef(null);

  const childToParent = (childData) => {
    data.current = childData;
    setFilters(data.current);
  };
  const navigate = useNavigate();

  const searchContent = useRef(
    _.debounce((searchValue) => {
      if (!searchValue?.trim()) {
        setContentData({});
        return;
      }

      if (data.current) {
        Api.get("/search", {
          params: {
            title: searchValue,
            page: 1,
            type: data.current.types,
            genre: data.current.categories,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        })
          .then((res) => {
            console.log(res.data.results);
            setContentData(res.data);
            res.data
              ? setHasTextInSearchField(true)
              : setHasTextInSearchField(false);
            redirectToResults(res.data);})
          .catch((err) => console.log(err));
      } else {
        Api.get(`/search?title=${searchValue}&type=multi`, {
          headers: {
            "x-session-token": JSON.parse(localStorage.getItem("token")),
          },
        })
          .then((res) => {
            setContentData(res.data);
            res.data
              ? setHasTextInSearchField(true)
              : setHasTextInSearchField(false);
            redirectToResults(res.data);
          })
          .catch((err) => console.log(err));
      }
    }, 1000)
  ).current;

  const redirectToResults = (data) => {
    navigate("/results", { state: data });
    setContentData({});
  };

  useEffect(() => {
    return () => {
      searchContent.cancel();
    };
  }, [searchContent]);

  useEffect(() => {
    console.log("pathname", window.location.pathname);
    if (window.location.pathname === "/results" && search === "") {
      navigate("/home");
    }
  }, [search]);

  useEffect(() => {
    const paths = ["/home", "/settings", "/profile"];
    if (
      paths.includes(window.location.pathname) &&
      hasTextInSearchField === false
    ) {
      setSearch("");
    }
  }, [hasTextInSearchField]);

  return (
    <div className="search-container">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          size="large"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchContent(e.target.value);
          }}
        />
      </Form>
      <Button variant="secondary" onClick={() => setOpenfilter(true)} className={data.current !== null ? 'test' : 'unset'}>
        <div className="filter-wrapper-search">
          <img src={filter} className="filter" alt="Filter Content" />
          <p>Filters</p>
        </div>
      </Button>
      <Filter
        isOpen={openfilter}
        onClose={() => setOpenfilter(false)}
        childToParentData={childToParent}
      />
    </div>
  );
}
