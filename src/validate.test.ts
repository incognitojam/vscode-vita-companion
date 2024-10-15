import { expect, test } from "vitest";
import { validateIpOrHostname } from "./validate";

test("validateIpOrHostname", () => {
  expect(validateIpOrHostname("123")).toBeNull();
  expect(validateIpOrHostname("123.123")).toBeNull();
  expect(validateIpOrHostname("123.123.123")).toBeNull();
  expect(validateIpOrHostname("123.123.123.123")).toBeNull();

  expect(validateIpOrHostname("123.")).toBe("Not a valid address");
  expect(validateIpOrHostname("123..")).toBe("Not a valid address");
  expect(validateIpOrHostname("123.123.")).toBe("Not a valid address");
  expect(validateIpOrHostname("123..123")).toBe("Not a valid address");

  expect(validateIpOrHostname("google.co.uk")).toBeNull();
  expect(validateIpOrHostname("google.com")).toBeNull();
  expect(validateIpOrHostname("google..com")).toBe("Not a valid address");
  expect(validateIpOrHostname("google.com.")).toBe("Not a valid address");

  expect(validateIpOrHostname("vita.local")).toBeNull();
  expect(validateIpOrHostname("vita..local")).toBe("Not a valid address");
  expect(validateIpOrHostname("vita.local.")).toBe("Not a valid address");
});
