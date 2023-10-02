import {NextResponse} from "next/server";
import prisma from "@/lib/prisma"
export async function GET(request:Request){

    let matches =  await prisma.match.findMany({
        orderBy: {
          date: "asc",
        },
      })

    return NextResponse.json({data:matches}, { status: 200 })
}