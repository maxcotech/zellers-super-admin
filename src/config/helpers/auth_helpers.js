import { UserRoles } from "../app_config/user_config"

export const isStoreStaff = (role) => {
    switch(role){
        case UserRoles.storeStaff: return true;
        case UserRoles.storeOwner:return true;
        default: return false;
    }
}

export const isSuperAdmin = (role) => {
    if(role == UserRoles.superAdmin){
        return true;
    }
    return false;
}

export const isAdmin = (role) => {
    if(role == UserRoles.admin){
        return true;
    }
    return false;
}