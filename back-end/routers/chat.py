from fastapi import APIRouter, UploadFile, File
import logging
import sys
import os
import openai

router = APIRouter()

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))


from langchain.agents import Tool
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent

from llama_index import VectorStoreIndex, SimpleDirectoryReader

os.environ["OPENAI_API_KEY"]= os.environ.get('OPENAI_API_KEY')
openai.api_key= os.environ.get('OPENAI_API_KEY')

documents = SimpleDirectoryReader('../farmDoctor/data').load_data()
index = VectorStoreIndex.from_documents(documents=documents)

tools = [
    Tool(
        name = "LlamaIndex",
        func=lambda q: str(index.as_query_engine().query(q)),
        description="Farm Doctor and AI in Agriculture",
        return_direct=True
    ),
]

# set Logging to DEBUG for more detailed outputs
memory = ConversationBufferMemory(memory_key="chat_history")
llm = ChatOpenAI(temperature=0)
agent_executor = initialize_agent(tools, llm, agent="conversational-react-description", memory=memory)

info = agent_executor.run(input="What are the common challenges faced by farmers")
print(info)

@router.get('/chatss')
async def generatePrompt(chat: str):
    print(chat)
    info = agent_executor.run(input=chat)
    return {
        "chat" : chat,
        "info" : info
    }


@router.get('/chats')
async def generateAnswer(chat:str):
    try:
        info = agent_executor.run(input=chat)
        return {
            "chat" : chat,
            "info" : info
        }
    except Exception as e:
        info =str(e)
        if info.startswith("Could not parse LLM output: `"):
            info = info.removeprefix("Could not parse LLM output: `").removesuffix("`")
        else:
            raise Exception(str(e))