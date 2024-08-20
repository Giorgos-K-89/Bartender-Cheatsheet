import { Link } from "react-router-dom";

export default function Cocktail({ drink }) {
    return (
        <div className="flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
            <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
                <img src={drink?.strDrinkThumb} alt="cocktail" className="block w-full object-cover" />
            </div>
            <div className="text-left">
                {drink?.strAlcoholic ? (<span className={`text-xs text-white font-semibold px-2 py-1 rounded-sm uppercase
                ${drink?.strAlcoholic === 'Alcoholic'
                        ? 'bg-cyan-700'
                        : drink?.strAlcoholic === 'Optional alcohol'
                            ? 'bg-yellow-700'
                            : drink?.strAlcoholic === 'Non alcoholic'
                                ? 'bg-rose-700'
                                : ''
                    }`}>
                    {drink?.strAlcoholic}
                </span>) : null }
                <h3 className="font-bold text-2xl truncate text-black mt-1">{drink?.strDrink}</h3>
                <Link
                    to={`/cocktail-details/${drink?.idDrink}`}
                    className="text-xs py-2 mt-4 px-4 rounded-lg uppercase font-semibold tracking-wider inline-block shadow-md bg-black/90 text-white"
                >
                    Recipe Details
                </Link>
            </div>
        </div>
    )
}