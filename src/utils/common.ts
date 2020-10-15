// 定义公共函数用的

export const currentUserRoleKey = 'currentUserRole';
export const setCurrentUserRoles = (roles: Array<string>): void => {
  const rolesString = JSON.stringify(roles);
  localStorage.setItem(currentUserRoleKey, rolesString);
};
