// 定义公共函数用的

import {fetchList} from "@/services/configs";
import {request} from "umi";

export const currentUserRoleKey = 'currentUserRole';
/**
 * 保存当前用户角色
 * @param roles
 */
export const setCurrentUserRoles = (roles: Array<string>): void => {
  const rolesString = JSON.stringify(roles);
  localStorage.setItem(currentUserRoleKey, rolesString);
};

export const getCurrentUserRoles = () : Array<string> => {
  const params = localStorage.getItem(currentUserRoleKey);
  if (!params) return [];
   const newParams = JSON.parse(params) as Array<string>;
   return newParams;
};

// 坐标换算为地址
export  const getAddressByLocation = (location: { latitude: number; longitude: number; } ) :Promise<string> =>   {
  return new Promise((resolve, reject) => {
    fetchList().then(res => {
      const  index = res.data.findIndex(item => {
        return item.name === 'AMAP_KEY'
      });
      const AMAP_KEY = res.data[index].value;
      return Promise.resolve(AMAP_KEY);
    }).then(AMAP_KEY => {
      return request('https://restapi.amap.com/v3/geocode/regeo', {
        method: 'GET',
        params: {
          key: AMAP_KEY,
          location: `${location.longitude},${location.latitude}`
        }
      })
    }).then((res: any) => {
      if (res.info === 'OK') {
        const address = res.regeocode.formatted_address;
        // 设置地址换算出来的地址
        resolve(address);
      } else {
        reject();
      }
    });
  })
};

// 驼峰转属性换下划线命名
export const propertyNameToLineName =  (params: Record<string, any>) => {
  const newPrams: Record<string, any>  = {};
  for (const name in params) {
    let val = params[name];
    const newName = name.replace(/([A-Z])/g,"_$1").toLowerCase();
    newPrams[newName] = val;
  }
  return  newPrams;
}
