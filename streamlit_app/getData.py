from pathlib import Path
import requests
import openai
from langchain.agents import Tool
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent

from llama_index import VectorStoreIndex, SimpleDirectoryReader
import os

os.environ['OPENAI_API_KEY'] = ''
openai.api_key = ''

def generateResponse(fertilizer,prompt):
    title = fertilizer
    response = requests.get(
        'https://en.wikipedia.org/w/api.php',
        params={
            'action': 'query',
            'format': 'json',
            'titles': title,
            'prop': 'extracts',
            # 'exintro': True,
            'explaintext': True,
        }
    ).json()
    page = next(iter(response['query']['pages'].values()))
    fertilizer_data = page['extract']

    data_path = Path('data')
    if not data_path.exists():
        Path.mkdir(data_path)

    with open(f'data/{title}.txt', 'w') as fp:
        fp.write(fertilizer_data)
        
    documents = SimpleDirectoryReader('data').load_data()
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

    info = agent_executor.run(input=prompt)
    return(info)