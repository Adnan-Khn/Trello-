"use client"
import getUrl from "@/lib/getUrl";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd"

type Props={
    todo:Todo;
    index: number;
    id:TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null |undefined;
}
function TodoCard({todo,index,id,innerRef,draggableProps,dragHandleProps}:Props) {
  const [imageurl, setImageurl] = useState<string|null>(null)
  useEffect(() => {
    if(todo.image){
      const fetchImage = async()=>{
        const url = await getUrl(todo.image!)
        if(url){
          setImageurl(url.toString())
        }
      }
    }    
  }, [todo])
  
  return (
    <div
        className="bg-white rounded-md space-y-2 drop-shadow- md"
        {...draggableProps}
        {...dragHandleProps}
        ref={innerRef}
    >
     <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button className="text-red-500 hover:text-red-600"> 
            <XCircleIcon className="ml-5 h-8 w-8"/>
        </button>
     </div>
     {/* Add image here */}
     {imageurl && (
      <div className="h-full w-full rounder-b-md">
        <Image
        src={imageurl}
        alt="Task Image"
        width={400}
        height={200}
        className="w-full object-contain rounded-b-md"
        />
      </div>
     )}
    </div>
  )
}
export default TodoCard