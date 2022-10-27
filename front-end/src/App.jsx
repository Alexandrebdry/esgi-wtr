import UserProvider from "./components/provider/UserProvider";
import Router from "./components/rooting/Router";
import SnackbarProvider from "./components/provider/SnackbarProvider";
import Header from "./components/layouts/Header";
import GroupProvider from "./components/provider/GroupProvider";
import DialogProvider from "./components/provider/DialogProvider";

function App() {

    return (
        <UserProvider>
            <GroupProvider>
                <SnackbarProvider>
                    <DialogProvider>
                        <div className="app">
                            <Header/>
                            <Router/>
                        </div>
                    </DialogProvider>
                </SnackbarProvider>
            </GroupProvider>
        </UserProvider>
    );

}

export default App;