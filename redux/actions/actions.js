import { Dispatch } from "redux";

export const addTheName = (value) => ({
  type: "ADD_NAME",
  payload: value,
});
export const logOut = () => ({
  type: "LOG_OUT",
  payload: "",
});
export const clearCoord = () => ({
  type: "USER_POSITION_DELETE",
  payload: "",
});
export const deleteHistory = () => ({
  type: "WEATHER_CLEAR_HISTORY",
  payload: "",
});

export const setSearch = (value) => ({
  type: "SET_SEARCH",
  payload: value,
});
export const setCleanAll = () => {
  return async (dispatch) => {
    dispatch({ type: "WEATHER_LOADING", payload: false });
    dispatch({
      type: "SET_SEARCH",
      payload: "",
    });
    dispatch({
      type: "WEATHER_DAY_ADD",
      payload: {},
    });
    dispatch({ type: "WEATHER_FDAYS_ADD", payload: {} });
  };
};

// SEARCH BY COORDINATES
export const setCoords = (cords) => {
  return async (dispatch, getState) => {
    dispatch({ type: "WEATHER_LOADING", payload: false });
    dispatch({ type: "SET_SEARCH", payload: "" });
    dispatch({
      type: "USER_POSITION",
      payload: {
        lon: cords.lon,
        lat: cords.lat,
      },
    });
    // 1 day
    let url = `${process.env.REACT_APP_URLFETCH}/weather?lat=${cords.lat}&lon=${cords.lon}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
    let thisState = getState();
    try {
      const res = await fetch(url);
      if (res.ok) {
        const weather = await res.json();
        dispatch({ type: "WEATHER_DAY_ADD", payload: weather });
        //
        let historyCheck = thisState.weather.history.findIndex(
          (w) => w.name === weather.name,
        );
        if (historyCheck < 0) {
          dispatch({ type: "WEATHER_ADD_HISTORY", payload: weather });
        } // 5Days
        // SEARCH 5 DAYS
        url = `${process.env.REACT_APP_URLFETCH}/forecast?lat=${cords.lat}&lon=${cords.lon}&units=metric&exclude=daily&appid=${process.env.REACT_APP_APIKEY}`;
        try {
          const response = await fetch(url);
          if (res.ok) {
            const Fweather = await response.json();
            dispatch({ type: "WEATHER_LOADING", payload: true });
            dispatch({ type: "WEATHER_FDAYS_ADD", payload: Fweather });
          } else {
            console.log("Error");
          }
        } catch (error) {}
        // end
      } else {
        console.log("Error");
      }
    } catch (error) {}
  };
};

// QUERY SEARCH
export const runSearch = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "WEATHER_LOADING", payload: false });
    let state = getState();
    // 1 day
    let url = `${process.env.REACT_APP_URLFETCH}/weather?q=${state.weather.search}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const weather = await res.json();
        dispatch({ type: "WEATHER_DAY_ADD", payload: weather });
        //
        let thisState = getState();
        let historyCheck = thisState.weather.history.findIndex(
          (w) => w.name === weather.name,
        );
        if (historyCheck < 0) {
          dispatch({ type: "WEATHER_ADD_HISTORY", payload: weather });
        }
        // 4day
        url = `${process.env.REACT_APP_URLFETCH}/forecast?q=${state.weather.search}&units=metric&exclude=daily&appid=${process.env.REACT_APP_APIKEY}`;
        try {
          const response = await fetch(url);
          if (res.ok) {
            const Fweather = await response.json();
            dispatch({ type: "WEATHER_LOADING", payload: true });
            dispatch({ type: "WEATHER_FDAYS_ADD", payload: Fweather });
          } else {
            console.log("Error");
          }
        } catch (error) {}
        // end
      } else {
        console.log("Error");
      }
    } catch (error) {}
  };
};

export const positionSearch = () => {};
