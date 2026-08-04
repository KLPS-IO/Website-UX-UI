export const normaliseViewerPermissions=(user:Record<string,unknown>,role:string|null)=>{
  const isFounder=user.isFounder===true||user.is_founder===true;
  const isAdmin=user.isAdmin===true||user.is_admin===true;
  return{
    isFounderAdmin:role==="founder_admin"||user.is_admin===true,
    canWriteFinance:isFounder||isAdmin||role==="founder"||role==="admin"||role==="founder_admin",
  };
};
