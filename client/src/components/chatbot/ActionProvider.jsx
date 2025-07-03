import React from "react";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with API key from environment variable (or set here directly)
const ai = new GoogleGenAI({
	apiKey: import.meta.env.VITE_GEMINI_API_KEY, // Ensure this key is valid and starts with `AIza`
});

/**
 * ActionProvider injects chatbot actions (like Gemini API call) into child components.
 */
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
	const geminiAction = async (query) => {
		let message;

		try {
			const result = await ai.models.generateContent({
				model: "gemini-2.5-flash", // ✅ use updated model name
				contents: [{ role: "user", parts: [{ text: query }] }],
			});

			const text =
				result?.candidates?.[0]?.content?.parts?.[0]?.text ||
				"Sorry, I didn't understand that.";
			message = createChatBotMessage(text);
		} catch (error) {
			console.error("Gemini Error:", error);
			message = createChatBotMessage(
				"❌ Sorry, something went wrong while contacting Gemini."
			);
		}

		updateState(message);
	};

	const updateState = (message) => {
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, message],
		}));
	};

	// Inject action into chatbot framework
	const enhancedChildren = React.Children.map(children, (child) =>
		React.cloneElement(child, {
			actions: { geminiAction },
		})
	);

	return <>{enhancedChildren}</>;
};

export default ActionProvider;
