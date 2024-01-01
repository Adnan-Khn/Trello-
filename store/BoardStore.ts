import { ID, databases } from '@/appwrite';
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn'
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand'


interface BoardState{
    board:Board;
    getBoard: () => void; 
    setBoardState : (board:Board) => void
    updateTodoInDB:(todo:Todo,columnId:TypedColumn)=>void
    searchString:string
    setSearchString:(searchString:string)=>void
    newTaskInput:string
    setNewTaskInput:(input:string)=>void
    newTaskType:TypedColumn;
    setNewTaskType:(columnId:TypedColumn)=>void
    image:File|null
    setImage:(image:File|null)=>void
    addTask:(todo:string,columnId:TypedColumn,image?:File|null)=>void
}

export const useBoardStore = create<BoardState>((set) => ({
  board:{
    columns:new Map<TypedColumn,Column>()
  },
  getBoard:async()=>{
    const board = await getTodosGroupByColumn( )
    set({ board })
  },
  setBoardState : (board) => set({board}),

  updateTodoInDB:async(todo,columnId)=>{
    await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_COLLECTION_ID!,
        todo.$id,
        {
            title : todo.title,
            status:columnId
        }
    )
  },
  searchString: "",
  setSearchString:(searchString)=>set({searchString}),
  newTaskInput: "",
  setNewTaskInput: (input:string) =>set({newTaskInput:input}),
  newTaskType:  "todo",
  setNewTaskType:(columnId:TypedColumn)=>set({newTaskType:columnId}),
  image:null,
  setImage:(image:File|null) => set({ image }),
  addTask:async(todo:string,columnId:TypedColumn,image?:File|null)=>{
    let file:Image|undefined;
    if(image){
      const fileUploaded=await uploadImage(image)
      if(fileUploaded){
        file={
          bucketId:fileUploaded.bucketId,
          fileId:fileUploaded.$id
        }
      }
    }
    //add todo
    const { $id} = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      ID.unique(),
      {
        title:todo,
        status:columnId,
        //includde image if exists
        ...(file && {image:JSON.stringify(file)})
      }
    )

    set({newTaskInput:""})
    set((state)=>{
      const newColumns = new Map(state.board.columns)
      const newTodo:Todo={
        $id,
        $createdAt:new Date().toISOString(),
        title:todo,
        status:columnId,
        //include image if exists
        ...(file && {image:file})
      }
      //get the column in which the person is entering data
      const column = newColumns.get(columnId)
      if(!column){
        newColumns.set(columnId,{
          id:columnId,
          todos:[newTodo],
        })
      }else{
        newColumns.get(columnId)?.todos.push(newTodo)
      }
      return{
        board:{
          columns:newColumns,
        }
      }
    })
  }
}))
