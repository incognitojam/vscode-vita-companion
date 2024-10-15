export const validateIpOrHostname = (value: string) => {
  if (value.match(/\.+$/) || value.match(/\.{2,}/)) {
    return "Not a valid address";
  }
  return null;
};
