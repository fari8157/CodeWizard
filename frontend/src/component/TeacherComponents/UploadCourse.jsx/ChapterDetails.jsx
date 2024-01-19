import React, { useState, Fragment, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import { Dialog, Transition } from "@headlessui/react";
import Dropzone from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";

import { Dna } from "react-loader-spinner";

const ChapterDetails = () => {
  const { teacherAxiosInstance } = useAxiosPrivate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [chapter, setChapter] = useState({});
  const [isChapterOpen, setIsChapterOpen] = useState(false);
  const [chapterVideo, setChapterVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [chapterValues, setChapterValues] = useState("");
  const [isCaptionModalVisible, setCaptionModalVisible] = useState(false);
  const [caption,setCaption]=useState('')
  const courseId = location.state.courseId;
  const chapterIndex = location.state.chapterIndex;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await teacherAxiosInstance.get(
          `/chapterDetails/${courseId}/${chapterIndex}`
        );
        console.log("Response:", response); // Log the entire response
        setChapter(response.data.chapter);
        setCaption(response.data.chapter.caption)
        setChapterValues(response.data.chapter.chapterHeadline);
        setFetch(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle error scenarios if needed
      }
    };

    fetchCategories();
  }, [setChapter, setFetch, fetch]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeChapterModal() {
    setChapterVideo("");
    setIsChapterOpen(false);
  }

  function openChapterModal() {
    setIsChapterOpen(true);
  }

  const handleChapterVideoDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file && file.type.startsWith("video/")) {
      console.log(file);
      setChapterVideo(acceptedFiles[0]);
    } else {
      // Handle error when file is not a valid video
    }
  };

  const handleChapterValuesChanges = (e) => {
    setChapterValues(e.target.value);
  };

  const handleChapterVideoChange = async () => {
    setLoading(true);
    const respose = await teacherAxiosInstance.put(
      `/editchapterVideo/${courseId}/${chapterIndex}`,
      { chapterVideo },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (respose.data.error) {
      setLoading(false);
      closeChapterModal();
      toast.error(respose.data.message);
      return;
    }
    toast.success(respose.data.message);
    setFetch(true);
    setLoading(false);
    closeChapterModal();
  };

  const handleEditChapter = async () => {
    setLoading(true);
    const respose = await teacherAxiosInstance.put(
      `/editchapterTitle/${courseId}/${chapterIndex}`,
      { chapterValues }
    );
    if (respose.data.error) {
      setLoading(false);
      closeModal();
      toast.error(respose.data.message);
      return;
    }
    toast.success(respose.data.message);
    setFetch(true);
    setLoading(false);
    closeChapterModal();
    closeModal();
  };
  const handleEditCaptionOpen = () => {
    setCaptionModalVisible(true);
  };
  const handleEditCaptionclose = () => {
    setCaptionModalVisible(false);
  };
  const handleEditCaption = async () => {
    setLoading(true);
    const respose = await teacherAxiosInstance.put(
      `/editchapterCaption/${courseId}/${chapterIndex}`,
      {caption}
    );
    if (respose.data.error) {
      setLoading(false);
      handleEditCaptionclose();
      toast.error(respose.data.message);
      return;
    }
    toast.success(respose.data.message);
    setFetch(true);
    setLoading(false);
    closeChapterModal();
    handleEditCaptionclose();
   
  };
  return (
    <>
      <div className=" bg-dashboard-bg py-20">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
        <div className="w-full h-full px-4 pt-5 bg-bg-dashboard-bg flex flex-col justify-start items-center gap-5">
          <div className="max-h-[150px] px-2">
            <div className="capitalize text-center text-3xl md:text-4xl font-semibold flex justify-center break-all text-white">
              {chapter && chapter.chapterHeadline}
            </div>
          </div>
          <video
            width="640"
            height="360"
            controls
            key={chapter?.chapterVideo?.url}
          >
            {chapter?.chapterVideo?.url && (
              <source src={chapter.chapterVideo.url} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>
          <div className="w-full flex items-center justify-center gap-5 ">
            <Button className="" onClick={openChapterModal}>
              Change video
            </Button>
            <Button className="" onClick={openModal}>
              Edit Details
            </Button>
          </div>
          <div className="bg-gray-500  w-full py-6 sm:py-10 px-4 sm:px-6 lg:px-8 rounded overflow-hidden overflow-ellipsis break-words">
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4">Caption :</h2>
            <span className="text-base md:text-lg lg:text-xl mb-4">
              {caption}
            </span>

            <div className="flex items-center justify-center py-3">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm md:text-base lg:text-lg px-4 md:px-5 py-2.5 md:py-2 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleEditCaptionOpen}
              >
                Edit Caption
              </button>
            </div>
          </div>

          {isCaptionModalVisible && (
            <div className="modal fixed inset-0 flex items-center justify-center">
              <div className="modal-content bg-white rounded-md shadow-lg p-4">
                <h2 className="flex justify-center text-2xl font-extrabold py-5">
                  Chapter Caption
                </h2>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-96 h-50 mb-4 resize-none"
                  rows="4"
                  placeholder="Enter your caption..."
                />
                <div className="flex justify-end">
                  <button
                    onClick={ handleEditCaption}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Toaster />
      </div>

      {/* change video */}
      <Transition appear as={Fragment} show={isChapterOpen}>
        <Dialog as="div" className="relative z-10" onClose={closeChapterModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Change Video
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-3">
                    <Dropzone
                      accept={["video/*"]}
                      multiple={false}
                      onDrop={handleChapterVideoDrop}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            className="w-full h-40 border-2 border-gray-400 border-dashed flex items-center justify-center cursor-pointer"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col h-full justify-center">
                              {chapterVideo ? (
                                <div className="h-1/3 flex items-center justify-center">
                                  {chapterVideo.name}
                                </div>
                              ) : (
                                <p>
                                  Drag 'n' drop some video here, or click to
                                  select video
                                </p>
                              )}
                            </div>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleChapterVideoChange}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* edit chapter */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={`fixed inset-0 bg-black/25`} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Chapter
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-3">
                    <Input
                      label="Title"
                      name="title"
                      value={chapterValues}
                      onChange={handleChapterValuesChanges}
                    />
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleEditChapter}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChapterDetails;
