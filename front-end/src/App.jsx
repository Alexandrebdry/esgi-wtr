import UserProvider from "./components/provider/UserProvider";
import Router from "./components/rooting/Router";
import SnackbarProvider from "./components/provider/SnackbarProvider";


function App() {

    return (
        <UserProvider>
            <SnackbarProvider>
                <div className="app">
                    <Router/>
                </div>
            </SnackbarProvider>
        </UserProvider>
    );

}

export default App;