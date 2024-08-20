export default function SpiritButton({spirit,onClick}){
    return <button
                value={spirit}
                onClick={() => onClick(spirit)}
                className="uppercase py-1 px-4 rounded-full" 
                id={spirit}
            >
                {spirit}
            </button>
}