import os

# Set environment variable
os.environ['OPENAI_API_KEY'] = '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'
os.environ['WOLFRAM_ALPHA_APPID'] = "APPID: L3GTXP-LTHLLYKH8P"

my_api_key = os.environ.get("OPENAI_API_KEY")
print(my_api_key)