"use client";
import { Match } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    fetch(`${process.env.serverUrl}/api`)
      .then((res) => res.json())
      .then((data) => setMatches(data));
    // console.log(process.env.serverUrl);
  }, []);

  return (
    <>
      <header className="bg-blue-950 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <a href="https://www.facebook.com/LMBTemas" target="_blank">
            <Image
              src={"/lmbt-logo.svg"}
              height={60}
              width={60}
              alt="Facebook"
            />
          </a>
          <h1 className="text-2xl font-bold">Rol de Juegos | 8 de Octubre</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        {/* <h2 className="text-2xl font-bold mb-4">Partidos</h2> */}
        <ul className="space-y-4">
          {matches.length > 0 ? (
            matches.map((match) => (
              <li
                className="w-full flex flex-col gap-3 justify-end"
                key={match.id}
              >
                <div className="w-full">
                  <div className="mb-3">
                    <span className="text-slate-400">{match.category}</span>
                    <br />
                    <span className="font-bold text-xl text-blue-900">
                      {match.textDate}
                    </span>
                  </div>
                  <div className="w-full flex justify-evenly gap-3 text-white">
                    <div className="font-bold border-white border px-4 py-2 shadow-xl bg-white text-2xl w-full text-center bg-gradient-to-r from-cyan-400 to-blue-900 skew-y-3 lg:skew-y-1">
                      {match.teamA}
                    </div>
                    <span className="flex justify-center items-center font-bold text-4xl text-slate-400">
                      vs
                    </span>
                    <div className="font-bold border-white border px-4 py-2 shadow-xl bg-white text-2xl w-full text-center bg-gradient-to-r from-blue-900 to-cyan-400 -skew-y-3 lg:-skew-y-1">
                      {match.teamB}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  {match.winner ? (
                    <div className="text-blue-900 font-bold border-white border px-4 py-2 shadow-xl bg-white text-2xl w-1/2 text-center bg-gradient-to-r from-orange-400 to-yellow-200">
                      {match.winner}
                    </div>
                  ) : (
                    <span className="text-slate-400">ganador pendiente</span>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li>No hay juegos programados aun</li>
          )}
        </ul>
      </main>
      <footer className="bg-blue-950 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-3 items-center justify-center">
              <a href="https://www.facebook.com/LMBTemas" target="_blank">
                <Image
                  src={"/lmbt-logo.svg"}
                  height={40}
                  width={40}
                  alt="Facebook"
                />
              </a>
              <Image
                src={"/imcufidet-logo.jpg"}
                height={30}
                width={100}
                alt="Imcufidet"
              />
              <Image
                src={"/copaci-logo.jpg"}
                height={30}
                width={40}
                alt="Copaci"
              />
            </div>
            <p className="text-center text-slate-400">
              &copy; Torneo de Basquetbol Patronal 2023 & Liga Municipal De
              Basquetbol de Temascalapa | Agradecimientos a IMCUFIDET y COPACI
            </p>
              <a
                href="https://maps.app.goo.gl/fVo5wYHzZHKDd9VV6"
                target="_blank"
                className="text-cyan-400 border-b border-cyan-400"
              >
                Ubicación
              </a>
          </div>
        </div>
      </footer>
    </>
  );
}
