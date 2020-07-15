import {getRequest} from "./api";
import da from "element-ui/src/locale/lang/da";
import router from "../src/router";

export const initMenu=(router,store)=>{
    if (store.state.routes.length > 0){
        return;
    }
    getRequest("/system/config/menu").then(data=>{
        if (data){
            let fmRoutes = formatRoutes(data);
            router.addRoutes(fmRoutes);
            store.commit('initRoutes',fmRoutes)
        }
    })
}

export const formatRoutes=(routes)=>{
    let fmRoutes = [];
    routes.forEach(router=>{
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array){
            children = formatRoutes(children);
        }
        let fmRouter={
            path:path,
            name:name,
            iconCls:iconCls,
            meta:meta,
            children:children,
            component(resolve){
                require(['../views/'+component+'.vue'],resolve);
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}