import { Document as DocxDocument } from 'docx';
const {ChatOpenAI} = require("langchain/chat_models/openai")
const {OpenAI} = require("langchain/llms/openai")
const {Packer} = require('docx');
const {LLMChain} = require("langchain/chains")
import * as fs from 'fs';
import { LpChatPromptTemplate } from '../prompts/LpPrompts';


const openAIApiKey = process.env.OPENAI_API_KEY

const gpt3 = new ChatOpenAI({
    openAIApiKey: openAIApiKey,
    modelName: "gpt-3.5-turbo",
    temperature: "0.5"
})
const gpt4 = new ChatOpenAI({
    openAIApiKey: openAIApiKey,
    modelName: "gpt-4",
    temperature: "0.5"
})


class LessonPlanner {
    user: string;
    llm;
    llm2;
    LpGenChain;
    constructor(user: string) {
        this.user = user;
        this.llm = gpt4;
        this.llm2 = gpt3;
        this.LpGenChain = new LLMChain({llm: gpt4, prompt: LpChatPromptTemplate})
    }
    _getLpTopic() {
        //Gets the Lesson Plan Topic information from the user 
        let topic = prompt("Please provide a description of the subject matter \
        you would like to create a lesson plan for.\n> ")
        return topic
    }

    _getLpInfo() {
        let lpInfo = prompt("Please provide any additional information that \
        you would like for me to include or take into consideration while \
        creating your lesson plan.\n> ")
        return lpInfo
    }

    generateLP() {
        console.log("Lets Generate a Lesson Plan!")
        let topic = this._getLpTopic()
        let lpInfo = this._getLpInfo()
        if (topic == null || lpInfo == null) {
            throw new Error("TOPIC NULL ERROR")
        } else if (topic == "" || lpInfo == "") {
            throw new Error("Topic or Additional Information are blank! Please make sure to add information to both fields.")
        } else {        
        
            // Use the inputs to generate a lesson plan
            let lessonPlan = this.LpGenChain.invoke({topic: topic, lpInfo: lpInfo})
            return lessonPlan
        }
    }
}


let test = new LessonPlanner("Alex")
const testOutput = test.generateLP
console.log(testOutput)
