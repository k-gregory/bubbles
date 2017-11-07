import {Graph as C} from "../component/graph/Graph";
import {connect} from "react-redux";

export const Graph = connect(
    function (state) {
        return {
            currentTime: state.gameLoop.currentTime,
            currency: state.currency.value
        }
    }
)(C);