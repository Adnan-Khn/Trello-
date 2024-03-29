"use client"
import { useRef, Fragment, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore'
import TaskRadioButton from './TaskRadioButton'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/solid'


function Modal() {
  //let [isOpen, setIsOpen] = useState(true)
  const imagePickerRef = useRef<HTMLInputElement>(null)
  const [isOpen,closeModal] = useModalStore((state)=>[
    state.isOpen,
    state.closeModal,
  ])
  const [newTaskInput,setNewTaskInput,image,setImage,addTask,newTaskType] = useBoardStore((state)=>[
    state.newTaskInput,
    state.setNewTaskInput,
    state.image,
    state.setImage,
    state.addTask,
    state.newTaskType
  ])
  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!newTaskInput) return
    //add Task
    addTask(newTaskInput,newTaskType,image)
    //final part as we have to set the image to null and also close the opened modal
    setImage(null)
    closeModal()
  }
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="form" onSubmit={handleSubmit} className="relative z-10" onClose={ closeModal}>
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
        <div className='fixed inset-0 overflow-y-auto'>
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2"> 
                            Add a task
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            type="text"
                            value={newTaskInput}
                            onChange={(e)=> setNewTaskInput(e.target.value)}
                            placeholder='Enter a Task'
                            className='w-full border border-gray-300 rounded-md outline-none p-5'
                          />
                        </div>
                        <TaskRadioButton/>
                        <div>
                          <button
                            type="button"
                            onClick={()=>{
                              imagePickerRef.current?.click()
                            }}
                            className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          ><PhotoIcon className='h-6 w-6 mr-2 inline-block'/>
                            Upload Image
                          </button>
                          {image && (
                            <Image
                              alt="Uploaded Image"
                              width={200} height={200}
                              className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                              src={URL.createObjectURL(image)}

                              onClick={()=>setImage(null)}
                            />
                          )}
                          <input
                          type='file'
                          ref={imagePickerRef}
                          hidden
                          onChange={(e)=>{
                            if(!e.target.files![0].type.startsWith("image/")) return
                            setImage(e.target.files![0])
                          }}
                          />
                        </div>
                        <div className='space-y-5 mt-5'>
                          <button 
                          type='submit'
                          disabled={!newTaskInput}
                          className='w-full bg-green-400 text-sm font-medium text-white hover:bg-green-700 items-center justify-center inline-flex rounded-md px-4 py-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'>
                            Add task
                          </button>
                        </div>
                    </Dialog.Panel>

                </Transition.Child>
            </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default Modal
