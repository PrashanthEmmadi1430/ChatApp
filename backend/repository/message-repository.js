const Message = require('../models/message')

class MessageRepository{
    async UpdateMessage({_id},data){
        try {
            const updatedMessage = await Message.updateOne({_id},data)
            return updatedMessage
        } catch (error) {
          console.log(error)  
        }
    }
    async UpdateManyMessages(id,data){
        try {
            const updatedMessages = await Message.updateMany(id,data)
            return updatedMessages
        } catch (error) {
          console.log(error)  
        }
    }
    async CreateMessage(data){
        try {
            const message = await Message.create(data)
            return message
        } catch (error) {
          console.log(error)  
        }
    }
    async GetMessage(data){
        try {
            const message = await Message.findOne(data)
            return message
        } catch (error) {
          console.log(error)  
        }
    }
}

module.exports=MessageRepository