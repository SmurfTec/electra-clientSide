import { Dispatch, SetStateAction, createContext } from "react";
import { ListItemPost } from "@elektra/types";

export const ListItemPostContext = createContext<{listItemPost:ListItemPost,setListItemPost: Dispatch<SetStateAction<ListItemPost>>}>({listItemPost: { } as ListItemPost , setListItemPost:function () {} as Dispatch<SetStateAction<ListItemPost>> });
