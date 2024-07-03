"use client";
export const MySkinsGrid = ({skinsList}:{skinsList:any}) =>{
    return (
        <>
            {skinsList?.map((skin:any, index:number) => {
                return (
                    <h1 key={index}>{skin?.skinName}</h1>
                );
            })}
        </>
    );
}