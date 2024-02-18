import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = ({setLogin}) => {
	const [inputs, setInputs] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const {signup } = useSignUpWithEmailAndPassword();

	return (
		<>
			<Input
				placeholder='First Name'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs.firstName}
				onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
			/>
			<Input
				placeholder='Last Name'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs.lastName}
				onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
			/>
			<Input
				placeholder='Email'
				fontSize={14}
				type='email'
				size={"sm"}
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<Input
				placeholder='Username'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs.username}
				onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
			/>
			<InputGroup>
				<Input
					placeholder='Password'
					fontSize={14}
					type={showPassword ? "text" : "password"}
					value={inputs.password}
					size={"sm"}
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				/>
				<InputRightElement h='full'>
					<Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>

			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				onClick={() => {
						signup(inputs)
						setLogin();
					}
				}
			>
				Sign Up
			</Button>
		</>
	);
};

export default Signup;