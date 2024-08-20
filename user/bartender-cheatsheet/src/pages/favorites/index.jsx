import { useContext } from "react"
import { GlobalContext } from "../../context"
import Cocktail from "../../components/cocktail"

export default function Favorites() {

    const { favoritesList } = useContext(GlobalContext)

    return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {favoritesList && favoritesList.length > 0 ? (
            favoritesList.map((drink) => <Cocktail drink={drink} />)
            ) : (
                <div className="flex flex-col w-fit overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
                    <p className="text-2xl text-center font-extrabold">
                        No favorite Cocktails yet.
                    </p>
                </div>)
        }
    </div>
    )
}