import UserProvider from "./components/provider/UserProvider";
import Router from "./components/rooting/Router";
import SnackbarProvider from "./components/provider/SnackbarProvider";
import Header from "./components/layouts/Header";
import GroupProvider from "./components/provider/GroupProvider";

function App() {

    return (
        <UserProvider>
            <GroupProvider>
                <SnackbarProvider>
                    <div className="app">
                        <Header/>
                        <Router/>
                    </div>
                </SnackbarProvider>
            </GroupProvider>
        </UserProvider>
    );

}

export default App;