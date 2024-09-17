const MessageRepository = require("../repository/message-repository");

class MessageService{
    constructor(){
        this.MessageRepository = new MessageRepository()
    }

    async UpdateMessage({_id},data){
        try {
            const updatedMessage = await this.MessageRepository.UpdateMessage({_id},data)
            return updatedMessage
        } catch (error) {
          console.log(error)  
        }
    }
    async CreateMessage(data){
        try {
            const message = await this.MessageRepository.CreateMessage(data)
            return message
        } catch (error) {
          console.log(error)  
        }
    }
    async UpdateManyMessages(id,data){
        try {
            const updatedmessages = await this.MessageRepository.UpdateManyMessages(id,data)
            return updatedmessages
        } catch (error) {
          console.log(error)  
        }
    }
    async FindMessage(data){
        try {
            const message = await this.MessageRepository.GetMessage(data)
            return message
        } catch (error) {
          console.log(error)  
        }
    }
}

module.exports=MessageService