import React, { useEffect, useRef } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "./MessageParser.jsx";
import ActionProvider from "./ActionProvider.jsx";
import { createChatBotMessage } from "react-chatbot-kit";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const ChatBot = ({ setChatBot }) => {
	const closeBtnRef = useRef(null);

	useEffect(() => {
		if (closeBtnRef.current) closeBtnRef.current.focus();
	}, []);

	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") setChatBot(false);
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [setChatBot]);

	const handleClose = () => setChatBot(false);

	const headerStyles = {
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		backdropFilter: "blur(8px)",
		fontFamily: "Inter, sans-serif",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		fontSize: "1rem",
		color: "#1f2937",
		padding: "14px 18px",
		fontWeight: "600",
		borderBottom: "1px solid rgba(0,0,0,0.1)",
	};

	const config = {
		initialMessages: [
			createChatBotMessage(
				"👋 Hi! I'm FoodBot. Ask me anything about donating or getting food."
			),
		],
		botName: "FoodBot",
		customComponents: {
			header: () => (
				<div style={headerStyles}>
					<span>🍽️ FoodBot AI Assistant</span>
					<button
						onClick={handleClose}
						className="text-gray-600 hover:text-red-500 transition-colors"
						ref={closeBtnRef}
						aria-label="Close chatbot"
						title="Close">
						<IoClose className="text-2xl" />
					</button>
				</div>
			),
		},
		customStyles: {
			botMessageBox: {
				backgroundColor: "#3b82f6",
			},
			chatButton: {
				backgroundColor: "#10b981",
			},
		},
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 100 }}
			transition={{ duration: 0.3 }}
			className="fixed bottom-6 right-6 z-50 shadow-2xl rounded-xl overflow-hidden"
			style={{
				background: "rgba(255, 255, 255, 0.25)",
				backdropFilter: "blur(10px)",
			}}>
			<Chatbot
				config={config}
				messageParser={MessageParser}
				actionProvider={ActionProvider}
			/>
		</motion.div>
	);
};

export default ChatBot;
