const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MIN = "MIN";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_MIN = () => ({ type: VALIDATOR_TYPE_MIN });

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 4;
    }
  }
  return isValid;
};
