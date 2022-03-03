import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/MyCards";
import { handleCards, removeCard } from "../redux/walletSlice";

const Home = () => {
  let dispatch = useDispatch();
  const { activeCards } = useSelector((state) => state.wallet);
  const { inactiveCards } = useSelector((state) => state.wallet);

  var timer;
  return (
    <div>
      <h1>E-Wallet</h1>
      <p id="active">Active card</p>
      <div id="wrapper">
        <div id="container">
          <div>
            {activeCards.map((card, i) => {
              return <Card {...card} key={i} />;
            })}
          </div>
          {inactiveCards.map((card, i) => (
            <div
              key={i}
              onClick={(e) => {
                clearTimeout(timer);

                if (e.detail === 1) {
                  timer = setTimeout(() => {
                    dispatch(handleCards(card));
                  }, 200);
                } else if (e.detail === 2) {
                  dispatch(removeCard(card));
                }
              }}
            >
              <Card {...card} />
            </div>
          ))}
        </div>
        <p id="error"></p>
      </div>
      <Link
        to="/addcard"
        onClick={(e) => {
          if (inactiveCards.length >= 3) {
            document.querySelector("#error").textContent =
              "You have to many cards! Please remove one to add another";
            setTimeout(() => {
              document.querySelector("#error").textContent = "";
            }, 3000);
            e.preventDefault();
          }
        }}
      >
        <button id="newCardBtn">Add a new card</button>
      </Link>
    </div>
  );
};

export { Home };
