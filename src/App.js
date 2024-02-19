import './App.css';
import { Routes,Route } from 'react-router-dom';
import Register_Form from './Pages/Register_Form';
import Student_Details from './Pages/Student_Details';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Register_Form/>} />
      <Route path='/Student-Details' element={<Student_Details/>} />

     </Routes>
    </div>
  );
}

export default App;
