import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GoGrabber } from "react-icons/go";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SortableItem = (props) => {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  



  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white w-full h-16 px-2  flex  bg-course-card rounded-lg cursor-pointer"
    >
      <div className="flex items-center w-1/6">
        <GoGrabber
          {...attributes}
          {...listeners}
          className="text-black font-extrabold text-3xl mt-1 cursor-grab outline-none"
        />
      </div>
      <div className="w-4/6 cursor-pointer flex justify-center items-center">
        <div
          className="font-semibold text-lg md:text-xl overflow-hidden overflow-ellipsis whitespace-pre "
          onClick={()=> navigate("/teacher/chapterDetails", { state: { courseId: props.courseId, chapterIndex: props.chapter.chapterIndex} })}
        >
          {props.chapter.chapterHeadline}
        </div>
      </div>
      <div className="flex items-center justify-end pl-2 w-1/6">
        <RiDeleteBin7Fill className="text-black font-extrabold text-xl mt-1 cursor-pointer"  onClick={props.hadleDelete} />
      </div>
    </div>
  );
};

export default SortableItem;
