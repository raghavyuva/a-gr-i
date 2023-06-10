import streamlit as st
import translate
import os
import io
import warnings
from PIL import Image
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation

os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'
os.environ['STABILITY_KEY'] = 'sk-n8lrLMq3oZ17dktLEmdhMGK14Imo53slAMFd0338xbz2gIdF'

html_temp = """
<div style="display:flex; justify-content:center;">
    <h1 style="text-align:center; color:green;">A-gr-I</h1>
</div>
"""

st.markdown(html_temp, unsafe_allow_html=True)

st.header('Community Engagement- Text2Img')

st.markdown("### Use Sample Text")
col1, col2, col3 = st.columns([1, 1, 1])
col11, col12, col13 = st.columns([2, 2, 2])

h1 = col1.button('एक किसान और तीन बेटों की कहानी')
h2 = col2.button('एक किसान डीसी कॉमिक कला है')
h3 = col3.button('किसान और पशु के बीच एक बंधन')
k1 = col11.button('ಒಬ್ಬ ರೈತ ಮತ್ತು ಮೂವರು ಗಂಡು ಮಕ್ಕಳ ಕಥೆ')
k2 = col12.button('ಎ ಫಾರ್ಮರ್ ಎನ್ನುವುದು ಡಿಸಿ ಕಾಮಿಕ್ ಆರ್ಟ್')
k3 = col13.button('ರೈತ ಮತ್ತು ಪ್ರಾಣಿಗಳ ನಡುವಿನ ಬಾಂಧವ್ಯ')

text = False
user_prompt = False

if h1:
    text_key = "h1_key"
    ln = "hi"
    text = "एक किसान और तीन बेटों की कहानी"
elif h2:
    text_key = "h2_key"
    ln = "hi"
    text = "एक किसान डीसी कॉमिक कला है"
elif h3:
    text_key = "h3_key"
    ln = "hi"
    text = "किसान और पशु के बीच एक बंधन"
elif k1:
    text_key = "k1_key"
    ln = "kn"
    text = "ಒಬ್ಬ ರೈತ ಮತ್ತು ಮೂವರು ಗಂಡು ಮಕ್ಕಳ ಕಥೆ"
elif k2:
    text_key = "k2_key"
    ln = "kn"
    text = "ಎ ಫಾರ್ಮರ್ ಎನ್ನುವುದು ಡಿಸಿ ಕಾಮಿಕ್ ಆರ್ಟ್"
elif k3: 
    text_key = "k3_key"
    ln = "kn"
    text = "ರೈತ ಮತ್ತು ಪ್ರಾಣಿಗಳ ನಡುವಿನ ಬಾಂಧವ್ಯ"

if text:
    user_prompt = st.text_area("Enter your prompt", value=translate.ln_translate(ln,"en",text),key=text_key)
else:
    user_data = st.text_area("Enter your prompt", value="")
    col21, col22, col23 = st.columns([3, 3, 3])
    col21.markdown("##### KN-Enter Kannada text")
    col22.markdown("##### HI-Enter Hindi text")
    col23.markdown("##### EN-default")
    ln = st.radio("Prefer language",("en","kn","hi"))
    if ln != 'en':
        user_prompt = translate.ln_translate(ln,"en",user_data)


if user_prompt:
    st.markdown(f"### Text2Image Prompt: {user_prompt}")
    
    stability_api = client.StabilityInference(
    key=os.environ['STABILITY_KEY'], # API Key reference.
    
    verbose=True, # Print debug messages.
    engine="stable-diffusion-xl-beta-v2-2-2", # Set the engine to use for generation.
    )
    
    answers = stability_api.generate(
    prompt=user_prompt,
    seed=992446758, # If a seed is provided, the resulting generated image will be deterministic.
                    # What this means is that as long as all generation parameters remain the same, you can always recall the same image simply by generating it again.
                    # Note: This isn't quite the case for CLIP Guided generations, which we tackle in the CLIP Guidance documentation.
    steps=50, # Amount of inference steps performed on image generation. Defaults to 30.
    cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt.
                   # Setting this value higher increases the strength in which it tries to match your prompt.
                   # Defaults to 7.0 if not specified.
    width=512, # Generation width, defaults to 512 if not included.
    height=512, # Generation height, defaults to 512 if not included.
    samples=1, # Number of images to generate, defaults to 1 if not included.
    sampler=generation.SAMPLER_K_DPMPP_2M # Choose which sampler we want to denoise our generation with.
                                                 # Defaults to k_dpmpp_2m if not specified. Clip Guidance only supports ancestral samplers.
                                                 # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m, k_dpmpp_sde)
    )
    for resp in answers:
        for artifact in resp.artifacts:
            if artifact.finish_reason == generation.FILTER:
                warnings.warn("Your request activated the API's safety filters and could not be processed."
                "Please modify the prompt and try again.")
            if artifact.type == generation.ARTIFACT_IMAGE:
                img = Image.open(io.BytesIO(artifact.binary))
                img.save("output.png") # Save our generated images with their seed number as the filename.
    st.image("output.png")