
import useShowToast from "./useShowToast";
import axios  from 'axios';
import data from "../config.json";

const useSignUpWithEmailAndPassword = () => {
	
	const showToast = useShowToast();

	const signup = async (inputs) => {
		if (!inputs.email || !inputs.password || !inputs.username || !inputs.firstName || !inputs.lastName) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}

		const url = data.url_base;

		const res = await axios.post(`${url}/api/auth/signup`,
		{
			...inputs
		}).then((res) => {
			return res;
        }).catch((error) => {
			return error;
		});

		if (res.status !== 200) {
			showToast("Error", "Username already exists", "error");
			return;
		}


		showToast("Success", "User created successfully", "success");

		
	};

	return { signup };
};

export default useSignUpWithEmailAndPassword;