export const isFounderUser = () => {
  const role =
    localStorage.getItem("betaRole");

  const isAdmin =
    localStorage.getItem(
      "betaIsAdmin"
    ) === "true";

  return (
    role === "founder" ||
    isAdmin
  );
};
