import { Header, Footer, Loading } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, refreshToken } from "./api/users";
import { login, logout } from "./store/authSlice";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ChatBot } from "./components"; // ✅ Import your ChatBot component
import { IoChatbubblesOutline } from "react-icons/io5"; // Chat icon
import FloatingChat from "./components/chatbot/FloatingChatbot";

function App() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const [isChatOpen, setIsChatOpen] = useState(false);

	const refreshTokenMutation = useMutation({
		mutationFn: refreshToken,
		onSuccess: () => {
			queryClient.invalidateQueries(["currentUser"]);
		},
		onError: (error) => {
			console.error("Failed to refresh token:", error);
			dispatch(logout());
		},
	});

	const {
		isLoading,
		isError,
		data: response,
		error,
	} = useQuery({
		queryKey: ["currentUser"],
		queryFn: getCurrentUser,
		retry: false,
	});

	useEffect(() => {
		if (isLoading) return;

		if (isError) {
			dispatch(logout());
			if (error.response?.data?.message === "JWT expired") {
				refreshTokenMutation.mutate();
			}
		} else if (response?.data?.data) {
			dispatch(login(response.data.data));
		}
	}, [isLoading, isError, response, dispatch, error]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loading className="w-32" />
			</div>
		);
	}

	return (
		<div className="wrapper min-h-screen relative">
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>

			<Header />
			<Outlet />
			<Footer />

			<FloatingChat />
		</div>
	);
}

export default App;
