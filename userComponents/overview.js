import { useState, useEffect } from "react";
import axios from "axios";

let baseURL = "http://localhost:3001";

let OverViewCard = ({ styles, title, value }) => (
  <div className={styles.overviewCard}>
    <h1>{value}</h1>
    <p>{title}</p>
  </div>
);

export default function Overview({ styles }) {
  let [state, setState] = useState({
    userCount: 0,
    locations: 0,
    ticketsSold: 0,
  });

  let getOverView = async () => {
    let fetched = [];
    await axios
      .all([
        axios.get(baseURL + "/users"),
        axios.get(baseURL + "/tickets"),
        axios.get(baseURL + "/payments"),
      ])
      .then(
        axios.spread((...response) => {
          fetched = response;
        })
      );
    await setState({
      ...state,
      userCount: fetched[0].data.count,
      locations: fetched[1].data.count,
      ticketsSold: fetched[2].data.count,
    });
  };

  useEffect(() => {
    getOverView();
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.overview}>
      <div className={styles.cardContainer}>
        {Object.getOwnPropertyNames(state).map((e, index) => (
          <OverViewCard
            key={index}
            title={
              e == "userCount"
                ? "Registered Users"
                : e == "locations"
                ? "Locations"
                : e == "ticketsSold"
                ? "Tickets Sold"
                : ""
            }
            value={state[e]}
            styles={styles}
          />
        ))}
      </div>
    </div>
  );
}
