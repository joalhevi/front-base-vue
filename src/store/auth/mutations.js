export function setUser(state, user) {
    state.user = user;
    state.isLogged= true;
    state.error = false;
    state.errorMessage =''
    state.errores =''
}

export function setToken(state, token) {
    state.token = token;
}

export function setAbilities(state, abilitys) {
    state.abilities = abilitys;
}

export function setTokenType(state,type) {
    state.token_type = type;
}

export function setIsLoggin(state,isLogged) {
    state.isLogged = isLogged;
}

export function authError(state, error){
    state.error = true;
    state.errorMessage = error;
    state.user = null;
    state.isLogged = false;
    state.token = null;
    state.abilities = null;
}

export function  errorProcedures(state,error) {
    state.error = null;
    state.errorMessage = error;
    state.user = null;
    state.isLogged = false;
    state.token = null;
    state.abilities = null;
    state.errores =''
}

export  function destroyToken(state) {
    state.token = null;
    state.token_type = null;
    state.user = {reinicio_password:false};
    state.isLogged = false;
    state.abilities= ''    ;
    state.error = false;
    state.errorMessage ='';
    state.errores =''
}
