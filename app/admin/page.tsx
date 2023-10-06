"use client";
import { useState } from "react";
import { CreateMatch } from "@/lib/interfaces";
import { Match } from "@prisma/client";
import { useEffect } from "react";
const initialFormValues = {
  date: "",
  time: "",
  teamA: "",
  teamB: "",
  category: "",
  winner: "",
};
export default function Admin() {
  const [formValues, setFormValues] = useState<CreateMatch>(initialFormValues);
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    fetch(`${process.env.serverUrl}/api`)
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(new Date().getTime())
    // fetch to create a new match
    fetch(`${process.env.serverUrl}/api`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`${process.env.serverUrl}/api`)
          .then((res) => res.json())
          .then((data) => {
            setMatches(data);
            setFormValues(initialFormValues);
          });
      });
  };

  return (
    <>
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Admin</h1>
          <nav>
            <ul className="flex">
              <li>
                <a href="/" className="px-4 hover:text-gray-400">
                  Rol
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-4 px-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-2xl font-bold mb-4">Create Match</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="date"
              >
                Fecha
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                name="date"
                required
                value={formValues.date}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="date"
              >
                Hora
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="time"
                name="time"
                required
                value={formValues.time}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="team1"
              >
                Equipo 1
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="team1"
                type="text"
                name="teamA"
                required
                value={formValues.teamA}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="team2"
              >
                Equipo 2
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="team2"
                type="text"
                name="teamB"
                required
                value={formValues.teamB}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="cotegory"
              >
                Categoria
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                name="category"
                required
                value={formValues.category}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="winner"
              >
                Ganador
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="winner"
                type="text"
                name="winner"
                value={formValues.winner}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                CREAR
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                onClick={() => {
                  setFormValues(initialFormValues);
                }}
              >
                CANCELAR
              </a>
            </div>
          </form>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={`${match.id}-match`}>
                  <td>
                    {/* {new Date(match.date).toLocaleDateString()} a las{" "}
                    {new Date(match.date).toLocaleTimeString()} */}
                    {new Date(match.date).toLocaleString("es-MX",{timeZone:"America/Mexico_City"})}
                  </td>
                  <td>{match.teamA}</td>
                  <td>{match.teamB}</td>
                  <td>{match.category}</td>
                  <td>
                    <button
                      type="button"
                      className="bg-red-300 text-white px-3 py-2 rounded-md"
                      onClick={() => {
                        // console.log(`eliminando el item ${match.id}`);
                        fetch(`${process.env.serverUrl}/api`, {
                          method: "DELETE",
                          body: JSON.stringify({ id: match.id }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        })
                          .then((res) => res.json())
                          .then((data) =>
                            fetch(`${process.env.serverUrl}/api`)
                              .then((res) => res.json())
                              .then((data) => setMatches(data))
                          );
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2021 Basketball Tournament</p>
        </div>
      </footer>
    </>
  );
}
