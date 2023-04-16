import { Typography } from "@mui/material"
import "./search.scss"
import SelectComponentMenu from "./select-categori-component/select-component"
import SearchIcon from '@mui/icons-material/Search';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const Search = () =>{
    const word = "ძებნა..."
    return(
        <div className="search__container">
            <form action="" id="header__search">
                <input type="text"
                placeholder={word}
                />
                <SelectComponentMenu/>
                <SearchIcon
                sx={{
                    height:"50px",
                    cursor:"pointer",
                }}
                fontSize="large"
                id="header__icone"
                />
            </form>
        </div>
        )
}

export default Search