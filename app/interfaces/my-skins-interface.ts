export interface MySkinsProps {
    skinsList: [
        {
            id: number,
            key: string,
            name: string,
            title: string,
            skin: [
                id: string,
                name: string,
                num: number
            ]
        },
    ]
    championsList: any
}

export interface SkinsList {
    skinsList: [
        {
            id: number,
            key: string,
            name: string,
            title: string,
            skin: [
                id: string,
                name: string,
                num: number
            ]
        },
    ]
}