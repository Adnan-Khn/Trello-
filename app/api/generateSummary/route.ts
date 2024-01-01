import { NextResponse } from "next/server"; 
export async function POST(req: Request){
    //todos in the body for POST req
    const {todos} = await req.json();
    console.log(todos)
}