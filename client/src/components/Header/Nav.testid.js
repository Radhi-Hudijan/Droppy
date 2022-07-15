import createTestIdFilePath from "../../util/createTestIdFilePath";

const TEST_ID = {
  linkToHome: `${createTestIdFilePath("components", "Nav")}-linkToHome`,
  linkToAbout: `${createTestIdFilePath("components", "Nav")}-linkToAbout`,
  linkToLogin: `${createTestIdFilePath("components", "Nav")}-linkToLogin`,
};

export default TEST_ID;
