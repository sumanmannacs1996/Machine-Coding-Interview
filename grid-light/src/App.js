import { useState } from "react";
import "./App.css";

const config = [
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
];

function Cell({ filled, onClick, isDisabled }) {
  return (
    <button
      onClick={onClick}
      className={filled ? "cell cell-activated" : "cell"}
      disabled={isDisabled}
    />
  );
}

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setDeactivating] = useState(false);

  const deactivateCell = () => {
    setDeactivating(true);
    const interval = setInterval(() => {
      setOrder((prevState) => {
        const updatedState = prevState.slice();
        updatedState.pop();

        if (updatedState.length === 0) {
          clearInterval(interval);
          setDeactivating(false);
        }
        return updatedState;
      });
    }, 400);
  };
  const activateCell = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    //deactivating
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCell();
    }
  };
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config
          .flat(1)
          .map((value, index) =>
            value ? (
              <Cell
                key={index}
                filled={order.includes(index)}
                onClick={() => activateCell(index)}
                isDisabled={order.includes(index) || isDeactivating}
              />
            ) : (
              <span />
            )
          )}
      </div>
    </div>
  );
}

export default App;
