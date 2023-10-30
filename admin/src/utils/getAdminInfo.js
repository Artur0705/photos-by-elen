export const getAdminInfo = () => {
  const adminData = localStorage.getItem("admin");
  return adminData ? JSON.parse(adminData) : null;
};
