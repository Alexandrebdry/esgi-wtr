import UserProvider from "./components/provider/UserProvider";
import Router from "./components/rooting/Router";


function App() {

    return (
        <UserProvider>
            <div className="app">
                <Router/>
            </div>
        </UserProvider>
    );

}

export default App;