import { IoChatbubblesOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import ChatBot from "./Chatbot";
const FloatingChat = () => {
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [showBubble, setShowBubble] = useState(true);



	return (
		<>
			{/* ✅ Chat Icon + Bubble */}
			<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
				{showBubble && (
					<div className="badge badge-primary p-4 text-lg animate-bounce">
						💬 Need help? Ask FoodBot!
					</div>
				)}

				<button
					className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
					onClick={() => setIsChatOpen(!isChatOpen)}
					title="Chat with FoodBot"
				>
					<IoChatbubblesOutline size={32} />
				</button>
			</div>

			{/* ✅ Chatbot Box */}
			{isChatOpen && (
				<div className="fixed bottom-32 right-9 z-50">
					<ChatBot setChatBot={setIsChatOpen} />
				</div>
			)}
		</>
	);
};

export default FloatingChat;
