import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
//import { useAuthState } from "react-firebase-hooks/auth";
//import { auth } from "./firebase/firebase";
import useAuthStore from "./store/authStore";

function App() {
	//const [authUser] = useAuthState(auth);
	const authUser = useAuthStore((state) => state.user);

	return (
		<PageLayout>
			<Routes>
				<Route path='/' element={authUser != null? <HomePage /> : <Navigate to='/auth' />} />
				<Route path='/auth' element={(authUser == null)?  <AuthPage /> : <Navigate to='/' />} />
				<Route path='/:username' element={ (authUser != null ) ? <ProfilePage /> : <Navigate to='/' />} />
			</Routes>
		</PageLayout>
	);
}

export default App;
