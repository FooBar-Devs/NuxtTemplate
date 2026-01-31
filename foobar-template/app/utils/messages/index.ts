export const popupType = {
    success: 'success' as T_PopupTypes,
    error: 'error' as T_PopupTypes,
    warning: 'warning' as T_PopupTypes,
};

export function getMessage(messageType: T_MessageType, ...args: any[]): T_Message {
    return typeof messageType === 'function' ? messageType(...args) : messageType;
}