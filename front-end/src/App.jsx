import UserProvider from "./components/provider/UserProvider";
import Router from "./components/rooting/Router";
import SnackbarProvider from "./components/provider/SnackbarProvider";
import Header from "./components/layouts/Header";
import GroupProvider from "./components/provider/GroupProvider";
import DialogProvider from "./components/provider/DialogProvider";
import SocketProvider from "./components/provider/SocketProvider";

function App() {

    return (
        <SocketProvider>
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
        </SocketProvider>

    );

}

export default App;