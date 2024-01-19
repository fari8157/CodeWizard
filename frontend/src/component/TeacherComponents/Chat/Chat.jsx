import { useEffect, useState } from "react";

import ChatUi from "../../UserComponent/Chat/chatUi";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";

const TutorChat = () => {
  const {userAxiosInstance} = useAxiosPrivate();

  const [clicked, setClicked] = useState(false);
  const [students, setStudents] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [recipient, setRecipient] = useState(null);

  const fetchStudents = async () => {
    const result = await userAxiosInstance.get("/chat/listStudents");
    setStudents(result?.data?.students);
  };

  const handleChatClick = (id, student) => {
    setClicked(true);
    setRecipientId(id);
    setRecipient(student);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <div className="h-screen overflow-x-hidden">
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">Chat</div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">Active Conversations</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    {students?.length}
                  </span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
                  {students &&
                    students.map((student) => (
                      <button
                        key={student._id}
                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        onClick={() => handleChatClick(student._id, student)}
                      >
                         <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                          <img
                            src={student?.pic?.url}
                            alt="User Avatar"
                            className="h-full w-full object-cover rounded-full"
                          />
                        </div>
                        <div className="ml-2 text-sm font-semibold">
                          {student.fullName}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-auto h-5/6 p-6">
              {clicked ? (
                <ChatUi recipientId={recipientId} recipient={recipient} />
              ) : (
                <div className="flex justify-center items-center font-bold text-2xl flex-shrink-0 rounded-b-2xl bg-gray-100 text-gray-500 h-full p-4">
                  Start Chating with your Students
                </div>
              )}
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorChat;