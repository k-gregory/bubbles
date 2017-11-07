import {NavBar as C} from "../component/navbar/NavBar";
import {connect} from "react-redux";

export const NavBar = connect(
    function (state) {
        return {
            deposit: state.balance
        }
    }
)(C);