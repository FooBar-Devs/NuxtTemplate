declare global {
	type T_LogMessage = {
		[key: string]: any;
		count?: number;
	};
	type T_ErrorDetails = {
		location: string;
		message: string;
	};

	type T_MessageType = T_Message | T_DynamicMessage;
	type T_DynamicMessage = (...args: any[]) => T_Message;
	type T_Message = {
		type: T_PopupTypes;
		message: string;
	};
	type T_PopupTypes = "success" | "error" | "warning";
}
export {
	T_LogMessage,
	T_Message,
	T_ErrorDetails,
	T_DynamicMessage,
	T_MessageType,
	T_PopupTypes,
};
