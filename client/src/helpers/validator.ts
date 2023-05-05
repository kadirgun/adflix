import Validator from "validator";

export const isURL = (value: string, error: string) => {
	if (!Validator.isURL(value)) {
		return error;
	}

	return null;
};
