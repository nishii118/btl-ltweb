import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth } from "../firebase/firebase";
//import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import axios from 'axios';
import data from '../config.json';

const useLogin = () => {
	const showToast = useShowToast();
	const [ , , loading, error] = useSignInWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);
	const url = data.url_base

	const login = async (inputs) => {

		if (!inputs.username || !inputs.password) {
			return showToast("Error", "Please fill all the fields", "error");
		}
		try {

			
			const response = await axios.post(`${url}/api/auth/signin`, {
				...inputs
			}).then((response) => {
				return response;
			}).catch((error) => {
				return error;
			});
			
			const data =  await response.data.data;

			const response1 = await axios.get(`${url}/api/friend/${data.user.id}`, {
                headers: {
					Authorization: `Bearer ${data.token}`
    			}
            }).then((response) => response.data);

			const friends = await response1.data.map((data) => data.receiverId.id);

			if (response.status == 200) {
				
				const n_data = {
					...response.data.data,
					following : [...friends]
				};
				
				localStorage.setItem("user-info", JSON.stringify(n_data));
				loginUser(n_data);
			}

		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return {loading, error, login };
};

export default useLogin;
