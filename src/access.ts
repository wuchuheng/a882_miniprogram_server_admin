/**
 * 权限配置
 */

import {getCurrentUserRoles} from "@/utils/common";

export default function() {
  const roles = getCurrentUserRoles();
  const isAdmin = roles.findIndex( item => ['admin'].includes(item)) > -1; // 是不否管理员
  return {
    canAddGoodsToMoreShop: isAdmin, // 向多个门店添加商品
    canCreateStore: isAdmin, // 创建门店
    canVisitStore: isAdmin, // 查看门店
    canVisitStoreProperty: isAdmin, // 查看门店属性
  };
}
