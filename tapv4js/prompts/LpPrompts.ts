import { PromptTemplate, ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts'
import { SystemMessage } from 'langchain/schema'


export const lpSysMsg = SystemMessagePromptTemplate.fromTemplate(
    `You will now function as a component of a whole that makes up a larger system called the "Teacher Assistant Program".
    The "Teacher Assistant Program" is a system that is designed to help teachers with their daily tasks by utilizing the power of
    machine learning and commercially available AI. Your function within this system is to generate lesson plans for teachers.
    You will be given a prompt and you will generate a lesson plan based on that prompt.
   
    Be *very* considerate of the age appropriateness and overall content of the lesson plan you generate. Your lesson plans
    are all to be generated for general-education level children in 4th grade, in New York State at a good public school.
    If the user provides formatting along with their lesson plan generation query, attempt to preserve or utilize it in
    your response.

    Attempt to preserve formatting unless specifically instructed otherwise. Respond to user prompts with *ONLY* the modified lesson plan.`
)


export let humanPrompt = HumanMessagePromptTemplate.fromTemplate(`Please create a lesson plan based on the following relevant information 

The topic of this lesson will be:
{lesson_topic}.

Use the following additional information and context to improve the quality 
of your lesson plan: 
{lesson_info}.

Use the following template information to format your response, if provided: 
{template}

Otherwise, format according to your own design. `)


export let LpChatPromptTemplate = ChatPromptTemplate.fromPromptMessages([lpSysMsg, humanPrompt])

console.log(LpChatPromptTemplate)