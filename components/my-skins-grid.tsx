"use client";
export const MySkinsGrid = ({skinsList}:{skinsList:any}) =>{
    return (
        <>
            {
            skinsList?.map((champion:any, index:number) => {
                console.log(champion);
                return (
                    <div key={champion.id} className="grid grid-cols-4 gap-4">
                         <h1>{champion.skin[0].name}</h1>
                    </div>
                );
            })}
        </>
    );
}