import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from "react-bootstrap";
import NoteLayout from "../layout/NoteLayout";
import Home from '../../pages/Home';
import Create from '../../pages/Create';
import Element from '../../pages/Element';
import Edit from '../../pages/Edit';
import NoteProvider from "../../store/NoteProvider";

function App() {
  return (
      <NoteProvider>
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={ <Create />} />
          <Route path="/:id" element={ <NoteLayout />}>
            <Route index element={ <Element />} />
            <Route path="edit" element={ <Edit />}/>
          </Route>
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Container>
      </NoteProvider>
  )
}

export default App
