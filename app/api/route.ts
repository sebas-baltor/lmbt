import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CreateMatch } from "@/lib/interfaces";
export async function GET(request: Request) {
  let matches = await prisma.match.findMany({
    orderBy: {
      date: "asc",
    },
  });

  return NextResponse.json(matches);
}
export async function POST(req: Request) {
  try {
    let { date, time, teamA, teamB, category, winner } =
      (await req.json()) as CreateMatch;

    // console.log({time, date})
    let datePlus6 = new Date(`${date}T${time}`).getTime();
    let sixHours = 6 * 60;
    let rightDate = new Date(datePlus6 - sixHours);
    let createdMatch = await prisma.match.create({
      data: {
        date: new Date(`${date}T${time}`),
        teamA: teamA,
        teamB: teamB,
        category: category,
        winner: winner,
        textDate: time
      },
    });
    // console.log(createdMatch.date)

    return NextResponse.json({ status: 200, createdMatch });
  } catch {
    return NextResponse.json({ message: "hi" });
  }
}

export async function DELETE(req: Request) {
  try {
    let body = await req.json();
    await prisma.match.delete({
      where: {
        id: parseInt(body.id),
      },
    });
    return NextResponse.json({ status: 200, message: "eliminado" });
  } catch {
    return NextResponse.json({ message: "ocurrio un error" });
  }
}
