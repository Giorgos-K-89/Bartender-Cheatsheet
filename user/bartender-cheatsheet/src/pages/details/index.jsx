import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context";

export default function Details(){

    const { id } = useParams();
    const { cocktailDetailsData, setCocktailDetailsData, favoritesList, handleAddToFavorite } = useContext(GlobalContext);

    useEffect(() => {
      async function getCocktailDetails(){
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json();

        if(data?.drinks){
            setCocktailDetailsData(data.drinks[0])
        }
      }
      getCocktailDetails()
    }, [id, setCocktailDetailsData]);
    

    return (
        <div className="flex flex-col items-center justify-center gap-5 w-fit max-w-screen-xl mx-auto my-10 px-4">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 p-5 bg-white/75 shadow-xl border-2 rounded-2xl border-white">
            <div className="row-start-2 lg:row-start-auto">
                <div className="h-96 overflow-hidden rounded-xl group">
                    <img
                        src={cocktailDetailsData?.strDrinkThumb}
                        alt={cocktailDetailsData?.strDrink}
                        className="w-full h-full object-cover block group-hover:scale-105 duration-300"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 text-left">
                <h3 className="font-bold text-4xl truncate text-black">
                    {cocktailDetailsData?.strDrink}
                </h3>
                <span className={`text-xs text-white font-semibold px-2 py-1 rounded-sm uppercase w-fit
                    ${cocktailDetailsData?.strAlcoholic === 'Alcoholic'
                        ? 'bg-cyan-700'
                        : cocktailDetailsData?.strAlcoholic === 'Optional alcohol'
                            ? 'bg-yellow-700'
                            : cocktailDetailsData?.strAlcoholic === 'Non alcoholic'
                                ? 'bg-rose-700'
                                : ''
                    }`}>
                    {cocktailDetailsData?.strAlcoholic}
                </span>
                <div>
                    <button 
                        onClick={() => handleAddToFavorite(cocktailDetailsData)}
                        className="text-xs py-2 px-4 rounded-lg uppercase font-semibold tracking-wider inline-block shadow-md bg-black/90 text-white"
                    >
                       {
                            favoritesList && favoritesList.length > 0 && favoritesList.findIndex(
                            (item) => item.idDrink === cocktailDetailsData?.idDrink) !== -1 
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                        } 
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-semibold text-black">Ingredients:</span>
                    <ul className="flex flex-col">
                        {Object.keys(cocktailDetailsData || {})
                        .filter(key => key.startsWith("strIngredient") && cocktailDetailsData[key])
                        .map((ingredientKey, index) => (
                            <li key={index} className="text-xl text-black">
                                <span>{cocktailDetailsData[`strMeasure${index + 1}`]} {cocktailDetailsData[ingredientKey]}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </div>
            <div className="bg-white/75 shadow-xl border-2 rounded-2xl border-white p-5 w-full flex flex-col gap-1">
                <p><span className="font-semibold">Served in:</span> {cocktailDetailsData?.strGlass}</p>
                <p>{cocktailDetailsData?.strInstructions}</p>
            </div>
        </div>
    )
}