const ConversationRepository = require("../repository/conversation-repository");

class ConversationService{
    constructor(){
        this.conversationRepository = new ConversationRepository()
    }

    async UpdateConversation({_id},data){
        try {
            const updatedConversation = await this.conversationRepository.UpdateConversation({_id},data)
            return updatedConversation
        } catch (error) {
          console.log(error)  
        }
    }
    async UpdateManyConversation({_id},data){
        try {
            const updatedConversation = await this.conversationRepository.UpdateManyConversation({_id},data)
            return updatedConversation
        } catch (error) {
          console.log(error)  
        }
    }
    async CreateConversation(data){
        try {
            const Conversation = await this.conversationRepository.CreateConversation(data)
            return Conversation
        } catch (error) {
          console.log(error)  
        }
    }
    async GetConversation(data){
        try {
            const Conversation = await this.conversationRepository.GetConversation(data)
            return Conversation
        } catch (error) {
          console.log(error)  
        }
    }

}

module.exports=ConversationService