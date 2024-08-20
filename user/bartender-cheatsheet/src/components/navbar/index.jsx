import { useContext } from "react";
import { GlobalContext } from "../../context";
import SpiritButton from "../spirit-button";
import data from "../../spirits-data/data";
import { NavLink } from "react-router-dom";

export default function Navbar({logout}) {

    const { searchParam, setSearchParam, handleSubmit, handleSearchBySpirit } = useContext(GlobalContext)

    return (
        <nav className="flex flex-col justify-center items-center gap-6">
            <div className="flex gap-5 text-white">
                <NavLink to={'/'} className='text-sm hover:underline'>HOME</NavLink>
                <NavLink to={'/favorites'} className='text-sm hover:underline'>FAVORITES</NavLink>
                <button onClick={logout} className='text-sm hover:underline'>LOGOUT</button>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    name="search"
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                    className="bg-white py-3 px-6 pr-12 rounded-full outline-none lg:w-96 shadow-lg text-sm"
                    placeholder="Search for cocktails..."
                />
                <button onClick={handleSubmit} className="absolute right-1 top-1 bg-black rounded-full p-2 transition-transform duration-150 transform hover:scale-105 active:scale-95 active:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff" className="transition-transform duration-150 transform"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                </button>
            </form>

            <div className="flex gap-3 flex-wrap justify-center px-4">
                {data.map((spirit, index) => (
                    <SpiritButton key={index} spirit={spirit} onClick={handleSearchBySpirit} />
                ))}
            </div>
        </nav>
    )
}