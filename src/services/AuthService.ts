import {store} from "../user_store.ts";

class AuthService {
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('token');
        store.user = null;
        location.reload();
    }
}
export default new AuthService();
