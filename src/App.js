import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Post from "./components/Post";

import { db } from "./firebase";
import { auth } from "./firebase";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Footer from "./components/Footer";

// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		position: "absolute",
// 		width: 400,
// 		backgroundColor: theme.palette.background.paper,
// 		// border: "2px solid lightgray",
// 		boxShadow: theme.shadows[5],
// 		padding: theme.spacing(2, 4, 3),
// 		top: "50%",
// 		left: "50%",
// 		transform: "translate(-50%, -50%)",
// 	},
// }));

function App() {
	const [posts, setPosts] = useState([]);

	const [open, setOpen] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [user, setUser] = useState(null);

	const handleSignUp = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => alert(error.message));

		// setUsername("");
		// setEmail("");
		// setPassword("");
		setOpen(false);
	};

	const handleLogin = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)

			.catch((error) => alert(error.message));

		// setUsername("");
		// setEmail("");
		// setPassword("");
		setOpenLogin(false);
	};
	useEffect(() => {
		console.log(user);
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// user has logged in
				console.log(authUser);
				setUser(authUser);
			} else {
				// user has logged out
				setUser(null);
			}
		});
		return () => {
			unsubscribe();
		};
	}, [user]);

	useEffect(() => {
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						post: doc.data(),
					}))
				);
			});
	}, [posts]);
	return (
		<div className="app">
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className="app__modal">
					<form className="app__form">
						<img
							src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
							alt=""
							className="app__modalLogo"
						/>

						<Input
							placeholder="Username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder="Email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							onClick={handleSignUp}
							className="createAccount"
						>
							Create an Account
						</Button>
					</form>
				</div>
			</Modal>

			<Modal open={openLogin} onClose={() => setOpenLogin(false)}>
				<div className="app__modal">
					<form className="app__form">
						<img
							src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
							alt=""
							className="app__modalLogo"
						/>

						<Input
							placeholder="Email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit" onClick={handleLogin}>
							Login
						</Button>
					</form>
				</div>
			</Modal>

			<Header user={user} setOpen={setOpen} setOpenLogin={setOpenLogin} />

			<div className="app__posts">
				<div>
					{posts?.map(({ id, post }) => (
						<Post
							user={user}
							username={post.username}
							image={post.image}
							caption={post.caption}
							key={id}
							postId={id}
						/>
					))}
				</div>
			</div>

			<Footer user={user} />
		</div>
	);
}

export default App;
