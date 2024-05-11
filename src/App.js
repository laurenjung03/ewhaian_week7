import Button from "./Button";
import styles from "./App.module.css";
import {useState, useEffect} from "react";

function App() {
  const [toDo, setToDo]= useState("");
  const [toDos, setToDos]= useState([]);
  const onChange = (event)=> setToDo(event.target.value);
  const onSubmit=(event) =>{
    event.preventDefault();
    if(toDo===""){
      return;
    }
    setToDo("");
    setToDos(currentArray => [toDo, ...currentArray]);
  };
  console.log(toDos);

  const [loading, setLoading] = useState(true);
  const [coins,setCoins]= useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  
  return (
    <div>
      <h1> My To dos({toDos.length})</h1>
      <form onSubmit={onSubmit}>
       <input
        onChange={onChange}
        value={toDo}
        type="text"
        placeholder="Write your to do..."
      />
        <button> Add to Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item,index)=> <li key={index}>{item}</li>)}
      </ul>


      <h1>The Coins! {loading? "" : `(${coins.length})`} </h1>
      {loading ? <strong>Loading...</strong>: null}
      <select>
        {coins.map((coin)=> (
        <option>
          {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
          </option>
          ))}
      </select>



  </div>
  );
}

export default App;