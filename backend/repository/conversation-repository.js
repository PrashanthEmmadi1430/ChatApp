const Conversation = require('../models/conversation')

class ConversationRepository{
    async UpdateConversation({_id},data){
        try {
            const updatedConversation = await Conversation.updateOne({_id},data)
            return updatedConversation
        } catch (error) {
          console.log(error)  
        }
    }
    async CreateConversation(data){
        try {
            const conversation = await Conversation.create(data)
            return conversation
        } catch (error) {
          console.log(error)  
        }
    }
    async GetConversation(data){
        try {
            const conversation = await Conversation.findOne(data).sort({  updatedAt : -1 }).populate('messages').populate('sender').populate('receiver')
            return conversation
        } catch (error) {
          console.log(error)  
        }
    }
    async UpdateManyConversation(data){
        try {
            const conversation = await Conversation.updateMany(data)
            return conversation
        } catch (error) {
          console.log(error)  
        }
    }
}


module.exports=ConversationRepository