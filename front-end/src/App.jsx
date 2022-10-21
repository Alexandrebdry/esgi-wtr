import UserProvider from "./components/provider/UserProvider";
import Router from "./components/rooting/Router";
import SnackbarProvider from "./components/provider/SnackbarProvider";
import Header from "./components/layouts/Header";


function App() {

    return (
        <UserProvider>
            <SnackbarProvider>
                <div className="app">
                    <Header/>
                    <Router/>
                </div>
            </SnackbarProvider>
        </UserProvider>
    );

}

export default App;