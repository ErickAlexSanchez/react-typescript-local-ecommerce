export type TGuitar = {
    id: number;
    name: string,
    image: string,
    description : string, 
    price: number;
}

export type TGuitarID =  Pick <TGuitar, 'id'>;

export type CartItem = TGuitar & {
    quantity: number;
}

export type GuitarProps = {
    guitar: TGuitar, addToCart: (item : TGuitar) => void;
}

export type HeaderProps = {
    cart: CartItem[]
    removeFromCart: (id: TGuitarID) => void;    
    increaseQuantity: (id: TGuitarID) => void;
    decreaseQuantity: (id: TGuitarID) => void;
    cleanCart: () => void;
    isEmpty: boolean;
    cartTotal: number;
}