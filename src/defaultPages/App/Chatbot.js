import React from "react";
import { useState } from "react";

const Chatbot = () => {
  const [answers, setAnswers] = useState([]);

  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  const getAnswers = async (chat) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/chats?chat=${chat}`);
      const answer = await response.json();
      setAnswers([
        ...answers,
        {
          chat,
          answer: answer.info,
        },
      ]);
      setChat("");
      setLoading(false);
    } catch (error) {
      console.log(answers);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen overflow-x-hidden h-screen ">
      <div class="container flex justify-center items-center">
        <div class="w-[50%] border rounded">
          <h1 className="font-mono text-3xl font-bold text-center">
            Farm Doctor
          </h1>

          <div>
            <div class="w-full">
              <div className="gap-4 flex ml-4">
                <button
                  type="button"
                  class="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-500-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-green-500-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-green-500-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Challenges faced by the Indian farmer
                </button>
                <button
                  type="button"
                  class="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-500-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-green-500-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-green-500-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  {" "}
                  How to grow rice properly
                </button>
              </div>
              <div class="relative w-full p-2 overflow-y-auto h-96">
                <ul class="w-full bg-slate-200 space-y-5">
                  {answers?.length < 0 ? (
                    <>No chats available</>
                  ) : (
                    answers.map((ele, index) => (
                      <li class={`flex w-full`}>
                        <div class="relative w-full px-2 py-2 space-y-5 text-gray-700 rounded shadow">
                          <p className="bg-slate-100 px-2  py-2 rounded-md">
                            {ele.chat}
                          </p>
                          <p className="bg-green-600 py-2 text-white rounde-md px-2">
                            {ele.answer}
                          </p>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div class="flex items-center justify-between w-full border-t border-gray-300">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Message"
                  class="block w-full py-1 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  onClick={() => getAnswers(chat)}
                  disabled={loading}
                >
                  <svg
                    class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
