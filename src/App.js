import { BrowserRouter } from 'react-router-dom';
import Container from './container/Container';

function App() {
  return (
    <>
      <BrowserRouter>
        <Container></Container>
      </BrowserRouter>
    </>
  );
}

export default App;
