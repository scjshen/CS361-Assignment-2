import os
from dotenv import load_dotenv
from openai import OpenAI

# Load the.env file
load_dotenv()

# Access the API key
api_key = os.getenv('nim_api_key')

client = OpenAI(
    base_url='https://integrate.api.nvidia.com/v1',
    api_key=api_key
)

completion = client.chat.completions.create(
    model="meta/llama3-70b-instruct",
    messages=[{"role": "user", "content": "give me a brief information about Lebron James."}],
    temperature=0.5,
    top_p=1,
    max_tokens=1024,
    stream=True
)

for chunk in completion:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end='')
