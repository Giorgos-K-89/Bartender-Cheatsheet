import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [cocktailList, setCocktailList] = useState([]);
    const [cocktailDetailsData, setCocktailDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);


    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchParam}`)
            const data = await res.json();
            setSearchParam('');

            if(data.drinks){
                setCocktailList(data?.drinks)
                setLoading(false)
                setSearchParam('')
                navigate('/')
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
            setSearchParam('');
        }
    }

    async function handleSearchBySpirit(spirit) {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${spirit}`);
            const data = await response.json();
        
            if (data?.drinks) {
                setCocktailList(data.drinks);
                setLoading(false)
                navigate('/')
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    function handleAddToFavorite(getCurrentItem){

        let cpyFavoritesList = [...favoritesList];

        const index = cpyFavoritesList.findIndex(item => item.idDrink === getCurrentItem.idDrink);

        if(index === -1){
            cpyFavoritesList.push(getCurrentItem)
        } else {
            cpyFavoritesList.splice(index,1)
        }

        setFavoritesList(cpyFavoritesList)
    }

    return (
        <GlobalContext.Provider
            value={{
                searchParam,
                setSearchParam,
                loading,
                setLoading,
                handleSubmit,
                cocktailList,
                setCocktailList,
                cocktailDetailsData,
                setCocktailDetailsData,
                handleSearchBySpirit,
                handleAddToFavorite,
                favoritesList
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
