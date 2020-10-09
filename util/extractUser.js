// https://github.com/hoangvvo/nextjs-mongodb-app/blob/master/lib/api-helpers.js
// take only needed user fields to avoid sensitive ones (such as password)
export const extractUser = (req) => {
  if (!req.user) return null;
  const { _id, isAdmin, email, name, dateCreated } = req.user;
  return {
    _id,
    isAdmin,
    email,
    name,
    dateCreated,
  };
};
