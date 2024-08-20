import { useContext } from "react"
import { GlobalContext } from "../../context"
import Cocktail from "../../components/cocktail"

export default function Home({username = 'user'}){

    const {cocktailList, loading} = useContext(GlobalContext)

    if (loading) return <div>Loading...Please wait!</div>

    return (
        <div className="py-16 container mx-auto flex flex-wrap justify-center gap-10">
            {cocktailList && cocktailList.length > 0 
                ? ( cocktailList.map((drink,index) => <Cocktail drink={drink} key={index}/>)) 
                : (<div className="flex flex-col w-fit overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
                    <p className="text-2xl text-center font-extrabold">
                        Welcome, {username}!<br/>Please search something.
                    </p>
                </div>)
            }
        </div>
    )
}