import React from "react";

/**
 * MessageParser is a wrapper component that injects a `parse` function
 * and `actions` into its child components.
 *
 * - The `parse` function delegates the message to a custom action (e.g., geminiAction).
 * - This is typically used in chatbot UIs where user messages need to be handled.
 */
const MessageParser = ({ children, actions }) => {
	// Function to handle user message
	const parse = async (message) => {
		if (typeof actions.geminiAction === "function") {
			await actions.geminiAction(message);
		} else {
			console.warn("geminiAction is not defined in actions.");
		}
	};

	// Clone and inject `parse` and `actions` into all children
	const enhancedChildren = React.Children.map(children, (child) =>
		React.cloneElement(child, { parse, actions })
	);

	return <>{enhancedChildren}</>;
};

export default MessageParser;
