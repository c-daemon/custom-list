import ErrorBoundary from "./components/errorBoundary";
import CustomContainer from "./components/customContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <main className="main-section">
          <CustomContainer />
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default App;
