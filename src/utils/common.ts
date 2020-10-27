// 定义公共函数用的

import {fetchList} from "@/services/configs";
import {request} from "umi";

export const currentUserRoleKey = 'currentUserRole';
export const setCurrentUserRoles = (roles: Array<string>): void => {
  const rolesString = JSON.stringify(roles);
  localStorage.setItem(currentUserRoleKey, rolesString);
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
