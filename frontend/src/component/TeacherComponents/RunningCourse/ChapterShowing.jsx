import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hook/useAxiosPrivate';


function CourseShowing() {
  const {teacherAxiosInstance}=useAxiosPrivate()
  const navigate=useNavigate()
  const [course, setCourse] = useState({});
  const [selectedChapter, setSelectedChapter] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.course && location.state.course.chapters && location.state.course.chapters.length > 0) {
      setCourse(location.state.course);
      setSelectedChapter(location.state.course.chapters[0]);
      console.log(course);
    }
  }, [location.state]);

  const { courseId } = useParams();

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    console.log('chapter',chapter)
  };
  const handleEdit=async()=>{
    const response= await teacherAxiosInstance.put(`/couseEdit/${course._id}`)
    if(response.data.error){
     return console.log(response.data.error);
    }
    navigate('/teacher/uploadCourse')
  }

  return (
    <>
   
    <div className="flex flex-col lg:flex-row w-full h-full bg-dashboard-bg ">
      {/* Video Section */}
      <div className="lg:w-3/4">
        <div className="w-full h-full flex flex-col justify-center items-center">
        <video src={selectedChapter?.chapterVideo?.url||'nothing'}  type="video/mp4" className="w-5/6 h-1/2 md:h-4/6" controls>
              Your browser does not support the video tag.
            </video>
          <div className='w-5/6  '>
        
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={handleEdit}>Edit</button>
        </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="lg:w-2/4 lg:border-l lg:border-black pb-8">
        <div className="p-6 py-5">
          <h2 className="text-2xl font-bold mb-4 text-white">Chapters</h2>
          <div className="overflow-y-auto">
            <div className="flex flex-col">
            {course.chapters &&
                  course.chapters.map((chapter, index) => (
                    <div
                      key={index}
                      onClick={() => handleChapterClick(chapter)}
                      className={`mb-4 p-3 border border-gray-300 rounded shadow-md hover:shadow-lg transition duration-300 ${
                        selectedChapter === chapter ? 'bg-gray-200' : ''
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2">{chapter.chapterHeadline}</h3>
                      {/* Add other chapter details here */}
                    </div>
                  ))}
            </div>  
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CourseShowing;
