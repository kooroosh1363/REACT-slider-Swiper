import './App.css';
import {Slider} from './component/Slider';
import slides from './mock.json';


function App() {
  return (
    <Slider slides={slides}/>
  );
}

export default App;
