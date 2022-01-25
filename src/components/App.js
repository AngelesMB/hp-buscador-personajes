import "../styles/App.css";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ls from "../services/localStorage";
import callToApi from "../services/api";
import CharacterFilter from "./CharacterFilter";
import HouseFilter from "./HouseFilter";
import CharacterList from "./CharacterList";
import CharacterDetail from "./CharacterDetail";
import ErrorDetail from "./ErrorDetail";
import Header from "./Header";

// import PropTypes from 'prop-types';

function App() {
  // DEFAULT PROPS
  // Input.defaultProps = {
  //   inputType: 'text'
  // };

  // PROP TYPES
  // Input.propTypes = {
  //   id: PropTypes.string,
  //   labelText: PropTypes.string.isRequired,
  //   inputType: PropTypes.string,
  //   inputName: PropTypes.string.isRequired,
  //   inputPlaceholder: PropTypes.string,
  //   inputValue: PropTypes.string,
  //   handleChange: PropTypes.func.isRequired,
  // };
  // PROP TYPES para OBJETOS
  // MyComponent.propTypes = {
  //   data: PropTypes.shape({
  //     title: PropTypes.string,
  //     id: PropTypes.string.isRequired,
  //   }),
  // };
  // PROP TYPES para ARRAYS
  // MyComponent.propTypes = {
  //   myArrProp: PropTypes.arrayOf(PropTypes.number),
  // };

  // states
  const [data, setData] = useState(ls.get("data", []));
  const [characterFilter, setCharacterFilter] = useState("");
  const [houseFilter, setHouseFilter] = useState("gryffindor");

  const URL = "http://hp-api.herokuapp.com/api/characters/house/";

  // effect ls
  useEffect(() => {
    ls.set("data", data);
  }, [data]);

  // effect api
  useEffect(() => {
    // if (data.length === 0 || data[0].house !== houseFilter) {
      // if (data.length === 0){
      callToApi(URL, houseFilter).then((response) => {
        setData(response);
      });
    // }
  }, [houseFilter]);

  const updateFilter = (obj) => {
    if (obj.key === "characterFilter") {
      setCharacterFilter(obj.value);
    } else {
      setHouseFilter(obj.value);
    }
  };

  const filteredData = data.filter((eachCharacter) => {
    return eachCharacter.name
      .toLowerCase()
      .includes(characterFilter.toLowerCase());
  });

  const renderCharacterDetail = ({ match }) => {
    const routeId = match.params.characterId;
    const foundCharacter = data.find(
      (eachCharacter) => eachCharacter.id === parseInt(routeId)
    );
    // si es undefined, la ruta no existe, return componente de error
    if (foundCharacter === undefined) {
      return <ErrorDetail />;
    } else {
      return <CharacterDetail selectedCharacter={foundCharacter} />;
    }
  };

  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <form action="" onSubmit={(ev) => ev.preventDefault()}>
              <CharacterFilter
                characterFilter={characterFilter}
                updateFilter={updateFilter}
              />
              <HouseFilter
                houseFilter={houseFilter}
                updateFilter={updateFilter}
              />
            </form>
            <ul>
              <CharacterList filteredData={filteredData} />
            </ul>
          </Route>
          <Route
            exact
            path="/character/:characterId"
            render={renderCharacterDetail}
          ></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
