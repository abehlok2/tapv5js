"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI;
var OpenAI = require("langchain/llms/openai").OpenAI;
var Packer = require('docx').Packer;
var LLMChain = require("langchain/chains").LLMChain;
var LpChatPromptTemplate = require('../prompts/LpPrompts').LpChatPromptTemplate;
var openAIApiKey = process.env.OPENAI_API_KEY;
var gpt3 = new ChatOpenAI({
    openAIApiKey: openAIApiKey,
    modelName: "gpt-3.5-turbo",
    temperature: "0.5"
});
var gpt4 = new ChatOpenAI({
    openAIApiKey: openAIApiKey,
    modelName: "gpt-4",
    temperature: "0.5"
});
var LessonPlanner = /** @class */ (function () {
    function LessonPlanner(user) {
        this.user = user;
        this.llm = gpt4;
        this.llm2 = gpt3;
        this.LpGenChain = new LLMChain({ llm: gpt4, prompt: LpChatPromptTemplate });
    }
    LessonPlanner.prototype._getLpTopic = function () {
        //Gets the Lesson Plan Topic information from the user 
        var topic = prompt("Please provide a description of the subject matter \
        you would like to create a lesson plan for.\n> ");
        return topic;
    };
    LessonPlanner.prototype._getLpInfo = function () {
        var lpInfo = prompt("Please provide any additional information that \
        you would like for me to include or take into consideration while \
        creating your lesson plan.\n> ");
        return lpInfo;
    };
    LessonPlanner.prototype.generateLP = function () {
        console.log("Lets Generate a Lesson Plan!");
        var topic = this._getLpTopic();
        var lpInfo = this._getLpInfo();
        if (topic == null || lpInfo == null) {
            throw new Error("TOPIC NULL ERROR");
        }
        else if (topic == "" || lpInfo == "") {
            throw new Error("Topic or Additional Information are blank! Please make sure to add information to both fields.");
        }
        else {
            // Use the inputs to generate a lesson plan
            var lessonPlan = this.LpGenChain.invoke({ topic: topic, lpInfo: lpInfo });
            return lessonPlan;
        }
    };
    return LessonPlanner;
}());
var test = new LessonPlanner("Alex");
var testOutput = test.generateLP;
console.log(testOutput);
