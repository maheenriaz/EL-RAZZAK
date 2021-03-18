import { NavigationActions } from 'react-navigation';
import { StackActions } from 'react-navigation'

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}
function replace(routeName, params) {
    _navigator.dispatch(
        StackActions.replace({
            routeName,
            params,
        })
    );
}
function reset(index, actions) {
    _navigator.dispatch(
        StackActions.reset({
            index,
            actions
        })
    );
}

export default {
    navigate,
    replace,
    reset,
    setTopLevelNavigator,
};