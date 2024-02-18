import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth } from "../firebase/firebase";
//import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import axios from 'axios';

const useLogin = () => {
	const showToast = useShowToast();
	const [ , , loading, error] = useSignInWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);

	const login = async (inputs) => {

		if (!inputs.username || !inputs.password) {
			return showToast("Error", "Please fill all the fields", "error");
		}
		try {
			
			const response = await axios.post('http://52.184.81.213:2163/api/auth/signin', {
				...inputs
			}).then((response) => {
				return response;
			}).catch((error) => {
				return error;
			});

			if (response.status == 200) {
				
				const data = response.data.data;
				
				localStorage.setItem("user-info", JSON.stringify(data));
				loginUser(data);
			}

		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return {loading, error, login };
};

export default useLogin;
