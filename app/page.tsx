"use client"
import prisma from "@/lib/prisma"
import {AppProps} from "next/app";
import { Match } from "@prisma/client";
import {useEffect,useState} from "react";

type Props = {
  matches: Match[]
}

// async function getData() {
//   const res = await fetch('http://localhost:3000/api');
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   // if (!res.ok) {
//   //   // This will activate the closest `error.js` Error Boundary
//   //   throw new Error('Failed to fetch data')
//   // }
 
//   console.log(res.json())
// }


export default async function Home() {
  const [matches,setMatches]= useState<Match[]>([]);
  useEffect(()=>{
    fetch('http://localhost:3000/api').then(res=>res.json()).then(data=>setMatches(data))
  },[])

  return (
  <>
    <header className="bg-blue-950 text-white py-4">
    <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Rol de Juegos | 8 de Octubre</h1>
    </div>
    </header>
    <main className="container mx-auto py-8 px-4">
    <h2 className="text-2xl font-bold mb-4">Partidos</h2>
      <ul className="space-y-4">
        {
        matches.length > 0 ?
        matches.map((match)=>(
          <li className="w-full flex flex-col gap-3 justify-end">
            <div className="w-full">
              <span>{match.category}</span>
              <div className="w-full">
                <div>{match.teamA}</div>
                <span>vs</span>
                <div>{match.teamB}</div>
              </div>
            </div>
            <div>{match.winner}</div>
          </li>
        )) :
        <li>No hay juegos programados aun</li>
      }
      </ul>
    </main>
    <footer className="absolute bottom-0 left-0 w-full bg-blue-950 text-white py-4">
    <div className="container mx-auto px-4">
      <p className="text-center">&copy; Torneo de Basquetbol Patronal 2023</p>
      </div>
    </footer>
  </>
  )
}