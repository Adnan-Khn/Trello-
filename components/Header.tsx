"use client"
import { useBoardStore } from "@/store/BoardStore"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Avatar from "react-avatar"

function Header() {
    const [searchString,setSearchString]=useBoardStore((state)=>[
        state.searchString,
        state.setSearchString
    ])
  return (
    <header>
        <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
            <div className="
                absolute 
                top-0 
                left-0 
                w-full 
                h-96 
                bg-gradient-to-br 
                from-pink-400 
                to-[#0d53a3] 
                rounded-md 
                filter 
                blur-3xl
                opacity-50
                -z-50
                " 
            />

            <Image
                src="https://links.papareact.com/c2cdd5"
                alt="Trello Logo"
                width={300}
                height={100}
                className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
            />
            <div className="flex items-center space-x-5 flex-1 w-full justify-end"> 
                <form className="flex items-center bg-white rounded-md space-x-5 shadow-md p-3 flex-1 md:flex-initial">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-500"/>
                    <input type="text" placeholder="Search" value={searchString} onChange={(e)=>setSearchString(e.target.value)} className="flex-1 outline-none p-2"></input>
                    <button hidden type="submit">Search</button>
                </form>
                <Avatar name="Adnan Khan" round size="50"/>
            </div>
        </div>
        <div className="flex items-center py-2 justify-center px-5 md:py-5">
            <p className="flex items-center text-sm font-light pr-5 p-5 shadow-xl rounded-full w-fit bg-white italic max-w-3xl text-[#3c82b8]">
                <UserCircleIcon
                    className="inline-block h-10 w-10 text-[#3c82b8] mr-2"
                />
                GPT is summarizing your tasks of the day
            </p>
        </div>
    </header>
  )
}
export default Header