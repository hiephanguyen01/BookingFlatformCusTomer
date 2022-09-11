import { BaseService } from "./baseService";

class ChatService extends BaseService {
    getConversation = ( limit , page , id , partner) => {
       return this.get(`/api/chat/conversation-user?partner=${partner}&id=${id}&page=${page}&limit=${limit}`)
    }
    getConversationVsAdmin = (userId , partner) => {
        return this.get(`/api/chat/conversation-with-admin?id=${userId}&Partner=${partner}`)
    }
    getMesVsAdmin = (limit , page ,ConversationId) =>{
        return this.get(`/api/chat/message?page=${page}&limit=${limit}&ConversationId=${ConversationId}`)
    }
    getMessByConversationId = (limit,page,conversationId) => {
        return this.get(`/api/chat/message-user?page=${page}&limit=${limit}&ConversationId=${conversationId}`)
    }
    sendMessage = (message) => {
        return this.post(`/api/chat/message-user`,message)
    }
    sendMessageAdmin = (message) => {
        return this.post(`/api/chat/message`,message)
    }
    readMessage = ( id) => {
        return this.patch(`/api/chat/message-user`,{
            id
        })
    }

}

export const chatService = new ChatService();