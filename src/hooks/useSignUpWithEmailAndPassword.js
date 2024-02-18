
import useShowToast from "./useShowToast";
import axios  from 'axios';

const useSignUpWithEmailAndPassword = () => {
	
	const showToast = useShowToast();

	const signup = async (inputs) => {
		if (!inputs.email || !inputs.password || !inputs.username || !inputs.firstName || !inputs.lastName) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}

		// const usersRef = collection(firestore, "users");

		// const q = query(usersRef, where("username", "==", inputs.username));
		// const querySnapshot = await getDocs(q);

		const res = await axios.post("http://52.184.81.213:2163/api/auth/signup",
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

		// try {
		// 	const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
		// 	if (!newUser && error) {
		// 		showToast("Error", error.message, "error");
		// 		return;
		// 	}
		// 	if (newUser) {
		// 		const userDoc = {
		// 			uid: newUser.user.uid,
		// 			email: inputs.email,
		// 			username: inputs.username,
		// 			fullName: inputs.fullName,
		// 			bio: "",
		// 			profilePicURL: "",
		// 			followers: [],
		// 			following: [],
		// 			posts: [],
		// 			createdAt: Date.now(),
		// 		};
		// 		await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
		// 		localStorage.setItem("user-info", JSON.stringify(userDoc));
		// 		loginUser(userDoc);
		// 	}
		// } catch (error) {
		// 	showToast("Error", error.message, "error");
		// }
	};

	return { signup };
};

export default useSignUpWithEmailAndPassword;